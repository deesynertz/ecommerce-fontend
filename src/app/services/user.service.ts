import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {rolesOtherUrl, userProductsUrl, userProfileUrl} from '../config/api';
import {RolesExportModel, userProfileModel, userProfileResponse} from '../model/user.model';
import {productServerResponse} from '../model/products.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<RolesExportModel> {
    return this.http.get<RolesExportModel>(`${rolesOtherUrl}`);
  }

  getUserProfile(userId: number): Observable<userProfileResponse>{
    return this.http.get<userProfileResponse>(`${userProfileUrl}` + userId);
  }

  getProductRespectToUser(userId: number): Observable<productServerResponse> {
    return this.http.get<productServerResponse>(userProductsUrl + userId);
  }
}

