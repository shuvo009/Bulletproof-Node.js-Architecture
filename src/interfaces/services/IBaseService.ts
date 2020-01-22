import { IBaseModel, IPagedResponse } from "../../models"

export interface IBaseService<T extends IBaseModel> {
    create(model: T, additionalData: any): Promise<T>;
    update(model: T, additionalData: any): Promise<T>;
    getById(id: any): Promise<T>;
    getAll(filterOptions: any, pageNumber: number): Promise<IPagedResponse<T>>;
    delete(id: any): Promise<T>;
    getPublished(filterOptions: any): Promise<T[]>;
}