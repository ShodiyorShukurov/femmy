import { Button, Modal } from "antd";
import React from "react";

const VideoModal = ({ closeVideoModal, isVideoModal, selectItem }) => {

  return (
    <Modal
      title="Video Modal"
      open={isVideoModal}
      onCancel={closeVideoModal}
      footer={[
        <Button key="back" onClick={closeVideoModal}>
          Cancel
        </Button>,
      ]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <iframe
          width="320"
          height="240"
          style={{ borderRadius: "10px", marginBottom: "10px" }}
          src={selectItem?.video_url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <p style={{ fontWeight: 700 }}>{selectItem?.source}</p>
      </div>
    </Modal>
  );
};

export default VideoModal;
