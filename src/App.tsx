import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ICategory {
  id: number;
  name: string;
  image: string;
  description: string;
}

function App() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(255, "Name must be smaller")
      .test("name", "Category already exists", function (value) {
        const { path, createError } = this;
        const categoryExists = categories.some(
          (category: ICategory) =>
            category.name.toLowerCase() === value.toLowerCase() &&
            value !=
              categories.find((category) => category.id === selectedCategory)
                ?.name
        );
        return categoryExists
          ? createError({ path, message: "Category already exists" })
          : true;
      }),
    description: Yup.string()
      .required("Description is required")
      .max(4000, "Description must be smaller"),
    image: Yup.string()
      .required("Image URL is required")
      .url("Invalid URL format"),
  });

  useEffect(() => {
    axios.get("http://laravel.pv125.com/api/category").then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  const initialValues: ICategory = {
    id: 0,
    name: "",
    image: "",
    description: "",
  };

  const [editValues, setEditValues] = useState<ICategory>({
    id: 0,
    name: "",
    image: "",
    description: "",
  });

  const handleEdit = async (values: ICategory) => {
    try {
      await categorySchema.validate(values);

      if (selectedCategory !== null) values.id = selectedCategory;

      const response = await axios.post(
        `http://laravel.pv125.com/api/category/edit`,
        values
      );
      const updatedCategory: ICategory = response.data;
      const updatedCategories = categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
      setCategories(updatedCategories);

      setSelectedCategory(null);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleSubmit = async (values: ICategory) => {
    try {
      await categorySchema.validate(values);

      const response = await axios.post(
        "http://laravel.pv125.com/api/category",
        values
      );
      const newCategory: ICategory = response.data;
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await axios.delete(`http://laravel.pv125.com/api/category/${categoryId}`);
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
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
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={editValues}
        onSubmit={handleEdit}
        validationSchema={categorySchema}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <Form>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Image</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => {
                  const isCategorySelected = selectedCategory === c.id;
                  return (
                    <React.Fragment key={c.id}>
                      {!isCategorySelected && (
                        <tr
                          onClick={() => {
                            setSelectedCategory(c.id);
                            setEditValues(c);
                          }}
                        >
                          <th scope="row">{c.id}</th>
                          <td>{c.name}</td>
                          <td>{c.description}</td>
                          <td>
                            <img width={50} src={c.image} alt="" />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDelete(c.id);
                              }}
                            >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </td>
                        </tr>
                      )}
                      {isCategorySelected && (
                        <tr>
                          <th scope="row">{c.id}</th>
                          <td>
                            <div className="form-group">
                              <Field
                                type="text"
                                className={`form-control ${
                                  errors.name && touched.name
                                    ? "is-invalid"
                                    : ""
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
                          </td>
                          <td>
                            <div className="form-group">
                              <Field
                                type="text"
                                className={`form-control ${
                                  errors.description && touched.description
                                    ? "is-invalid"
                                    : ""
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
                          </td>
                          <td>
                            <div className="form-group">
                              <Field
                                type="text"
                                className={`form-control ${
                                  errors.image && touched.image
                                    ? "is-invalid"
                                    : ""
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
                          </td>
                          <td>
                            <button
                              type="submit"
                              className="btn btn-warning btn-sm"
                            >
                              <i className="bi bi-cloud-download"></i>
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default App;
