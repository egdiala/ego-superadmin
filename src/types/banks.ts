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