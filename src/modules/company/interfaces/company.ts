import { Types } from "mongoose";

export interface ICompany {
    _id?: Types.ObjectId;
    name: string;
    locationId: Types.ObjectId;
    ownerId: Types.ObjectId;
    industryId: Types.ObjectId;
    description?: string;
    tax: number;
    capital: number;

    companyShareValue?: number;
    totalShares: number;
    availableShares: number;

    createdAt?: Date;
    updatedAt?: Date;
}


export interface ICompanyModel extends ICompany { }