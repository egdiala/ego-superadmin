/* eslint-disable no-unused-vars */
export interface FetchWalletStatsQuery {
    status?: "1" | "2"; // 1=successful, 2=failed
    auth_id?: string;
    page?: string;
    item_per_page?: string;
    start_date?: string;
    end_date?: string;
    user_type?: "rider" | "organization"
    component?: "count" | "count-transaction" | "count-status";
}

export interface FetchWalletTransactionQuery {
    status?: "1" | "2"; // 1=successful, 2=failed
    auth_id?: string;
    page?: string;
    item_per_page?: string;
    start_date?: string;
    end_date?: string;
    wallet_type?: "user-wallet" | "organization-wallet"
    component?: "count" | "balance" | "count-status";
}

export interface FetchedWalletTransaction {
    auth_id: string;
    status: number;
    amount: number;
    actual_amount: number;
    init_amount: number;
    save_card: boolean;
    transaction_type: string;
    payment_method: string;
    description: string;
    purchase_model: number;
    transaction: {
        id: number;
        domain: string;
        status: string;
        reference: string;
        receipt_number: null;
        amount: number;
        message: null;
        gateway_response: string;
        paid_at: Date | string;
        created_at: Date | string;
        channel: string;
        currency: string;
        ip_address: string;
        metadata: {
            custom_fields: {
                display_name: string;
                variable_name: string;
                value: string;
            }[];
            referrer: string;
        },
        log: {
            start_time: number;
            time_spent: number;
            attempts: number;
            errors: number;
            success: boolean;
            mobile: boolean;
            input: [];
            history: {
                type: string;
                message: string;
                time: number;
            }[]
                
        },
        fees: number;
        fees_split: null;
        authorization: {
            authorization_code: string;
            bin: string;
            last4: string;
            exp_month: string;
            exp_year: string;
            channel: string;
            card_type: string;
            bank: string;
            country_code: string;
            brand: string;
            reusable: boolean;
            signature: string;
            account_name: null;
            receiver_bank_account_number: null;
            receiver_bank: null;
        },
        customer: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            customer_code: string;
            phone: string;
            metadata: null;
            risk_action: string;
            international_format_phone: null;
        },
        plan: null;
        split: {},
        order_id: null;
        paidAt: Date | string;
        createdAt: Date | string;
        requested_amount: number;
        pos_transaction_data: null;
        source: null;
        fees_breakdown: null;
        connect: null;
        transaction_date: Date | string;
        plan_object: {};
        subaccount: {};
    },
    createdAt: Date | string;
    updatedAt: Date | string;
    transaction_id: string;
    first_name: string;
    last_name: string;
}

export interface FetchedWalletTransactionCount {
    _id: null;
    total: number;
    balance?: number;
    total_amount: number;
}

export interface FetchedWalletTransactionCountStatus {
    _id: null;
    balance: number
}

export interface FetchedWalletStatsCount {
    _id: null;
    credit_amount: number;
    debit_amount: number;
    failed_amount: number;
    credit_total?: number;
    debit_total?: number;
    failed_total?: number;
}

export enum WalletStatus {
    Pending = 0, // 0 = pending
    Successful = 1, // 1 = successful, completed, done
    Failed = 2, // 2 = failed, canceled, declined
    Abandoned = 3, // 3 = Abandoned
    Refunded = 4, // 4 = refunded
    Suspended = 5, // 5 = suspend
    Debited = -1
}