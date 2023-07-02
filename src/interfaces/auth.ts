export interface IRegister {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: number;
  image: File | null;
}

export interface ILogin {
  email: string;
  password: string;
}
