import { Amenity } from "../../servicios/models/amenity";

export interface BalnearioResponse{
    id:number;
    name:string;
    address:string;
    zone:string;
    price:number;
    amenities: Amenity[];
    imageUrl :string;
}
