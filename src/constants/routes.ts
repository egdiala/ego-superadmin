export const appRoutes = [
    { to:"/", name:"Home", icon:"lucide:layout-dashboard" },
    { to:"/trips", name:"All Trips", icon:"lucide:route" },
    { to:"/drivers", name:"Drivers", icon:"mdi:steering" },
    { to:"/riders", name:"Riders", icon:"lucide:users" },
    { to:"/vehicles", name:"Vehicles", icon:"lucide:car-taxi-front" },
    { to:"/customers", name:"Customers", icon:"lucide:building" },
    { to:"/service-request", name:"Service Request", icon:"lucide:settings" },
    { to:"/notifications", name:"Notifications", icon:"lucide:bell", count: 3 },
]

export const financeRoutes = [
    { to:"/wallet", name:"Wallet", icon:"lucide:wallet" },
    { to:"/outstanding-payment-log", name:"Outstanding Payment Log", icon:"lucide:badge-dollar-sign" },
    { to:"/payment-log", name:"Payment Log", icon:"lucide:file-text" },
]

export const setupRoutes = [
    { to:"/revenue-split", name:"Revenue Split", icon:"lucide:split" },
    { to:"/fees", name:"Fees", icon:"tabler:currency-naira" },
    { to:"/charge-stations", name:"Charge Stations", icon:"lucide:plug-zap" },
    { to:"/accounts", name:"Accounts", icon:"lucide:circle-user-round" },
    { to:"/activity-log", name:"Activity Log", icon:"lucide:logs" },
]