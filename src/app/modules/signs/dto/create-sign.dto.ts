import { IsNotEmpty, IsString } from "class-validator";

export class CreateSignDto {
    @IsNotEmpty()
    @IsString()
    title: string
}
