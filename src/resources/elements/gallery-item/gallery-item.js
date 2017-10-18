import {bindable} from 'aurelia-framework';
import {Controller} from 'controller/controller'
import {Address} from "../../../controller/address";
import {inject} from 'aurelia-framework';
@inject(Address)

export class GalleryItem extends Controller{
  @bindable item;
  @bindable artistItem;
  @bindable type = 'tattoo';
  @bindable vote;
  @bindable open;
  @bindable originalSize = true;

  constructor(address) {
    super();
    this.address = address;
  }

  bind() {
    this.item.image = `http://sandbox.latatuadora.getmore.mx:1337/images/${this.item.image}`
    this.getAddress();
    //this.item.artist(this.item.artist || this.item.freelancer)
    //  .then(artist => {
    //    this.artistItem = artist
    //    this.getAddress();
    //  });
  }

  getAddress() {
    const type = this.item.artist
              ? 'STUDIO'
              : 'FREELANCE';
    let user = (this.item.artist || this.item.freelancer);
     this.address.get(type, {id: user.id })
      .then(address => {
        this.addressItem = address;
      });
  }


}
