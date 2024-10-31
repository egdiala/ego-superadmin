export interface FetchFeeBankQuery {
    component?: "fee_variables"
}

export type CreateFeeBankType = {
    reference_name: string;
    bank_code: string;
    bank_name: string;
    account_number: string;
}

export interface FetchedBankList {
    Bankname: string;
    Bankcode: string;
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