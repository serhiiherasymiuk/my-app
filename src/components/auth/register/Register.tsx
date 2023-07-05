import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import http_common from "../../../http_common";
import { useNavigate } from "react-router-dom";
import { IRegister } from "../../../interfaces/auth";

export const Register = () => {
  const initialValues: IRegister = {
    image: null,
    email: "",
    lastName: "",
    name: "",
    phone: "",
    password: "",
    password_confirmation: "",
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    phone: Yup.string().required("Phone is required"),
    password: Yup.string().required("Password is required"),
    password_confirmation: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    image: Yup.mixed().required("Image is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: IRegister) => {
    try {
      await registerSchema.validate(values);

      console.log(values);

      await http_common.post("api/auth/register", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div className="form-group">
            <Field
              type="text"
              className={`form-control ${
                errors.name && touched.name ? "is-invalid" : ""
              }`}
              placeholder="Name"
              name="name"
              aria-label="Name"
              aria-describedby="basic-addon1"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <Field
              type="text"
              className={`form-control ${
                errors.lastName && touched.lastName ? "is-invalid" : ""
              }`}
              placeholder="Last Name"
              name="lastName"
              aria-label="Last Name"
              aria-describedby="basic-addon2"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <Field
              type="email"
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : ""
              }`}
              placeholder="Email"
              name="email"
              aria-label="Email"
              aria-describedby="basic-addon3"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <Field
              type="text"
              className={`form-control ${
                errors.phone && touched.phone ? "is-invalid" : ""
              }`}
              placeholder="Phone"
              name="phone"
              aria-label="Phone"
              aria-describedby="basic-addon4"
            />
            <ErrorMessage
              name="phone"
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
              aria-describedby="basic-addon5"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <Field
              type="password"
              className={`form-control ${
                errors.password_confirmation && touched.password_confirmation
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Confirm Password"
              name="password_confirmation"
              aria-label="Confirm Password"
              aria-describedby="basic-addon6"
            />
            <ErrorMessage
              name="password_confirmation"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className={`form-control ${
                errors.image && touched.image ? "is-invalid" : ""
              }`}
              placeholder="Image file"
              name="image"
              aria-label="Image file"
              aria-describedby="basic-addon7"
              onChange={(event) => {
                const file =
                  event.currentTarget.files && event.currentTarget.files[0];
                if (file) {
                  setFieldValue("image", file);
                }
              }}
            />
            <ErrorMessage
              name="image"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};
