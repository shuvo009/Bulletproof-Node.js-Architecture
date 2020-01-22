import * as mongoose from "mongoose";
import { IProductModel } from "../../models";

interface IProductModelDataModel extends IProductModel, mongoose.Document {

}

const productDataModelSchema = new mongoose.Schema({
    lastModifyTime: Number,
    name: String,
    price: Number,
    quantity: Number,
});

const productSchema = mongoose.model<IProductModelDataModel>("products", productDataModelSchema);

export { productSchema };
