export interface loginData {
  username: string;
  password: string;
  role: string;
}

export interface loginResponse {
  success: boolean;
  message: string;
  access_token: string;
  role: string;
}

export interface userInterface {
  name: string;
  email: string;
  mobile: number;
  password: string;
}

export interface product {
  name: string;
  description: string;
  category: string;
  price: number;
  propic: string;
}

export interface Vendor {
  _id: string;
  name: string;
  email: string;
  isapproved: boolean;
}

export interface product {
  id: string;
  name: string;
  description: string;
  price: number;
  propic: string;
}
