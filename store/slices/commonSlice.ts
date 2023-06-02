import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export type Popups = 'contact' | 'main-menu';
export type Notifications = 'contact-form';

type StateProps = {
    isDocumentReady: boolean;
    lastScrollPosition: number;
    currentPopup: Popups | false;
    notification: Notifications | false;
};

const name = 'common';
const initialState: StateProps = {
    currentPopup: false,
    notification: false,
    isDocumentReady: false,
    lastScrollPosition: 0,
};

const commonSlice = createSlice({
    name, initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<Notifications | false>) => ({...state, notification: action.payload}),
        setDocumentReady: (state, action: PayloadAction<boolean>) => ({...state, isDocumentReady: action.payload}),
        setLastScroll: (state, action: PayloadAction<number>) => ({...state, lastScrollPosition: action.payload}),
        setPopup: (state, action: PayloadAction<Popups | false>) => ({...state, currentPopup: action.payload}),
    },
});

export const commonActions = commonSlice.actions;
export default commonSlice.reducer;