import React from 'react';
import { Row, Col, Card, Button, Space } from 'antd';
import Main from '../../components/layout/Main';
import ArticlesData from './data/ArticlesData';
import ArticlesModal from './components/ArticlesModal';
import useArticles from '../../hooks/UseArticles';
import VideoModal from './components/VideoModal';
import ArticleMoreInfo from './components/ArticleMoreInfo';
import DeleteModal from './components/DeleteModal';

function ArticlesListTable() {
  const {
    articlesData,
    isModalVisible,
    openCategoryModal,
    handleCancel,
    fetchArticlesData,
    selectItem,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete,
    openVideoModal,
    closeVideoModal,
    isVideoModal,
    openArticleMoreInfoModal,
    closeArticleMoreInfoModal,
    articleMoreInfoModal,
    setNext,
    next,
  } = useArticles();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Articles List"
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
                onClick={() => openCategoryModal()}
              >
                Add Article
              </Button>
              <div className="table-responsive">
                <ArticlesData
                  articlesData={articlesData}
                  openCategoryModal={openCategoryModal}
                  openDeleteModal={openDeleteModal}
                  openVideoModal={openVideoModal}
                  openArticleMoreInfoModal={openArticleMoreInfoModal}
                />
              </div>

              <Space style={{ padding: '10px' }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    Previous
                  </Button>
                )}
                {articlesData?.length >= 50 ? (
                  <Button onClick={() => setNext(next + 1)}>Next</Button>
                ) : (
                  <Button variant="text" disabled>
                    Next
                  </Button>
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      <ArticlesModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        fetchArticlesData={fetchArticlesData}
        selectItem={selectItem}
      />

      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        isModalDelete={isModalDelete}
      />

      <VideoModal
        closeVideoModal={closeVideoModal}
        isVideoModal={isVideoModal}
        selectItem={selectItem}
      />

      <ArticleMoreInfo
        closeArticleMoreInfoModal={closeArticleMoreInfoModal}
        articleMoreInfoModal={articleMoreInfoModal}
        selectItem={selectItem}
        openVideoModal={openVideoModal}
      />
    </Main>
  );
}

export default ArticlesListTable;
