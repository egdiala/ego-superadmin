export const appRoutes = [
    { to:"/", name:"Dashboard", icon:"lucide:layout-dashboard" },
    { to:"/trips", name:"All Trips", icon:"lucide:route" },
    { to:"/drivers", name:"Drivers", icon:"mdi:steering" },
    { to:"/riders", name:"Riders", icon:"lucide:users" },
    { to:"/vehicles", name:"Vehicles", icon:"lucide:car-taxi-front" },
    { to:"/customers", name:"Customers", icon:"lucide:building" },
    { to:"/service-request", name:"Service Request", icon:"lucide:wrench" },
    { to:"/notifications", name:"Notifications", icon:"lucide:bell", count: 3 },
]

export const financeRoutes = [
    { to:"/wallet", name:"Wallet", icon:"" },
    { to:"/revenue", name:"Expected Revenue", icon:"" },
    // { to:"/invoices", name:"Invoices", icon:"" },
    { to:"/payment-log", name:"Payment Log", icon:"" },
    { to:"/receivables", name:"Receivables", icon:"" },
]

export const setupRoutes = [
    { to:"/revenue-split", name:"Revenue Split", icon:"" },
    { to:"/fees", name:"Fees", icon:"" },
    { to:"/charge-stations", name:"Charge Stations", icon:"" },
    { to:"/accounts", name:"Accounts", icon:"", subRoutes: ["ACCESS_ROLE", "ADMIN_ACCOUNT"] },
    { to:"/activity-log", name:"Activity Log", icon:"" },
]