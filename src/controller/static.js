export class Static {

  constructor(literal) {
    return {
      'HOMEPAGE::FEATURED': this.__featured()
    }[literal]
  }

  __featured() {
    return [
      {
        rating: 5,
        name: 'Estudio 184',
        location: 'Ciudad de México',
        titleImgUrl: 'src/assets/images/backgrounds/featured-1.png',
      },
      {
        rating: 5,
        name: 'Icarus',
        location: 'Ciudad de México',
        titleImgUrl: 'src/assets/images/backgrounds/featured-2.png',
      },
      {
        rating: 5,
        name: 'Jolly Rogers',
        location: 'Ciudad de México',
        titleImgUrl: 'src/assets/images/backgrounds/featured-3.jpg',
      },
      {
        rating: 5,
        name: 'Mekandaxu',
        location: 'Ciudad de México',
        titleImgUrl: 'src/assets/images/backgrounds/featured-4.png',
      },

      {
        rating: 5,
        name: 'Mendoza',
        location: 'Ciudad de México',
        titleImgUrl: 'src/assets/images/backgrounds/featured-5.png',
      },
      {
        rating: 5,
        name: 'Silver nedles',
        location: 'Ciudad de México',
        titleImgUrl: 'src/assets/images/backgrounds/featured-6.png',
      },
      {
        rating: 5,
        name: 'Tatudemia Custom',
        location: 'Ciudad de México',
        titleImgUrl: 'src/assets/images/backgrounds/featured-7.png',
      },
      {
        rating: 5,
        name: 'Tatuluis',
        location: 'Ciudad de México',
        titleImgUrl: 'src/assets/images/backgrounds/featured-8.png',
      }
    ]
  }


}
