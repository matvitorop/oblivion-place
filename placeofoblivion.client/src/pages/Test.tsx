import { Link } from "react-router-dom";
export default function Test() {

    return (
        <div>
            <h1 id="tableLabel">Test page</h1>
            <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Play</Link>
        </div>
    )
}