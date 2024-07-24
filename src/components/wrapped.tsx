import { cn } from '@/lib/utils';
import Loading from '@/pages/loading';
import useLoadingStore from '@/store/loading';
import useThemeStore from '@/store/theme';
import { useTheme } from 'next-themes';
import { Fragment, useEffect } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

export default function Wrapped() {
	const { isLoading, setIsLoading } = useLoadingStore((state) => state);
	const { theme } = useTheme();
	const { setTheme } = useThemeStore();
	const navigation = useNavigation();
	const navigate = useNavigate();

	function handleRouteChange() {
		const isWelcomeDone = localStorage.getItem('welcome');
		if (!isWelcomeDone) navigate('/welcome');
		if (navigation.state === 'loading') return;
		setIsLoading(false);
		if (theme) setTheme(theme);
	}

	useEffect(() => {
		handleRouteChange();

		return () => {
			setIsLoading(true);
		};
	}, [navigation.state]);

	if (isLoading) return <Loading />;

	return (
		<Fragment>
			<Header />
			<Sidebar />
			<main className="col-span-ful relative size-full min-h-full">
				<article className={cn('size-full min-h-full p-8')}>
					<Outlet />
				</article>
			</main>
		</Fragment>
	);
}
