import { useMemo } from "react";
import type { User } from "@/types/auth";

type PermissionType = "create" | "view" | "update" | "delete";

export const useHasPermission = (moduleName: string, permissionType: PermissionType, subRoutes?: string[]) => {
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  return useMemo(() => {
    if (!user) {return false;}

    // Grant access to all routes if user_type is superadmin
    if (user.user_type === "superadmin") {return true;}

    const permissions = user.role_list[permissionType];

    if (subRoutes && subRoutes.length > 0) {
      // If subRoutes are provided, check any of the subRoutes
      return subRoutes.some(subRoute => permissions.includes(subRoute));
    }

    // Otherwise, check the main module name
    return permissions.includes(moduleName);
  }, [moduleName, permissionType, subRoutes, user]);
};


export const useHasAnyPermission = (routes: Array<{ name: string; subRoutes?: string[] }>) => {
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  return useMemo(() => {
    if (!user) {return false;}

    // Grant access to all routes if user_type is superadmin
    if (user.user_type === "superadmin") {return true;}

    // Check for each route if the user has any type of permission
    for (const route of routes) {
      const moduleName = route.name.toUpperCase().replace(/\s+/g, "_");

      const hasPermission = ["view", "create", "update", "delete"].some(permissionType =>
        useHasPermission(moduleName, permissionType as PermissionType, route.subRoutes)
      );

      if (hasPermission) {
        return true;
      }
    }

    return false;
  }, [routes, user]);
};