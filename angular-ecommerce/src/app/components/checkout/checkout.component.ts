import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopFormService} from "../../services/shop-form.service";
import {Country} from "../../modeles/country/country";
import {State} from "../../modeles/state/state";
import {ShopFormValidators} from "../../validators/shop-form-validators";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout/checkout.service";
import {Router} from "@angular/router";
import {Order} from "../../modeles/order/order";
import {CartItem} from "../../modeles/cart/cart-item";
import {OrderItem} from "../../modeles/order/item/order-item";
import {Purchase} from "../../modeles/purchase/purchase";
import {Address} from "../../modeles/address/address";
import {Customer} from "../../modeles/customer/customer";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  // cart status
  totalPrice : number = 0.00;
  totalQuantity : number = 0;

  // address
  countries : Country[] = [];
  shippingAddressStates : State[] = [];
  billingAddressStates : State[] = [];

  // credit card
  creditCardMonths : number[] = [];
  creditCardYears : number[] = [];

  checkOutFormGroup!: FormGroup;
  constructor(private formBuilder : FormBuilder,
              private shopFormService : ShopFormService,
              private cartService : CartService,
              private checkoutService : CheckoutService,
              private router : Router
              ) {
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

    // set up order
    let order : Order = new Order(this.totalQuantity, this.totalPrice);

    // get card items
    const  cartItems : CartItem[] = this.cartService.cartItems;

    // create orderItems for cartItems
    // let orderItems : OrderItem[] = [];
    // for(let i = 0; i < cartItems.length; i++) {
    //   orderItems[i] = new OrderItem(cartItems[i])
    // }
    let orderItems : OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // get customer to populate purchase
    const customerFormGroup = this.checkOutFormGroup.get('customer');
    const firstName = customerFormGroup?.value.firstName;
    const lastName = customerFormGroup?.value.lastName;
    const email = customerFormGroup?.value.email;
    const customer : Customer = new Customer(firstName,lastName,email);

    // get shipping address to populate purchase
    const shippingAddressStreet = this.checkOutFormGroup.get('shippingAddress')?.value.street;
    const shippingAddressCity = this.checkOutFormGroup.get('shippingAddress')?.value.city;
    const shippingAddressCountry = this.checkOutFormGroup.get('shippingAddress')?.value.country.name;
    const shippingAddressState = this.checkOutFormGroup.get('shippingAddress')?.value.state.name;
    const shippingAddressZipCode = this.checkOutFormGroup.get('shippingAddress')?.value.zipCode;
    const shippingAddress : Address = new Address(shippingAddressStreet,shippingAddressCity,shippingAddressState,shippingAddressCountry,shippingAddressZipCode);

    // get billing address to populate purchase
    const billingAddressStreet = this.checkOutFormGroup.get('billingAddress')?.value.street;
    const billingAddressCity = this.checkOutFormGroup.get('billingAddress')?.value.city;
    const billingAddressCountry = this.checkOutFormGroup.get('billingAddress')?.value.country.name;
    const billingAddressState = this.checkOutFormGroup.get('billingAddress')?.value.state.name;
    const billingAddressZipCode = this.checkOutFormGroup.get('billingAddress')?.value.zipCode;
    const billingAddress : Address = new Address(billingAddressStreet,billingAddressCity,billingAddressState,billingAddressCountry,billingAddressZipCode);

    // get customer to populate purchase
    const cardType = this.checkOutFormGroup.get('creditCard')?.value.cardType;
    const nameOnCard = this.checkOutFormGroup.get('creditCard')?.value.nameOnCard;
    const cardNumber = this.checkOutFormGroup.get('creditCard')?.value.cardNumber;
    const securityCode = this.checkOutFormGroup.get('creditCard')?.value.securityCode;
    const expirationMonth = this.checkOutFormGroup.get('creditCard')?.value.expirationMonth;
    const expirationYear = this.checkOutFormGroup.get('creditCard')?.value.expirationYear;

    // set up purchase
    let purchase : Purchase = new Purchase(customer,shippingAddress,billingAddress,order,orderItems);

    // call REST API via CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
      next : response => {
        alert(`Your order has benn received.\nOrder tracking number : ${response.orderTrackingNumber}`);

        // reset cart
        this.resetCart();
      },
      error : err => {
        alert(`There was an error : ${err.message}`);
      }
    });

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

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkOutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }
}
