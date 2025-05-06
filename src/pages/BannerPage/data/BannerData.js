import React from 'react';
import { Button, Card, Image, Table } from 'antd';

const BannerData = ({
  bannersData,
  openCategoryModal,
  openDeleteModal,
  openArticleMoreInfoModal,
}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Title (UZ)',
      dataIndex: 'title_uz',
      key: 'title_uz',
      render: (text) => (
        <span>{text.length > 10 ? text.slice(0, 10) + '...' : text}</span>
      ),
    },
    {
      title: 'Title (RU)',
      dataIndex: 'title_ru',
      key: 'title_ru',
      render: (text) => (
        <span>{text.length > 10 ? text.slice(0, 10) + '...' : text}</span>
      ),
    },
    {
      title: 'Title (ENG)',
      dataIndex: 'title_eng',
      key: 'title_eng',
      render: (text) => (
        <span>{text.length > 10 ? text.slice(0, 10) + '...' : text}</span>
      ),
    },
    {
      title: 'Description (UZ)',
      dataIndex: 'description_uz',
      key: 'description_uz',
      render: (text) => (
        <span>{text.length > 10 ? text.slice(0, 10) + '...' : text}</span>
      ),
    },
    {
      title: 'Description (RU)',
      dataIndex: 'description_ru',
      key: 'description_ru',
      render: (text) => (
        <span>{text.length > 10 ? text.slice(0, 10) + '...' : text}</span>
      ),
    },
    {
      title: 'Description (ENG)',
      dataIndex: 'description_eng',
      key: 'description_eng',
      render: (text) => (
        <span>{text.length > 10 ? text.slice(0, 10) + '...' : text}</span>
      ),
    },
    {
      title: 'Mode',
      dataIndex: 'mode',
      key: 'mode',
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text) => (
        <Image
          src={text}
          alt="image"
          width={50}
          height={50}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openCategoryModal(record)}>
            <svg
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>

          <Button type="link" onClick={() => openDeleteModal(record.id)}>
            <svg
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </>
      ),
      align: 'center',
    },
  ];
  return (
    <Table
      dataSource={bannersData}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

export default BannerData;
