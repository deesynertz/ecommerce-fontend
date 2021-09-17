import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {ComfirmComponent} from '../components/comfirm/comfirm.component';
import {productImageUrl} from '../config/api';
import {CategoryModelServer, categoryServerResponse} from '../model/category.mode';
import {ProductsService} from './products.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ScrollStrategy} from '@angular/cdk/overlay/scroll/scroll-strategy';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  capLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  smaLetter = 'abcdefghijklmnopqrstuvwxyz';
  digitChar = '0123456789';

  productEditKey: boolean = false;
  informationData;
  // VARIABLES
  categoriesList: CategoryModelServer[] = [];
  minDate = new Date();

  // Form
  id; pName = ''; price = ''; description = ''; discount = '0'; quantity = '1';

  url_without_name: string;
  imageUrl: string;
  myBaseURI: string;
  localFolder: string;
  images;


  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService,
    private dialog: MatDialog,
    private productService: ProductsService

  ) {
    this.productService.getAllCategory()
      .subscribe((categories: categoryServerResponse) => {
        this.categoriesList = categories.categories;
      });

  }

  // PRODUCTS
  // select products
  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }
  // open dialog
  dialogConfiguration(info?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      info: info
    };
    return dialogConfig;
  }

  stripeDialogConfiguration(info?){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '310px';
    dialogConfig.data = {
      info: info
    };
    return dialogConfig;
  }

  thankYouDialogConfiguration(info?){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    // dialogConfig.height = '310px';
    dialogConfig.data = {
      info: info
    };
    return dialogConfig;

  }

  sendDataToForm(info){
    this.id = info.id? info.id : '';
    this.pName = info.title? info.title : '';
    this.price = info.price? info.price : '';
    this.description = info.description? info.description : '';
    this.discount = info.discount? info.discount : '';
    this.quantity = info.quantity? info.quantity : '';
    console.log(this.pName);
  }

  // Validate form
  productForm: FormGroup = new FormGroup({
    // $key: new FormControl(null),
    productName: new FormControl(this.pName, Validators.required),
    description: new FormControl(`${this.description}`),
    category: new FormControl('', Validators.required),
    lifeTime: new FormControl('', Validators.required),
    quantity: new FormControl(`${this.quantity}`, Validators.required),
    price: new FormControl(`${this.price}`, Validators.required),
    discount: new FormControl(`${this.discount}`)
  });

  // initialize the form
  initializeFormGroup(): any {
    this.productEditKey = false;
    this.productForm.setValue({
      // $key: null,
      productName: '',
      description: '',
      category: '',
      lifeTime: '',
      quantity: '',
      price: '',
      discount: '',
    });
  }

  // clear form
  onClearForm() {
    this.productEditKey = false;
    this.productForm.reset();
    this.initializeFormGroup();
  }

  // select image
  onFileSelect(event): any {
    if (event.target.files.length > 0) {
      this.images = event.target.files[0];
    }

    this.myBaseURI = event.target.baseURI;
    this.localFolder = 'assets/img/products/';
    this.url_without_name = this.reformImageUrl(this.myBaseURI, this.localFolder);
  }

  // publish product
  postProduct(userId: number) {
    if (this.productForm.valid) {

      // if() {
      // for update
      // this.productEditKey = false;
      // (productform.value)

      // } else{
      // for insert new record
      const formData = new FormData();
      formData.append('prodImage', this.images);
      
      this.productService.postImage(formData).subscribe((response: any) => {
        // this.imageUrl = response.fileToUpload;
        this.imageUrl = this.url_without_name + response.fileToUpload;

        this.productService.postProduct(this.productForm.value, this.imageUrl, userId)
          .subscribe((response: any) => {
            if (response.success) {
              this.successToaster(response.message, 'Product');
            } else {
              this.errorToaster(response.message, 'Product');
            }
          });
      });
      // }
    }
  }

  // Up date product
  editProduct() {

  }
  /* =========================== END OF PRODUCT PART ================================= */

  // CART
  // add to cart
  // addToCart(id: number) {
  // this.cartService.addProductToCart(id);
  // }


  // onSearchClear(searchKey) {
  //   searchKey = "";
  //   this.applyFilter(searchKey);
  // }

  // applyFilter(searchKey) {
  //   this.dataSource.filter = searchKey.trim().toLowerCase();

  // }



  openConfirmDialog(msg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.panelClass = 'confirm-dialog-container';
    dialogConfig.height = '170px';
    dialogConfig.position = {
      top: '10px'
    };
    dialogConfig.data = {
      message: msg
    };

    return this.dialog.open(ComfirmComponent, dialogConfig);
  }

  // HANDLE THE FILE IMAGE FILE
  reformImageUrl(myBaseURL: any, locateFolder: string) {
    return myBaseURL + locateFolder;
  }



  // procee image'
  uploadImageToLocalStorage(destination, filename): Observable<any> {
    const location = destination;
    const file = filename;
    return this.http.post<any>(productImageUrl, {location, file});
  }

  // populateForm(employee) {
  //   this.form.setValue(_.omit(employee,'departmentName'));
  // }


  // GENERATE RANDOM
  // generate random number.
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  // generate random string.
  getRandomString(length){
    let randomChar = this.capLetter + this.smaLetter + this.digitChar;
    let result = '';
    for (let i = 0; i < length; i++){
      result = randomChar.charAt(Math.floor(Math.random() * randomChar.length));
    }
    return result;
  }

  // generate random character from any array.
  getRandomCharacter(length){
    // let randomChar = this.capLetter + this.smaLetter + this.digitChar;
    let randomChar = this.digitChar;
    let result = '';
    for (let i = 0; i < length; i++){
      result += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
    }
    return 999+result+'VF';
  }

  // TOASTER
  // success message
  successToaster(ToasterMsg: any, ToasterTitle: any) {
    this.toast.success(`${ToasterMsg}`, `${ToasterTitle}`, {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });
  }

  // info message
  infoToaster(ToasterMsg: any, ToasterTitle: any) {
    this.toast.info(`${ToasterMsg}`, `${ToasterTitle}`, {
      timeOut: 2500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });
  }

  // warning message
  warningToaster(ToasterMsg: any, ToasterTitle: any) {
    this.toast.warning(`${ToasterMsg}`, `${ToasterTitle}`, {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });

  }

  // error message
  errorToaster(ToasterMsg: any, ToasterTitle: any) {
    this.toast.error(`${ToasterMsg}`, `${ToasterTitle}`, {
      timeOut: 2500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });
  }

}
