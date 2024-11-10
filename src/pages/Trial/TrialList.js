import React from "react";
import Main from "../../components/layout/Main";
import { Button, Card, Col, Row } from "antd";
import TrialData from "./data/TrialData";
import useTrial from "../../hooks/UseTrial";
import TrialModal from "./components/TrialModal";
import DeleteModal from "./components/DeleteModal";

const TrialList = () => {
  const {
    trialListData,
    isModalVisible,
    selectItem,
    showModal,
    handleCancel,
    setIsLoading,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
  } = useTrial();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Trail List"
            >
              <Button
                type="primary"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginTop: "20px",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
                onClick={() => showModal()}
              >
                Add Trail
              </Button>
              <div className="table-responsive">
                <TrialData
                  trialListData={trialListData}
                  showModal={showModal}
                  openDeleteModal={openDeleteModal}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/*Trail Add and edit modal*/}
        <TrialModal
          isModalVisible={isModalVisible}
          selectItem={selectItem}
          handleCancel={handleCancel}
          setIsLoading={setIsLoading}
        />

        {/*Trail Delete modal*/}

        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          handleDelete={handleDelete}
          isModalDelete={isModalDelete}
        />
      </div>
    </Main>
  );
};

export default TrialList;
