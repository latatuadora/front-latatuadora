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
    }
  ]
}

let tattoos = [
  {
    votes: 0,
    tags: ['tag1', 'tag2'],
    artist_name: 'Enrique Lopez',
    artist_picture: '/src/assets/images/mock/artist1.png',
    artist_rating: 4.5,
    artist_url: '#',
    artist_location: 'Col. Roma',
    description: 'Description',
    tattoo_url: '#',
    price: '300',
    currency: 'mxn',
    dimensions: {
      length: '12 cm',
      width: '12 cm'
    },
    slug: 'ab4Yc1',
    element_name: 'Brazo Robot',
    body_part_name: 'Oreja',
    style_name: 'Dark',
    image: '/src/assets/images/mock/tattoo1.png'
  },
  {
    votes: 0,
    tags: ['tag1', 'tag2'],
    artist_name: 'Enrique Lopez',
    artist_picture: '/src/assets/images/mock/artist1.png',
    artist_rating: 4.5,
    artist_url: '#',
    artist_location: 'Col. Roma',
    description: 'Description',
    tattoo_url: '#',
    price: '300',
    currency: 'mxn',
    dimensions: {
      length: '12 cm',
      width: '12 cm'
    },
    slug: 'ab4Yc1',
    element_name: 'Brazo Robot',
    body_part_name: 'Pierna',
    style_name: 'Dark',
    image: '/src/assets/images/mock/tattoo2.png'
  },
  {
    votes: 0,
    tags: ['tag1', 'tag2'],
    artist_name: 'Enrique Lopez',
    artist_picture: '/src/assets/images/mock/artist1.png',
    artist_rating: 4.5,
    artist_url: '#',
    artist_location: 'Col. Roma',
    description: 'Description',
    tattoo_url: '#',
    price: '300',
    currency: 'mxn',
    dimensions: {
      length: '12 cm',
      width: '12 cm'
    },
    slug: 'ab4Yc1',
    element_name: 'Brazo Robot',
    body_part_name: 'Oreja',
    style_name: 'Dark',
    image: '/src/assets/images/mock/tattoo3.png'
  },
  {
    votes: 0,
    tags: ['tag1', 'tag2'],
    artist_name: 'Enrique Lopez',
    artist_picture: '/src/assets/images/mock/artist1.png',
    artist_rating: 4.5,
    artist_url: '#',
    artist_location: 'Col. Roma',
    description: 'Description',
    tattoo_url: '#',
    price: '300',
    currency: 'mxn',
    dimensions: {
      length: '12 cm',
      width: '12 cm'
    },
    slug: 'ab4Yc1',
    element_name: 'Brazo Robot',
    body_part_name: 'Oreja',
    style_name: 'Dark',
    image: '/src/assets/images/mock/tattoo4.png'
  },
  {
    votes: 0,
    tags: ['tag1', 'tag2'],
    artist_name: 'Enrique Lopez',
    artist_picture: '/src/assets/images/mock/artist1.png',
    artist_rating: 4.5,
    artist_url: '#',
    artist_location: 'Col. Roma',
    description: 'Description',
    tattoo_url: '#',
    price: '300',
    currency: 'mxn',
    dimensions: {
      length: '12 cm',
      width: '12 cm'
    },
    slug: 'ab4Yc1',
    element_name: 'Brazo Robot',
    body_part_name: 'Oreja',
    style_name: 'Religioso',
    image: '/src/assets/images/mock/tattoo5.png'
  },
  {
    votes: 0,
    tags: ['tag1', 'tag2'],
    artist_name: 'Enrique Lopez',
    artist_picture: '/src/assets/images/mock/artist1.png',
    artist_rating: 4.5,
    artist_url: '#',
    artist_location: 'Col. Roma',
    description: 'Description',
    tattoo_url: '#',
    price: '300',
    currency: 'mxn',
    dimensions: {
      length: '12 cm',
      width: '12 cm'
    },
    slug: 'ab4Yc1',
    element_name: 'Brazo Robot',
    body_part_name: 'Oreja',
    style_name: 'Religioso',
    image: '/src/assets/images/mock/tattoo6.png'
  }
]

let featuredArtists = [
  {
    name: 'Mock Artist 1',
    rating: 3.5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist1.png',
    profileURL: '#',
    id: 1,
    logo: '/src/assets/images/mock/studioname.png'
  },
  {
    name: 'Mock Artist 2',
    rating: 4.5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    imageURL: '/src/assets/images/mock/artist2.png',
    profileURL: '#',
    id: 2,
    logo: '/src/assets/images/mock/studioname.png'
  },
  {
    name: 'Mock Artist 3',
    rating: 5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist3.png',
    profileURL: '#',
    id: 3,
    logo: '/src/assets/images/mock/studioname.png'
  },
  {
    name: 'Mock Artist 4',
    rating: 4,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    imageURL: '/src/assets/images/mock/artist4.png',
    profileURL: '#',
    id: 4,
    logo: '/src/assets/images/mock/studioname.png'
  },
  {
    name: 'Mock Artist 5',
    rating: 4.5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist5.png',
    profileURL: '#',
    id: 5,
    logo: '/src/assets/images/mock/studioname.png'
  },
  {
    name: 'Mock Artist 6',
    rating: 3.5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist6.png',
    profileURL: '#',
    id: 6,
    logo: '/src/assets/images/mock/studioname.png'
  },
  {
    name: 'Mock Artist 7',
    rating: 5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    imageURL: '/src/assets/images/mock/artist7.png',
    profileURL: '#',
    id: 7,
    logo: '/src/assets/images/mock/studioname.png'
  },
  {
    name: 'Mock Artist 8',
    rating: 3.9,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist8.png',
    profileURL: '#',
    id: 8,
    logo: '/src/assets/images/mock/studioname.png'
  }
];

let styles = [
  {
    name: 'Shurado',
    id: 0,
    image: '/src/assets/images/mock/tattoo4.png'
  },
  {
    name: 'Old School',
    id: 1,
    image: '/src/assets/images/mock/tattoo2.png'
  },
  {
    name: 'Lienal',
    id: 2,
    image: '/src/assets/images/mock/tattoo3.png'
  },
  {
    name: 'New School',
    id: 3,
    image: '/src/assets/images/mock/tattoo1.png'
  },
  {
    name: 'Punk',
    id: 4,
    image: '/src/assets/images/mock/tattoo5.png'
  },
  {
    name: 'Religioso',
    id: 5,
    image: '/src/assets/images/mock/tattoo6.png'
  }
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

export class MockAPI {
  isRequesting = false;

  postQuotationRequest(request) {
    this.isRequesting = true;
    let min = Math.floor(Math.random() * (9000 - 300)) + 300;
    let max = Math.floor(Math.random() * (9999 - min)) + min;

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

  getFeaturedArtists(type = 'featured') {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(featuredArtists);
        this.isRequesting = false;
      }, latency)
    });
  }
}