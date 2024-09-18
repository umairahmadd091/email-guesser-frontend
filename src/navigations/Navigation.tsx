import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '../views/app/App';
import NotFound from '../views/notFound/NotFound';

const Navigations: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Navigations;
