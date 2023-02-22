export interface Contact {
  name: string;
  number: string;
}

export interface ContactResponse extends Contact {
  id: string;
}

export interface KnownError {
  message: string;
}

interface User {
  email: string | null;
}

export interface UserLoginRequest extends User {
  password: string;
}

export interface UserLoginResponse extends User {
  name: string | null;
}

export interface UserRegisterRequest
  extends UserLoginRequest,
    UserLoginResponse {}
