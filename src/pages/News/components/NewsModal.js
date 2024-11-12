import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Card, Table, Image } from "antd";
import Api from "../../../api";
import parse from "html-react-parser";
import "../NewsCard.css";
import { data } from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const NewsModal = ({
  isModalVisible,
  handleCancel,
  selectedItem,
  setSelectedItem,
}) => {

  const {changeValue} = useMain();

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
    title: data[changeValue].user_info.id,
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: data[changeValue].user_info.name,
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: data[changeValue].user_info.user_id,
    dataIndex: "user_id",
    key: "user_id",
    align: "center",
  },
  {
    title: data[changeValue].user_info.phone_number,
    dataIndex: "phone_number",
    key: "phone_number",
    align: "center",
    render: (phone_number) =>
      phone_number ? (
        <a href={"tel:" + phone_number}>{phone_number}</a>
      ) : (
        data[changeValue].user_info.phone_number_error
      ),
  },
  {
    title: data[changeValue].user_info.subscribe,
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
    title: data[changeValue].user_info.duration,
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
    title: data[changeValue].user_info.expired,
    dataIndex: "expired",
    key: "expired",
    align: "center",
    render: (expired) => (
      <span>
        {expired !== null ? (
          expired
        ) : (
          <span style={{ color: "red " }}>
            {data[changeValue].user_info.expired_error}
          </span>
        )}
      </span>
    ),
  },

  {
    title: data[changeValue].user_info.source,
    dataIndex: "source",
    key: "source",
    align: "center",
    render: (source) => (
      <span style={{ textTransform: "capitalize" }}>
        {source !== null ? (
          source
        ) : (
          <span style={{ color: "red " }}>
            {data[changeValue].user_info.source_error}
          </span>
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
      title={data[changeValue].news_list.news_modal}
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
              <div className="media-not-found">
                {data[changeValue].news_list.media_not}
              </div>
            )
          ) : (
            <div className="media-not-found">
              {data[changeValue].news_list.media_not}
            </div>
          )}
        </div>
        <div className="news-content">
          {typeof newsData.data === "string"
            ? parse(newsData.data)
            : data[changeValue].news_list.news_content}
        </div>
      </div>

      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title={data[changeValue].user_info.title}
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
