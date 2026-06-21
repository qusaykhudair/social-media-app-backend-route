import { IRequest } from "../../../common/interfaces/request.interface";
import { AbstractRepository } from "../../abstract.repo";
import { RequestModel } from "./request.model";

export class RequestRepo extends AbstractRepository<IRequest> {
    constructor() {
        super(RequestModel)
    }
}