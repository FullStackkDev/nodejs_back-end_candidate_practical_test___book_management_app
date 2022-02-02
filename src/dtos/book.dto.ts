import { IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  public bookName: string;

  @IsString()
  public bookDesc: string;
}
