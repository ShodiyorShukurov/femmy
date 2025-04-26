import React from 'react';
import { Row, Col, Card, Button, Space } from 'antd';
import useUserList from '../../hooks/UseUserList';
import Main from '../../components/layout/Main';
import UserData from './data/UserData';
import MoreInfoModal from './components/MoreInfoModal';
import PasswordModal from './components/PasswordModal';

function UsersListTable() {
  const {
    userListData,
    next,
    setNext,
    selectedUser,
    setSelectedUser,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    isLoading,
    openMessageModal,
    isModalVisible,
    handleCancel,
    fetchUserListData
  } = useUserList();

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={'Users Information'}
            >
              <div className="table-responsive">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <UserData
                    userListData={userListData}
                    showUserInfoModal={showUserInfoModal}
                    openMessageModal={openMessageModal}
                  />
                )}
              </div>
              <Space style={{ padding: '10px' }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    Previous
                  </Button>
                )}

                {userListData?.length >= 50 ? (
                  <Button color="dark" onClick={() => setNext(next + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button variant="text" color="dark" disabled>
                    Next
                  </Button>
                )}
              </Space>
            </Card>
          </Col>
        </Row>

        {/*More Info User*/}
        <MoreInfoModal
          isModalUserInfo={isModalUserInfo}
          setIsModalUserInfo={setIsModalUserInfo}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        <PasswordModal
          isModalVisible={isModalVisible}
          selectedUser={selectedUser}
          handleCancel={handleCancel}
          fetchUserListData={fetchUserListData}
        />
      </div>
    </Main>
  );
}

export default UsersListTable;
