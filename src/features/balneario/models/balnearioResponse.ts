import { Amenity } from "../../servicios/models/amenity";

export interface BalnearioResponse{
    id:number;
    name:string;
    address:string;
    amenities: Amenity[];
    imageUrl :string;
}
