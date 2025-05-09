'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Card, Table } from 'antd';
import Api from '../../../api';

const MoreInfoModal = ({
  isModalUserInfo,
  setIsModalUserInfo,
  selectedUser,
  setSelectedUser,
}) => {
  const [deviceIdData, setDeviceIdData] = useState([]);
  const scrollPositionRef = useRef(0); // Joriy scroll pozitsiyasini saqlash

  const dataIndex =
    deviceIdData?.length > 0
      ? deviceIdData?.map((device) => ({
          id: device.id,
          transaction_id: device.transaction_id,
          user_id: device.user_id,
          phone_brand: device.phone_brand,
          platform: device.platform,
          phone_lang: device.phone_lang,
          app_lang: device.app_lang,
          transactionId: device.user_id,
        }))
      : [];

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'User Id',
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center',
    },
    {
      title: 'Phone Brand',
      dataIndex: 'phone_brand',
      key: 'phone_brand',
      align: 'center',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      align: 'center',
    },
    {
      title: 'Phone Lang',
      dataIndex: 'phone_lang',
      key: 'phone_lang',
      align: 'center',
    },
    {
      title: 'App Lang',
      dataIndex: 'app_lang',
      key: 'app_lang',
      align: 'center',
    },
  ];

  const fetchTransData = async () => {
    if (!selectedUser) return;
    try {
      const res = await Api.get(`/devices/${selectedUser}`);
      setDeviceIdData(res.data.data);
    } catch (error) {
      console.error('Error fetching device data:', error);
      setDeviceIdData([]);
    }
  };

  useEffect(() => {
    fetchTransData();
  }, [selectedUser]);

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

  const handleCancel = () => {
    setIsModalUserInfo(false);
    setSelectedUser(null);
    setDeviceIdData([]);
  };

  return (
    <Modal
      title=""
      open={isModalUserInfo}
      onCancel={handleCancel}
      footer={null}
      width={1100}
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
              title=""
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataIndex}
                  pagination={false}
                  className="ant-border-space"
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