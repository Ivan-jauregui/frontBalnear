import { User } from "../../../shared/models/user";
import { SolicitudeState } from "../enum/solicitude-state";

export interface SolicitudeResponse{
    id:number;
    userEmail:string;
    rowNumber:number;
    note:string;
    startDate:Date;
    endDate:Date;
    state:SolicitudeState
    created_at:Date;
}