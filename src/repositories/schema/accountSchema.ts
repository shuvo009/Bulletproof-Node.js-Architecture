import * as mongoose from "mongoose";
import { IAccountModel } from "../../models";
interface IAccountModelDataModel extends IAccountModel, mongoose.Document {

}

const accountDataModelSchema = new mongoose.Schema({
    lastModifyTime: Number,
    name: String,
    password: String,
    username: String,
});

const accountSchema = mongoose.model<IAccountModelDataModel>("accounts", accountDataModelSchema);

export { accountSchema };
