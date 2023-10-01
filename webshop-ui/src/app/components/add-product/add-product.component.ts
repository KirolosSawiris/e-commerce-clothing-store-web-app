
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/model/iproduct';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  @Output() galleryupdate = new EventEmitter();

  public product!: IProduct;
  public res: any;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  selectedFile: File | null = null;
 
  // add images 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; 
  }

  //send all images from dropzone container
  async send(){
    if (this.selectedFile) {
      let reader = new FileReader();
      try{
            this.res = await this.apiService.uploadProductImage(this.selectedFile);
        }catch(error){
        console.log(error);
        this.toastr.error('Error uploading the photo');
      }
      console.log(this.res.data.url);
      
      
  }

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
