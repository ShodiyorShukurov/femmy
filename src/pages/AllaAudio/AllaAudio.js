import { Button, Card, Col, Row } from 'antd';
import Main from '../../components/layout/Main';
import AllaAudioData from './data/AllaAudioData';
import UseAllaAudio from '../../hooks/UseAllaAudio';
import AllaAudioModal from './components/AllaAudioModal';
import DeleteModal from './components/DeleteModal';

const AllaAudio = () => {
  const {
    allaAudio,
    fetchAllaAudio,
    isModalVisible,
    openAuidoModal,
    handleCancel,
    selectItem,
    isModalDelete,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
  } = UseAllaAudio();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Alla Audio List"
            >
              <Button
                type="primary"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginTop: '20px',
                  marginRight: '20px',
                  marginBottom: '20px',
                }}
                onClick={() => openAuidoModal(null)}
              >
                Add Audio
              </Button>
              <div className="table-responsive">
                <AllaAudioData
                  allaAudio={allaAudio.data}
                    openAuidoModal={openAuidoModal}
                  openDeleteModal={openDeleteModal}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <AllaAudioModal
        isModalVisible={isModalVisible}
        fetchAllaAudio={fetchAllaAudio}
        selectItem={selectItem}
        handleCancel={handleCancel}
      />

      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        isModalDelete={isModalDelete}
      />
    </Main>
  );
};

export default AllaAudio;
