import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopFormService} from "../../services/shop-form.service";
import {Country} from "../../modeles/country/country";
import {State} from "../../modeles/state/state";
import {ShopFormValidators} from "../../validators/shop-form-validators";
import {CartService} from "../../services/cart.service";

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
  constructor(private formBuilder : FormBuilder,
              private shopFormService : ShopFormService,
              private cartService : CartService) {
  }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkOutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : new FormControl('',[Validators.required, Validators.minLength(2),  ShopFormValidators.notOnlyWhiteSpace]),
        lastName : new FormControl('',[Validators.required, Validators.minLength(2), ShopFormValidators.notOnlyWhiteSpace]),
        email : new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9-A-Z0-9._\\-+]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), ShopFormValidators.notOnlyWhiteSpace])
      }),
      shippingAddress : this.formBuilder.group({
        street : new FormControl('',[Validators.required, ShopFormValidators.notOnlyWhiteSpace]),
        state : new FormControl('',[Validators.required]),
        city : new FormControl('',[Validators.required, ShopFormValidators.notOnlyWhiteSpace]),
        country : new FormControl('',[Validators.required]),
        zipCode : new FormControl('',[Validators.required, ShopFormValidators.notOnlyWhiteSpace]),
      }),
      billingAddress : this.formBuilder.group({
        street : new FormControl('',[Validators.required, ShopFormValidators.notOnlyWhiteSpace]),
        state : new FormControl('',[Validators.required]),
        city : new FormControl('',[Validators.required, ShopFormValidators.notOnlyWhiteSpace]),
        country : new FormControl('',[Validators.required]),
        zipCode : new FormControl('',[Validators.required, ShopFormValidators.notOnlyWhiteSpace]),
      }),
      creditCard : this.formBuilder.group({
        cardType : new FormControl('',[Validators.required]),
        nameOnCard : new FormControl('',[Validators.required,Validators.minLength(2),  ShopFormValidators.notOnlyWhiteSpace]),
        cardNumber : new FormControl('',[Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode : new FormControl('',[Validators.required, Validators.pattern('[0-9]{3,4}')]),
        expirationMonth:[''],
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

  get firstName() {
    return this.checkOutFormGroup.get("customer.firstName");
  }

  get lastName() {
    return this.checkOutFormGroup.get("customer.lastName");
  }

  get email() {
    return this.checkOutFormGroup.get("customer.email");
  }

  get shippingAddressStreet() {
    return this.checkOutFormGroup.get("shippingAddress.street");
  }

  get shippingAddressCity() {
    return this.checkOutFormGroup.get("shippingAddress.city");
  }

  get shippingAddressCountry() {
    return this.checkOutFormGroup.get("shippingAddress.country");
  }

  get getShippingAddressState() {
    return this.checkOutFormGroup.get("shippingAddress.state");
  }

  get shippingAddressZipCode() {
    return this.checkOutFormGroup.get("shippingAddress.zipCode");
  }

  get billingAddressStreet() {
    return this.checkOutFormGroup.get("billingAddress.street");
  }

  get billingAddressCity() {
    return this.checkOutFormGroup.get("billingAddress.city");
  }

  get billingAddressCountry() {
    return this.checkOutFormGroup.get("billingAddress.country");
  }

  get getBillingAddressState() {
    return this.checkOutFormGroup.get("billingAddress.state");
  }

  get billingAddressZipCode() {
    return this.checkOutFormGroup.get("billingAddress.zipCode");
  }

  get creditCardType() {
    return this.checkOutFormGroup.get("creditCard.cardType");
  }

  get creditCardNameOnCard() {
    return this.checkOutFormGroup.get("creditCard.nameOnCard");
  }

  get creditCardNumber() {
    return this.checkOutFormGroup.get("creditCard.cardNumber");
  }

  get creditCardSecurityCode() {
    return this.checkOutFormGroup.get("creditCard.securityCode");
  }

  onSubmit() {

    if (this.checkOutFormGroup.invalid) {
      this.checkOutFormGroup.markAllAsTouched();
    }

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

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
}
