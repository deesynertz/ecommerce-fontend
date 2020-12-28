import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from 'src/app/services/shared.service';
import {UserService} from 'src/app/services/user.service';
import {loginResponse} from '../../../model/user.model';
import {AuthService} from '../../../services/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showSpinner: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    // this.authService.authState$.subscribe(authState => {
    //   if (authState !== true) {
    //     this.router.navigate(['/login']).then();
    //   } else {
    //     this.router.navigate(['/profile']).then();
    //   }
    // });
    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['/login']).then();
    //   return false;
    // }else{
    //   return true;
    // }
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    this.spinner.show();
    const username = loginForm.value.username;
    const password = loginForm.value.password;
    this.authService.login(username, password);
    loginForm.reset();
  }

}

