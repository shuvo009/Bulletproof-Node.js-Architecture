import { injectable } from "inversify";
import { IAccountRepository } from "../../interfaces";
import { IProductModel } from "../../models";
import { productSchema } from "../schema";
import { RepositoryBase } from "./repositoryBase";

@injectable()
export class ProductRepository extends RepositoryBase<IProductModel> implements IAccountRepository {

    constructor() {
        super();
        this.schema = productSchema;
    }
}
