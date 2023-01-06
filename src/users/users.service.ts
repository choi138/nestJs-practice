import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccount } from './dto/create-account.dto';
import { LoginInput } from './dto/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { UpdateAccount } from './dto/update-account.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async createUser({ email, password, role }: CreateAccount): Promise<{ ok: boolean, error?: string }> {
        try {
            const exits = await this.users.findOne({ where: { email } })
            if (exits) {
                return ({
                    ok: false,
                    error: "There is a user with that email already"
                })
            }
            await this.users.save(this.users.create({ email, password, role }))
            return ({ ok: true })
        } catch (err) {
            console.log(err)
            return ({
                ok: false,
                error: "Couldn't make account"
            })
        }
    }

    async findById(id: number): Promise<User> {
        return await this.users.findOne({ where: { id } })
    }

    async update({ id, data }: UpdateAccount): Promise<{ ok: boolean, error?: string }> {
        try {
            const checkId = await this.findById(id)
            console.log(checkId)
            if (!checkId) {
                return {
                    ok: false,
                    error: "There is no id like that"
                }
            }
            await this.users.update(id, { ...data });
            return {
                ok: true,
            };
        } catch (err) {
            console.log(err)
            return {
                ok: false,
                error: "Couldn't update account"
            }
        }
    }

    async delete(id: number): Promise<{ ok: boolean, error?: string }> {
        try {
            const checkId = await this.findById(id)
            console.log(checkId)
            if (!checkId) {
                return {
                    ok: false,
                    error: "There is no id like that"
                }
            }
            await this.users.delete(id)
            return {
                ok: true
            }
        } catch (err) {
            console.log(err)
            return {
                ok: false,
                error: "Couldn't delete"
            }
        }
    }

    async login({ email, password }: LoginInput): Promise<{ ok: boolean, error?: string, token?: string }> {
        try {
            const user = await this.users.findOne({ where: { email } });
            if (!user) {
                return {
                    ok: false,
                    error: "User not found"
                }
            }
            const passwordCorrect = await user.checkPassword(password)
            if (!passwordCorrect) {
                return {
                    ok: false,
                    error: "Wrong password"
                }
            }
            const tokens = this.jwtService.sign(user.id);
            return {
                ok: true,
                token: tokens
            }
        } catch (err) {
            return {
                ok: false,
                error: "Couldn't login"
            }
        }
    }

    async use(token: string) {
        const decoded = this.jwtService.verify(token)
        try {
            // console.log(decoded)
            const user = await this.findById(decoded['id'])
            // console.log(user)
            return ("email: " + user.email + " " + "password:" + user.password)
        } catch (err) {
            console.log(err)
            throw new NotFoundException()
        }
    }
}
