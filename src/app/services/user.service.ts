import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {loginUserUrl, registerUserUrl} from "../config/api";
import {ResponseModel, UserRegistrationResponse} from "../model/user.model";
import {catchError, map} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = false;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;

  private emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';

  constructor(private http: HttpClient,
              private authService: SocialAuthService,
              private fb: FormBuilder) { }


  registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<any> {
    const {firstName,lastName,region,district,phone,email,username,password} = formData;

    return this.http.post<any>(registerUserUrl, {
       firstName,lastName,region,district,phone,email,username,password
    });
  }

  login(username:string, password){
    return this.http.post(loginUserUrl, {username, password}).pipe(
      map((response: any) => {
        // const user = response;
        console.log(response);
      })
    )
  }

  loginUser(username: string, password: string) {
    this.http.post<ResponseModel>(loginUserUrl, {username, password})
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: ResponseModel) => {
        if (typeof (data) === 'string') {
          this.loginMessage$.next(data);
        } else {
          this.auth = data.auth;
          this.userRole = data.role;
          this.authState$.next(this.auth);
          this.userData$.next(data);
        }
      });
  }

  logout() {
    this.authService.signOut().then();
    this.auth = false;
    this.authState$.next(this.auth);
  }


  validateForm() {

    this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      region: ['', [Validators.required, Validators.minLength(4)]],
      district: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}

