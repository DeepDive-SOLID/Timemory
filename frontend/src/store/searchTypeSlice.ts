import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface initialStateProps {
    searchType: string
}

const initialState: initialStateProps = {
    searchType: "search",
}

const searchTypeSlice = createSlice({
    name: "searchType",
    initialState,
    reducers: {
        setSearchType: (state, action: PayloadAction<string>) => {
            state.searchType = action.payload
        }
    }

})

export const { setSearchType } = searchTypeSlice.actions;
export default searchTypeSlice.reducer;