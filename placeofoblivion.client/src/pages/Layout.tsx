import { Link, Outlet } from "react-router-dom";
import { useUserStore } from "../components/state-manager/useStore";

/**
 * Layout component that defines the main structure of the application.
 * It includes a header, main content area, and footer.
 *
 * @returns {JSX.Element} The layout with navigation, content area, and footer.
 */
export default function Layout() {
    const { user, logout } = useUserStore();

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Header Section */}
            <header style={{ backgroundColor: "#333", padding: "10px", color: "#fff", textAlign: "center" }}>
                <nav
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        background: "#282c34",
                        color: "white"
                    }}
                >
                    {/* Main Page Link */}
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>Main</Link>
                    {/* User Authentication Controls */}
                    {user ? (
                        <div style={{ display: "flex", alignItems: "center" }}> {}
                            <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>{user.username}</Link>
                            <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Log in</Link>
                    )}
                </nav>

            </header>
            {/* Main Content Section */}
            <main style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1, padding: "20px" }}>
                <div style={{ maxWidth: "800px", textAlign: "center", width: "100%" }}>
                    <Outlet />
                </div>
            </main>
            {/* Footer Section */}
            <footer style={{ backgroundColor: "#333", padding: "10px", color: "#fff", textAlign: "center" }}>
                <p>© 2024 My Application. All rights reserved.</p>
            </footer>
        </div>
    );
}
