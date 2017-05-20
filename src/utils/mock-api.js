let latency = 200;

let featuredArtists = [
  {
    name: 'Mock Artist 1',
    rating: 3.5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist1.png'
  },
  {
    name: 'Mock Artist 2',
    rating: 4.5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    imageURL: '/src/assets/images/mock/artist2.png'
  },
  {
    name: 'Mock Artist 3',
    rating: 5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist3.png'
  },
  {
    name: 'Mock Artist 4',
    rating: 4,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    imageURL: '/src/assets/images/mock/artist4.png'
  },
  {
    name: 'Mock Artist 5',
    rating: 4.5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist5.png'
  },
  {
    name: 'Mock Artist 6',
    rating: 3.5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist6.png'
  },
  {
    name: 'Mock Artist 7',
    rating: 5,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    imageURL: '/src/assets/images/mock/artist7.png'
  },
  {
    name: 'Mock Artist 8',
    rating: 3.9,
    location: 'Roma, Ciudad de México',
    tags: ['Tag1', 'Tag2'],
    imageURL: '/src/assets/images/mock/artist8.png'
  }
];

export class MockAPI {
  isRequesting = false;

  getFeaturedArtists() {
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(featuredArtists);
        this.isRequesting = false;
      })
    }, latency);
  }
}