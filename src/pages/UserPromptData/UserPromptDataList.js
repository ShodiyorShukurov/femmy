import React from 'react';
import { Row, Col, Card, Button, Space, Input } from 'antd';
import Main from '../../components/layout/Main';
// import UserData from './data/UserData';
// import MoreInfoModal from './components/MoreInfoModal';
import UsePrompt from '../../hooks/UsePrompt';
import UserPromptData from './data/UserPromptData';

function UserPromptDataList() {
  const {
     userPrompData,
    next,
    setNext,
    selectedUser,
    setSelectedUser,
    showUserInfoModal,
    isModalUserInfo,
    setIsModalUserInfo,
    isLoading,
    fetchUserPrompData,
  } = UsePrompt();

  const [value, setValue] = React.useState('');

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={'User Prompt Data'}
            >
              <form
                style={{ margin: '20px' }}
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchUserPrompData(value);
                }}
              >
                <Input
                  placeholder="Search by id"
                  name="search"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  style={{ width: '300px' }}
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
                    fetchUserPrompData();
                    setValue('');
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
                  <UserPromptData
                    userPrompData={userPrompData}
                    setSelectedUser={setSelectedUser}
                  />
                )}
              </div>
              <Space style={{ padding: '10px' }}>
                {next > 1 && (
                  <Button className="me-4" onClick={() => setNext(next - 1)}>
                    Previous
                  </Button>
                )}
                {userPrompData?.length >= 50 ? (
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

        {/* <MoreInfoModal
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
        /> */}
      </div>
    </Main>
  );
}

export default UserPromptDataList;