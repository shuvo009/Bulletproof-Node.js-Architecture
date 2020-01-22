import { IBaseService, IRepositoryBase } from "../../interfaces"
import { IBaseModel, IPagedResponse, PagingRequest } from "../../models"
import { injectable } from 'inversify';

@injectable()
export abstract class BaseService<T extends IBaseModel> implements IBaseService<T> {

    abstract validateModel(tModel: T): string;
    abstract primaryValueCheckQuery(tModel: T): any;
    abstract primaryValue(tModel: T): string;
    abstract beforeCreate(tModel: T, additionalData: any): Promise<T>;
    abstract beforeUpdate(tModel: T, dbModel: T, additionalData: any): Promise<T>;
    abstract beforeDelete(tModel: T): Promise<string>;
    abstract searchQuery(filterOptions: any): any;
    abstract sortQuery(): any;

    constructor(private baseRepository: IRepositoryBase<T>) { }

    async create(model: T, additionalData: any): Promise<T> {
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
            throw this.primaryValue(model) + ' already exist.';
        }

        model = await this.beforeCreate(model, additionalData);

        await this.baseRepository.create(model);
        await this.afterCreate(model);
        return model;
    }

    async update(model: T, additionalData: any): Promise<T> {
        const validationMessage = this.validateModel(model);
        if (validationMessage.length > 0) {
            throw validationMessage;
        }

        const uniqueQuery = this.primaryValueCheckQuery(model);
        let isDataExist = false;
        if (uniqueQuery) {
            uniqueQuery['_id'] = { $ne: model._id };
            const count = await this.baseRepository.count(uniqueQuery);
            isDataExist = count > 0;
        }

        if (isDataExist) {
            throw this.primaryValue(model) + ' already exist.';
        }

        let dbModel = await this.baseRepository.findById(model._id);
        const oldModel = this.copy(dbModel);
        dbModel = await this.beforeUpdate(model, dbModel, additionalData);
        await this.baseRepository.update({ _id: model._id }, dbModel);
        await this.afterUpdate(oldModel, dbModel);
        return dbModel;
    }

    async getById(id: any): Promise<T> {
        const model = await this.baseRepository.findById(id);
        return model;
    }

    async getAll(filterOptions: any, pageNumber: number): Promise<IPagedResponse<T>> {
        const query = this.searchQuery(filterOptions);
        const sort = this.sortQuery();
        const pagingRequest = new PagingRequest(pageNumber);
        const result = await this.baseRepository.filter(query, pagingRequest, sort);
        return result;
    }

    async delete(id: string): Promise<T> {
        const model = await this.baseRepository.findById(id);
        const validationMessage = await this.beforeDelete(model);
        if (validationMessage.length > 0) {
            throw validationMessage;
        }
        await this.baseRepository.remove(id);
        await this.afterDelete(model);
        return model;
    }

    async getPublished(filterOptions: any): Promise<T[]> {
        const query = this.searchQuery(filterOptions) || {};
        query['isPublished'] = true;
        const sort = this.sortQuery();
        const result = await this.baseRepository.filter(query, null, sort);
        return result.list;
    }


    async afterCreate(tModel: T): Promise<any> {
    }

    async afterUpdate(oldModel: T, newModel: T): Promise<any> {
    }

    async afterDelete(tModel: T): Promise<any> {
    }

    //#region Supported Methods

    private copy(dbModel: T) {
        const model: T = JSON.parse(JSON.stringify(dbModel));
        return model;
    }

    //#endregion
}