import { createStore } from "zustand/vanilla";

type LoadingStatus = "loaded" | "loading" | "error"

export type CommonState = {
  loadingStatus: LoadingStatus;
  isLoaded: boolean;
}

export type CommonActions = {
  toggleLoading: (status: LoadingStatus, isLoaded?: boolean) => void
}

export type CommonStore = CommonActions & CommonState

export const InitialCommonState: CommonState = {
  isLoaded: false,
  loadingStatus: "loading"
}

export const createCommonStore = (
  initialState: CommonState = InitialCommonState,
) => {
  return createStore<CommonStore>()((set) => ({
    ...initialState,
    toggleLoading: (loadingStatus, isLoaded = false) => set(() => ({ isLoaded, loadingStatus }))
  }))
}