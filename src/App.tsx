import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CategoryList } from "./components/admin/category/list/CategoryList";
import { CategoryCreate } from "./components/admin/category/create/CategoryCreate";
import { CategoryEdit } from "./components/admin/category/edit/CategoryEdit";
import { AdminDashboard } from "./components/admin/dashboard/AdminDashboard";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import { AdminLayout } from "./components/admin/container/AdminLayout";
import { DefaultLayout } from "./components/container/DefaultLayout";
import { HomePage } from "./components/home/HomePage";
import Loader from "./components/common/loader/Loader";
import Notification from "./components/common/notification/Notification";

function App() {
  return (
    <>
      <Notification />
      <Loader />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

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
