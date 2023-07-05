import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <h1>Main Page</h1>
      <Link to={"/admin"} className={"btn btn-success"}>
        Admin Panel
      </Link>
    </>
  );
};
