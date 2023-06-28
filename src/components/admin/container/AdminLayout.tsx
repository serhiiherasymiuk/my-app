import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import "./admin.scss";
import {Outlet} from "react-router-dom";


export const AdminLayout = () => {
    return (
        <>
            <AdminHeader/>
            <div className={"admin container"}>
                <div className="row">
                    <AdminSidebar/>
                    <main className="col-sm-8 col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    )
}