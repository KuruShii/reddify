import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getP0st = createAsyncThunk(
    'post/getP0st',
    async ({subreddit, id}) => {
        const result = await fetch('https://oauth.reddit.com/r/' + subreddit + '/comments/' + id + '.json')
        .then(result => {
            return result.json()
        })
        .then(JSONresult => {
            return JSONresult;
        })
        .catch(error => {
            console.log(error);
        })

        return result;
    }
)

const postReducer = createSlice({
    name: 'post',
    initialState: {
        post: {},
        isPending: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getP0st.pending, (state, action) => {
                state.isPending = true;
                state.hasError = false;
            })
            .addCase(getP0st.fulfilled, (state, action) => {
                state.isPending = false;
                state.hasError = false;
                state.post = action.payload;
            })
            .addCase(getP0st.rejected, (state, action) => {
                state.isPending = false;
                state.hasError = true;
            })
    }
})

export {getP0st};
export default postReducer.reducer;