import React from 'react'
import Main from '../../components/layout/Main'
import { Button, Card, Col, Row } from 'antd'
// import AiModal from './components/AiModal'
// import DeleteModal from './components/DeleteModal'
import PriceData from './data/PriceData'
import usePrice from '../../hooks/UsePrice'
import PriceModal from './components/PriceModal'
import DeleteModal from './components/DeleteModal'

const PricePage = () => {

    const {
        priceData,
        isModalVisible,
        setIsModalVisible,
        selectItem,
        openAiModal,
        handleCancel,
        openDeleteModal,
        closeDeleteModal,
        handleDelete,
        isModalDelete,
        fetchPriceData,
      } = usePrice()

  return (
    <Main>
          <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Price List"
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
                onClick={() => openAiModal()}
              >
                Add Price
              </Button>
              <div className="table-responsive">
                <PriceData
                  priceData={priceData}
                  openAiModal={openAiModal}
                  openDeleteModal={openDeleteModal}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <PriceModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        fetchPriceData={fetchPriceData}
        selectItem={selectItem}
      />

      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        isModalDelete={isModalDelete}
      />
    </Main>
  )
}

export default PricePage