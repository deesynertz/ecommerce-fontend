import { Component, OnInit } from '@angular/core';
import {NgForm, Validators} from "@angular/forms";
import {UserRegistrationResponse} from "../../model/user.model";
import {UserService} from "../../services/user.service";
import {AlertService} from "ngx-alerts";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService,
              private alertService: AlertService,
              private toast: ToastrService) {
    // TODO: VALIDATE THE FIELD

  }

  ngOnInit(): void {
  }

  registerUser(registrationForm: NgForm) {

    if (registrationForm.invalid) {
      return;
    }

    this.userService.registerUser({...registrationForm.value}).subscribe((response: any) => {
      if(response.success){
        this.toast.success(`${response.message}`, "Registration", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })

      }else{
        this.toast.error(`${response.message}`, "Registration", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }
    });

    registrationForm.reset();
  }
}
