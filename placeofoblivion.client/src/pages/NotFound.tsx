import { Link } from "react-router-dom";
import styles from "./../styles/Home.module.css";

/**
 * NotFound component displays a 404 error page when a user navigates to a non-existent route.
 *
 * @returns {JSX.Element} The rendered 404 page.
 */
export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Not Found. Walk away, stalker</h1>
            <Link to="/" className={styles.link}>
                Back to main
            </Link>
        </div>
    );
}