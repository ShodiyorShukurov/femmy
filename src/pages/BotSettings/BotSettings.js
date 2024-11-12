import React from "react";
import { Row, Col, Card } from "antd";
import Main from "../../components/layout/Main";
import usePrice from "../../hooks/UsePrice";
import PriceData from "./data/PriceData";
import PriceModal from "./components/PriceModal";
import ChannelAdminData from "./data/ChannelAdminData";
import ChannelAdminModal from "./components/ChannelAdminModal";
import useChannelAdmin from "../../hooks/UseChannelAdmin";
import { data as mockData } from "../../mock/data";
import { useMain } from "../../hooks/UseMain";

function BotSettings() {
  const {
    data,
    setEditData,
    isModalVisible,
    selectItem,
    showModal,
    handleCancel,
    isLoading,
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

  const {changeValue} = useMain()

if(isLoading){
  return <Main>{data[changeValue].loading}</Main>;
}

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={mockData[changeValue].bot_settings.price_table}
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
              title={mockData[changeValue].bot_settings.admin}
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
