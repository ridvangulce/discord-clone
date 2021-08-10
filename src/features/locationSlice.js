import {createSlice} from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name: "location",
    initialState: {
        locationId: null,
        locationName: null
    },
    reducers: {
        setLocationInfo: (state, action) => {
            state.locationId = action.payload.locationId
            state.locationName = action.payload.locationName
        },

    }
});
export const {setLocationInfo} = locationSlice.actions;
export const selectLocationId = (state) => state.app.locationId;
export default locationSlice.reducer;