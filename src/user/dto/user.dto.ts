import {
  IsAlpha,
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserSearch {
  @IsOptional()
  username: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsAlpha()
  @MinLength(2)
  firstName: string;
  @IsOptional()
  lastName: string;
  @IsDate()
  birthday: string;
  @IsOptional()
  gender: string;
  @IsOptional()
  @IsPhoneNumber()
  @Matches(/^(03[2-9]|07[06-9]|08[1-9]|09[0-9]|05[6-9]|01[2-9])\d{7}$/)
  phoneNumber: string;
  @IsOptional()
  address: string;
}

export class UserUpdateDTO {
  @IsOptional()
  username: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  firstName: string;
  @IsOptional()
  @IsString()
  lastName: string;
  @IsOptional()
  @IsString()
  birthday: string;
  @IsOptional()
  gender: string;
  @IsOptional()
  @IsPhoneNumber()
  @Matches(/^(03[2-9]|07[06-9]|08[1-9]|09[0-9]|05[6-9]|01[2-9])\d{7}$/)
  phoneNumber: string;
  @IsOptional()
  address: string;
  @IsOptional()
  avatar: string;
}
