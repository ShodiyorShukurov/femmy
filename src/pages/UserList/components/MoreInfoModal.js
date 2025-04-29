import React from 'react';
import { Modal, Row, Col, Card, List, Collapse } from 'antd';
import Api from '../../../api';

const { Panel } = Collapse;

const MoreInfoModal = ({
  isModalUserInfo,
  setIsModalUserInfo,
  selectedUser,
  setSelectedUser,
}) => {
  /*User data start*/
  const [userData, setUserData] = React.useState([]);

  const fetchUserData = async () => {
    if (!selectedUser?.id) return;
    try {
      const res = await Api.get('/user/admin/' + selectedUser?.id);
      if (res.data) {
        setUserData([res.data.data]);
      } else {
        setUserData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*User data end*/

  React.useEffect(() => {
    fetchUserData();
  }, [selectedUser?.id]);

  return (
    <Modal
      title={''}
      open={isModalUserInfo}
      onCancel={() => {
        setIsModalUserInfo(false);
        setSelectedUser(null);
        setUserData([]);
      }}
      footer={null}
      width={700}
    >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={'User Information'}
            >
              <div className="table-responsive">
                {/* <Table
                  columns={userColumns}
                  dataSource={userIndex}
                  pagination={false}
                  className="ant-border-space"
                /> */}
                <List
                  style={{
                    border: 'none',
                  }}
                  size="small"
                  // header={<div>Header</div>}
                  // footer={<div>Footer</div>}
                  bordered
                  dataSource={userData}
                  renderItem={(item) => (
                    <>
                      <List.Item>Id: {item.id}</List.Item>
                      <List.Item>Name: {item.name}</List.Item>
                      <List.Item>
                        Email:{' '}
                        {item.email ? (
                          <a href={'mailto:' + item.email}>{item.email}</a>
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item
                        style={{
                          display: 'flex',
                          justifyContent: 'left',
                          alignItems: 'center',
                        }}
                      >
                        Chat Id:{' '}
                        {item.chat_id ? (
                          item.chat_id
                        ) : (
                          <span style={{ color: 'red', marginLeft: '3px' }}>
                            N/A
                          </span>
                        )}
                      </List.Item>
                      <List.Item>
                        Mode Id:{' '}
                        {item.mode_id ? (
                          item.mode_id
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Phone Number:{' '}
                        {item.phone_number ? (
                          <a href={'tel:' + item.phone_number}>
                            {item.phone_number}
                          </a>
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Age:{' '}
                        {
                          <span>
                            {item.age ? (
                              item.age
                            ) : (
                              <span style={{ color: 'red' }}>N/A</span>
                            )}
                          </span>
                        }
                      </List.Item>
                      <List.Item>
                        Height:{' '}
                        {
                          <span>
                            {item.height ? (
                              item.height
                            ) : (
                              <span style={{ color: 'red' }}>N/A</span>
                            )}
                          </span>
                        }
                      </List.Item>
                      <List.Item>
                        Weight:{' '}
                        {
                          <span>
                            {item.weight ? (
                              item.weight
                            ) : (
                              <span style={{ color: 'red' }}>N/A</span>
                            )}
                          </span>
                        }
                      </List.Item>
                      <List.Item>
                        Avarage period:{' '}
                        {
                          <span>
                            {item.avarage_period ? (
                              item.avarage_period
                            ) : (
                              <span style={{ color: 'red' }}>N/A</span>
                            )}
                          </span>
                        }
                      </List.Item>
                      <List.Item>
                        Bot step:{' '}
                        {
                          <span>
                            {item.bot_step ? (
                              item.bot_step
                            ) : (
                              <span style={{ color: 'red' }}>N/A</span>
                            )}
                          </span>
                        }
                      </List.Item>
                      <List.Item>
                        Cycle Duration:{' '}
                        {
                          <span>
                            {item.cycle_duration ? (
                              item.cycle_duration
                            ) : (
                              <span style={{ color: 'red' }}>N/A</span>
                            )}
                          </span>
                        }
                      </List.Item>
                      <List.Item>
                        Premium:{' '}
                        {item.premium ? (
                          <span style={{ color: 'green' }}>True</span>
                        ) : (
                          <span style={{ color: 'red' }}>False</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Telegram:{' '}
                        {item.telegram ? (
                          <span style={{ color: 'green' }}>True</span>
                        ) : (
                          <span style={{ color: 'red' }}>False</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Expired Date:{' '}
                        {item.expired_date ? (
                          item.expired_date
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Fetal age:{' '}
                        {item.fetal_age ? (
                          item.fetal_age
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Baby born date:{' '}
                        {item.baby_born_date ? (
                          item.baby_born_date
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                      Last period date:{' '}
                        {item.last_period_date ? (
                          item.last_period_date.slice(0,10)
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Pincode:{' '}
                        {item.pincode ? (
                          item.pincode
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Tracking:{' '}
                        {item?.tracking ? (
                          <Collapse>
                           <Panel header={`Trakicng`} key={'0'}>
                              {item?.tracking?.map((item, index) => (
                                <div key={index}>{item}</div>
                              ))}
                            </Panel>
                          </Collapse>
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                    </>
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default MoreInfoModal;
