import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/iUser';
import { IProduct } from 'src/app/model/iproduct';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  public product!: IProduct;
  public res: any;

  form = new FormGroup({
    title: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    newCategory: new FormControl('',Validators.required),
    newCategoryGender: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
    weight: new FormControl('',Validators.required),
    color: new FormControl('',Validators.required),
    size: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    image: new FormControl('',Validators.required),
  })
  public categories: any;
  public selectedCategoryGender: any;
  selectedFile: File | null = null;
  productImageUrl: any;

  constructor(private router: ActivatedRoute, private apiService: ApiService, private authService: AuthService, private toastr: ToastrService) { }

  async ngOnInit() {
    const productId = this.router.snapshot.paramMap.get("productId");
    await this.getProduct(productId);
    this.productImageUrl = this.product.image;
    this.getCategories();
  }

  async getProduct(id: any){
    this.product = await this.apiService.getProductById(id) as IProduct;
  }
  


 
  // add images 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.productImageUrl = e.target.result;
    };
    if(this.selectedFile){
      reader.readAsDataURL(this.selectedFile);
    }
    console.log("this part done");
    
    
  }


  async send(){
    if (this.selectedFile) {
      try{
            this.res = await this.apiService.uploadProductImage(this.selectedFile);
        }catch(error){
        console.log(error);
        this.toastr.error('Error uploading the photo');
      }
  }

}
async getCategories(){
  this.categories = await this.apiService.getCategories();
  this.categories.sort();
}


async submit(){
  console.log("submit works");
  
  if(this.selectedFile){
    await this.send();
    this.productImageUrl = this.res.data.url;
  }
  this.form.get('image')?.setValue(this.productImageUrl);
  if(this.form.get('category')?.value === 'new'){
    let category : Category;
    category = await this.authService.createCategory(this.form.get('newCategory')?.value, this.form.get('newCategoryGender')?.value) as Category;
    this.form.get('category')?.setValue(String(category.id));
  }
    const product = {
    id: this.product.id,
    title: String(this.form.get('title')?.value),
    category: {id: String(this.form.get('category')?.value)},
    price: String(this.form.get('price')?.value),
    quantity: String(this.form.get('quantity')?.value),
    weight: String(this.form.get('weight')?.value),
    color: String(this.form.get('color')?.value),
    size: String(this.form.get('size')?.value),
    description: String(this.form.get('description')?.value),
    image: String(this.form.get('image')?.value),
    }
    let res = this.authService.editProduct(product);
    console.log('Form submitted with data:', product, res);
}

}
