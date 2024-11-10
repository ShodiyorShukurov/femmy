import React from "react";
import Main from "../../components/layout/Main";
import { Button, Card, Col, Row, Space } from "antd";
import NewsData from "./data/NewsData";
import useNews from "../../hooks/UseNews";

const NewsList = () => {
  const { newsListData, setNext, next, isLoading } = useNews();

  if(isLoading) {
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
              title="News List"
            >
              <div className="table-responsive">
                <NewsData newsListData={newsListData} />
              </div>
              <Space style={{ padding: "10px" }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    Previous
                  </Button>
                )}

                {newsListData?.length >= 50 ? (
                  <Button color="dark" onClick={() => setNext(next + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button variant="text" color="dark" disabled>
                    Next
                  </Button>
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default NewsList;
