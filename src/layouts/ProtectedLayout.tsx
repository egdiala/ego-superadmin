import type { PropsWithChildren } from "react";

const ProtectedLayout = ({ children }: PropsWithChildren) => {
  
    return (
        <>{children}</>
    );
};

export default ProtectedLayout;