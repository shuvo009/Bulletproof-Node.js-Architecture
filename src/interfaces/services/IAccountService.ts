import { IAccountModel } from "../../models"
export interface IAccountService {
    login(username: string, password: string): Promise<string>;
    register(accountModel: IAccountModel): Promise<void>;
}