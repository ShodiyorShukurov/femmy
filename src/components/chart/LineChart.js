import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import useDashboard from "../../hooks/UseDashboard";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const { userStatisticsSource } = useDashboard();

  // Process data to organize by source and month
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initialize a map to collect data per source
  const dataBySource = {};

  userStatisticsSource?.forEach((entry,) => {
    const monthIndex = months.indexOf(entry.month.trim());
    const source = entry.source || "N/A";
    const count = Number(entry.count);

    if (!dataBySource[source]) {
      dataBySource[source] = Array(12).fill(0);
    }

    dataBySource[source][monthIndex] = count;
  });

  // Convert dataBySource into series format for ApexCharts
  const series = Object.keys(dataBySource).map((source) => ({
    name: source,
    data: dataBySource[source],
    offsetY: 0,
  }));

  const lineChart = {
    series: series,
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },
      xaxis: {
        categories: months,
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: Array(12).fill("#8c8c8c"),
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val} users`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Active Users by Source</Title>
          <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
