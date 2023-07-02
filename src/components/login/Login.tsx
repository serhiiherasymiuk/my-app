import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import http_common from "../../http_common";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../interfaces/auth";

export const Login = () => {
  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: ILogin) => {
    try {
      await loginSchema.validate(values);

      await http_common.post("api/auth/login", values);

      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
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
