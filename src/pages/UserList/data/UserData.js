import { Button, Table } from "antd";
import { useMain } from "../../../hooks/UseMain";

const UserData = ({
  showUserInfoModal,
  userListData,
}) => {
const { changeValue } = useMain();

  const dataIndex =
    userListData?.length > 0
      ? userListData.map((user, index) => ({
          id: index + 1,
          name: user.name,
          phone_number: user.phone_number,
          age: user.age,
          premium: user.premium,
          telegram: user.telegram,
          source: user.source,
          userData: user,
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
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
      render: (age) => (
        <span>
          {age ? (
            age
          ) : (
            <span style={{ color: "red" }}>
              N/A
            </span>
          )}
        </span>
      ),
    },

    {
      title: "Premium",
      dataIndex: "premium",
      key: "premium",
      align: "center",
      render: (premium) => (
        <span>
          {premium ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },

    {
      title: "Telegram",
      dataIndex: "telegram",
      key: "telegram",
      align: "center",
      render: (telegram) => (
        <span>
          {telegram ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: "Action",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => showUserInfoModal(record.userData)}
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
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
        </div>
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

export default UserData;
