import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  
    return (
        <div className='w-full bg-[url("@/assets/authBg.webp")] bg-no-repeat bg-cover bg-center h-screen overflow-hidden'>
            <div className="flex justify-center w-full h-full bg-green-0 filter backdrop-blur-sm bg-opacity-70 px-4 lg:px-0">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;