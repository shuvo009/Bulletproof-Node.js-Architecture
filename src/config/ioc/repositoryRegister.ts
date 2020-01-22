import { Container } from "inversify";
import { AccountRepository, ProductRepository } from "../../dataAccess";
import { IAccountRepository, IProductRepository, IServiceRegister } from "../../interfaces";

import { repositoryTypes } from "../constant";

export class RepositoryRegister implements IServiceRegister {
    public register(container: Container) {
        container.bind<IAccountRepository>(repositoryTypes.AccountRepository).to(AccountRepository);
        container.bind<IProductRepository>(repositoryTypes.ProductRepository).to(ProductRepository);
    }
}
