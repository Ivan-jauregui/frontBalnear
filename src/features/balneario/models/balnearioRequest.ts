

export interface BalnearioRequest {
    name:string;
    description:string
    address:string;
    zone:string;
    price:number
    ownerId:number
    amenities: number[];
}
