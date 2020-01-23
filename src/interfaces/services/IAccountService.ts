import { IAccountModel } from "../../models";
export interface IAccountService {
    login(username: string, password: string): Promise<any>;
    register(accountModel: IAccountModel): Promise<void>;
}
