import { CoreEntity } from "src/common/entites/core.entity";
import { Column, Entity } from "typeorm";

enum UserRole{
    Client = 'client',
    Owner = 'owner'
}

@Entity()
export class User extends CoreEntity {
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: UserRole})
    role: UserRole

}