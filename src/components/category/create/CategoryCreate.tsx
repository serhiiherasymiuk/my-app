import { Formik, Form, Field, ErrorMessage } from "formik";
import { ICategory, ICategoryCreate } from "../../../interfaces/category";
import * as Yup from "yup";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { addCategory } from "../../../redux/category";
import { useDispatch } from "react-redux";
import http_common from "../../../http_common";

export const CategoryCreate = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const dispatch = useDispatch();

  const initialValues: ICategoryCreate = {
    name: "",
    image: "",
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
    image: Yup.string()
      .required("Image URL is required")
      .url("Invalid URL format"),
  });

  const handleSubmit = async (values: ICategoryCreate) => {
    try {
      await categorySchema.validate(values);

      const response = await http_common.post("api/category", values);

      dispatch(addCategory(response.data));
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
        {({ errors, touched }) => (
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
              <Field
                type="text"
                className={`form-control ${
                  errors.image && touched.image ? "is-invalid" : ""
                }`}
                placeholder="Image url"
                name="image"
                aria-label="Image url"
                aria-describedby="basic-addon2"
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
