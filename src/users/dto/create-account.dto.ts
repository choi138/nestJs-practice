import { IsEnum, IsString } from "class-validator";
import { User } from "../entities/user.entity";

enum UserRole {
    Client = 'client',
    Owner = 'owner'
}

export class CreateAccount {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsEnum(UserRole)
    role: UserRole
}