import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {SharedService} from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService,
              private sharedService: SharedService
  ) {
  }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.sharedService.infoToaster('token has been Expired please login again', 'Authentication')
      this.router.navigate(['/login']).then();
      return false;
    }else{
      this.authService.setObservables();
      return true;
    }
  }
}




// ========================================
// if (this.authService.isLoggedIn()){
//   return true
// } else {
//   this.router.navigate(['/login']).then();
// }
