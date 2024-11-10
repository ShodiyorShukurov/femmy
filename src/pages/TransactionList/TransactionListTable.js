import React from "react";
import { Row, Col, Card, Button, Space,  Form, message } from "antd";
import useTransactionList from "../../hooks/UseTransactionList";
import Main from "../../components/layout/Main";
import TransactionData from "./data/TransactionData";
import MoreInfoModal from "./components/MoreInfoModal";

function TransactionListTable() {
  const {
    transactionListData,
    setNext,
    next,
    fetchTransactionMonthData,
    total,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    selectedUser,
    setSelectedUser,
    isLoading,
    fetchTransactionSortData,
  } = useTransactionList();

  const [form] = Form.useForm();

  const handleFetch = (value) => {
    if (value.month && value.year) {
      fetchTransactionMonthData(value.year, value.month);
    } else {
      message.warning("Please provide both month and year");
    }
  };

  if (isLoading) {
    return <Main>Loading...</Main>;
  }

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Transaction List"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px",
                }}
              >
                <Form form={form} layout="inline" onFinish={handleFetch}>
                  <Form.Item label="Month" name="month">
                    <select
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #d9d9d9",
                        padding: "4px 11px",
                        borderRadius: "6px",
                        outline: "none",
                      }}
                    >
                      <option>Select Month</option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </Form.Item>

                  <Form.Item label="Year" name="year">
                    <select
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #d9d9d9",
                        padding: "4px 11px",
                        borderRadius: "6px",
                        outline: "none",
                      }}
                    >
                      <option>Select Year</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Search
                    </Button>
                  </Form.Item>
                </Form>

                <div>
                  <Form.Item label="Method" name="month">
                    <select
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "1px solid #d9d9d9",
                        padding: "4px 11px",
                        borderRadius: "6px",
                        outline: "none",
                      }}
                      onChange={(evt) =>
                        fetchTransactionSortData(evt.target.value)
                      }
                    >
                      <option>Select Method</option>
                      <option value="CARD">CARD</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="CASH">CASH</option>
                    </select>
                  </Form.Item>
                </div>
              </div>

              {total?.sum ? (
                <div
                  style={{
                    marginBottom: "16px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#14A44D",
                    padding: "0 20px",
                  }}
                >
                  Total Amount: {Number(total?.sum / 100).toFixed(2)}
                </div>
              ) : (
                " "
              )}

              <div className="table-responsive">
                <TransactionData
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
                  <Button onClick={() => setNext(next + 1)}>Next</Button>
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

export default TransactionListTable;
