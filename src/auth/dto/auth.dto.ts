import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

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
  @IsNotEmpty()
  @Matches(/^(03[2-9]|07[06-9]|08[1-9]|09[0-9]|05[6-9]|01[2-9])\d{7}$/)
  phoneNumber: string;
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
