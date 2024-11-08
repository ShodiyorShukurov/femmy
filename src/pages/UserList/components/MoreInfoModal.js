import React, { useState } from "react";
import { Modal, Button, Row, Col, Card, Table } from "antd";
import Api from "../../../api";

const MoreInfoModal = ({
  isModalUserInfo,
  setIsModalUserInfo,
  selectedUser,
  setSelectedUser,
}) => {
  /*User data start*/
const [userData, setUserData]= React.useState([])

  const userIndex = userData?.length
    ? userData?.map((user) => ({
        id: user.id,
        name: user.name,
        user_id: user.chat_id,
        phone_number: user.phone_number,
        subscribe: user.subscribe,
        duration: user.duration,
        expired: user.expired,
        source: user.source,
        userData: user,
      }))
    : [];

  const userColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Transaction ID",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
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
      title: "Subscribe",
      dataIndex: "subscribe",
      key: "subscribe",
      align: "center",
      render: (subscribe) => (
        <span>
          {subscribe ? (
            <span style={{ color: "green" }}>True</span>
          ) : (
            <span style={{ color: "red" }}>False</span>
          )}
        </span>
      ),
    },

    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
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
      title: "Expired",
      dataIndex: "expired",
      key: "expired",
      align: "center",
      render: (expired) => (
        <span>
          {expired !== null ? (
            expired
          ) : (
            <span style={{ color: "red " }}>Not Found</span>
          )}
        </span>
      ),
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
  ];

  const fetchUserData = async () => {
    if (!selectedUser?.chat_id) return;
    try {
      const res = await Api.get(`/user/${selectedUser?.chat_id}`);
      if (res.data) {
       setUserData([res.data.data]);
      } else {
        setUserData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*User data end*/

  /*User all transaction data start*/
  const [userTransactionData, setUserTransactionData] = useState([]);
  const dataIndex = userTransactionData?.length
    ? userTransactionData?.map((user) => ({
        id: user.id,
        transaction_id: user.transaction_id,
        user_id: user.user_id,
        amount: user.amount,
        success_trans_id: user.success_trans_id,
        ofd_url: user.ofd_url,
        method: user.method,
        create_at: user.create_at.slice(0, 10),
      }))
    : [];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
      align: "center",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (amount) => `${Number(amount / 100).toFixed(2)}`,
    },
    {
      title: "Success Transaction ID",
      dataIndex: "success_trans_id",
      key: "success_trans_id",
      align: "center",
    },

    {
      title: "Check ",
      dataIndex: "ofd_url",
      key: "ofd_url",
      align: "center",
      render: (_, record) =>
        record?.ofd_url ? (
          <a href={record?.ofd_url} target="_blanck">
            <Button type="link">See check</Button>
          </a>
        ) : (
          <span style={{ color: "red " }}>Not Found</span>
        ),
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      align: "center",
    },
    {
      title: "Create",
      dataIndex: "create_at",
      key: "create_at",
      align: "center",
    },
  ];

  const fetchUserTransactionData = async () => {
    if (!selectedUser?.chat_id) return;
    try {
      const res = await Api.get(
        `/transactions/user?user_id=${selectedUser?.chat_id}`
      );
      if (res.data.data.length > 0) {
        setUserTransactionData(res.data.data);
      } else {
        setUserTransactionData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  /*User all transaction data end*/

  React.useEffect(() => {
    fetchUserData();
    fetchUserTransactionData();
  }, [selectedUser?.chat_id]);

  return (
    <Modal
      title="User Info"
      open={isModalUserInfo}
      onCancel={() => {
        setIsModalUserInfo(false);
        setSelectedUser(null);
        setUserTransactionData([]);
        setUserData([]);
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
              title="User Info"
            >
              <div className="table-responsive">
                <Table
                  columns={userColumns}
                  dataSource={userIndex}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="User Transaction Info"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataIndex}
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

export default MoreInfoModal;
