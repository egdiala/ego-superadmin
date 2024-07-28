import { useMutation } from "@tanstack/react-query";
import { setItem } from "@/utils/localStorage";
import { useNavigate } from "react-router-dom";
import { axiosInit } from "@/services/axiosInit";
import { errorToast, successToast } from "@/utils/createToast";
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils";
import { confirmResetPasswordOTP, login, sendResetPasswordEmail, sendResetPasswordOTP, setPassword } from "../../apis/auth";


function onLoginSuccess(responseData: any) {
  const { token, ...userData } = responseData;
  setItem(APP_TOKEN_STORAGE_KEY, token);
  setItem(APP_USERDATA_STORAGE_KEY, JSON.stringify(userData));
  axiosInit(token)
}

// eslint-disable-next-line no-unused-vars
export const useLogin = (fn?: (v: any) => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (response: any) => {
      successToast({ message: "Logged In Successfully!" })
      if (response.status === "ok") {
          onLoginSuccess(response?.data)
          navigate("/")
      } else {
          fn?.(response);
      }
    },
    onError: (err: any) => {
      errorToast(err)
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useSetPassword = (fn?: (v: any) => void) => {
  return useMutation({
    mutationFn: setPassword,
    onSuccess: (response: any) => {
      successToast({ message: "Password Set Successfully!" })
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err)
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
      errorToast(err)
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useSendResetPasswordOTP = (fn?: (v: any) => void) => {
  return useMutation({
    mutationFn: sendResetPasswordOTP,
    onSuccess: (response: any) => {
      successToast({ message: "OTP Sent Successfully!" })
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err)
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useConfirmResetPasswordOTP = (fn?: (v: any) => void) => {
  return useMutation({
    mutationFn: confirmResetPasswordOTP,
    onSuccess: (response: any) => {
      successToast({ message: "OTP Validated Successfully!" })
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err)
    },
  });
};