export interface FetchNotificationsQuery {
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-unread";
}