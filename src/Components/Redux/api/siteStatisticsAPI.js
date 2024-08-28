import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { SITE_STATISTICS } from "../apiConstants";

export const incrementSiteVisitStatistics = createAsyncThunk("incrementSiteVisitStatistics", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.PUT(`${SITE_STATISTICS.INCREMENT_SITE_VISIT_COUNT_STATISTICS}`, {});
        return response.data;
    } catch (error) {
        console.log(`${SITE_STATISTICS.INCREMENT_SITE_VISIT_COUNT_STATISTICS}`, error);
        return rejectWithValue(error.response.data);
    }
});
