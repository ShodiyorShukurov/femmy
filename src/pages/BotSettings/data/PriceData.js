import { Button, Table } from "antd";
import { data } from "../../../mock/data";
import { useMain } from "../../../hooks/UseMain";

const PriceData = ({ data: priceData, showModal }) => {

  
  const { changeValue } = useMain();

  const dataIndex =
    priceData?.length > 0
      ? priceData.map((price, index) => ({
          id: index + 1,
          name: price.name,
          price: price.price,
          priceId: price.id,
        }))
      : [];

  const columns = [
    {
      title: data[changeValue].bot_settings.id,
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: data[changeValue].bot_settings.name,
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: data[changeValue].bot_settings.price,
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => `${Number(price / 100).toFixed(2)} sum`,
    },

    {
      title: data[changeValue].bot_settings.actions,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record)}>
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
      ),
      align: "center",
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

export default PriceData;
