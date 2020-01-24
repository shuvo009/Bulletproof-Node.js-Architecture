import * as Bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import * as Jwt from "jsonwebtoken";
import { repositoryTypes, serverConfig } from "../../config";
import { IAccountRepository, IAccountService } from "../../interfaces";
import { IAccountModel } from "../../models";

@injectable()
export class AccountService implements IAccountService {

    constructor(@inject(repositoryTypes.AccountRepository) private accountRepository: IAccountRepository) {
    }

    public async login(username: string, password: string): Promise<any> {
        const account = await this.accountRepository.findOne({ username });
        if (!account || !this.validatePassword(password, account.password)) {
            throw new Error("invalid username or password");
        }
        const token = this.generateToken(account);
        return {
            access_token: token,
            token_type: "jwt"
        };
    }

    public async register(accountModel: IAccountModel): Promise<void> {
        const existingUser = await this.accountRepository.findOne({ username: accountModel.username });
        if (existingUser) {
            throw new Error("User already exist");
        }
        accountModel.password = this.hashPassword(accountModel.password);
        await this.accountRepository.create(accountModel);
    }
    /* #region  Base Class Methods */

    private generateToken(accountModel: IAccountModel) {
        const payload = { id: accountModel._id };
        return Jwt.sign(payload, serverConfig.jwtSecret, { expiresIn: serverConfig.jwtExpiration });
    }

    private hashPassword(password: string): string {
        return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
    }

    private validatePassword(requestPassword: string, accountPassword: string) {
        return Bcrypt.compareSync(requestPassword, accountPassword);
    }

    /* #endregion */
}
