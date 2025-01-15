import { Outlet } from "react-router-dom";

// AuthLayout.tsx
const AuthLayout = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden ">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
