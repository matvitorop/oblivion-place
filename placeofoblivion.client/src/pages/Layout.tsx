import { Link, Outlet } from "react-router-dom";
import { useUserStore } from "../components/state-manager/useStore";

export default function Layout() {
    const { user, logout } = useUserStore();

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>Main</Link>
                    {user ? (
                        <div style={{ display: "flex", alignItems: "center" }}> {}
                            <span>{user.username}</span>
                            <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Log in</Link>
                    )}
                </nav>

            </header>

            <main style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1, padding: "20px" }}>
                <div style={{ maxWidth: "800px", textAlign: "center", width: "100%" }}>
                    <Outlet />
                </div>
            </main>

            <footer style={{ backgroundColor: "#333", padding: "10px", color: "#fff", textAlign: "center" }}>
                <p>© 2024 My Application. All rights reserved.</p>
            </footer>
        </div>
    );
}
