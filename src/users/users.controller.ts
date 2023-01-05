import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MutationOutput } from 'src/common/dto/output.dto';
import { CoreEntity } from 'src/common/entites/core.entity';
import { CreateAccount } from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @Post('/create')
    async createAccount(@Body() createAccount: CreateAccount): Promise<MutationOutput> {
        try {
            return this.userService.createUser(createAccount)
        } catch (err) {
            return {
                error: err,
                ok: false
            }
        }
    }

    // @Get('/:id')
    // user(@Param('id') userId: number) {
    //     return this.userService.findById(userId);
    // }
    @Post('/login')
    async login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
        try {
            const login = this.userService.login(loginInput);
            return login;

        } catch (err) {
            return {
                ok: false,
                error: err
            }
        }
    }

    @Post('/token')
    async Entoken(@Body() body:any) {
        try {
            return await this.userService.use(body.token)
        } catch (err) {
            console.log(err)
            return ({
                ok: "sorry",
                error: err
            });
        }
    }
}
