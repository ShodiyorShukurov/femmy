import { Table, Button, Image } from "antd";

const ArticlesData = ({
  articlesData,
  openCategoryModal,
  openDeleteModal,
  openVideoModal,
  openArticleMoreInfoModal,
}) => {
  const dataIndex =
    articlesData?.length > 0
      ? articlesData?.map((article, index) => ({
          id: index + 1,
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
          articleData: article,
          articleId: article.id,
        }))
      : [];

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
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
    {
      title: "Action",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => openArticleMoreInfoModal(record.articleId)}
          >
            <svg
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              <path
                fillRule="evenodd"
                d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>

          <Button
            type="link"
            onClick={() => openCategoryModal(record.articleData)}
          >
            <svg
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>

          <Button type="link" onClick={() => openDeleteModal(record.articleId)}>
            <svg
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </>
      ),
      align: "center",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataIndex}
      pagination={false}
      className="ant-border-space"
    />
  );
};

export default ArticlesData;
