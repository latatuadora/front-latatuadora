export class BaseGallery {
  constructor(api) {
    this.api = api;
    this.apiMethod = 'getItems';
    this.params = {
      style: null,
      element: null,
      artist: null,
      page: 1
    };
    this.lists = {
      styles: [],
      elements: []
    };
    this.activeElements = {
      style: null,
      element: null
    };
    this.showDropdowns = {
      styles: false,
      elements: false
    };
    this.items = [];
    this.showLoader = false;
    this.showFilters = false;
    this.showModal = false;
    this.currentItem = {};
    this.allEmpty = true;
  }

  activate(params, routeConfig) {
    if (params) {
      this.checkParams(params);
    }
    this.getLists();
    this.loadMore();
  }

  checkParams(params) {
    if (params.artist) {
      this.params.artist = parseInt(params.artist);
      this.artist = this.getArtist(params.artist);
    }
    if (params.style) {
      this.params.style = parseInt(params.style);
    }
    if (params.element) {
      this.params.element = parseInt(params.element);
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleDropdown(dropdown) {
    this.showDropdowns[dropdown] = !this.showDropdowns[dropdown];
  }

  getLists() {
    this.getStyles();
    this.getElements();
  }

  getArtist(id) {
    this.api.getArtist(id)
      .then(artist => {
        this.artist = artist;
      });
  }

  getStyles() {
    this.api.getStyles()
      .then(styles => {
        styles.forEach(style => {
          if (this.params.style == style.id) {
            this.activeElements.style = style;
          }
        });
        this.lists.styles = styles;
      });
  }

  getElements() {
    this.api.getElements()
      .then(elements => {
        elements.forEach(element => {
          if (this.params.element == element.id) {
            this.activeElements.element = element;
          }
        });
        this.lists.elements = elements;
      });
  }

  setStyle = style => {
    if (style.id !== this.params.style) {
      this.params.style = style.id;
      this.activeElements.style = style;
      this.filterItems();
      this.allEmpty = false;
    }
  }

  setElement = element => {
    if (element.id !== this.params.element) {
      this.params.element = element.id;
      this.activeElements.element = element;
      this.filterItems();
      this.allEmpty = false;
    }
  }

  resetParams() {
    this.params = {
      style: null,
      element: null,
      artist: null,
      page: 1
    };
    this.activeElements = {
      style: null,
      element: null
    };
    this.allEmpty = true;
  }

  resetFilters() {
    this.resetParams();
    this.filterItems();
  }

  filterItems() {
    this.items = [];
    this.params.page = 1;
    this.showLoader = false;
    this.loadMore();
  }

  loadMore() {
    if (!this.showLoader && this.params.page != null) {
      this.showLoader = true;
      this.api[this.apiMethod](this.params)
        .then(items => {
          items.forEach(item => {
            this.addItem(item);
          });
          this.showLoader = false;
          if (items.length) {
            this.params.page += 1;
          } else {
            this.params.page = null;
          }
        });
    }
  }

  addItem(item) {
    if (!item.image || !item.image.includes('http')) {
      item.image = '/src/assets/images/mock/tattoo3.png';
    }
    if (!item.artist_picture) {
      item.artist_picture = '/src/assets/images/mock/artist3.png';
    }
    this.items.push(item);
  }

  openModal(index) {
    this.showModal = true;
    this.currentItem = this.items[index];
    this.currentItem.index = index;
  }

  closeModal() {
    this.showModal = false;
  }

  previousItem() {
    let lastItem = this.items.length - 1;
    let currentItem = this.currentItem.index;
    let newIndex = currentItem > 0 ? currentItem - 1 : lastItem;
    this.currentItem = this.items[newIndex];
    this.currentItem.index = newIndex;
  }

  nextItem() {
    let lastItem = this.items.length - 1;
    let currentItem = this.currentItem.index;
    let newIndex = currentItem < lastItem ? currentItem + 1 : 0;
    this.currentItem = this.items[newIndex];
    this.currentItem.index = newIndex;
  }
}