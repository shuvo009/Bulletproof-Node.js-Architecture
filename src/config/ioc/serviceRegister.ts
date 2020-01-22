import { Container } from "inversify";
import { IAccountService, IProductService, IServiceRegister } from "../../interfaces";
import { AccountService, ProductService } from "../../services";

import { serviceTypes } from "../constant";

export class ServiceRegister implements IServiceRegister {
    public register(container: Container) {
        container.bind<IAccountService>(serviceTypes.AccountService).to(AccountService);
        container.bind<IProductService>(serviceTypes.ProductService).to(ProductService);
    }
}
