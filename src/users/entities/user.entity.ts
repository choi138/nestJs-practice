import { InternalServerErrorException } from "@nestjs/common";
import { CoreEntity } from "src/common/entites/core.entity";
import * as bcrypt from 'bcrypt'
import { BeforeInsert, Column, Entity } from "typeorm";
import { IsEmail, IsString } from "class-validator";

enum UserRole {
    Client = 'client',
    Owner = 'owner'
}

@Entity()
export class User extends CoreEntity {
    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    @IsString()
    role: UserRole

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException()
        }
    }

    async checkPassword(InputPassword: string): Promise<boolean> {
        try {
            const ok = bcrypt.compare(InputPassword, this.password);
            return ok
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException()
        }
    }
}