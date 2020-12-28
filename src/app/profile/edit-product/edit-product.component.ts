import {Component, Inject, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  informationData;
  jina = "jina";
  constructor(public sharedService: SharedService,
              @Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<EditProductComponent>) { }

  ngOnInit() {
    this.sharedService.productEditKey = true;
    console.log(this.data.info);
    this.sharedService.sendDataToForm(this.data.info);
    this.informationData = this.data.info;
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  onClear() {
    return;
  }
}
