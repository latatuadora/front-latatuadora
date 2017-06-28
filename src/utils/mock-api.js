import moment from 'moment';

function getRandom(min, max, precision = 0) {
  var random = (Math.random() * max) + min;
  return parseFloat(random.toFixed(precision));
}

let latency = 200;

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
    this.bodyPart = groupedBodyParts.front[2];
    this.min = getRandom(300, 9000);
    this.max = getRandom(this.min, 9000);
  }
}

class Evaluation {
  constructor(id) {
    this.id = id;
    this.author = 'Mariela Tinoco S.';
    this.stars = getRandom(0, 5, 1);
    this.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo distinctio harum quo expedita id. Illum maiores rerum in quidem dolorem, quis, neque animi non odio, laboriosam eveniet voluptates atque molestias.';
  }
}

class Post {
  constructor(id, artistId) {
    this.id = id;
    this.author = artistId;
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
    this.image = '/src/assets/images/mock/artist' + id + '.png';
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
      1,
      2,
      3,
      4
    ];
    this.posts = [
      1,
      2,
      3,
      4
    ];
    this.schedules = [
      new Schedule(1),
      new Schedule(2),
      new Schedule(3),
      new Schedule(4)
    ];
  }
}

class Freelancer extends Artist {
  constructor(id) {
    super(id);
  }
}

class StudioArtist extends Artist {
  constructor(id) {
    super(id);
  }
}

class Studio extends Artist {
  constructor(id) {
    super(id);
    this.artists = [
      id + 1,
      id + 2,
      id + 3,
      id + 4
    ];
  }
}

