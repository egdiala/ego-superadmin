export interface FetchFeesQuery {
    name?: string;
    screen_name?: "lease_model_fee" | "staff_commute_fee" | "e_hailing_fee" | "lease_revenue_split" | "staff_revenue_split" | "e_hailing_revenue_split";
    component?: "fee_variables";
}

export type CreateFeeType = {
    amount: string;
    amount_type: "fixed" | "percent";
    tag: string;
}

export interface FetchedFeeVariable {
    slug: string;
    tag: string;
    name: string;
    screen_name: string;
}

export interface FetchedRevenueSplit extends FetchedFeeVariable {
    amount: number;
    amount_type: "fixed" | "percent";
    system_generated: boolean;
    data: any[];
    createdAt: Date | string;
    updatedAt: Date | string;
    fee_id: string;
}