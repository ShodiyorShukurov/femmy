import { Button, Modal } from "antd";
import React from "react";

const DeleteModal = ({ closeDeleteModal, handleDelete, isModalDelete }) => {
  return (
    <Modal
      title="Delete"
      open={isModalDelete}
      onCancel={closeDeleteModal}
      footer={[
        <Button key="back" onClick={closeDeleteModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" danger onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Delete</p>
    </Modal>
  );
};

export default DeleteModal;
