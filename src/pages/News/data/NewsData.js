import { Image, Table } from "antd";
import parse from "html-react-parser";

const NewsData = ({
 newsListData
}) => {
  const dataIndex =
    newsListData?.length > 0
      ? newsListData.map((news, index) => ({
          id: index + 1,
          data: parse(news.data),
          image_url: news.image_url ?<Image src={news.image_url} width={100}/> : "Not found",
          source: news.source,
          subscribe: news.subscribe,
          user_count: news.user_count,
          create_at: news.create_at.slice(0,10),
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
      title: "Data",
      dataIndex: "data",
      key: "data",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      align: "center",
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

    {
      title: "Subscribe",
      dataIndex: "subscribe",
      key: "subscribe",
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
