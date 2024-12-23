import React from "react";
import { Row, Col, Card, Button} from "antd";
import Main from "../../components/layout/Main";
import CategoryData from "./data/CategoryData";
import useCategory from "../../hooks/UseCategory";
import CategoryModal from "./components/CategoryModal";
import DeleteModal from "../AdminPage/components/DeleteModal";

function CategoryListTable() {
  const {
    categoryData,
    isModalVisible,
    openCategoryModal,
    handleCancel,
    fetchCategoryData,
    selectItem,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isModalDelete
  } = useCategory();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Categories List"
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
                onClick={() => openCategoryModal()}
              >
                Add Category
              </Button>
              <div className="table-responsive">
                <CategoryData
                  categoryData={categoryData}
                  openCategoryModal={openCategoryModal}
                  openDeleteModal={openDeleteModal}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <CategoryModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        fetchCategoryData={fetchCategoryData}
        selectItem={selectItem}
      />

      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        isModalDelete={isModalDelete}
      />
    </Main>
  );
}

export default CategoryListTable;
