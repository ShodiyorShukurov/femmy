import React from 'react';
import Main from '../../components/layout/Main';
import { Button, Card, Col, Row } from 'antd';
import useBanner from '../../hooks/UseBanner';
import BannerData from './data/BannerData';
import BannerModal from './components/BannerModal';
import DeleteModal from './components/DeleteModal';

const Banner = () => {
  const {
    bannersData,
    isModalVisible,
    setIsModalVisible,
    selectItem,
    openCategoryModal,
    handleCancel,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
    fetchBannersData,
    isVideoModal,
    openArticleMoreInfoModal,
    closeArticleMoreInfoModal,
    articleMoreInfoModal,
  } = useBanner();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Banner List"
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
                onClick={() => setIsModalVisible(true)}
              >
                Add Banner
              </Button>
              <div className="table-responsive">
                <BannerData
                  bannersData={bannersData}
                  openCategoryModal={openCategoryModal}
                  openDeleteModal={openDeleteModal}
                  openArticleMoreInfoModal={openArticleMoreInfoModal}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <BannerModal
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          selectItem={selectItem}
          fetchBannersData={fetchBannersData}
        />

        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          handleDelete={handleDelete}
          isModalDelete={isModalDelete}
        />
      </div>
    </Main>
  );
};

export default Banner;
