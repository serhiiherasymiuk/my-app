import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { ICategory } from "../../../interfaces/category";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCategory, setCategories } from "../../../redux/category";
import { RootState } from "../../../redux/store";
import { ModalDelete } from "../../common/ModalDelete";
import http_common from "../../../http_common";

export const CategoryList = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    http_common.get("api/category").then((resp) => {
      dispatch(setCategories(resp.data));
    });
  }, []);

  return (
    <>
      <Link to={"category/create"}>
        <button type="button" className="btn btn-dark">
          Create
        </button>
      </Link>

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
          {categories.map((c: ICategory) => {
            return (
              <React.Fragment key={c.id}>
                <tr>
                  <th scope="row">{c.id}</th>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <img width={50} src={c.image} alt="" />
                  </td>
                  <td className="buttons-container">
                    <ModalDelete id={c.id} text={c.name}></ModalDelete>
                    <Link
                      to={`/category/edit/${c.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};