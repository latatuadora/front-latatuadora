import {bindable} from 'aurelia-framework';
import {Controller} from 'controller/controller'

export class GalleryItem extends Controller{
  @bindable item;
  artistItem
  @bindable type = 'tattoo';
  @bindable vote;
  @bindable open;
  @bindable originalSize = true;

  bind() {

    this.artist.artist(this.item.artist || this.item.freelancer)
      .then(artist => {
        this.artistItem = artist
        this.getAddress()
      });

  

  }

  getAddress() {

    const type = this.item.artist
              ? 'STUDIO'
              : 'FREELANCE'

     this.address.get(type, {id: this.item.artist || this.item.freelancer })
      .then(address => {
        this.addressItem = address;
      })



  }


}
