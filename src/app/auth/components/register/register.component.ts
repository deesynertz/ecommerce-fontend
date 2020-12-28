import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesResponseModel } from 'src/app/model/user.model';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  roleList: RolesResponseModel[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.userService.getRoles().subscribe((rolesList) => {
      this.roleList = rolesList.roles;
    })
  }

  registerUser(registrationForm: NgForm) {

    if (registrationForm.invalid) {
      return;
    }

    this.authService.registerUser({...registrationForm.value})
      .subscribe((response: any) => {
        if (response.success == 1) {

          this.sharedService.successToaster(response.message, 'Registration');
          this.router.navigateByUrl('/login').then();

        } else {

          this.sharedService.errorToaster(response.message, 'Registration');

        }
      });

    registrationForm.reset();
  }

}
