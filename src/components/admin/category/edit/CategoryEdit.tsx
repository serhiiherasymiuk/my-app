import { Formik, Form, Field, ErrorMessage } from "formik";
import { ICategory, ICategoryEdit } from "../../../../interfaces/category";
import * as Yup from "yup";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { editCategory } from "../../../../redux/category";
import { useDispatch } from "react-redux";
import http_common from "../../../../http_common";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const CategoryEdit = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState<ICategoryEdit>({
    name: "",
    image: null,
    description: "",
  });

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
            category.name.toLowerCase() === value.toLowerCase() &&
            category.id !== Number(id)
        );
        return !categoryExists;
      }),
    description: Yup.string()
      .required("Description is required")
      .max(4000, "Description must be smaller"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleEdit = async (values: ICategoryEdit) => {
    console.log(values);
    try {
      await categorySchema.validate(values);
      const response = await http_common.post(
        `api/category/edit/${id}`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(editCategory(response));
      navigate("../..");
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  useEffect(() => {
    http_common.get(`api/category/${id}`).then((resp) => {
      const { data } = resp;
      setInitialValues((prevValues) => ({
        ...prevValues,
        name: data.name,
        description: data.description,
        image: data.image,
      }));
    });
  }, [id]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleEdit}
        validationSchema={categorySchema}
        enableReinitialize={true}
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
              Save
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
