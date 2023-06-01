import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export type Popups = 'contact' | 'main-menu';

type StateProps = {
    isDocumentReady: boolean;
    lastScrollPosition: number;
    currentPopup: Popups | false;
};

const name = 'common';
const initialState: StateProps = {
    currentPopup: false,
    isDocumentReady: false,
    lastScrollPosition: 0,
};

const commonSlice = createSlice({
    name, initialState,
    reducers: {
        setDocumentReady: (state, action: PayloadAction<boolean>) => ({...state, isDocumentReady: action.payload}),
        setLastScroll: (state, action: PayloadAction<number>) => ({...state, lastScrollPosition: action.payload}),
        setPopup: (state, action: PayloadAction<Popups | false>) => ({...state, currentPopup: action.payload}),
    },
});

export const commonActions = commonSlice.actions;
export default commonSlice.reducer;