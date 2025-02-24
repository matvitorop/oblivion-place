import { Link } from "react-router-dom";

/**
 * Test component that renders a simple test page with a navigation link.
 * 
 * @returns {JSX.Element} The rendered Test page component.
 */
export default function Test() {

    return (
        <div>
            <h1 id="tableLabel">Test page</h1>
            <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Play</Link>
        </div>
    )
}