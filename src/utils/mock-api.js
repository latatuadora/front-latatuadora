import moment from 'moment';

function getRandom(min, max, precision = 0) {
  var random = (Math.random() * max) + min;
  return parseFloat(random.toFixed(precision));
}

class Schedule {
  constructor(id) {
    this.id = id;
    let hour = getRandom(0, 23);
    let minute = getRandom(0, 59);
    let time = `${hour < 10 ? '0' : ''}${hour}${minute < 10 ? '0' : ''}${minute}`;
    this.time = moment(time, 'hmm').format('HH:mm');
  }
}

class Quotation {
  constructor(id) {
    this.id = id;
    this.artist = featuredArtists[getRandom(0, 7)];
    this.image = '/src/assets/images/mock/tattoo' + getRandom(1, 8) + '.png';
    this.dimensionsY = getRandom(1, 25) + ' cm';
    this.dimensionsX = getRandom(1, 25) + ' cm';
    this.style = styles[2];
    this.bodyPart = bodyParts.front[2];
    this.min = getRandom(300, 9000);
    this.max = getRandom(this.min, 9000);
  }
}

class Evaluation {
  constructor() {
    this.author = 'Mariela Tinoco S.';
    this.stars = getRandom(0, 5, 1);
    this.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo distinctio harum quo expedita id. Illum maiores rerum in quidem dolorem, quis, neque animi non odio, laboriosam eveniet voluptates atque molestias.';
  }
}

class Post {
  constructor(artist) {
    this.author = artist.name;
    this.authorImage = artist.imageURL;
    this.publicationDate = new Date().toString();
    this.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo distinctio harum quo expedita id. Illum maiores rerum in quidem dolorem, quis, neque animi non odio, laboriosam eveniet voluptates atque molestias.';
  }
}

class Artist {
  constructor(id) {
    this.id = id;
    this.name = 'Mock Artist ' + id;
    this.rating = getRandom(0, 5, 1);
    this.votes = getRandom(0, 100);
    this.location = 'Roma, Ciudad de México';
    this.tags = ['Tag1', 'Tag2'];
    this.imageURL = '/src/assets/images/mock/artist' + id + '.png';
    this.logo = '/src/assets/images/mock/studioname.png';
    this.images = [
      '/src/assets/images/mock/studio-carousel.jpg',
      '/src/assets/images/mock/studio-carousel.jpg',
      '/src/assets/images/mock/studio-carousel.jpg',
      '/src/assets/images/mock/studio-carousel.jpg',
      '/src/assets/images/mock/studio-carousel.jpg',
      '/src/assets/images/mock/studio-carousel.jpg'
    ];
    this.evaluations = [
      new Evaluation(),
      new Evaluation(),
      new Evaluation(),
      new Evaluation()
    ];
    this.posts = [
      new Post(this),
      new Post(this),
      new Post(this),
      new Post(this)
    ];
    this.schedules = [
      new Schedule(1),
      new Schedule(2),
      new Schedule(3),
      new Schedule(4)
    ];
  }
}

class Studio extends Artist {
  constructor(id) {
    super(id);
    this.artists = [
      new Artist(id + 1),
      new Artist(id + 2),
      new Artist(id + 3),
      new Artist(id + 4)
    ]
  }
}

class Tattoo {
  constructor(id, element, part, style) {
    this.id = id;
    this.description = 'Description';
    this.votes = getRandom(1, 100);
    this.tags = ['tag1', 'tag2'];
    this.element_name = element;
    this.body_part_name = part,
    this.style_name = style,
    this.image = '/src/assets/images/mock/tattoo' + id + '.png';
    this.artist_name = 'Enrique Lopez';
    this.artist_picture = '/src/assets/images/mock/artist1.png';
    this.artist_id = getRandom(1, 8);
    this.artist_location = 'Col. Roma';
    this.artist_rating = getRandom(0, 5, 1);
    this.price = getRandom(300, 4000);
    this.currency = 'mxn';
    this.dimensions = {
      length: getRandom(1, 25) + ' cm',
      width: getRandom(1, 25) + ' cm'
    };
  }
}

let latency = 200;

let bodyParts = {
  front: [
    {
      id: 3,
      name: 'Oreja',
      image: '/src/assets/images/mock/bodypart3.png'
    },
    {
      id: 4,
      name: 'Manos',
      image: '/src/assets/images/mock/bodypart4.png'
    },
    {
      id: 5,
      name: 'Pies',
      image: '/src/assets/images/mock/bodypart5.png'
    },
    {
      id: 6,
      name: 'Muñeca',
      image: '/src/assets/images/mock/bodypart6.png'
    },
    {
      id: 8,
      name: 'Rodilla',
      image: '/src/assets/images/mock/bodypart8.png'
    },
    {
      id: 10,
      name: 'Pierna',
      image: '/src/assets/images/mock/bodypart10.png'
    },
    {
      id: 11,
      name: 'Cuello',
      image: '/src/assets/images/mock/bodypart11.png'
    },
    {
      id: 12,
      name: 'Dedos',
      image: '/src/assets/images/mock/bodypart12.png'
    },
    {
     id: 13,
     name: 'Abdomen',
     image: '/src/assets/images/mock/bodypart13.png'
    },
    {
     id: 14,
     name: 'Cachete izquierdo',
     image: '/src/assets/images/mock/bodypart14.png'
    },
    {
     id: 15,
     name: 'Cachete derecho',
     image: '/src/assets/images/mock/bodypart15.png'
    },
    {
     id: 16,
     name: 'Frente',
     image: '/src/assets/images/mock/bodypart19.png'
    },
    {
      id: 17,
      name: 'Espinilla',
      image: '/src/assets/images/mock/bodypart18.png'
    },
    {
     id: 18,
     name: 'Pecho',
     image: '/src/assets/images/mock/bodypart22.png'
    }
  ],
  back: [
    {
      id: 1,
      name: 'Espalda',
      image: '/src/assets/images/mock/bodypart1.png'
    },
    {
      id: 2,
      name: 'Hombros',
      image: '/src/assets/images/mock/bodypart2.png'
    },
    {
      id: 7,
      name: 'Pantorrilla',
      image: '/src/assets/images/mock/bodypart7.png'
    },
    {
     id: 9,
     name: 'Brazos',
     image: '/src/assets/images/mock/bodypart9.png'
    },
    {
     id: 19,
     name: 'Espalda baja',
     image: '/src/assets/images/mock/bodypart16.png'
    },
    {
     id: 20,
     name: 'Espalda superior',
     image: '/src/assets/images/mock/bodypart17.png'
    },
    {
     id: 21,
     name: 'Nuca',
     image: '/src/assets/images/mock/bodypart20.png'
    }
  ]
}

