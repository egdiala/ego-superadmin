/* eslint-disable no-unused-vars */
export interface FetchedOrgaizationType {
    name: string;
    email: string;
    phone_number: string;
    business_id: string;
    password: string;
    default_code: string;
    status: number;
    avatar: string;
    data_mode: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    purchase_model: number
    organization_id: string;
}

export enum PurchaseModel {
    Lease = 1,
    StaffCommute = 2,
    EHailing = 3
}

export type CreateOrganizationType = {
    purchase_model: string;
    email: string;
    name: string;
    business_id: string;
    industry: string;
    company_type: string;
    vehicle_purchase: string;
    employee_no: string;
    company_tin: string;
    authorize_rep_name: string;
    authorize_rep_email: string;
    authorize_rep_phone: string;
}