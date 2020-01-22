import { injectable } from "inversify";
import { IAccountService } from "../../interfaces";
import { IAccountModel } from "../../models";

@injectable()
export class AccountService implements IAccountService {
    public async login(username: string, password: string): Promise<string> {
        return "token" + username + password;
    }

    public async register(accountModel: IAccountModel): Promise<void> {
        return;
    }
}
