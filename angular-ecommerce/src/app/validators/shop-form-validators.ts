import {FormControl, ValidationErrors} from "@angular/forms";

export class ShopFormValidators {

  // whitespace validation
  static notOnlyWhiteSpace(control : FormControl) : ValidationErrors | null {

    // check if string only contains whitespace
    if(control.value != null && control.value.trim().length===0) {
      // invalid, return object error
      return {'notOnlyWhiteSpace' : true};
    }

    return null;
  }
}
