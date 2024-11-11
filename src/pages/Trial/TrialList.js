import React from "react";
import Main from "../../components/layout/Main";
import { Button, Card, Col, Row } from "antd";
import TrialData from "./data/TrialData";
import useTrial from "../../hooks/UseTrial";
import TrialModal from "./components/TrialModal";
import DeleteModal from "./components/DeleteModal";
import { data } from "../../mock/data";
import { useMain } from "../../hooks/UseMain";

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
    isLoading,
    fetchTrailData,
  } = useTrial();

  const { changeValue } = useMain();

  if (isLoading) return <Main>Loading...</Main>;

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={data[changeValue].trial_list.title}
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
                {data[changeValue].trial_list.add_button}
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
          fetchTrailData={fetchTrailData}
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
