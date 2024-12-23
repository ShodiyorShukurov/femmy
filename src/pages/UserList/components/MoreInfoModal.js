import React from "react";
import { Modal, Row, Col, Card, Table } from "antd";
import Api from "../../../api";

const MoreInfoModal = ({
  isModalUserInfo,
  setIsModalUserInfo,
  selectedUser,
  setSelectedUser,
}) => {
  /*User data start*/
  const [userData, setUserData] = React.useState([]);

  const userIndex = userData?.length
    ? userData?.map((user) => ({
        id: user.id,
        name: user.name,
        user_id: user.chat_id,
        model_id: user.model_id,
        phone_number: user.phone_number,
        age: user.age,
        height: user.height,
        weight: user.weight,
        avarage_period: user.avarage_period,
        bot_step: user.bot_step,
        cycle_duration: user.cycle_duration,
        premium: user.premium,
        telegram: user.telegram,
        expired_date: user.expired_date
      }))
    : [];

  const userColumns = [
    {
      title: "Id",
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
      title: "User Id",
      dataIndex: "user_id",
      key: "user_id",
      align: "center",
      render: (user_id) =>
        user_id ? user_id : <p style={{ color: "red" }}>N/A</p>,
    },
    {
      title: "Model Id",
      dataIndex: "model_id",
      key: "model_id",
      align: "center",
      render: (model_id) =>
        model_id ? model_id : <p style={{ color: "red" }}>N/A</p>,
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
          <p style={{ color: "red" }}>N/A</p>
        ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
      render: (age) => (
        <span>{age ? age : <span style={{ color: "red" }}>N/A</span>}</span>
      ),
    },

    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      align: "center",
      render: (height) => (
        <span>
          {height ? height : <span style={{ color: "red" }}>N/A</span>}
        </span>
      ),
    },

    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      align: "center",
      render: (weight) => (
        <span>
          {weight ? weight : <span style={{ color: "red" }}>N/A</span>}
        </span>
      ),
    },

    {
      title: "Avarage period",
      dataIndex: "avarage_period",
      key: "avarage_period",
      align: "center",
      render: (avarage_period) => (
        <span>
          {avarage_period ? (
            avarage_period
          ) : (
            <span style={{ color: "red" }}>N/A</span>
          )}
        </span>
      ),
    },

    {
      title: "Bot step",
      dataIndex: "bot_step",
      key: "bot_step",
      align: "center",
      render: (bot_step) => (
        <span>
          {bot_step ? bot_step : <span style={{ color: "red" }}>N/A</span>}
        </span>
      ),
    },

    {
      title: "Cycle Duration",
      dataIndex: "cycle_duration",
      key: "cycle_duration",
      align: "center",
      render: (cycle_duration) => (
        <span>
          {cycle_duration ? (
            cycle_duration
          ) : (
            <span style={{ color: "red" }}>N/A</span>
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
      title: "Expired Date",
      dataIndex: "expired_date",
      key: "expired_date",
      align: "center",
      render: (expired_date) => (
        <span>
          {expired_date ? (
            expired_date
          ) : (
            <span style={{ color: "red" }}>N/A</span>
          )}
        </span>
      ),
    },
  ];

  const fetchUserData = async () => {
    if (!selectedUser?.id) return;
    try {
      const res = await Api.get("/user/" + selectedUser?.id);
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

  React.useEffect(() => {
    fetchUserData();
  }, [selectedUser?.id]);

  return (
    <Modal
      title={""}
      open={isModalUserInfo}
      onCancel={() => {
        setIsModalUserInfo(false);
        setSelectedUser(null);
        setUserData([]);
      }}
      footer={null}
      width={1500}
    >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={"User Information"}
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
    </Modal>
  );
};

export default MoreInfoModal;
