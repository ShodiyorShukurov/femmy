import { Button, Card, Col, Row } from 'antd';
import Main from '../../components/layout/Main';
import useAllaCategory from '../../hooks/UseAllaCategory';
import AllModal from './components/AllModal';
import AllaCategoryData from './data/AllaCategoryData';
import DeleteModal from './components/DeleteModal';

const AllaCategoryList = () => {
  const {
    isModalVisible,
    selectItem,
    openCategoryModal,
    handleCancel,
    allaCategoryData,
    fetchAllCategories,
    isModalDelete,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
  } = useAllaCategory();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Alla Category List"
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
                onClick={() => openCategoryModal(null)}
              >
                Add Category
              </Button>
              <div className="table-responsive">
                <AllaCategoryData
                  allaCategoryData={allaCategoryData}
                  openCategoryModal={openCategoryModal}
                  openDeleteModal={openDeleteModal}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <AllModal
        isModalVisible={isModalVisible}
        selectItem={selectItem}
        handleCancel={handleCancel}
        fetchAllCategories={fetchAllCategories}
      />

      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        isModalDelete={isModalDelete}
      />
    </Main>
  );
};

export default AllaCategoryList;
