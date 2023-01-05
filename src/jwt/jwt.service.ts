import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interface';

@Injectable()
export class JwtService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions){
        // console.log(this.options)
    }

    sign(userId:number): string{
        return jwt.sign({id: userId}, this.options.privateKey)
    }

    verify(token: string){
        const ver = jwt.verify(token, this.options.privateKey);
        // console.log(token)
        return ver
    }
}
