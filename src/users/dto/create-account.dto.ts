import { User } from "../entities/user.entity";

enum UserRole {
    Client = 'client',
    Owner = 'owner'
}

export class CreateAccount {
    email: string;

    password: string;

    role: UserRole
}