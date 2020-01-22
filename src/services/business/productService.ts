import { injectable } from "inversify";

import { IProductService } from "../../interfaces";
import { IProductModel } from "../../models";
import { BaseService } from "./baseService";

@injectable()
export class ProductService extends BaseService<IProductModel> implements IProductService {

    /* #region  Base Class Methods */
    public validateModel(tModel: IProductModel): string {
        return "";
    }

    public primaryValueCheckQuery(tModel: IProductModel): any {
        return { name: tModel.name };
    }

    public primaryValue(tModel: IProductModel): string {
        return tModel.name;
    }

    public async beforeCreate(tModel: IProductModel, additionalData: any): Promise<IProductModel> {
        return tModel;
    }

    public async beforeUpdate(tModel: IProductModel, dbModel: IProductModel, additionalData: any):
        Promise<IProductModel> {
        dbModel.name = tModel.name;
        dbModel.price = tModel.price;
        dbModel.quantity = tModel.quantity;
        return dbModel;
    }

    public async beforeDelete(tModel: IProductModel): Promise<string> {
        return "";
    }

    public searchQuery(filterOptions: any): any {
        return { name: filterOptions.name };
    }

    public sortQuery(): any {
        return { name: 1 };
    }
    /* #endregion */

}
