import { createSlice } from "@reduxjs/toolkit";

import { incrementSiteVisitStatistics, getSiteVisitStatistics } from "../api/siteStatisticsAPI";

const initialState = {
    siteVisitCount: 0,
};

export const siteStatisticsSlice = createSlice({
    name: "SiteStatistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // increment site visit count
        builder.addCase(getSiteVisitStatistics.fulfilled, (state, action) => {
            state.siteVisitCount = action.payload[0].totalVisits;
        });

        builder.addCase(getSiteVisitStatistics.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ incrementSiteVisitStatistics:", action);
        });

        // increment site visit count
        builder.addCase(incrementSiteVisitStatistics.fulfilled, (state, action) => {

        });

        builder.addCase(incrementSiteVisitStatistics.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ incrementSiteVisitStatistics:", action);
        });
    },
});

export default siteStatisticsSlice.reducer;
