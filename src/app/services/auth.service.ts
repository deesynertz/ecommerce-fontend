import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {loginModelResponse, loginResponse} from '../model/user.model';
import {authLoginUrl, authRegisterUrl} from '../config/api';
import {SharedService} from './shared.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NgxSpinnerService} from 'ngx-spinner';


export const JWT_NAME = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = false;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<loginModelResponse>(null);


  constructor(private jwtHelper: JwtHelperService,
              private http: HttpClient,
              private router: Router,
              private sharedService: SharedService,
              private spinner: NgxSpinnerService) {
  }

  login(username: string, password: string) {
    this.http.post(`${authLoginUrl}`, {username, password}).subscribe((response: loginResponse) => {
      if (!response.message) {
        this.sharedService.successToaster('successfully logged In', 'Login');
        localStorage.setItem(JWT_NAME, response.token);
        this.spinner.hide();
        this.setObservables();
        this.router.navigate(['/product-view']).then();
      } else {
        this.spinner.hide();
        this.sharedService.warningToaster(response.message, 'Login');
      }
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  setObservables() {
    const tokenData = localStorage.getItem(JWT_NAME);
    const userData = this.jwtHelper.decodeToken(tokenData);
    this.auth = userData.state;
    this.authState$.next(this.auth);
    this.userData$.next(userData);
  }

  registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<any> {
    const {firstName, lastName, region, district, phone, email, username, password, role_id} = formData;
    return this.http.post(`${authRegisterUrl}`, {
      firstName, lastName, region, district, phone, email, username, password, role_id
    });
  }

  logout() {
    this.auth = false;
    this.authState$.next(this.auth);
    this.userData$.next(null);
    localStorage.removeItem(JWT_NAME);
    this.router.navigate(['/']).then();
  }
}

