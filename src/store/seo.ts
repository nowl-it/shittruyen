import { StateUpdate } from 'react-helmet-async';
import { create } from 'zustand';

export type SEOState = Partial<StateUpdate>;

export type SEOAction = {
	setState: (SEO: SEOState) => void;
};

const useSEOStore = create<SEOState & SEOAction>()((set) => ({
	setState: (SEO) => set(SEO)
}));

export default useSEOStore;
