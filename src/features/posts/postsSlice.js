import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getPosts = createAsyncThunk(
    'posts/GetPosts',
    async ({subreddit, option}) => {
        console.log(subreddit)
        const response = await fetch("https://oauth.reddit.com/"+subreddit+"/" + option + ".json")
        .then(result => {
            return result.json()
        })
        .then(JSONresult => {
            return JSONresult.data.children
        })
        .catch(error => {
            console.log(error)
        })
        return response
    }
);

const postsReducer = createSlice({
    name: 'posts',
    initialState: {
        posts: {},
        isPending: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.isPending = true;
                state.hasError = false;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isPending = false;
                state.hasError = false;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isPending = false;
                state.hasError = true;
            })
    }
});

export { getPosts };
export default postsReducer.reducer;