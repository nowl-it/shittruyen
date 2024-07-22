import { create } from 'zustand';

export type LoadingState = {
	isLoading: boolean;
};

export type LoadingAction = {
	setIsLoading: (loading: boolean) => void;
};

const useLoadingStore = create<LoadingState & LoadingAction>()((set) => ({
	isLoading: true,
	setIsLoading: (isLoading) => set({ isLoading })
}));

export default useLoadingStore;
