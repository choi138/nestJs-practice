import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccount } from './dto/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly user: Repository<User>) { }
    async createUser({ email, password, role }: CreateAccount): Promise<{ ok: boolean, error?: string }> {
        try {
            const exits = await this.user.findOne({ where: { email } })
            if (exits) {
                return ({
                    ok: false,
                    error: "There is a user with that email already"
                })
            }
            await this.user.save(this.user.create({ email, password, role }))
            return({ok: true})
        } catch (err) {
            console.log(err)
            return ({
                ok: false,
                error: "Couldn't make account"
            })
        }
    }
}
