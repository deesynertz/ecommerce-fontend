import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryModelServer, categoryServerResponse } from 'src/app/model/category.mode';
import { ProductsService } from 'src/app/services/products.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  value: boolean = false;
  categoriesList: CategoryModelServer[] = [];
  minDate = new Date();

  
  fileName: string = '';
  url_without_name = '';
  // imageUrl: string = '';
  mybaseURI:string = '';
  localFolder: string = '';
  imageUrl: any;


  productform: FormGroup = new FormGroup({
    // $key: new FormControl(null),
    productName: new FormControl('test one', Validators.required),
    description: new FormControl('none'),
    // prodImage: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    lifeTime: new FormControl('', Validators.required),
    quantity: new FormControl('1', Validators.required),
    price: new FormControl('200', Validators.required),
    discount: new FormControl('10')
  });

  initializeFormGroup() {
    this.productform.setValue({
      // $key: null,
      productName: 'test one',
      description: 'none',
      prodImage: '',
      category: '',
      lifeTime: '',
      quantity: '10',
      price: '70',
      discount: '',
    });
  }

  constructor(
    private sharedService: SharedService,
    private productService: ProductsService,
    public dialogRef: MatDialogRef<AddProductComponent>
  ) { }

  ngOnInit(): void {
    this.productService.getAllCategory()
      .subscribe((categories: categoryServerResponse) => {
        this.categoriesList = categories.categories;
      });
  }

  onFileSelected(event) {
    this.imageUrl = event;
    //this.imageUrl =  + 'assets/img/products/' + event.target.files[0].name;
    // this.mybaseURI = event.target.baseURI;
    // this.localFolder = 'assets/img/products/';
    // this.fileName = event.target.files[0].name;
    // this.url_without_name = this.sharedService.reformImageUrl(this.mybaseURI, this.localFolder);
    // this.imageUrl = this.url_without_name + this.fileName;


  }

  onClose(): any {
    this.dialogRef.close();
  }

  onClear() {
    this.productform.reset();
    this.initializeFormGroup();
    // this.notificationService.success(':: Submitted successfully');
  }

  postProduct(): any {
    if (this.productform.valid) {

      // if() { 
        //for update
            //(productform.value)


      //} else{ 
        //for insert new record
      
      // console.log(this.productform.value);
      console.log(this.imageUrl);


      // this.productService.postProduct(this.productform.value, formData)
      // .subscribe((response: any) => {
      //   if (response.success) {

      //     // TODO: send file name
      //     this.fileName;
      //     const location = '../frontend/src/assets/img/products/';
      //     this.sharedService.uploadImageToLocalStorage(this.fileName, location);
      //     this.sharedService.successToaster(response.message, 'Product');
          
      //   } else {
          
      //     this.sharedService.errorToaster(response.message, 'Product');
          
      //   }
      // });
      // this.productform.reset();
      // this.initializeFormGroup();
      // notification
      // this.onClose();
      // }
    }
  }

}
