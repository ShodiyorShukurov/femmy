import React, { useRef, useEffect, useState } from 'react';
import { Table, Modal, Button } from 'antd';

const UserPromptData = ({ userPrompData }) => {
  const scrollRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrompts, setSelectedPrompts] = useState([]);

  const openPromptModal = (prompts) => {
    setSelectedPrompts(prompts);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPrompts([]);
  };

  const dataIndex =
    userPrompData?.length > 0
      ? userPrompData.map((item, index) => ({
          id: index + 1,
          user_id: item.user_id || 'N/A',
          article_ids: item.article_ids || [],
          create_at: item.create_at,
          prompts: item.prompts || [],
        }))
      : [];

  useEffect(() => {
    const tableBody = scrollRef.current?.querySelector('.ant-table-body');
    if (tableBody) {
      const handleScroll = () => {
        scrollPositionRef.current = tableBody.scrollTop;
      };
      tableBody.addEventListener('scroll', handleScroll);
      return () => tableBody.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center',
    },
    {
      title: 'Articles',
      dataIndex: 'article_ids',
      key: 'article_ids',
      align: 'center',
      render: (articles) =>
        articles.length > 0 ? (
          <span>{articles.join(', ')}</span>
        ) : (
          <span style={{ color: 'gray' }}>None</span>
        ),
    },
    {
      title: 'Created At',
      dataIndex: 'create_at',
      key: 'create_at',
      align: 'center',
      render: (val) => new Date(val).toLocaleString(),
    },
    {
      title: 'Prompts',
      dataIndex: 'prompts',
      key: 'prompts',
      align: 'center',
      render: (prompts) =>
        prompts.length > 0 ? (
          <Button type="link" onClick={() => openPromptModal(prompts)}>
            👁 View Prompts
          </Button>
        ) : (
          <span style={{ color: 'gray' }}>No prompts</span>
        ),
    },
  ];

  return (
    <div ref={scrollRef}>
      <Table
        columns={columns}
        dataSource={dataIndex}
        pagination={false}
        scroll={{ y: 600 }}
        rowKey={(record) => `${record.id}-${record.user_id}`}
      />

      {/* Modal */}
      <Modal
        title="User Prompts"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedPrompts.map((prompt) => (
          <div
            key={prompt.id}
            style={{
              marginBottom: 10,
              borderBottom: '1px solid #eee',
              paddingBottom: 6,
            }}
          >
            <strong>{prompt.is_me ? 'User:' : 'AI:'}</strong>{' '}
            <span>{prompt.message}</span>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default UserPromptData;
