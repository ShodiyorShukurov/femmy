import { Button, Image, Table } from 'antd';

const AllaCategoryData = ({
  allaCategoryData,
  openCategoryModal,
  openDeleteModal,
}) => {
  const dataIndex =
    allaCategoryData?.length > 0
      ? allaCategoryData?.map((alla, index) => ({
          id: index + 1,
          title_uz: alla.title_uz,
          title_ru: alla.title_ru,
          title_en: alla.title_en,
          type: alla.type,
          is_free: alla.is_free ? "True" : "False",
          image: (
            <Image
              src={alla.image_url}
              width={100}
              style={{ borderRadius: '10px' }}
              alt={alla.image_name}
            />
          ),
          allaData: alla,
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
      title: 'Title Eng',
      dataIndex: 'title_en',
      key: 'title_en',
      align: 'center',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
    },
    {
      title: 'Is Free',
      dataIndex: 'is_free',
      key: 'is_free',
      align: 'center',
    },

    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => openCategoryModal(record.allaData)}
          >
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

          <Button type="link" onClick={() => openDeleteModal(record.allaId)}>
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
    />
  );
};

export default AllaCategoryData;
