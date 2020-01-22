import { IBaseModel } from "./IBaseModel";
export interface IProductModel extends IBaseModel {
    name: string;
    price: number;
    quantity: number;
}
