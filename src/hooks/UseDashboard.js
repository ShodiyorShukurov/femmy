import React from "react";
import Api from "../api";

const useDashboard = () => {
  const [userStatisticsSource, setUserStatisticsSource] = React.useState([]);

  /*User data start*/
  const [userStatistics, setUserStatistics] = React.useState([]);

  const getUserStatisticsData = async () => {
    try {
      const res = await Api.get("/users/statistics");
      setUserStatistics(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  /*User data end*/

  /*Transaction Monthly data start*/
  const [monthStatistics, setMonthStatistics] = React.useState([]);

  const getMonthlyTransactionData = async () => {
    try {
      const res = await Api.get("/transactions/statistics/increase");
      setMonthStatistics(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  /*Transaction Monthly data end*/

  /*User Month Data start*/
  const [userStatisticsMonth, setUserStatisticsMonth] = React.useState([]);

  const getUserStatisticsMonthData = async () => {
    try {
      const res = await Api.get("/users/statistics/increase");
      setUserStatisticsMonth(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  /*User Month Data end*/

  /*User Source start*/
  const getUserStatisticsSouce = async () => {
    try {
      const res = await Api.get("/users/statistics/source");
      setUserStatisticsSource(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  /*User Source end*/

  React.useEffect(() => {
    /*User data*/
    getUserStatisticsData();

    /*Transaction Monthly data */
    getMonthlyTransactionData();

    /* User Month Data */
    getUserStatisticsMonthData();

    /*User Source Data*/ 
    getUserStatisticsSouce();
  }, []);

  return {
    monthStatistics,
    userStatistics,
    userStatisticsMonth,
    userStatisticsSource,
  };
};

export default useDashboard;
