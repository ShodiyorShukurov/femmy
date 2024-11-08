import { Button, Table } from "antd";

const ChannelAdminData = ({ channelAdminData, showChannelModal }) => {
  const dataIndex =
    channelAdminData?.length > 0
      ? channelAdminData.map((admin) => ({
          title: admin.title,
          username: admin.username,
          admin: admin,
        }))
      : [];

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showChannelModal(record.admin)}>
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

export default ChannelAdminData;
