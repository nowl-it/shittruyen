import { ApplyThemes } from '@/lib/themes';
import ThemeConfiguration from 'global/themes.conf.json';
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

const { theme: defaultTheme } = ThemeConfiguration.general.default;
const { themes: AllThemes } = ThemeConfiguration.resource;

export type ThemeState = {
	theme: string;
};

export type ThemeAction = {
	setTheme: (theme: string, extraFunction?: Function) => void;
	getTheme: () => (typeof AllThemes)[0];
	updateThemes: () => Promise<boolean>;
};

const CookieStorage: StateStorage = {
	getItem: (name: string) => {
		const value = Cookies.get(name);
		const themeLocal = localStorage.getItem('theme');
		return value ?? themeLocal ?? defaultTheme.value;
	},
	setItem: (name: string, value: string) => {
		Cookies.set(name, value);
	},
	removeItem: (name: string) => {
		Cookies.remove(name);
	}
};

const useThemeStore = create<ThemeState & ThemeAction>()(
	persist(
		(set, get) => ({
			theme: defaultTheme.value,
			setTheme: (theme, extraFunction) => {
				if (extraFunction) extraFunction(theme);
				Cookies.set('theme', theme);
				set({ theme });
			},
			getTheme: () => {
				const { theme } = get();
				return AllThemes.find((t) => t.value === theme) ?? defaultTheme;
			},
			updateThemes: async () => {
				try {
					await ApplyThemes();
					return true;
				} catch (error) {
					return false;
				}
			}
		}),
		{
			name: 'theme',
			storage: createJSONStorage(() => CookieStorage)
		}
	)
);

export default useThemeStore;
