import { IsEmail, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public authorName: string;
}

export class LoginAuthorDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
