import { Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";
import { IUser } from "../common/interfaces/user.interface";
import { User } from "./models/user/user.model";
export abstract class AbstractRepository<T> {
    constructor(private _model: Model<T>) {

    }

    public async create(item: Partial<T>) {
        const doc = new this._model(item);
        return doc.save();
    }

    public async getOne(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return this._model.findOne(filter, projection, options);
    }

    public async getAll(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return this._model.find(filter, projection, options);
    }

    public async updateOne(filter: QueryFilter<T>, update: UpdateQuery<T>, options?: QueryOptions) {
        if (options?.returnDocument) {
            options.returnDocument = "after"
        }
        return this._model.findOneAndUpdate(filter, update, options);
    }

    public async deleteOne(filter: QueryFilter<T>) {
        return await this._model.deleteOne(filter);
    }
}



