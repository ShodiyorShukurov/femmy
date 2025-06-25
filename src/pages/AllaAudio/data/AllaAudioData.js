import { Button, Image, Table } from 'antd';

const AllaAudioData = ({ allaAudio, openAuidoModal, openDeleteModal }) => {
  const dataIndex =
    allaAudio?.length > 0
      ? allaAudio.map((alla, index) => ({
          id: index + 1,
          title_uz: alla.title_uz,
          title_ru: alla.title_ru,
          title_en: alla.title_en,
          arabic_title: alla.arabic_title,
          description_uz:
            alla.description_uz?.length > 10
              ? alla.description_uz.slice(0, 10) + '...'
              : alla.description_uz,
          description_en:
            alla.description_en?.length > 10
              ? alla.description_en.slice(0, 10) + '...'
              : alla.description_en,
          description_ru:
            alla.description_ru?.length > 10
              ? alla.description_ru.slice(0, 10) + '...'
              : alla.description_ru,
              author_uz: alla.author_uz,
              author_ru: alla.author_ru,
              author_en: alla.author_en,
              sort_order: alla.sort_order,
              is_free: alla.is_free ? 'True' : 'False',
          photo: alla.image_url ? (
            <Image
              src={alla.image_url}
              alt="Audio"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          ) : (
            'No Image'
          ),
          category: alla.category?.id,
          duration: alla.duration,
          audio: (
            <audio controls style={{ width: '150px' }}>
              <source src={alla.audio_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ),
          allaId: alla.id,
        }))
      : [];

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Title Uz',
      dataIndex: 'title_uz',
      key: 'title_uz',
      align: 'center',
    },
    {
      title: 'Title Ru',
      dataIndex: 'title_ru',
      key: 'title_ru',
      align: 'center',
    },
    {
      title: 'Title En',
      dataIndex: 'title_en',
      key: 'title_en',
      align: 'center',
    },
    {
      title: 'Arabic Title',
      dataIndex: 'arabic_title',
      key: 'arabic_title',
      align: 'center',
    },
    {
      title: 'Description Uz',
      dataIndex: 'description_uz',
      key: 'description_uz',
      align: 'center',
    },
    {
      title: 'Description Ru',
      dataIndex: 'description_ru',
      key: 'description_ru',
      align: 'center',
    },
    {
      title: 'Description En',
      dataIndex: 'description_en',
      key: 'description_en',
      align: 'center',
    },
    {
      title: 'Author Uz',
      dataIndex: 'author_uz',
      key: 'author_uz',
      align: 'center',
    },
    {
      title: 'Author Ru',
      dataIndex: 'author_ru',
      key: 'author_ru',
      align: 'center',
    },
    {
      title: 'Author En',
      dataIndex: 'author_en',
      key: 'author_en',
      align: 'center',
    },
    {
      title: 'Sort Order',
      dataIndex: 'sort_order',
      key: 'sort_order',
      align: 'center',
    },
    {
      title: 'Is Free',
      dataIndex: 'is_free',
      key: 'is_free',
      align: 'center',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      align: 'center',
      render: (photo) => (
        <div style={{ width: '50px', height: '50px' }}>{photo}</div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      render: (categoryId) => (
        <span>{categoryId ? categoryId : 'No Category'}</span>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      align: 'center',
    },
    {
      title: 'Audio',
      dataIndex: 'audio',
      key: 'audio',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openAuidoModal(record.allaId)}>
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

          <Button
            type="link"
            danger
            onClick={() => openDeleteModal(record.allaId)}
          >
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
      columns={columns}
      dataSource={dataIndex}
      pagination={false}
      className="ant-border-space"
      rowKey="allaId"
    />
  );
};

export default AllaAudioData;
