import { injectable } from 'inversify';

import { IProductService } from "../../interfaces"
import { IProductModel } from "../../models";
import { BaseService } from "./baseService"

@injectable()
export class ProductService extends BaseService<IProductModel> implements IProductService {

    /* #region  Base Class Methods */
    validateModel(tModel: IProductModel): string {
        return "";
    }

    primaryValueCheckQuery(tModel: IProductModel): any {
        return { name: tModel.name };
    }

    primaryValue(tModel: IProductModel): string {
        return tModel.name;
    }

    async beforeCreate(tModel: IProductModel, additionalData: any): Promise<IProductModel> {
        return tModel;
    }

    async beforeUpdate(tModel: IProductModel, dbModel: IProductModel, additionalData: any): Promise<IProductModel> {
        dbModel.name = tModel.name;
        dbModel.price = tModel.price;
        dbModel.quantity = tModel.quantity;
        return dbModel;
    }

    async beforeDelete(tModel: IProductModel): Promise<string> {
        return "";
    }

    searchQuery(filterOptions: any): any {
        return { name: filterOptions.name };
    }

    sortQuery(): any {
        return { name: 1 };
    }
    /* #endregion */


}