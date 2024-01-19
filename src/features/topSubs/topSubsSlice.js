import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getTopSubs = createAsyncThunk(
    'subs/getTopSubs',
    async () => {
        const result = await fetch('https://oauth.reddit.com/subreddits/popular.json')
        .then(result => {
            return result.json()
        })
        .then(JSONresult => {
            return JSONresult.data.children
        })
        .catch(error => {
            console.log(error)
            return true;
        })
        return result;
    }
)

const topSubsReducer = createSlice({
    name: 'subs',
    initialState: {
        subreddits: {},
        isPending: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTopSubs.pending, (state, action) => {
                state.isPending = true;
                state.hasError = false;
                console.log("pending")
            })
            .addCase(getTopSubs.fulfilled, (state, action) => {
                state.isPending = false;
                state.hasError = false;
                state.subreddits = action.payload;
            })
            .addCase(getTopSubs.rejected, (state, action) => {
                state.isPending = false;
                state.hasError = true;
                console.log("error")
            })
    }
})

export const getSubreddits = state => state.subreddits.subreddits;
export { getTopSubs }
export default topSubsReducer.reducer;