import { Navigate, Route, Routes } from "react-router-dom";
import { CategoryCreate } from "./components/admin/category/create/CategoryCreate";
import { CategoryEdit } from "./components/admin/category/edit/CategoryEdit";
import { CategoryList } from "./components/admin/category/list/CategoryList";
import { AdminLayout } from "./components/admin/container/AdminLayout";
import { AdminDashboard } from "./components/admin/dashboard/AdminDashboard";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path={"/admin"} element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="category">
          <Route index element={<CategoryList />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit">
            <Route path=":id" element={<CategoryEdit />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
