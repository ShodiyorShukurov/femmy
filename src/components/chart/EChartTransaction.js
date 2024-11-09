import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import useDashboard from "../../hooks/UseDashboard";

function EChartTransaction() {
  const { Title } = Typography;
  const { monthStatistics } = useDashboard();

  const eChart = {
    series: [
      {
        name: "",
        data: monthStatistics
          ? monthStatistics.map((data) =>
              (Number(data.total_amount) / 100).toFixed(2)
            )
          : [],
        color: "#fff",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: monthStatistics
          ? monthStatistics.map((data, index) => index + 1)
          : [],
        labels: {
          show: true,
          style: {
            colors: Array(12).fill("#fff"),
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: Array(12).fill("#fff"),
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val, { dataPointIndex }) {
            const monthData = monthStatistics[dataPointIndex];
            return `
              Total Amount: ${val} so'm<br/>
              Percentage Increase: ${monthData.percentage_increase + " %" ?? "N/A"}
            `;
          },
        },
      },
    },
  };

  return (
    <>
      <Title level={5}>Transactions Statistics</Title>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
    </>
  );
}

export default EChartTransaction;
