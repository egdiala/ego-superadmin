export const appRoutes = [
    { to:"/", name:"Dashboard", icon:"lucide:layout-dashboard", requiredPermissions: [""] },
    { to:"/trips", name:"All Trips", icon:"lucide:route", requiredPermissions: ["TRIP_DATA"] },
    { to:"/drivers", name:"Drivers", icon:"mdi:steering", requiredPermissions: ["DRIVER_DATA"] },
    { to:"/riders", name:"Riders", icon:"lucide:users", requiredPermissions: ["RIDER_DATA"] },
    { to:"/vehicles", name:"Vehicles", icon:"lucide:car-taxi-front", requiredPermissions: ["VEHICLE_DATA"] },
    { to:"/customers", name:"Customers", icon:"lucide:building", requiredPermissions: ["CUSTOMER_DATA"] },
    { to:"/service-request", name:"Service Request", icon:"lucide:wrench", requiredPermissions: ["SERVICE_REQUEST"] },
    { to:"/notifications", name:"Notifications", icon:"lucide:bell", count: 0, requiredPermissions: ["NOTIFICATION_DATA"] },
]

export const financeRoutes = [
    { to:"/wallet", name:"Wallet", icon:"", requiredPermissions: ["FINANCE_WALLET"] },
    { to:"/revenue", name:"Expected Revenue", icon:"", requiredPermissions: ["FINANCE_EXP_REVENUE"] },
    { to:"/payment-log", name:"Payment Log", icon:"", requiredPermissions: ["FINANCE_PAYMENT_LOG"] },
    { to:"/receivables", name:"Receivables", icon:"", requiredPermissions: ["FINANCE_RECEIVEABLE"] },
    { to:"/reconciliation", name:"Reconciliation", icon:"", requiredPermissions: ["FINANCE_RECONCILIATION"] },
    { to:"/disbursement", name:"Disbursement", icon:"", requiredPermissions: ["FINANCE_DISBURSEMENT"] },
]

export const setupRoutes = [
    { to:"/revenue-split", name:"Revenue Split", icon:"", requiredPermissions: ["SETUP_REV_SPLIT"] },
    { to:"/fees", name:"Fees", icon:"", requiredPermissions: ["SETUP_FEE_FEE"] },
    { to:"/charge-stations", name:"Charge Stations", icon:"", requiredPermissions: ["SETUP_CHARGE_STATION"] },
    { to:"/oem", name:"OEMs", icon:"", requiredPermissions: ["SETUP_OEMS"] },
    { to:"/bank-accounts", name:"Bank Accounts", icon:"", requiredPermissions: ["SETUP_BANK_INFO"] },
    { to:"/accounts", name:"Admin Accounts", icon:"", requiredPermissions: ["SETUP_ADMIN_ACCOUNT", "SETUP_ADMIN_ROLE"] },
    { to: "/activity-log", name: "Activity Log", icon: "", requiredPermissions: ["SETUP_ACTIVITY_LOG"] },
]