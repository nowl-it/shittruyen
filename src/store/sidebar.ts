import { Bookmark } from '@/types/bookmark';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type SidebarState = {
	isActive: boolean;
	bookmark: Bookmark[];
};

export type SidebarAction = {
	changeStatus: (status: boolean) => void;
};

const useSidebarStore = create<SidebarState & SidebarAction>()(
	persist(
		(set) => ({
			isActive: false,
			bookmark: [],
			changeStatus: (status) => set({ isActive: status })
		}),
		{
			name: 'sidebar-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useSidebarStore;
