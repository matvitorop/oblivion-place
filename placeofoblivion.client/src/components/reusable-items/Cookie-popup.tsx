import CookieConsent from "react-cookie-consent";

const CookiePopup: React.FC = () => {
    return (
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            enableDeclineButton
            cookieName="user_consent"
            style={{ background: "#2B373B", fontSize: "14px" }}
            buttonStyle={{
                background: "#4CAF50",
                color: "#fff",
                fontSize: "14px",
                borderRadius: "4px",
            }}
            declineButtonStyle={{
                background: "#f44336",
                color: "#fff",
                fontSize: "14px",
                borderRadius: "4px",
            }}
            expires={150}
        >
            This website uses cookies to enhance the user experience. By continuing to browse, you agree to our{" "}
            <a href="/privacy-policy" style={{ color: "#FFD700" }}>
                Privacy Policy
            </a>.
        </CookieConsent>
    );
};
export default CookiePopup;