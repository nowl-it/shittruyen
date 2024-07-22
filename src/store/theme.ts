import { CookieGet, CookieRemove, CookieSet } from '@/lib/cookie';
import ThemeConfiguration from '@global/themes.conf.json';
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
        const value = CookieGet(name);
        const themeLocal = localStorage.getItem('theme');
        return value ?? themeLocal ?? defaultTheme.value;
    },
    setItem: (name: string, value: string) => {
        CookieSet(name, value);
    },
    removeItem: (name: string) => {
        CookieRemove(name);
    }
};

const useThemeStore = create<ThemeState & ThemeAction>()(
    persist(
        (set, get) => ({
            theme: defaultTheme.value,
            setTheme: (theme, extraFunction) => {
                if (extraFunction) extraFunction(theme);
                CookieSet('theme', theme);
                set({ theme });
            },
            getTheme: () => {
                const { theme } = get();
                return AllThemes.find((t) => t.value === theme) ?? defaultTheme;
            },
            updateThemes: async () => {
                const res = await fetch('/api/update-themes');
                const { updated } = await res.json();
                return updated;
            }
        }),
        {
            name: 'theme',
            storage: createJSONStorage(() => CookieStorage)
        }
    )
);

export default useThemeStore;
