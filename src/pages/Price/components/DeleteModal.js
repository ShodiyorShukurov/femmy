import { Button, Modal } from "antd";
import React from "react";

const DeleteModal = ({ closeDeleteModal, handleDelete, isModalDelete }) => {

  return (
    <Modal
      title="Delete Modal"
      open={isModalDelete}
      onCancel={closeDeleteModal}
      footer={[
        <Button key="submit" type="primary" danger onClick={handleDelete}>
         Delete
        </Button>,
        <Button key="back" onClick={closeDeleteModal}>
          Cancel
        </Button>,
      ]}
    >
      <p>Are you really going to delete it?</p>
    </Modal>
  );
};

export default DeleteModal;
