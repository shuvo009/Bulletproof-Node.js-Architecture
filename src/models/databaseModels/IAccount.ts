import { IBaseModel } from "./IBaseModel";
export interface IAccountModel extends IBaseModel {
    username: string;
    password: string;
    name: string;
}
