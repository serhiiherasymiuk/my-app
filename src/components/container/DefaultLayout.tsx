import { Outlet } from "react-router-dom";
import "./default.scss";
import { DefaultHeader } from "./DefaultHeader";

export const DefaultLayout = () => {
  return (
    <main>
      <DefaultHeader />
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};
