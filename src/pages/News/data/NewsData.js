import { Button,  Table } from "antd";
import { data } from "../../../mock/data";
import {useMain} from '../../../hooks/UseMain'

const NewsData = ({ newsListData, openMessageModal }) => {

  const {changeValue} = useMain()

  const dataIndex =
    newsListData?.length > 0
      ? newsListData.map((news, index) => ({
          id: index + 1,
          source: news.source,
          subscribe: news.subscribe,
          user_count: news.user_count,
          create_at: news.create_at.slice(0, 10),
          newsId: news.id
        }))
      : [];

  const columns = [
    {
      title: data[changeValue].news_list.id,
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: data[changeValue].news_list.source,
      dataIndex: "source",
      key: "source",
      align: "center",
      render: (source) => (
        <span>
          {source !== null ? (
            <span style={{ textTransform: "capitalize" }}>{source}</span>
          ) : (
            <span style={{ color: "red " }}>
              {data[changeValue].news_list.source_error}
            </span>
          )}
        </span>
      ),
    },

    {
      title: data[changeValue].news_list.subscribe,
      dataIndex: "subscribe",
      key: "subscribe",
      align: "center",
      render: (subscribe) => (
        <span>
          {subscribe === true ? (
            <span style={{ color: "green" }}>
              {data[changeValue].news_list.subscribe_1}
            </span>
          ) : subscribe === false ? (
            <span style={{ color: "red" }}>
              {data[changeValue].news_list.subscribe_2}
            </span>
          ) : (
            <span style={{ color: "blue" }}>
              {data[changeValue].news_list.subscribe_3}
            </span>
          )}
        </span>
      ),
    },

    {
      title: data[changeValue].news_list.user_count,
      dataIndex: "user_count",
      key: "user_count",
      align: "center",
    },

    {
      title: data[changeValue].news_list.create_at,
      dataIndex: "create_at",
      key: "create_at",
      align: "center",
    },

    {
      title: data[changeValue].news_list.action,
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => openMessageModal(record.newsId)}>
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
