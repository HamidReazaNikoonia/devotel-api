import { useRoutes } from "react-router-dom";

// import { useAuth } from "@/lib/auth";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

const Landing = () => <div>Landing</div>;
const VerifyEmail = () => <div>Please Verify Your Email</div>;

export const AppRoutes = () => {
  //   const auth = useAuth();
  const APP_LOCAL_STORAGE_PREFIX = process.env.REACT_APP_LOCAL_STORAGE_PREFIX || '';
  
  const auth = localStorage.getItem(`${APP_LOCAL_STORAGE_PREFIX}/token`);


  const commonRoutes = [{ path: "/", element: <Landing /> }, {path: '/verifyemail', element: <VerifyEmail />}];

  const routes = !!auth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
