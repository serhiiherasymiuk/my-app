import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../redux/category";
import { FC, useState } from "react";
import http_common from "../../http_common";

interface Props {
  id: number;
  text: string;
}

export const ModalDelete: FC<Props> = ({ id, text }) => {
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await http_common.delete(`api/category/${id}`);
      dispatch(deleteCategory(id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={(event) => {
          setShowDeleteModal(true);
        }}
      >
        <i className="bi bi-trash3"></i>
      </button>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {text}?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowDeleteModal(false);
              handleDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
