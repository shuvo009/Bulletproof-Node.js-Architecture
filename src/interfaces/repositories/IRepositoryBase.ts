import * as mongoose from "mongoose";
import { IBaseModel, IPagedResponse, PagingRequest } from "../../models";

export interface IRepositoryBase<T extends IBaseModel> {
    filter(query?: any, paging?: PagingRequest, sort?: any): Promise<IPagedResponse<T>>;
    findById(id: string): Promise<T>;
    findOne(query: any): Promise<T>;
    create(item: T): Promise<T>;
    update(query: any, item: T): Promise<T>;
    remove(id: string): Promise<T>;
    toObjectId(id: string): mongoose.Types.ObjectId;
    count(query: any): Promise<number>;
    find(query: any): Promise<T[]>;
}
