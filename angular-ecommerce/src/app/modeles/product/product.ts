import {Image} from "../images/image";

export class Product {

  constructor(
    public id : number | null,
    public name : string,
    public description : string,
    public unitPrice : number,
    public imageUrl : string | null,
    public active : boolean,
    public unitsInStock : number,
    public dateCreated : Date | null,
    public dateUpdated : Date | null,
    public image : Image
  ) {
  }
}
