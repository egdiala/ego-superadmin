import type { FC, ReactNode } from "react";
import { getAdminData } from "@/utils/authUtil";
import { Actions } from "@/types/roles";

interface RenderFeatureProps {
  module: string;
  permission: Actions;
  children: ReactNode;
}

// FUNCTION TO DISPLAY ANY ITEM BASED ON PERMISSION
export const hasPermission = (module: string, permission: Actions) => {
    const admin = getAdminData();

    if (admin.user_type === "superadmin") {
        return true
    }

    // check if module exists in any of the objects in the permissions array and if permission exists in any object permissions
    const hasPermission = admin?.role_list?.[permission]?.includes(module)

    return hasPermission;
};

// HANDLES COMPONENT RENDERING BASED ON PERMISSION
export const RenderFeature: FC<RenderFeatureProps> = ({ module, permission, children }) => {
  const featureIsPermitted = hasPermission(module, permission);

  return featureIsPermitted ? <>{children}</> : null;
};