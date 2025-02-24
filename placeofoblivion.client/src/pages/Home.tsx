import { Link } from "react-router-dom";

/**
 * Home component that serves as the landing page of the application.
 * Displays a welcome message and a navigation link to the dashboard.
 * 
 * @returns {JSX.Element} The rendered Home page component.
 */
export default function Home() {

    return (
        <div>
            <h1 id="tableLabel">Welcome to oblivion</h1>
            <p>This is basic functionality for playing in slot roulette</p>
            <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Play</Link>
        </div>
    )
}