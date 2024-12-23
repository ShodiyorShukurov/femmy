import { Button, Table } from "antd";

const TransactionData = ({ transactionListData, showUserInfoModal }) => {


  const dataIndex =
    transactionListData?.length > 0
      ? transactionListData?.map((device, index) => ({
          id: index + 1,
          phone_brand: device.phone_brand,
          platform: device.platform,
          phone_lang: device.phone_lang,
          app_lang: device.app_lang,
          transactionId: device.user_id,
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
      title: "Phone Brand",
      dataIndex: "phone_brand",
      key: "phone_brand",
      align: "center",
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      align: "center",
    },
    {
      title: "Phone Lang",
      dataIndex: "phone_lang",
      key: "phone_lang",
      align: "center",
    },
    {
      title: "App Lang",
      dataIndex: "app_lang",
      key: "app_lang",
      align: "center",
    },
    {
      title: "Action",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => showUserInfoModal(record.transactionId)}
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

export default TransactionData;