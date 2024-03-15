import { IsNotEmpty, IsString } from 'class-validator';

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
}

export class CreateUserDTO {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  birthday: string;
  gender: string;
  @IsNotEmpty() phoneNumber: string;
}

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @IsNotEmpty() id: number;
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
}
