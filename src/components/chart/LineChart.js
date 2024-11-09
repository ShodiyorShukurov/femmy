import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import useDashboard from "../../hooks/UseDashboard";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const { userStatisticsSource } = useDashboard();

  // Months as numbers for x-axis
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, 3, ..., 12]

  // Initialize a map to collect data per source, excluding "N/A"
  const dataBySource = {};

  userStatisticsSource?.forEach((entry) => {
    const monthIndex = new Date(entry.month.trim() + " 1, 2020").getMonth(); // Get index of month
    const source = entry.source.trim();

    // Skip entries where the source is "N/A"
    if (source !== "N/A") {
      const count = Number(entry.count);

      // Initialize the array for each source if it doesn't exist
      if (!dataBySource[source]) {
        dataBySource[source] = Array(12).fill(0);
      }

      // Populate count data
      dataBySource[source][monthIndex] = count;
    }
  });

  // Convert dataBySource into series format for ApexCharts
  const series = Object.keys(dataBySource).map((source) => ({
    name: source,
    data: dataBySource[source],
    offsetY: 0,
  }));

  // Define ApexCharts options
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
            {Object.keys(dataBySource).map((source) => (
              <li key={source}>
                <MinusOutlined /> {source}
              </li>
            ))}
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
