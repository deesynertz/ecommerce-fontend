import { Component, OnInit } from '@angular/core';
import { CategoryModelServer, categoryServerResponse } from 'src/app/model/category.mode';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  departmentService: any;
  value: boolean = false;
  categoriesList: CategoryModelServer[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllCategory()
      .subscribe((categories: categoryServerResponse) => {
        this.categoriesList = categories.categories;
      });
  }

  

  onSubmit() {
    // if (this.service.form.valid) {
    //   if (!this.service.form.get('$key').value)
    //     this.service.insertEmployee(this.service.form.value);
    //   else
    //   this.service.updateEmployee(this.service.form.value);
    //   this.service.form.reset();
    //   this.service.initializeFormGroup();
    //   this.notificationService.success(':: Submitted successfully');
    //   this.onClose();
    // }
  }

  onClose() {
    // this.service.form.reset();
    // this.service.initializeFormGroup();
    // this.dialogRef.close();
  }

}
