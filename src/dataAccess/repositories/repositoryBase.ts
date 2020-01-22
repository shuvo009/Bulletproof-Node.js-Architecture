import { injectable } from "inversify";
import * as mongoose from "mongoose";
import { IRepositoryBase } from "../../interfaces";
import { IBaseModel, IPagedResponse, PagingRequest } from "../../models";

@injectable()
export abstract class RepositoryBase<T extends IBaseModel> implements
    IRepositoryBase<T extends IBaseModel ? any : any>  {

    private model: mongoose.Model<mongoose.Document>;
    set schema(schema: mongoose.Model<mongoose.Document>) {
        this.model = schema;
    }

    public async filter(query?: any, paging?: PagingRequest, sort?: any):
        Promise<IPagedResponse<T extends IBaseModel ? any : any>> {
        const result: any[] = await Promise.all([this.collectionFilter(query, paging, sort), this.count(query)]);
        return {
            count: result[1],
            list: result[0]
        };
    }

    public findOne(query: any): Promise<T extends IBaseModel ? any : any> {
        return new Promise((resolve, reject) => {
            this.model.findOne(query).exec((err: any, data: T extends IBaseModel ? any : any) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(data);
                }
            });
        });
    }

    public find(query: any): Promise<Array<T extends IBaseModel ? any : any>> {
        return new Promise((resolve, reject) => {
            this.model.find(query).exec((err: any, data: T extends IBaseModel ? any : any[]) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(data);
                }
            });
        });
    }

    public count(query: any): Promise<number> {
        return new Promise((resolve, reject) => {
            this.model.countDocuments(query).exec((err: any, data: number) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(data);
                }
            });
        });
    }

    public findById(id: string): Promise<T extends IBaseModel ? any : any> {
        return new Promise((resolve, reject) => {
            this.model.findById(id).exec((err: any, data: T extends IBaseModel ? any : any) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(data);
                }
            });
        });
    }

    public create(item: T extends IBaseModel ? any : any): Promise<T extends IBaseModel ? any : any> {
        return new Promise((resolve, reject) => {
            item._id = mongoose.Types.ObjectId();
            this.model.create(item, (err: any, data: T extends IBaseModel ? any : any) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(data);
                }
            });
        });
    }

    public update(query: any, item: T extends IBaseModel ? any : any): Promise<T extends IBaseModel ? any : any> {
        return new Promise((resolve, reject) => {
            item.modifyOn = new Date().getTime();
            this.model.updateOne(query, item).exec((err: any, data: T extends IBaseModel ? any : any) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(data);
                }
            });
        });
    }

    public remove(id: string): Promise<T extends IBaseModel ? any : any> {
        return new Promise((resolve, reject) => {
            this.model.deleteOne({ _id: this.toObjectId(id) }).exec((err: any) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(null);
                }
            });
        });
    }

    public toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId(id);
    }

    public aggregateRunner(aggregates: any[]): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.model.aggregate(aggregates).exec((err: any, list: T[]) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(list);
                }
            });
        });
    }

    public recordCount(query?: any): Promise<number> {
        return new Promise((resolve, reject) => {
            this.model.countDocuments(query || {}).exec((err: any, count: number) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(count);
                }
            });
        });
    }

    public collectionFilter(query?: any, paging?: PagingRequest, sort?: any): Promise<T[]> {
        return new Promise((resolve, reject) => {
            const aggregations: any = [];
            if (query) {
                aggregations.push({ $match: query });
            }
            if (sort) {
                aggregations.push({ $sort: sort });
            }

            if (paging && paging.skip >= 0) {
                aggregations.push({ $limit: (paging.limit + paging.skip) });
                aggregations.push({ $skip: paging.skip });
            }
            const search = this.model.aggregate(aggregations);
            search.exec((err: any, list: T[]) => {
                if (err) {
                    reject(new Error(JSON.stringify(err)));
                } else {
                    resolve(list);
                }
            });
        });
    }
}
