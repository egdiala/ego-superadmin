export const appRoutes = [
    { to:"/", name:"Home", icon:"heroicons-solid:view-grid" },
    { to:"/trips", name:"All Trips", icon:"bx:trip" },
    { to:"/drivers", name:"Drivers", icon:"mdi:steering" },
    { to:"/riders", name:"Riders", icon:"mdi:steering" },
    { to:"/vehicles", name:"Vehicles", icon:"mingcute:car-3-fill" },
    { to:"/customers", name:"Customers", icon:"mingcute:building-2-fill" },
    { to:"/service-request", name:"Service Request", icon:"bi:tools" },
    { to:"/notifications", name:"Notifications", icon:"mingcute:notification-line", count: 3 },
]

export const financeRoutes = [
    { to:"/wallet", name:"Wallet", icon:"iconoir:wallet-solid" },
    { to:"/outstanding-payment-log", name:"Outstanding Payment Log", icon:"mdi:naira" },
    { to:"/payment-log", name:"Payment Log", icon:"solar:document-text-bold" },
]

export const adminRoutes = [
    { to:"/accounts", name:"Accounts", icon:"ic:round-admin-panel-settings" },
    { to:"/roles", name:"Roles", icon:"ic:round-admin-panel-settings" },
    { to:"/activity-log", name:"Activity Log", icon:"solar:document-text-bold" },
]