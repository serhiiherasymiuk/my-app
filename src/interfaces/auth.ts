export interface IRegister {
  image: File | null;
  email: string;
  lastName: string;
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResult {
  access_token: string;
}
