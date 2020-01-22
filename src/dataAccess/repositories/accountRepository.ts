import { injectable } from "inversify";
import { IAccountRepository } from "../../interfaces";
import { IAccountModel } from "../../models";
import { accountSchema } from "../schema";
import { RepositoryBase } from "./repositoryBase";

@injectable()
export class AccountRepository extends RepositoryBase<IAccountModel> implements IAccountRepository {

    constructor() {
        super();
        this.schema = accountSchema;
    }
}
