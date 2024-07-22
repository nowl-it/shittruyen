import { Button } from '@/components/ui/button';
import { Route, Routes } from 'react-router-dom';
import Wrapped from '@/components/wrapped';
import Home from '@/pages';
import NotFound from '@/pages/not-found';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
