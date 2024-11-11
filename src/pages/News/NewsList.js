import React from "react";
import Main from "../../components/layout/Main";
import { Button, Card, Col, Row, Space } from "antd";
import NewsData from "./data/NewsData";
import useNews from "../../hooks/UseNews";
import NewsModal from "./components/NewsModal";
import { data } from "../../mock/data";
import { useMain } from "../../hooks/UseMain";

const NewsList = () => {
  const {
    newsListData,
    setNext,
    next,
    isLoading,
    openMessageModal,
    isModalVisible,
    handleCancel,
    selectedItem,
    setSelectedItem,
  } = useNews();

  const {changeValue} = useMain()

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
              title={data[changeValue].news_list.title}
            >
              <div className="table-responsive">
                <NewsData
                  newsListData={newsListData}
                  openMessageModal={openMessageModal}
                />
              </div>
              <Space style={{ padding: "10px" }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    {data[changeValue].previous_button}
                  </Button>
                )}

                {newsListData?.length >= 50 ? (
                  <Button color="dark" onClick={() => setNext(next + 1)}>
                    {data[changeValue].next_button}
                  </Button>
                ) : (
                  <Button variant="text" color="dark" disabled>
                    {data[changeValue].next_button}
                  </Button>
                )}
              </Space>
            </Card>
          </Col>
        </Row>

        {/*News more info */}

        <NewsModal
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </Main>
  );
};

export default NewsList;
