import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const getAbout = createAsyncThunk(
    'about/GetAbout',
    async ({subreddit}) => {
        const result = await fetch("https://oauth.reddit.com/"+subreddit+"/about.json")
        .then(result => {
            return result.json()
        })
        .then(JSONresult => {
            console.log(JSONresult)
            return JSONresult.data
        })
        .catch(error => {
            console.log(error)
        })
        return result
    }
)

const aboutReducer = createSlice({
    name: "about",
    initialState: {
        about: {},
        isPending: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAbout.pending, (state, action) => {
                state.isPending = true;
                state.hasError = false;
            })
            .addCase(getAbout.fulfilled, (state, action) => {
                state.isPending = false;
                state.hasError = false;
                state.about = action.payload;
            })
            .addCase(getAbout.rejected, (state, action) => {
                state.isPending = false;
                state.hasError = true;
            })
    }
})

export { getAbout }
export default aboutReducer.reducer