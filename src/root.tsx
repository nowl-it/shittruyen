import NotFound from '@/pages/not-found';
import { Route, Routes } from 'react-router-dom';
import Wrapped from './components/wrapped';
import Home from './pages';
import Welcome from './pages/welcome';

export default function Root() {
	return (
		<Routes>
			<Route path="/" element={<Wrapped />}>
				<Route index element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/welcome" element={<Welcome />} />
		</Routes>
	);
}
