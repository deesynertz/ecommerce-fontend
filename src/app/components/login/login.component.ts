import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SocialAuthService } from 'angularx-social-login';
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginMessage: string;
  userRole: number;

  constructor(private authService: SocialAuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/profile').then();
      } else {
        this.router.navigateByUrl('/login').then();
      }
    });
  }


  login(loginForm: NgForm) {
    const username = loginForm.value.username;
    const password = loginForm.value.password;

    if (loginForm.invalid) {
      return;
    }

    this.userService.login(username,password).subscribe((response:any) => {

      if(response.success_code === 1){
        loginForm.reset();
        console.log(response);
      }else{
        this.updateMessage(response.message);
        //this.alertService.danger(`${response.message}`);
      }

    });
  }

  updateMessage(message) {
    this.toast.warning(`${message}`, "Login", {
      timeOut: 2500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    })
  }

  onSubmit(loginform: NgForm) {

  }
}
