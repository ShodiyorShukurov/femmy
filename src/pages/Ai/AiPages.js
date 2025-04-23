import React from 'react'
import Main from '../../components/layout/Main'
import { Button, Card, Col, Row } from 'antd'
import AiData from './data/AiData'
import useAi from '../../hooks/UseAi'
import AiModal from './components/AiModal'
import DeleteModal from './components/DeleteModal'

const AiPages = () => {

    const {
        aiData,
        isModalVisible,
        setIsModalVisible,
        selectItem,
        openAiModal,
        handleCancel,
        openDeleteModal,
        closeDeleteModal,
        handleDelete,
        isModalDelete,
        fetchAiData,
      } = useAi()

  return (
    <Main>
          <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Ai"
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
                Add Ai
              </Button>
              <div className="table-responsive">
                <AiData
                  aiData={aiData}
                  openAiModal={openAiModal}
                  openDeleteModal={openDeleteModal}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <AiModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        fetchAiData={fetchAiData}
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

export default AiPages