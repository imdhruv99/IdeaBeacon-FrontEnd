import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllCategory, getAllFunctions, getAllStages, getAllSubdivisionById } from "../Redux/api/comonAPI";

const useInitialFeatch = () => {
  const dispatch = useDispatch();

  //prommise for async API call
  const getFetchAPI = async () => {
    let Promises = [];

    Promises.push(dispatch(getAllStages()));
    Promises.push(dispatch(getAllCategory()));
    Promises.push(dispatch(getAllFunctions()));
    Promises.push(dispatch(getAllSubdivisionById()));

    await Promise.all(Promises);
  };

  useEffect(() => {
    getFetchAPI();
  }, []);

  return;
};

export default useInitialFeatch;
