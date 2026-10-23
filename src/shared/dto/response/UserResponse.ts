import { Role } from "../../models/role";

export interface UserResponse{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    roles: Role[];
}