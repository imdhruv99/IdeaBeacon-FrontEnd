import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllVerticals, getAllFunctions, getAllStages, getAllUserList } from "../Redux/api/commonAPI";

const useInitialFeatch = () => {
  const dispatch = useDispatch();

  //prommise for async API call
  const getFetchAPI = async () => {
    let Promises = [];

    Promises.push(dispatch(getAllStages()));
    Promises.push(dispatch(getAllVerticals()));
    Promises.push(dispatch(getAllFunctions()));
    Promises.push(dispatch(getAllUserList()));

    await Promise.all(Promises);
  };

  useEffect(() => {
    getFetchAPI();
  }, []);

  return;
};

export default useInitialFeatch;
