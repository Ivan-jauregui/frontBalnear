import { beachTentStatus } from "../enum/beachtent-status";

export interface BeachTent{
    id:number;
    number:number;
    status:beachTentStatus;
    rowId:number;
    tags:string[];
}