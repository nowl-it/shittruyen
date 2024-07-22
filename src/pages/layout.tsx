import { cn } from '@/lib/utils';
import ThemeConfig from '@/themes.conf.json';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Be_Vietnam_Pro } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';

const { general, resource } = ThemeConfig;
const { theme: defaultTheme } = general.default;
const { themes } = resource;

const font = Be_Vietnam_Pro({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['vietnamese'],
	display: 'swap'
});

export const metadata: Metadata = {
	title: 'Shit Truyện Desktop App',
	description: 'Cứt Truyện nhưng là bản app'
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const COOKIES = cookies();

	function resolveTheme() {
		const themeJSON = COOKIES.get('theme');
		if (!themeJSON) return defaultTheme.value;

		const { value: themeJSONValue } = themeJSON;

		try {
			const themeParsed = JSON.parse(themeJSONValue);
			const {
				state: { theme }
			} = themeParsed;
			return theme;
		} catch (error) {
			return defaultTheme.value;
		}
	}

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('relative transition-all duration-300 ease-linear', font.className)}>
				<ThemeProvider
					defaultTheme={resolveTheme()}
					themes={themes.map((theme) => theme.value)}
					attribute="class"
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
