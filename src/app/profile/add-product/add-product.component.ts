import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SharedService} from 'src/app/services/shared.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  value: boolean = false;
  userId;

  constructor(
    private authService: AuthService,
    public sharedService: SharedService,
    public dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  ngOnInit() {
    this.authService.userData$.subscribe(data => this.userId = data.userId);
  }

  onDialogClose() {
    this.dialogRef.close();
  }
}
