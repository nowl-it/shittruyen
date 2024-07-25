import NotFound from '@/pages/not-found';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigation } from 'react-router-dom';
import Wrapped from './components/wrapped';
import Home from './pages';
import Welcome from './pages/welcome';
import useLoadingStore from './store/loading';
import useThemeStore from './store/theme';

export default function Root() {
	const setIsLoading = useLoadingStore((state) => state.setIsLoading);
	const { theme } = useTheme();
	const { setTheme } = useThemeStore();
	const navigation = useNavigation();
	const isWelcomeDone = localStorage.getItem('welcome');

	useEffect(() => {
		if (theme) setTheme(theme);

		if (navigation.state === 'loading') return;
		setIsLoading(false);

		return () => {
			setIsLoading(true);
		};
	}, [navigation.state]);

	return (
		<Routes>
			<Route path="/" element={!isWelcomeDone ? <Navigate to="/welcome" replace /> : <Wrapped />}>
				<Route index element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/welcome" element={<Welcome />} />
		</Routes>
	);
}
