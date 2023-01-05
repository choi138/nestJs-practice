import { IsEmail, IsEnum, IsString } from "class-validator";
import { MutationOutput } from "src/common/dto/output.dto";
import { User } from "../entities/user.entity";


export class LoginInput {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class LoginOutput extends MutationOutput {
    token?: string;
}