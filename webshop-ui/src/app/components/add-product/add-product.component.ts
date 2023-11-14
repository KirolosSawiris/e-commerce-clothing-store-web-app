
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/model/iproduct';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/model/iUser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

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

  constructor(private apiService: ApiService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCategories();
  }

  selectedFile: File | null = null;
  productImageUrl: any = "https://i.ibb.co/7rc76z9/360-F-434728286-OWQQv-AFo-XZLd-GHl-Obozsol-Neu-Sxhpr84.jpg";
 
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

  //send all images from dropzone container
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
  console.log(this.categories);
  
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
    let res = this.authService.createProduct(product);
    console.log('Form submitted with data:', product, res);
}
}












































// constructor(private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.getToken();
  // }


  // getToken() {
  //   const clientId = 'fa59271e1025a35';
  //   const clientSecret = 'af71d45a35cb05d5522033c98546509af355e846';
  //   var refreshToken = '124a5b67d8cdee2cbb6c7f91b7e653f5bdeeabbe';
  //   var accessToken = '';

  //   const formData = new FormData();
  //   formData.append('refresh_token', refreshToken);
  //   formData.append('client_id', clientId);
  //   formData.append('client_secret', clientSecret);
  //   formData.append('grant_type', 'refresh_token');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
  //   });

  //   this.http.post('https://api.imgur.com/oauth2/token', formData, {headers}).subscribe(
  //     (response) => {
  //       console.log(response);
        
  //     },
  //     (error) => {

  //     }
  //   );

  // }
