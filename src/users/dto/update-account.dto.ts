import { IsNumber, IsObject, IsString } from "class-validator";
import { CreateAccount } from "./create-account.dto";

export class UpdateData extends CreateAccount { }

export class UpdateAccount {
    @IsNumber()
    id: number;

    @IsObject()
    data: UpdateData;
}