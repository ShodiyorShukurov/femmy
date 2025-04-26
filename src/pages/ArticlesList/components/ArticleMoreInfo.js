import React from "react";
import { Modal, Row, Col, Card, Table, Button, Image } from "antd";
import Api from "../../../api";

const ArticleMoreInfo = ({
  articleMoreInfoModal,
  selectItem,
  closeArticleMoreInfoModal,
  openVideoModal,
}) => {
  /*User data start*/
  const [articleData, setArticleData] = React.useState([]);
  console.log(selectItem);
  const articleIndex = articleData?.length
    ? articleData?.map((article) => ({
        id: article.id,
        category_id: article.category_id,
        title: article.title,
        description:
          article?.description.length > 0
            ? article.description.slice(0, 10) + "..."
            : article.description,
        featured: article.featured,
        free: article.free,
        image: (
          <Image
            src={article.image_url}
            width={100}
            style={{ borderRadius: "10px" }}
            alt={article.title}
          />
        ),
        video_url: article.video_url ? (
          <Button type="link" onClick={() => openVideoModal(article)}>
            Watch the video
          </Button>
        ) : (
          ""
        ),
      }))
    : [];

  const userColumns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Category Id",
      dataIndex: "category_id",
      key: "category_id",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      align: "center",
      render: (featured) =>
        featured ? (
          <span style={{ color: "green" }}>True</span>
        ) : (
          <span style={{ color: "red" }}>False</span>
        ),
    },
    {
      title: "Free",
      dataIndex: "free",
      key: "free",
      align: "center",
      render: (free) =>
        free ? (
          <span style={{ color: "green" }}>True</span>
        ) : (
          <span style={{ color: "red" }}>False</span>
        ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
    },

    {
      title: "Video",
      dataIndex: "video_url",
      key: "video_url",
      align: "center",
    },
  ];

  const fetchUserData = async () => {
    if (
      selectItem === undefined || 
      (typeof selectItem === 'object' && selectItem !== null && Object.keys(selectItem).length === 0)
    ) return
    try {
      const res = await Api.get("/article/" + selectItem);
      if (res.data) {
        setArticleData([res.data.data]);
      } else {
        setArticleData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*User data end*/

  React.useEffect(() => {
    fetchUserData();
  }, [selectItem]);

  return (
    <Modal
      title={""}
      open={articleMoreInfoModal}
      onCancel={() => {
        closeArticleMoreInfoModal();
        setArticleData([]);
      }}
      footer={null}
      width={1000}
    >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={"Article Information"}
              footer={
                <Button key="back" onClick={closeArticleMoreInfoModal}>
                  Cancel
                </Button>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={userColumns}
                  dataSource={articleIndex}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ArticleMoreInfo;
