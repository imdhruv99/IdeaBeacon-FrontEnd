import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authSlice from "./slice/auth-slice";
import ideaSlice from "./slice/idea-slice";
import commonSlice from "./slice/common-slice";
import siteStatisticsSlice from "./slice/site-statistics-slice";
import commentSlice from "./slice/comment-slice";
import stageSlice from "./slice/stage-slice";
import verticalSlice from "./slice/vertical-slice";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice,
    idea: ideaSlice,
    common: commonSlice,
    siteStatistics: siteStatisticsSlice,
    comment: commentSlice,
    stage: stageSlice,
    vertical: verticalSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
