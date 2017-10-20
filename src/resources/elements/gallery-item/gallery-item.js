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
    let that = this;
    this.intervalId = setInterval(function() {
      if (that.item) {
        if (that.item.image) {
          that.item.image = `http://sandbox.latatuadora.getmore.mx:1337/images/${that.item.image}`;
        } else {
          that.item.image = `http://sandbox.latatuadora.getmore.mx:1337/_assets/Tattoo/images/${that.item.image}`;
        }
        
        if (that.item.freelancer) {
          that.studio = that.item.freelancer;
        }
  
        if (that.item.artist) {
          that.studio = that.item.artist;
        }
      }
      clearInterval(that.intervalId);
    });
  }
}