class Element {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Style extends Element {
  constructor(id, name, image) {
    super(id, name);
    this.image = image;
  }
}

class BodyPart extends Style {
  constructor(id, name, image) {
    super(id, name, image);
  }
}

class Tattoo {
  constructor(id) {
    this.id = id;
    this.votes = getRandom(1, 100);
    this.tags = ['tag1', 'tag2'];
    this.image = '/src/assets/images/mock/tattoo' + id + '.png';
    this.dimensionsX = getRandom(1, 25);
    this.dimensionsY = getRandom(1, 25);
    this.element = id;
    this.partbody = id;
    this.style = id;
    this.artistId = getRandom(1, 8);
    this.freelancerId = null;
  }
}

class Flash extends Tattoo {
  constructor(id) {
    super(id);
    this.realImage = this.image;
    this.sellImage = this.image;
    this.amount = getRandom(300, 2500);
    this.significant = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    this.copyright = true;
    this.sell = true;
    this.sizeId = id;
  }
}

let bodyParts = [
  new BodyPart(1, 'Espalda', '/src/assets/images/mock/bodypart1.png'),
  new BodyPart(2, 'Hombros', '/src/assets/images/mock/bodypart2.png'),
  new BodyPart(3, 'Oreja', '/src/assets/images/mock/bodypart3.png'),
  new BodyPart(4, 'Manos', '/src/assets/images/mock/bodypart4.png'),
  new BodyPart(5, 'Pies', '/src/assets/images/mock/bodypart5.png'),
  new BodyPart(6, 'Muñeca', '/src/assets/images/mock/bodypart6.png'),
  new BodyPart(7, 'Pantorrilla', '/src/assets/images/mock/bodypart7.png'),
  new BodyPart(8, 'Rodilla', '/src/assets/images/mock/bodypart8.png'),
  new BodyPart(9, 'Brazos', '/src/assets/images/mock/bodypart9.png'),
  new BodyPart(10, 'Pierna', '/src/assets/images/mock/bodypart10.png'),
  new BodyPart(11, 'Cuello', '/src/assets/images/mock/bodypart11.png'),
  new BodyPart(12, 'Dedos', '/src/assets/images/mock/bodypart12.png'),
  new BodyPart(13, 'Abdomen', '/src/assets/images/mock/bodypart13.png'),
  new BodyPart(14, 'Cachete izquierdo', '/src/assets/images/mock/bodypart14.png'),
  new BodyPart(15, 'Cachete derecho', '/src/assets/images/mock/bodypart15.png'),
  new BodyPart(16, 'Frente', '/src/assets/images/mock/bodypart16.png'),
  new BodyPart(17, 'Espinilla', '/src/assets/images/mock/bodypart17.png'),
  new BodyPart(18, 'Pecho', '/src/assets/images/mock/bodypart18.png'),
  new BodyPart(19, 'Espalda baja', '/src/assets/images/mock/bodypart19.png'),
  new BodyPart(20, 'Espalda superior', '/src/assets/images/mock/bodypart20.png'),
  new BodyPart(21, 'Nuca', '/src/assets/images/mock/bodypart21.png')
];

let groupedBodyParts = {
  front: [
    bodyParts[2],
    bodyParts[3],
    bodyParts[4],
    bodyParts[5],
    bodyParts[7],
    bodyParts[9],
    bodyParts[10],
    bodyParts[11],
    bodyParts[12],
    bodyParts[13],
    bodyParts[14],
    bodyParts[15],
    bodyParts[16],
    bodyParts[17]
  ],
  back: [
    bodyParts[0],
    bodyParts[1],
    bodyParts[6],
    bodyParts[8],
    bodyParts[18],
    bodyParts[19],
    bodyParts[20]
  ]
};

let styles = [
  new Style(1, 'Old School', '/src/assets/images/mock/style14.jpg'),
  new Style(2, 'New School', '/src/assets/images/mock/style15.jpg'),
  new Style(3, 'Dotwork', '/src/assets/images/mock/style10.jpg'),
  new Style(4, 'Geométrico', '/src/assets/images/mock/style9.jpg'),
  new Style(5, 'Trash Polka', '/src/assets/images/mock/style7.jpg'),
  new Style(6, 'Black work', '/src/assets/images/mock/style1.jpg'),
  new Style(7, 'Japones', '/src/assets/images/mock/style13.jpg'),
  new Style(8, 'Tribal', '/src/assets/images/mock/style16.jpg'),
  new Style(9, 'Tipografía', '/src/assets/images/mock/style11.jpg'),
  new Style(10, 'Ilustración', '/src/assets/images/mock/style12.jpg'),
  new Style(11, 'Surreal', '/src/assets/images/mock/style6.jpg'),
  new Style(12, 'Biomecánico', '/src/assets/images/mock/style8.jpg')/*,
  new Style(13, 'Bosquejo', '/src/assets/images/mock/style2.jpg'),
  new Style(14, 'Kawaii', '/src/assets/images/mock/style3.jpg'),
  new Style(15, 'Oriental', '/src/assets/images/mock/style4.jpg'),
  new Style(16, 'Retrato', '/src/assets/images/mock/style5.jpg')*/
];

let elements = [
  new Element(1, 'Mangas'),
  new Element(2, 'Femenino')
];

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

let flashes = [
  new Flash(1),
  new Flash(2),
  new Flash(3),
  new Flash(4),
  new Flash(5),
  new Flash(6),
  new Flash(7),
  new Flash(8)
];

let evaluations = [
  new Evaluation(1),
  new Evaluation(2),
  new Evaluation(3),
  new Evaluation(4)
];

let posts = [
  new Post(1, 1),
  new Post(2, 1),
  new Post(3, 1),
  new Post(4, 1)
];

let artists = [
  new Freelancer(1),
  new Freelancer(2),
  new Studio(3),
  new Studio(4),
  new Freelancer(5),
  new Studio(6),
  new Studio(7),
  new Freelancer(8)
];

let featuredArtists = artists;

let studioArtists = [
  new StudioArtist(1),
  new StudioArtist(2),
  new StudioArtist(3),
  new StudioArtist(4)
]

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

  getGroupedBodyParts() {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(groupedBodyParts);
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
        resolve(artists.length < id ? artists[id] : artists[0]);
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

    // let results = tattoos.filter((obj) => {
    //   if (data.style && data.style !== obj.style_name) {
    //     return false;
    //   }
    //   if (data.element && data.element !== obj.element_name) {
    //     return false;
    //   }
    //   if (data.part && data.part !== obj.body_part_name) {
    //     return false;
    //   }
    //
    //   return true;
    // });

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(tattoos);
        this.isRequesting = false;
      }, latency)
    });
  }

  getFlahes() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(flashes);
        this.isRequesting = false;
      }, latency)
    });
  }

  getArtists() {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(artists);
        this.isRequesting = false;
      }, latency)
    });
  }

  getEvaluations(id) {
    isRequesting = true;
    let results = [];
    results = evaluations.filter(item => {
      return item.id == id;
    });

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(results);
        this.isRequesting = false;
      }, latency)
    });
  }

  getPosts(id) {
    isRequesting = true;
    let results = [];
    results = evaluations.filter(item => {
      return item.id == id;
    });

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(results);
        this.isRequesting = false;
      }, latency)
    });
  }

  getFeaturedArtists = this.getArtists;

  getQuotations(params) {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(quotations);
        this.isRequesting = false;
      }, latency)
    });
  }

  getFavourites = this.getTattoos;
}