import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ComfirmComponent } from '../components/comfirm/comfirm.component';
import { productImageUrl } from '../config/api';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  // VARIABLES
  fileArray: [{
    destination: string,
    fileName: string
  }]


  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

  // PRODUCTS
  // select products
  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  
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

  
  
  // openConfirmDialog(msg){
  //   return this.dialog.open(ComfirmComponent,{
  //      width: '390px',
  //      panelClass: 'confirm-dialog-container',
  //      disableClose: true,
  //      position: { top: "10px" },
  //      data :{
  //        message : msg
  //      }
  //    });
  //  }

  openConfirmDialog(msg) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.panelClass = "confirm-dialog-container";
    dialogConfig.height = '170px';
    dialogConfig.position = {
      top: '10px'
    };
    dialogConfig.data = {
      message: msg
    }

    return this.dialog.open(ComfirmComponent, dialogConfig);
  }
  
  // HANDLE THE FILE IMAGE FILE
  reformImageUrl(mybaseURI:any, locatFolder:string, fileName?:string) {
    let image_url = '';
    return image_url =  mybaseURI + locatFolder
  }


  // AUTH
  // logout
  logout() {
    const ToasterMsg = 'You loged out';
    const ToasterTitle = "LOGOUT";
    this.infoToaster(ToasterMsg, ToasterTitle);
  }

  // procee image'
  uploadImageToLocalStorage(destination, filename): Observable<any> {
    const location = destination;
    const file = filename;
    return this.http.post<any>(productImageUrl, {location,file});
  }


  // TOASTER
  // success message
  successToaster(ToasterMsg: any, ToasterTitle: any) {
    this.toast.success(`${ToasterMsg}`, `${ToasterTitle}`, {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    })
  }

  // info message
  infoToaster(ToasterMsg: any, ToasterTitle: any) {
    this.toast.info(`${ToasterMsg}`, `${ToasterTitle}`, {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    })
  }

  // warning message
  warningToaster(ToasterMsg: any, ToasterTitle: any) {
    this.toast.warning(`${ToasterMsg}`, `${ToasterTitle}`, {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    })
  }

  // error message
  errorToaster(ToasterMsg: any, ToasterTitle: any) {
    this.toast.error(`${ToasterMsg}`, `${ToasterTitle}`, {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    })
  }

}
