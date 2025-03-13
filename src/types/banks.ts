export interface FetchFeeBankQuery {
    component?: "fee_variables" | "export"
}

export type CreateFeeBankType = {
    reference_name: string;
    bank_code: string;
    bank_name: string;
    account_number: string;
}

export type ConfirmAccountType = {
    account_number: string;
    bank_code: string;
}

export interface FetchedBankList {
    code: string;
    name: string;
    slug: string;
}

export interface ConfirmedAccountInfo {
    account_number: string;
    account_name: string;
    bank_id: number;
}

export interface FetchedFeeBankVariables {
    name: string;
    reference_name: string;
}

export interface FetchedFeeBank {
    reference_name: string;
    bank_name: string;
    bank_code: string;
    account_number: string;
    account_name: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    feebank_id: string;
    stakeholder_name: string;
}