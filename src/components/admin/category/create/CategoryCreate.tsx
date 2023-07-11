import { Formik, Form, Field, ErrorMessage } from "formik";
import { ICategory, ICategoryCreate } from "../../../../interfaces/category";
import * as Yup from "yup";
import { RootState, store } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { addCategory } from "../../../../redux/category";
import { useDispatch } from "react-redux";
import http_common from "../../../../http_common";
import { useNavigate } from "react-router-dom";
import {
  NotificationActionTypes,
  NotificationSetMessage,
} from "../../../../redux/reducers/notificationReducer";

export const CategoryCreate = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const dispatch = useDispatch();

  const initialValues: ICategoryCreate = {
    name: "",
    image: null,
    description: "",
  };

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(255, "Name must be smaller")
      .test("unique-category", "Category already exists", function (value) {
        if (!value) {
          return false;
        }
        const categoryExists = categories.some(
          (category: ICategory) =>
            category.name.toLowerCase() === value.toLowerCase()
        );
        return !categoryExists;
      }),
    description: Yup.string()
      .required("Description is required")
      .max(4000, "Description must be smaller"),
    image: Yup.mixed().required("Image is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: ICategoryCreate) => {
    try {
      await categorySchema.validate(values);

      const response = await http_common.post("api/category", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(addCategory(response.data));
      const action: NotificationSetMessage = {
        payload: "Category successfully created",
        type: NotificationActionTypes.SET_MESSAGE,
      };
      store.dispatch(action);
      navigate("..");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={categorySchema}
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
                aria-describedby="basic-addon2"
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
                  errors.description && touched.description ? "is-invalid" : ""
                }`}
                placeholder="Description"
                name="description"
                aria-label="Description"
                aria-describedby="basic-addon2"
              />
              <ErrorMessage
                name="description"
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
                aria-describedby="basic-addon2"
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
              Create
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
