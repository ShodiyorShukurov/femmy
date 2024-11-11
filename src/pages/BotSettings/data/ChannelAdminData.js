import { Button, Table } from "antd";
import parse from "html-react-parser";
import { data } from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const ChannelAdminData = ({ channelAdminData, showChannelModal }) => {

  const {changeValue} = useMain()

  const dataIndex =
    channelAdminData?.length > 0
      ? channelAdminData.map((admin) => ({
          username: parse(admin.username),
          admin: admin,
        }))
      : [];

  const columns = [
    {
      title: data[changeValue].bot_settings.admin_text,
      dataIndex: "username",
      key: "username",
      align: "center",
    },

    {
      title: data[changeValue].bot_settings.admin_action,
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
