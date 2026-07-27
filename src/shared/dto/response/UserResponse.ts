import { Role } from "../../models/role";

export interface UserResponse{
    firstName:string;
    lastName:string;
    email:string;
    roles: Role[];
}