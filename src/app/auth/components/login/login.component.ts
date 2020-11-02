import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
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
        // // console.log(response);
        // this.sharedService.successToaster("successfully logedin", 'Login');
      }else{
        this.sharedService.warningToaster(response.message, 'Login');
      }

    });
  }

}
