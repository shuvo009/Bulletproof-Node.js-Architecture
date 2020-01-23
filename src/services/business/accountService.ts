import { inject, injectable } from "inversify";
import { repositoryTypes } from "../../config";
import { IAccountRepository, IAccountService } from "../../interfaces";
import { IAccountModel } from "../../models";

@injectable()
export class AccountService implements IAccountService {

    constructor(@inject(repositoryTypes.AccountRepository) private accountRepository: IAccountRepository) {
    }

    public async login(username: string, password: string): Promise<string> {
        return "token" + username + password;
    }

    public async register(accountModel: IAccountModel): Promise<void> {
        const existingUser = await this.accountRepository.findOne({ username: accountModel.username });
        if (existingUser) {
            throw new Error("User already exist");
        }
        await this.accountRepository.create(accountModel);
    }
}
