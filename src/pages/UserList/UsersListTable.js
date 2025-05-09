import React from 'react';
import { Row, Col, Card, Button, Space, Input } from 'antd';
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
    fetchUserListData,
  } = useUserList();

  const [value, setValue] = React.useState('');
  const [phoneValue, setPhoneValue] = React.useState('');

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={'Users Information'}
            >
              <form
                style={{ margin: '20px' }}
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchUserListData(value, phoneValue);
                }}
              >
                <Input
                  placeholder="Search by id"
                  name="search"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  style={{ width: '300px' }}
                />
                <Input
                  placeholder="Search by phone number"
                  name="search"
                  onChange={(e) => setPhoneValue(e.target.value)}
                  value={phoneValue}
                  style={{ width: '300px', marginLeft: '20px' }}
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: '10px' }}
                >
                  Search
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    fetchUserListData();
                    setValue('');
                    setPhoneValue('');
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Reset
                </Button>
              </form>
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