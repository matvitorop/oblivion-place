import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useUserStore } from "./components/state-manager/useStore";

function PrivateRoute({ element }: { element: JSX.Element }) {
    const { user } = useUserStore();
    return user ? element : <Navigate to="/login" replace />;
}

function AuthAccess({ element }: { element: JSX.Element }) {
    const { user } = useUserStore();
    return user ? <Navigate to="/" /> : element;
}

function App() {
    const { checkAuth } = useUserStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/login", element: <AuthAccess element={<Login />} /> },
                { path: "/register", element: <AuthAccess element={<Register />} /> },
                { path: "/dashboard", element: <PrivateRoute element={<Dashboard />} /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
