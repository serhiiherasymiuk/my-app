import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CategoryList } from "./components/category/list/CategoryList";
import { CategoryCreate } from "./components/category/create/CategoryCreate";
import { CategoryEdit } from "./components/category/edit/CategoryEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<CategoryList />} />
          <Route path="category">
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
