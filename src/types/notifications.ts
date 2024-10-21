export interface FetchNotificationsQuery {
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-unread";
}

export interface FetchedNotification {
    auth_id: string;
    title: string;
    message: string;
    status: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    notification_id: string;
}

export interface FetchedNotificationsCount {
    total: number
}