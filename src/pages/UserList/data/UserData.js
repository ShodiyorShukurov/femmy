import { Button, Table } from 'antd';

const UserData = ({ showUserInfoModal, userListData, openMessageModal }) => {


  const dataIndex =
    userListData?.length > 0
      ? userListData.map((user, index) => ({
          id: index + 1,
          id1: user.id,
          name: user.name,
          phone_number: user.phone_number,
          age: user.age,
          premium: user.premium,
          telegram: user.telegram,
          source: user.source,
          userData: user,
        }))
      : [];

  const handleOpenNewTab = (data) => {
    const params = new URLSearchParams(data).toString();
    const newWindow = window.open(`/user-edit?${params}`, '_blank');
    if (newWindow) newWindow.focus();
  };

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Id',
      dataIndex: 'id1',
      key: 'id1',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
      render: (phone_number) =>
        phone_number ? (
          <a href={'tel:' + phone_number}>{phone_number}</a>
        ) : (
          'N/A'
        ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      render: (age) => (
        <span>{age ? age : <span style={{ color: 'red' }}>N/A</span>}</span>
      ),
    },

    {
      title: 'Premium',
      dataIndex: 'premium',
      key: 'premium',
      align: 'center',
      render: (premium) => (
        <span>
          {premium ? (
            <span style={{ color: 'green' }}>True</span>
          ) : (
            <span style={{ color: 'red' }}>False</span>
          )}
        </span>
      ),
    },

    {
      title: 'Telegram',
      dataIndex: 'telegram',
      key: 'telegram',
      align: 'center',
      render: (telegram) => (
        <span>
          {telegram ? (
            <span style={{ color: 'green' }}>True</span>
          ) : (
            <span style={{ color: 'red' }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => showUserInfoModal(record.userData)}
            style={{ paddingLeft: '10px', paddingRight: '10px' }}
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
          <Button type="link" onClick={() => handleOpenNewTab(record.userData)}>
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

          <Button type="link" onClick={() => openMessageModal(record.userData.id)}>
            <svg
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
              <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
            </svg>
          </Button>
        </div>
      ),
      align: 'center',
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
