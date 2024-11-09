import React from "react";
import Api from "../api";

const useNews = () => {
  const [newsListData, setNewsListData] = React.useState([]);
  const [next, setNext] = React.useState(1);

  const fetchNewsData = async () => {
    try {
      const res = await Api.get(`/news/list?limit=50&page=${next}`);
      setNewsListData(res.data.data);
    } catch (error) {
      console.log(error);
      if(error.message === "Request failed with status code 404"){
        setNewsListData([]);
      }
    }
  };

  React.useEffect(() => {
    fetchNewsData();
  }, [next]);

  return {
    newsListData,
    setNext,
    next,
  };
};

export default useNews;
