import React from "react";
import { Row, Col, Card, Button, Space} from "antd";
import useTransactionList from "../../hooks/UseDevicesList";
import Main from "../../components/layout/Main";
import DevicesData from "./data/DevicesData";
import MoreInfoModal from "./components/MoreInfoModal";


function DevicesListTable() {
  const {
    transactionListData,
    setNext,
    next,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    selectedUser,
    setSelectedUser,
  } = useTransactionList();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Devices List"
            >
              <div className="table-responsive">
                <DevicesData
                  transactionListData={transactionListData}
                  showUserInfoModal={showUserInfoModal}
                />
              </div>
              <Space style={{ padding: "10px" }}>
                {next > 1 ? (
                  <Button onClick={() => setNext(next - 1)}>Previous</Button>
                ) : (
                  ""
                )}
                {transactionListData?.length >= 50 ? (
                  <Button onClick={() => setNext(next + 1)}>
                   Next
                  </Button>
                ) : (
                  <Button disabled>Next</Button>
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      <MoreInfoModal
        isModalUserInfo={isModalUserInfo}
        setIsModalUserInfo={setIsModalUserInfo}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </Main>
  );
}

export default DevicesListTable;
