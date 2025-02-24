import { useEffect, useState } from "react";
import { useUserStore } from "../components/state-manager/useStore";
import { useBalanceStore } from "../components/state-manager/useBalanceStore";
import { useGameSessionStore } from "../components/state-manager/useSessionStore";

import { format } from "date-fns";
import { Button, Typography, Box, Card} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CasinoIcon from "@mui/icons-material/Casino";

/**
 * Dashboard component representing the main user interface for the game.
 * Displays balance, game history, and allows users to play a slot game.
 *
 * @returns {JSX.Element} The dashboard UI.
 */
export default function Dashboard() {
    const { user } = useUserStore();
    const { balance, fetchBalance, incrementBalance } = useBalanceStore();
    const { sessions, currentSession, fetchSessions, startSession } = useGameSessionStore();

    const [canAddBalance, setCanAddBalance] = useState(true);

    /** Fetches balance and game session history when the component mounts. */
    useEffect(() => {
        fetchBalance();
        fetchSessions();
    }, []);

    /**
     * Handles adding balance with a cooldown of 10 seconds.
     * Prevents multiple consecutive balance additions.
     */
    const handleAddBalance = async () => {
        if (!canAddBalance) return;
        setCanAddBalance(false);
        await incrementBalance();
        setTimeout(() => setCanAddBalance(true), 10000);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={3} width="100%" maxWidth="500px" mx="auto">
            <Typography variant="h4" fontWeight="bold">Welcome to oblivion</Typography>

            {user ? (
                <>
                    {/* Balance Display */}
                    <Typography variant="h6">Balance: <b>{balance}</b> coins</Typography>
                    {/* Action Buttons */}
                    <Box display="flex" gap={2}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleAddBalance}
                            startIcon={<AddCircleOutlineIcon />}
                            disabled={!canAddBalance}
                        >
                            Deposit +100
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={startSession}
                            startIcon={<CasinoIcon />}
                            disabled={balance < 10}
                        >
                            Play (10 coins)
                        </Button>
                    </Box>
                    {/* Current Game Session Result */}
                    {currentSession && (
                        <Card sx={{ mt: 3, p: 2, width: "100%", textAlign: "center", boxShadow: 3 }}>
                            <Typography variant="h6" color="primary">Result:</Typography>
                            <Typography variant="body1">
                                Symbols: <b>{Array.isArray(currentSession.symbols) ? currentSession.symbols.join(" ") : currentSession.symbols.split("").join(" ")}</b>
                            </Typography>
                            <Typography variant="body1" color={currentSession.isWin ? "green" : "red"}>
                                {currentSession.isWin ? `Prize: +${currentSession.prize} coins!` : "You lost!"}
                            </Typography>
                        </Card>
                    )}
                    {/* Game History */}
                    <Typography variant="h6">Game history:</Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                        {sessions.length > 0 ? (
                            sessions
                                .slice(1, 6)
                                .map((session) => (
                                    <Box key={session.id} p={1} border="1px solid gray" borderRadius={2}>
                                        <Typography variant="body2">
                                            {format(new Date(session.playedAt), "dd.MM.yyyy HH:mm:ss")} | Symbols:{" "}
                                            <b>
                                                {Array.isArray(session.symbols)
                                                    ? session.symbols.join(" ")
                                                    : session.symbols.split("").join(" ")}
                                            </b>{" "}
                                            | {session.isWin ? `Prize: +${session.prize} coins` : "Loss"}
                                        </Typography>
                                    </Box>
                                ))
                        ) : (
                            <Typography>No games played...</Typography>
                        )}
                    </Box>
                </>
            ) : (
                <Typography variant="h6" color="error">
                    Need authorization
                </Typography>
            )}
        </Box>
    );
}