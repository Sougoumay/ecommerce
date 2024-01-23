import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopFormService} from "../../services/shop/shop-form.service";
import {ShopFormValidators} from "../../validators/shop-form-validators";
import {Customer} from "../../modeles/customer/customer";
import {CustomerService} from "../../services/customer/customer.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{

  customerFormGroup!: FormGroup;
  protected errorMessage : string = "";

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    private customerService : CustomerService,
    private authService : AuthService
  ) {
  }

    ngOnInit(): void {
        this.customerFormGroup = this.formBuilder.group({
          firstName : new FormControl('',[Validators.required, Validators.minLength(2),  ShopFormValidators.notOnlyWhiteSpace]),
          lastName : new FormControl('',[Validators.required, Validators.minLength(2), ShopFormValidators.notOnlyWhiteSpace]),
          email : new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9-A-Z0-9._\\-+]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), ShopFormValidators.notOnlyWhiteSpace]),
          password : new FormControl('',[Validators.required, Validators.minLength(8), ShopFormValidators.notOnlyWhiteSpace]),
        })
    }

  get firstName() {
    return this.customerFormGroup.get("firstName");
  }

  get lastName() {
    return this.customerFormGroup.get("lastName");
  }

  get email() {
    return this.customerFormGroup.get("email");
  }

  get password() {
    return this.customerFormGroup.get("password");
  }

  onSubmit() {

    if (this.customerFormGroup.invalid) {
      this.customerFormGroup.markAllAsTouched();
    }

    console.log("*************************")
    console.log(this.customerFormGroup.value)

    const firstName = this.customerFormGroup.value.firstName;
    const lastName = this.customerFormGroup.value.lastName;
    const email = this.customerFormGroup.value.email;
    const password = this.customerFormGroup.value.password;
    console.log("password " + password)
    const customer : Customer = new Customer(firstName,lastName,email,password);

    console.log("*************************")
    console.log(JSON.stringify(customer))

    this.customerService.register(customer).subscribe({
      next : response => {
        this.authService.loadProfile(response);
        this.router.navigateByUrl("/products");
      },
      error : err => {
        this.errorMessage = "Your inscription is failed, please repeat!"
        console.log(err.message)
      }
    })

  }

}
