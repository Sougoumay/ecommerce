import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AddProductValidator} from "../../validators/add-product-validator";
import {DomSanitizer} from "@angular/platform-browser";
import {FileHandle} from "../../modeles/images/file-handle";
import {Product} from "../../modeles/product/product";
import {ProductService} from "../../services/product/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductCategory} from "../../modeles/product/category/product-category";
import {ProductDto} from "../../interfaces/product-dto";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{


  addProductGroupForm !: FormGroup;
  imagePreview !: string | ArrayBuffer | null;
  image !: FileHandle;

  categories : ProductCategory[] = [];

  constructor(private formBuilder : FormBuilder, private router : Router,
              private sanitizer : DomSanitizer, private productService : ProductService) {
  }

  ngOnInit(): void {
    this.addProductGroupForm = this.formBuilder.group({
      name : new FormControl('',[Validators.required, AddProductValidator.notOnlyWhiteSpace]),
      description : new FormControl('',[Validators.required, AddProductValidator.notOnlyWhiteSpace]),
      unitPrice : new FormControl('',[Validators.required]),
      unitInStock : new FormControl('',[Validators.required]),
      image : new FormControl('', [Validators.required]),
      category : new FormControl('', [Validators.required])
    });

    this.productService.getProductCategories().subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }

  get name() {return this.addProductGroupForm.get("name")}
  get description() {return this.addProductGroupForm.get("description")}
  get unitPrice() {return this.addProductGroupForm.get("unitPrice")}
  get unitInStock() {return this.addProductGroupForm.get("unitInStock")}

  get getImageValue() {return this.addProductGroupForm.get("image")?.value}

  get category() {return this.addProductGroupForm.get("category")?.value}


  onSubmit() {
    if (this.addProductGroupForm.invalid) {
      this.addProductGroupForm.markAllAsTouched();
    } else {

    }

    const name = this.addProductGroupForm.get("name")?.value;
    const description = this.addProductGroupForm.get("description")?.value;
    const unitPrice = this.addProductGroupForm.get("unitPrice")?.value;
    const unitInStock = this.addProductGroupForm.get("unitInStock")?.value;
    const file = this.addProductGroupForm.get('image')?.value;
    const category = this.addProductGroupForm.get('category')?.value;

    console.log(`name ${name}`)
    console.log(`description ${description}`)
    console.log(`unitPrice ${unitPrice}`)
    console.log(`unitInStock ${unitInStock}`)
    console.log(`file ${file}`)
    console.log(`file ${JSON.stringify(category)}`)

    const product : ProductDto = {
      name : name,
      description : description,
      unitPrice : unitPrice,
      unitsInStock : unitInStock,
      category : {
        id : category.id,
        categoryName : category.categoryName
      },
      active : true
    };

    console.log(JSON.stringify(product));
    const productFormData : FormData = this.prepareFormData(product);
    this.addProduct(productFormData);
  }

  prepareFormData(product : ProductDto) {
    const formData : FormData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)],{type:'application/json'}));
    formData.append('imageFile',this.image.file,this.image.file.name);

    return formData;
  }

  addProduct(productFormData : FormData) {
    this.productService.addProduct(productFormData).subscribe(
      (response:Product) => {
        console.log(response);
        this.addProductGroupForm.reset();
      },
      (error : HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  onFileSelected(event : any) {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);

        this.uploadFile(file);

      }
    }
  }

  uploadFile(file : any) {
    this.image = {
      file : file,
      url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
    };
  }

}
