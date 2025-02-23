import { Link } from "react-router-dom";
export default function Home() {

    return (
        <div>
            <h1 id="tableLabel">Welcome to oblivion</h1>
            <p>This is basic functionality for playing in slot roulette</p>
            <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Play</Link>
        </div>
    )
}