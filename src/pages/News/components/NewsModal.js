import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Card, Table, Image } from "antd";
import Api from "../../../api";
import parse from "html-react-parser";
import "../NewsCard.css";

const NewsModal = ({
  isModalVisible,
  handleCancel,
  selectedItem,
  setSelectedItem,
}) => {
  const [newsData, setNewsData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const fetchNewsData = async () => {
    if (!selectedItem) return;
    try {
      const res = await Api.get(`/news/${selectedItem}`);
      if (res.data) {
        setNewsData(res.data.data.news);
        setUsersData(res.data.data.users)
      } else {
        setNewsData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userIndex = usersData?.length
    ? usersData?.map((user, index) => ({
        id: index +1,
        name: user.name,
        user_id: user.chat_id,
        phone_number: user.phone_number,
        subscribe: user.subscribe,
        duration: user.duration,
        expired: user.expired,
        source: user.source,
        userData: user,
      }))
    : [];

  const userColumns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
      render: (phone_number) =>
        phone_number ? (
          <a href={"tel:" + phone_number}>{phone_number}</a>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Subscribe",
      dataIndex: "subscribe",
      key: "subscribe",
      align: "center",
      render: (subscribe) => (
        <span>
          {subscribe ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },

    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      align: "center",
      render: (duration) => (
        <span>
          {duration ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },

    {
      title: "Expired",
      dataIndex: "expired",
      key: "expired",
      align: "center",
      render: (expired) => (
        <span>
          {expired !== null ? (
            expired
          ) : (
            <span style={{ color: "red " }}>Not Found</span>
          )}
        </span>
      ),
    },

    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      align: "center",
      render: (center) => (
        <span>
          {center !== null ? (
            center
          ) : (
            <span style={{ color: "red " }}>Not Found</span>
          )}
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchNewsData();
  }, [selectedItem]);

  return (
    <Modal
      title="News Info"
      open={isModalVisible}
      onCancel={() => {
        handleCancel();
        setSelectedItem(null);
        setUsersData([]);
        setNewsData([]);
      }}
      footer={null}
      width={1000}
    >
      <div className="news-info-card mb-24" title="News Info">
        <div className="media-container">
          {newsData.image_url ? (
            newsData.image_url.match(/\.(jpeg|jpg|gif|png)$/i) ? (
              <Image
                src={newsData.image_url}
                width={300}
                height={200}
                style={{ borderRadius: "8px", marginBottom: "16px" }}
              />
            ) : newsData.image_url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                src={newsData.image_url}
                width={300}
                height={200}
                controls
                style={{ borderRadius: "8px", marginBottom: "16px" }}
              />
            ) : (
              <div className="media-not-found">Media not found</div>
            )
          ) : (
            <div className="media-not-found">Media not found</div>
          )}
        </div>
        <div className="news-content">
          {typeof newsData.data === "string"
            ? parse(newsData.data)
            : "No content available"}
        </div>
      </div>

      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Users Info"
          >
            <Table
              className="table-responsive"
              dataSource={userIndex}
              columns={userColumns}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default NewsModal;
