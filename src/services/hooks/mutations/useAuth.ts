import { useMutation } from "@tanstack/react-query";
import { login, sendResetPasswordEmail, setPassword } from "../../apis/auth";
import { axiosInstance } from "@/services/axiosInstance";
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils";
import { setItem } from "@/utils/localStorage";
import { useNavigate } from "react-router-dom";


function onLoginSuccess(responseData: any) {
    const { token, ...userData } = responseData;
    setItem(APP_TOKEN_STORAGE_KEY, token);
    setItem(APP_USERDATA_STORAGE_KEY, JSON.stringify(userData));
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// eslint-disable-next-line no-unused-vars
export const useLogin = (fn?: (v: any) => void) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: login,
        onSuccess: (response: any) => {
            if (response.status === "ok") {
                onLoginSuccess(response?.data)
                navigate("/")
            } else {
                fn?.(response);
            }
        },
        onError: (err: any) => {
        console.error(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useSetPassword = (fn?: (v: any) => void) => {
  return useMutation({
    mutationFn: setPassword,
    onSuccess: (response: any) => {
      console.log(response);
      fn?.(response);
    },
    onError: (err: any) => {
      console.error(err)
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useSendResetPasswordEmail = (fn?: (v: any) => void) => {
  return useMutation({
    mutationFn: sendResetPasswordEmail,
    onSuccess: (response: any) => {
      fn?.(response);
    },
    onError: (err: any) => {
      console.error(err)
    },
  });
};