import React from "react";
import { Row, Col, Card } from "antd";
import Main from "../../components/layout/Main";
import usePrice from "../../hooks/UsePrice";
import PriceData from "./data/PriceData";
import PriceModal from "./components/PriceModal";
import ChannelAdminData from "./data/ChannelAdminData";
import ChannelAdminModal from "./components/ChannelAdminModal";
import useChannelAdmin from "../../hooks/UseChannelAdmin";

function BotSettings() {
  const {
    data,
    setEditData,
    isModalVisible,
    selectItem,
    showModal,
    handleCancel,
  } = usePrice();

  const {
    channelAdminData,
    setEditChannelData,
    isModalChannelVisible,
    showChannelModal,
    handleChannelCancel,
    selectChannelItem,
    setSelectChannelItem,
  } = useChannelAdmin();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Price Table"
            >
              <div className="table-responsive">
                <PriceData data={data} showModal={showModal} />
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Admin"
            >
              <div className="table-responsive">
                <ChannelAdminData
                  channelAdminData={channelAdminData}
                  showChannelModal={showChannelModal}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Modal for Edit Price */}
        <PriceModal
          setEditData={setEditData}
          isModalVisible={isModalVisible}
          selectItem={selectItem}
          handleCancel={handleCancel}
        />

        {/*Modal for Edit username*/}
        <ChannelAdminModal
          setEditChannelData={setEditChannelData}
          isModalChannelVisible={isModalChannelVisible}
          selectChannelItem={selectChannelItem}
          setSelectChannelItem={setSelectChannelItem}
          handleChannelCancel={handleChannelCancel}
        />
      </div>
    </Main>
  );
}

export default BotSettings;
