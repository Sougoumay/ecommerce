import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShopFormService} from "../../services/shop-form.service";
import {Country} from "../../modeles/country/country";
import {State} from "../../modeles/state/state";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  totalPrice : number = 0.00;
  totalQuantity : number = 0;

  // address
  countries : Country[] = [];
  shippingAddressStates : State[] = [];
  billingAddressStates : State[] = [];

  // creditCardMonths : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  creditCardMonths : number[] = [];
  creditCardYears : number[] = [];

  checkOutFormGroup!: FormGroup;
  constructor(private formBuilder : FormBuilder, private shopFormService : ShopFormService) {
  }

  ngOnInit(): void {
    this.checkOutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : [''],
        lastName : [''],
        email : ['']
      }),
      shippingAddress : this.formBuilder.group({
        street : [''],
        state : [''],
        city : [''],
        country : [''],
        zipCode : [''],
      }),
      billingAddress : this.formBuilder.group({
        street : [''],
        state : [''],
        city : [''],
        country : [''],
        zipCode : [''],
      }),
      creditCard : this.formBuilder.group({
        cardType : [''],
        nameOnCard : [''],
        cardNumber : [''],
        securityCode : [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
      billingAddressSameShippingAddress : false
    });

    const startMonth : number = new Date().getMonth() + 1;
    // populate credit card month
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    // populate credit card year
    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

    // populate countries for shipping and billing address
    this.shopFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );

    // populate states for shipping and billing address


  }

  onSubmit() {
    console.log("customer email is " + this.checkOutFormGroup.get("customer")?.value.email)
    console.log("customer first name is " + this.checkOutFormGroup.get("customer")?.value.firstName)
    console.log("customer last name is " + this.checkOutFormGroup.get("customer")?.value.lastName)
    console.log("customer shipping address country name is " + this.checkOutFormGroup.get("shippingAddress")?.value.country.name)
    console.log("customer shipping address state name is " + this.checkOutFormGroup.get("shippingAddress")?.value.state!.name)
  }


  copyShippingAddressToBillingAddress() {
    if (this.checkOutFormGroup.get('billingAddressSameShippingAddress')?.value === true) {
      this.checkOutFormGroup.controls['billingAddress'].setValue(
        this.checkOutFormGroup.controls['shippingAddress'].value
      );
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkOutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = []
    }

  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkOutFormGroup.get("creditCard");

    const  currentYear : number = new Date().getFullYear();
    const selectedYear : number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with the current month
    let startMonth : number;
    if(currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    // populate credit card month
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

  }

  getStates(formGroupName: string) {
    const formGroup = this.checkOutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code : ${countryCode}`)
    console.log(`${formGroupName} country name : ${countryName}`)

    this.shopFormService.getStatesByCountryCode(countryCode).subscribe(
      data => {
        if (formGroupName === "shippingAddress") {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup?.get('state')?.setValue(data[0])
      }
    )
  }
}
