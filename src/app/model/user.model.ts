export interface userProfileModel {
    userId: number,
    firstName: string,
    lastName: string,
    region: string,
    district: string,
    phone: number,
    email: string,
    username: string,
    roleName: string

}

export interface userProfileResponse {
  user: userProfileModel[]
}






export interface UserRegistrationResponse {
  lastId: number;
  responseCode: number;
}

export interface loginModelResponse {
  auth: string;
  userId: number;
  role: number,
  username: string;
}

export interface loginResponse {
  message: string;
  token: string;
  userData: loginModelResponse[];
}


export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userId: number;
  role: number;
}


//ROLES INTERFACE
export interface RolesResponseModel {
  roleId: number,
  roleName: string,
  createdOn: string,
}

export interface RolesExportModel {
  count: number;
  roles: RolesResponseModel[];
}