let tattoos = [
  new Tattoo(1, 'Brazo Robot', 'Oreja', 'Dark'),
  new Tattoo(2, 'Brazo Robot', 'Pierna', 'Dark'),
  new Tattoo(3, 'Brazo Robot', 'Oreja', 'Old School'),
  new Tattoo(4, 'Brazo Robot', 'Oreja', 'Dark'),
  new Tattoo(5, 'Brazo Robot', 'Rodilla', 'Old School'),
  new Tattoo(6, 'Brazo Robot', 'Oreja', 'Religioso'),
  new Tattoo(7, 'Brazo Robot', 'Rodilla', 'Religioso'),
  new Tattoo(8, 'Brazo Robot', 'Oreja', 'Religioso')
];

let featuredArtists = [
  new Artist(1),
  new Artist(2),
  new Artist(3),
  new Artist(4),
  new Artist(5),
  new Artist(6),
  new Artist(7),
  new Artist(8)
];

let styles = [
  {
    name: 'Old School',
    id: 1,
    image: '/src/assets/images/mock/style14.jpg'
  },
  {
    name: 'New School',
    id: 2,
    image: '/src/assets/images/mock/style15.jpg'
  },
  {
    name: 'Dotwork',
    id: 3,
    image: '/src/assets/images/mock/style10.png'
  },
  {
    name: 'Geométrico',
    id: 4,
    image: '/src/assets/images/mock/style9.png'
  },
  {
    name: 'Trash Polka',
    id: 5,
    image: '/src/assets/images/mock/style7.png'
  },
  {
    name: 'Black work',
    id: 6,
    image: '/src/assets/images/mock/style1.png'
  },
  {
    name: 'Japones',
    id: 8,
    image: '/src/assets/images/mock/style13.png'
  },
  {
    name: 'Tribal',
    id: 8,
    image: '/src/assets/images/mock/style16.jpg'
  },
  {
    name: 'Tipografía',
    id: 10,
    image: '/src/assets/images/mock/style11.png'
  },
  {
    name: 'Ilustración',
    id: 11,
    image: '/src/assets/images/mock/style12.png'
  },
  {
    name: 'Surreal',
    id: 12,
    image: '/src/assets/images/mock/style6.png'
  },
  {
    name: 'Biomecánico',
    id: 13,
    image: '/src/assets/images/mock/style8.png'
  }//,
  // {
  //   name: 'Bosquejo',
  //   id: 2,
  //   image: '/src/assets/images/mock/style2.png'
  // },
  // {
  //   name: 'Kawaii',
  //   id: 3,
  //   image: '/src/assets/images/mock/style3.png'
  // },
  // {
  //   name: 'Oriental',
  //   id: 4,
  //   image: '/src/assets/images/mock/style4.png'
  // },
  // {
  //   name: 'Retrato',
  //   id: 5,
  //   image: '/src/assets/images/mock/style5.png'
  // }
];

let elements = [
  {
    name: 'Mangas',
    id: 0
  },
  {
    name: 'Femenino',
    id: 1
  }
];

let quotations = [
  new Quotation(1),
  new Quotation(2),
  new Quotation(3),
  new Quotation(4),
  new Quotation(5)
];

export class MockAPI {
  isRequesting = false;

  postQuotationRequest(request) {
    this.isRequesting = true;
    let min = getRandom(300, 9000);
    let max = getRandom(300, 9000);

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          min_amount: min,
          max_amount: max,
          status: 'success'
        });
        this.isRequesting = false;
      }, latency);
    });
  }

  getBodyParts() {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(bodyParts);
        this.isRequesting = false;
      }, latency);
    });
  }

  getElements() {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(elements);
        this.isRequesting = false;
      }, latency);
    });
  }

  getArtist(id) {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(featuredArtists[0]);
        this.isRequesting = false;
      }, latency);
    });
  }

  getStudio(id) {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(new Studio(id));
        this.isRequesting = false;
      }, latency);
    });
  }

  getStyles() {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(styles);
        this.isRequesting = false;
      }, latency)
    });
  }

  getTattoos(data = {}) {
    this.isRequesting = true;

    let results = tattoos.filter((obj) => {
      if (data.style && data.style !== obj.style_name) {
        return false;
      }
      if (data.element && data.element !== obj.element_name) {
        return false;
      }
      if (data.part && data.part !== obj.body_part_name) {
        return false;
      }

      return true;
    });

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(results);
        this.isRequesting = false;
      }, latency)
    });
  }

  getFlahes = this.getTattoos;

  getFeaturedArtists(type = 'featured') {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(featuredArtists);
        this.isRequesting = false;
      }, latency)
    });
  }

  getArtists = this.getFeaturedArtists;

  getQuotations(params) {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(quotations);
        this.isRequesting = false;
      }, latency)
    });
  }
}