import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CategoryList } from "./components/admin/category/list/CategoryList";
import { CategoryCreate } from "./components/admin/category/create/CategoryCreate";
import { CategoryEdit } from "./components/admin/category/edit/CategoryEdit";
import { AdminLayout } from "./components/admin/container/AdminLayout";
import { AdminDashboard } from "./components/admin/dashboard/AdminDashboard";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/"></Route>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
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
    </>
  );
}

export default App;
