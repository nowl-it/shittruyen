import fs from 'fs';
import path from 'path';

import ThemesConfig from 'global/themes.conf.json';

const THEMES_CSS_PATH = 'themes/';
const GLOBAL_CSS_FILE = THEMES_CSS_PATH + 'themes.css';
const THEMES_CONFIG_FILE = '../themes.conf.json';

const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || '';

const ThemeName = (theme: string) => {
	const [a, bc] = theme.split('/');
	const [b, c] = bc.split('-');

	const A = capitalize(a);
	const B = capitalize(b);
	const C = capitalize(c);

	const result = a === b ? `${A} (${C})` : `${A} (${B}) ${C}`;

	return result.replace(' ()', '');
};

async function getAllThemesCSS() {
	const dir_path = path.join(THEMES_CSS_PATH);
	const dir = await fs.promises.readdir(dir_path);
	const folders = (
		await Promise.all(
			dir.map(async (file) => {
				const filePath = path.join(dir_path, file);
				const stat = await fs.promises.stat(filePath);
				if (stat.isDirectory()) {
					return file;
				}
			})
		)
	).filter((folder) => folder !== undefined);

	const files = await Promise.all(
		folders.map(async (folder) => {
			const folder_path = path.join(dir_path, folder);
			const files = await fs.promises.readdir(folder_path);
			return files.map((file) => `${folder}/${file.replace('.css', '')}`);
		})
	);

	return files.flat();
}

function resolveThemeJSON(theme: string): { name: string; value: string } {
	return {
		name: ThemeName(theme),
		value: theme
	};
}

async function updateThemesConfigFile(themes: string[]) {
	const config = {
		...ThemesConfig,
		resource: {
			themes: themes.map((theme) => resolveThemeJSON(theme))
		}
	};
	await fs.promises.writeFile(THEMES_CONFIG_FILE, JSON.stringify(config, null, 4));
}

async function updateGlobalCSSFile(themes: string[]) {
	const content = themes.map((theme) => `@import '${theme}.css';\n`);
	await fs.promises.writeFile(GLOBAL_CSS_FILE, content);
}

export async function ApplyThemes() {
	const themes = await getAllThemesCSS();
	await updateThemesConfigFile(themes);
	await updateGlobalCSSFile(themes);
	console.log('[APPLY THEMES] Themes applied:', themes);
}
