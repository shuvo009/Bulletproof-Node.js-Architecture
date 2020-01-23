import { injectable } from "inversify";
import { IBaseService, IRepositoryBase } from "../../interfaces";
import { IBaseModel, IPagedResponse, PagingRequest } from "../../models";

@injectable()
export abstract class BaseService<T extends IBaseModel> implements IBaseService<T> {

    constructor(private baseRepository: IRepositoryBase<T>) { }

    public abstract validateModel(tModel: T): string;
    public abstract primaryValueCheckQuery(tModel: T): any;
    public abstract primaryValue(tModel: T): string;
    public abstract beforeCreate(tModel: T, additionalData: any): Promise<T>;
    public abstract beforeUpdate(tModel: T, dbModel: T, additionalData: any): Promise<T>;
    public abstract beforeDelete(tModel: T): Promise<string>;
    public abstract searchQuery(filterOptions: any): any;
    public abstract sortQuery(): any;

    public async create(model: T, additionalData: any): Promise<T> {
        const validationMessage = this.validateModel(model);
        if (validationMessage.length > 0) {
            throw validationMessage;
        }
        const uniqueQuery = this.primaryValueCheckQuery(model);
        let isDataExist = false;
        if (uniqueQuery) {
            const count = await this.baseRepository.count(uniqueQuery);
            isDataExist = count > 0;
        }

        if (isDataExist) {
            throw new Error(this.primaryValue(model) + " already exist.");
        }

        model = await this.beforeCreate(model, additionalData);

        await this.baseRepository.create(model);
        await this.afterCreate(model);
        return model;
    }

    public async update(id: any, model: T, additionalData: any): Promise<T> {
        const validationMessage = this.validateModel(model);
        if (validationMessage.length > 0) {
            throw validationMessage;
        }

        const uniqueQuery = this.primaryValueCheckQuery(model);
        let isDataExist = false;
        if (uniqueQuery) {
            uniqueQuery._id = { $ne: id };
            const count = await this.baseRepository.count(uniqueQuery);
            isDataExist = count > 0;
        }

        if (isDataExist) {
            throw new Error(this.primaryValue(model) + " already exist.");
        }

        let dbModel = await this.baseRepository.findById(id);
        const oldModel = this.copy(dbModel);
        dbModel = await this.beforeUpdate(model, dbModel, additionalData);
        await this.baseRepository.update({ _id: model._id }, dbModel);
        await this.afterUpdate(oldModel, dbModel);
        return dbModel;
    }

    public async getById(id: any): Promise<T> {
        const model = await this.baseRepository.findById(id);
        return model;
    }

    public async getAll(filterOptions: any, pageNumber: number): Promise<IPagedResponse<T>> {
        const query = this.searchQuery(filterOptions);
        const sort = this.sortQuery();
        const pagingRequest = new PagingRequest(pageNumber);
        const result = await this.baseRepository.filter(query, pagingRequest, sort);
        return result;
    }

    public async delete(id: string): Promise<T> {
        const model = await this.baseRepository.findById(id);
        const validationMessage = await this.beforeDelete(model);
        if (validationMessage.length > 0) {
            throw validationMessage;
        }
        await this.baseRepository.remove(id);
        await this.afterDelete(model);
        return model;
    }

    public async getPublished(filterOptions: any): Promise<T[]> {
        const query = this.searchQuery(filterOptions) || {};
        query.isPublished = true;
        const sort = this.sortQuery();
        const result = await this.baseRepository.filter(query, null, sort);
        return result.list;
    }

    public async afterCreate(tModel: T): Promise<any> {
        return undefined;
    }

    public async afterUpdate(oldModel: T, newModel: T): Promise<any> {
        return undefined;
    }

    public async afterDelete(tModel: T): Promise<any> {
        return undefined;
    }

    //#region Supported Methods

    private copy(dbModel: T) {
        const model: T = JSON.parse(JSON.stringify(dbModel));
        return model;
    }

    //#endregion
}
