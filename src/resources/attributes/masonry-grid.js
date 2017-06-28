import {inject} from 'aurelia-framework';
import masonry from 'masonry-layout';

@inject(Element)
export class MasonryGridCustomAttribute {
  constructor(element) {
    this.element = element;
    this.masonry = null;
    this.observer = null;
  }

  attached() {
    if (this.element.children.length) {
      this.initGrid(true);
    }

    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if(mutation.addedNodes.length) {
          this.appendItems(mutation.addedNodes);
        }
        if(mutation.removedNodes.length) {
          this.removeItems(mutation.removedNodes);
        }
      });
    });

    let config = {
      attributes: false,
      childList: true,
      characterData: false
    };

    this.observer.observe(this.element, config);
  }

  initGrid(withInitialElements) {
    this.masonry = new masonry(this.element, {isResizable: true});
    if (!withInitialElements) {
      this.masonry.items = [];
      this.resetCols();
    }
  }

  appendItems(items){
    items.forEach(item => {
      this.appendItem(item);
    });
  }

  removeItems(items){
    items.forEach(item => {
      this.removeItem(item);
    });
  }

  appendItem(item) {
    if (!this.masonry) {
      this.initGrid(false);
    }
    item.style.opacity = 0;
    this.waitForImages(item);
  }

  removeItem(item) {
    this.masonry.remove(item);
    if (!this.element.children.length) {
      this.resetCols();
    }
  }

  resetCols = () => {
    for (let i = 0; i < this.masonry.colYs.length; i++) {
      this.masonry.colYs[i] = 0;
    }
    this.element.style.height = 0;
    this.masonry.maxY = 0;
  }

  waitForImages(item) {
    let images = item.getElementsByTagName('img');
    let promises = [];

    let loaded = (image) => {
      return new Promise(resolve => {
        image.onload = () => {
          resolve();
        };
      });
    }

    for (let i = 0; i < images.length; i++) {
      promises.push(loaded(images[i]));
    }
    Promise.all(promises).then(() => {
      this.masonry.appended(item);
      item.style.opacity = 1;
    });
  }

  detached() {
    this.observer.disconnect();
  }
}