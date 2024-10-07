export interface FetchFeesQuery {
    name?: string;
    screen_name?: "lease_model_fee" | "staff_commute_fee" | "e_hailing_fee" | "lease_revenue_split" | "staff_revenue_split" | "e_hailing_revenue_split";
    component?: "fee_variables";
}

export type CreateFeeType = {
    name: string;
    amount: string;
    amount_sufix: "flat" | "percent";
    tag: string;
    screen_name: FetchFeesQuery["screen_name"];
    desc?: string;
}