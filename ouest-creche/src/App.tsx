import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import PageNotFound from '@/pages/PageNotFound';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/search', element: <Search /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
