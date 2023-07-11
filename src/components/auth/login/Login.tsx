import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import http_common from "../../../http_common";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../../interfaces/auth";
import { AuthUserActionType, IUser } from "../../../interfaces/user";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { RootState } from "../../../redux/store";

export const Login = () => {
  const dispatch = useDispatch();

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (values: ILogin) => {
    try {
      await loginSchema.validate(values);

      const result = await http_common.post("api/auth/login", values);

      const { data } = result;
      const token = data.access_token;
      localStorage.token = token;
      var user = jwtDecode(token) as IUser;
      dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: {
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
      console.log("User info", user);
      setMessage("");
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      {({ errors, touched }) => (
        <Form>
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <div className="form-group">
            <Field
              type="email"
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : ""
              }`}
              placeholder="Email"
              name="email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <Field
              type="password"
              className={`form-control ${
                errors.password && touched.password ? "is-invalid" : ""
              }`}
              placeholder="Password"
              name="password"
              aria-label="Password"
              aria-describedby="basic-addon2"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};
