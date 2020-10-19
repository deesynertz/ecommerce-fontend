export interface UserRegistrationResponse {
  lastId: number;
  responseCode: number;
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
