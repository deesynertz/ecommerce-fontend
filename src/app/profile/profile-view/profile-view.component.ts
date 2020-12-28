import { Component, OnInit } from '@angular/core';
import { CategoryModelServer, categoryServerResponse } from 'src/app/model/category.mode';
import { ProductsService } from 'src/app/services/products.service';
import {SharedService} from '../../services/shared.service';
import {AuthService} from '../../services/auth.service';
import {loginModelResponse, userProfileModel, userProfileResponse} from '../../model/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  userData: loginModelResponse;
  profile;
  departmentService: any;
  value: boolean = false;
  categoriesList: CategoryModelServer[] = [];
  images;

  userId: any;
  compName = 'deesynertz';
  today = Date.now();
  card_method = 'VISA';
  email = 'deesynertz@gmail.com';

  constructor(private productService: ProductsService,
              private sharedService: SharedService,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.authService.setObservables();
    this.authService.userData$.subscribe(data => this.userData = data);
    this.getUserProfile(this.userData.userId);
    this.returnUserRoles();
  }

  returnUserRoles(): any {
    return this.productService.getAllCategory()
      .subscribe((categories: categoryServerResponse) => {
        this.categoriesList = categories.categories;
      });
  }

  getUserProfile(userId){
    return this.userService.getUserProfile(userId).subscribe((data) => {
      this.profile = data.user;
    })
  }


  onFileSelected(event) {
    if (event.target.files.length > 0) {
      const fileData = event.target.files[0];
      this.images = fileData;
      console.log(this.images);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('prodImage', this.images);

    this.productService.postImage(formData).subscribe((response: any) => {
      this.sharedService.infoToaster(response.fileToUpload, 'File Upload');
    });
  }
}
