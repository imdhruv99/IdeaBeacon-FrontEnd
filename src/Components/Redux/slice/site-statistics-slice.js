import { createSlice } from "@reduxjs/toolkit";

import { incrementSiteVisitStatistics } from "../api/siteStatisticsAPI";

const initialState = {
    siteVisitCount: undefined,
};

export const siteStatisticsSlice = createSlice({
    name: "SiteStatistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // increment site visit count
        builder.addCase(incrementSiteVisitStatistics.fulfilled, (state, action) => {
            const data = action.payload;
            state.siteVisitCount = data.totalVisits;
        });

        builder.addCase(incrementSiteVisitStatistics.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ incrementSiteVisitStatistics:", action);
        });
    },
});

export default siteStatisticsSlice.reducer;
