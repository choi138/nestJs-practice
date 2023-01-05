import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MutationOutput } from 'src/common/dto/output.dto';
import { CoreEntity } from 'src/common/entites/core.entity';
import { CreateAccount } from './dto/create-account.dto';
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

    @Get('/:id')
    user(@Param('id') userId: number) {
        return this.userService.findById(userId);
    }
}
