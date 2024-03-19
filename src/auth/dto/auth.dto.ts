import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  id: number;
  username: string;
  email: string;
  password: string;
  token: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  status: number;
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  birthday: string;
  gender: string;
  @IsNotEmpty() phoneNumber: string;
  status: number;
}

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
