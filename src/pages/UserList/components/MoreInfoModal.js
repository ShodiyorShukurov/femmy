'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Modal, Row, Col, Card, List, Collapse } from 'antd';
import Api from '../../../api/index';

const { Panel } = Collapse;

const MoreInfoModal = ({
  isModalUserInfo,
  setIsModalUserInfo,
  selectedUser,
  setSelectedUser,
}) => {
  const [userData, setUserData] = useState([]);
  const scrollPositionRef = useRef(0); 

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
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (isModalUserInfo) {
      // Joriy scroll pozitsiyasini saqlash
      scrollPositionRef.current = window.scrollY;
      console.log('Modal opened, saved scroll:', scrollPositionRef.current);
      // Sahifani fixed holatga o‘tkazish
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Modal yopilganda scrollni qayta tiklash
      const scrollY = scrollPositionRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      console.log('Modal closed, restored scroll:', scrollY);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isModalUserInfo]);

  useEffect(() => {
    fetchUserData();
  }, [selectedUser?.id]);

  const handleCancel = () => {
    setIsModalUserInfo(false);
    setSelectedUser(null);
    setUserData([]);
  };

  return (
    <Modal
      title=""
      open={isModalUserInfo}
      onCancel={handleCancel}
      footer={null}
      width={700}
      centered
      maskClosable={true}
      autoFocusButton={null} // Avtomatik fokusni o‘chirish
      focusTriggerAfterClose={false} // Yopilganda fokusni qaytarmaslik
      bodyStyle={{
        maxHeight: '70vh',
        overflowY: 'auto',
      }}
      style={{
        zIndex: 10000,
      }}
    >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={'User Information'}
            >
              <div className="table-responsive">
                <List
                  style={{ border: 'none' }}
                  size="small"
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
                        {item.age ? (
                          item.age
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Height:{' '}
                        {item.height ? (
                          item.height
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Weight:{' '}
                        {item.weight ? (
                          item.weight
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Average period:{' '}
                        {item.avarage_period ? (
                          item.avarage_period
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Bot step:{' '}
                        {item.bot_step ? (
                          item.bot_step
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
                      </List.Item>
                      <List.Item>
                        Cycle Duration:{' '}
                        {item.cycle_duration ? (
                          item.cycle_duration
                        ) : (
                          <span style={{ color: 'red' }}>N/A</span>
                        )}
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
                          item.last_period_date.slice(0, 10)
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
                            <Panel header={`Tracking`} key={'0'}>
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