import { Button, Image, Table } from "antd";
import parse from "html-react-parser";

const NewsData = ({ newsListData }) => {
  const dataIndex =
    newsListData?.length > 0
      ? newsListData.map((news, index) => ({
          id: index + 1,
          data: parse(news.data),
          image_url: news.image_url ? (
            news.image_url.match(/\.(jpeg|jpg|gif|png)$/i) ? (
              <Image src={news.image_url} width={100} />
            ) : news.image_url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video src={news.image_url} width={100} height={80} controls />
            ) : (
              "Not found"
            )
          ) : (
            "Not found"
          ),
          source: news.source,
          subscribe: news.subscribe,
          user_count: news.user_count,
          create_at: news.create_at.slice(0, 10),
        }))
      : [];

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    // {
    //   title: "Data",
    //   dataIndex: "data",
    //   key: "data",
    //   align: "center",
    //   render: (data) => (data.length > 10 ? data.slice(0, 10) : data),
    // },
    // {
    //   title: "Image or video",
    //   dataIndex: "image_url",
    //   key: "image_url",
    //   align: "center",
    // },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      align: "center",
      render: (source) => (
        <span>
          {source !== null ? (
            <span style={{ textTransform: "capitalize" }}>{source}</span>
          ) : (
            <span style={{ color: "red " }}>Not Found</span>
          )}
        </span>
      ),
    },

    {
      title: "Subscribe",
      dataIndex: "subscribe",
      key: "subscribe",
      align: "center",
      render: (subscribe) => (
        <span>
          {subscribe === true ? (
            <span style={{ color: "green" }}>Channel subscribers</span>
          ) : subscribe === false ? (
            <span style={{ color: "red" }}>Channel non-subscribers</span>
          ) : (
            <span style={{ color: "blue" }}>All</span>
          )}
        </span>
      ),
    },

    {
      title: "User count",
      dataIndex: "user_count",
      key: "user_count",
      align: "center",
    },

    {
      title: "Create",
      dataIndex: "create_at",
      key: "create_at",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: () => (
        <div>
          <Button type="link">
            <svg
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>
          </Button>

          <Button type="link">
            <svg
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>
          </Button>
        </div>
      ),
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

export default NewsData;
