import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface initialStateProps {
    address_name: string | undefined;
    building_name?: string ;
    x: number;
    y: number;
    check?: boolean
}



const initialState:initialStateProps = {
    address_name: "",
    building_name:"",
    x: 0,
    y: 0,
    check: false
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<string | undefined>) => {
            state.address_name = action.payload;
        },
        setBuildingName: (state, action: PayloadAction<string | undefined>) => {
            state.building_name = action.payload;
        },
        setLat: (state, action: PayloadAction<number>) => {
            state.x = action.payload;
        },
        setLng: (state, action: PayloadAction<number>) => {
            state.y = action.payload;
        },
        setCheck: (state, action: PayloadAction<boolean>) => {
            state.check = action.payload;
        },
        setLocation: (state, action: PayloadAction<initialStateProps>) => {
            return { ...state, ...action?.payload };
        },
    }
})

export const { setAddress,setBuildingName,setLat,setLng,setLocation, setCheck } = locationSlice.actions;
export default locationSlice.reducer;