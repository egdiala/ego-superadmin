export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  const decryptedToken = JSON.parse(atob(token.split(".")[1]));
  const expirationDate = new Date(decryptedToken?.exp * 1000);
  const isExpired = expirationDate < new Date();

  return !isExpired;
};

export const getAdminData = () => {
  const user = JSON.parse(localStorage.getItem("user") as string);

  if (!user) {
    return {
      auth_id: null,
      first_name: null,
      user_type: null,
    };
  }
  
  return {
    ...user,
    auth_id: user?.id,
    first_name: user?.first_name,
    user_type: user?.user_type,
  };
};