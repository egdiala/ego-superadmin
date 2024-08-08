import { useMemo } from "react";
import { User } from "@/types/auth";
import { useLocation } from "react-router-dom";
import { appRoutes, financeRoutes, setupRoutes } from "@/constants/routes";

type Route = {
  to: string;
  name: string;
  subRoutes?: string[];
};

export const useCheckPermission = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const userPermissions = user?.role_list?.view || [];
    const userType = user?.user_type || "";

    const allRoutes = useMemo(() => {
        const combinedRoutes = [
            ...appRoutes.map(route => ({ ...route, subRoutes: [route.name] })),
            ...financeRoutes.map(route => ({ ...route, subRoutes: [route.name] })),
            ...setupRoutes.map(route => ({ ...route, subRoutes: route.subRoutes || [route.name] })),
            ...[{ to: "/profile", name: "Profile", icon: "", subRoutes: ["ACCESS_PROFILE"] }]
        ];
        return combinedRoutes;
    }, []);

    return useMemo(() => {
        if (userType === "superadmin") {
            return {
                hasPermission: true,
                firstRoute: allRoutes[0] // or define a specific route to return
            }
        }

        let firstAccessibleRoute: Route | undefined;
        let hasPermission = false;

        for (const route of allRoutes) {
            const hasRoutePermission = route.subRoutes.some(subRoute => userPermissions.includes(subRoute));
            if (hasRoutePermission) {
                if (location.pathname.startsWith(route.to)) {
                    return {
                        hasPermission: true,
                        firstRoute: route
                    };
                }
                if (!firstAccessibleRoute) {
                    firstAccessibleRoute = route; // Set the first accessible route
                }
                hasPermission = true; // Update the permission status
            }
        }

        return {
            hasPermission,
            firstRoute: firstAccessibleRoute
        };
    }, [allRoutes, location.pathname, userPermissions, userType]);
};
