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

export interface FetchedSingleOrganizationType extends FetchedOrgaizationType {
    address: string;
    authorize_rep_email: string;
    authorize_rep_name: string;
    authorize_rep_phone: string;
    company_tin: string;
    company_type: string;
    company_industry: string;
    employee_number: number;
    vehicle_purchase: number;
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

export type SuspendOrganizationType = {
    auth_id: string;
    status: "1" | "2"; // 1=active, 2= suspend
    reason: string;
    unsuspend_date?: string;
    unsuspend_time?: string;
    suspend_indefinite: "0" | "1"; // 0=no, 1= yes
}

export interface FetchOrganizationQuery {
    q?: string; // Search for plate number
    email?: string;
    page?: string;
    item_per_page?: string;
    component?: "count" | "export" | "count-status";
}

export interface FetchedOrganizationCount {
    total: number
}