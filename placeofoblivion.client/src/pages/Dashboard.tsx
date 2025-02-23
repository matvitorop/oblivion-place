import { useEffect, useState } from "react";
import { useUserStore } from "../components/state-manager/useStore";
import { useBalanceStore } from "../components/state-manager/useBalanceStore";
import { useGameSessionStore } from "../components/state-manager/useSessionStore";

import { Button, Typography, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CasinoIcon from "@mui/icons-material/Casino";

export default function Dashboard() {
    const { user } = useUserStore();
    const { balance, fetchBalance, incrementBalance } = useBalanceStore();
    const { sessions, currentSession, fetchSessions, startSession } = useGameSessionStore();

    const [canAddBalance, setCanAddBalance] = useState(true);

    useEffect(() => {
        fetchBalance();
        fetchSessions();
    }, []);

    const handleAddBalance = async () => {
        if (!canAddBalance) return;
        setCanAddBalance(false);
        await incrementBalance();
        setTimeout(() => setCanAddBalance(true), 10000);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Typography variant="h4">Welcome to oblivion</Typography>

            {user ? (
                <>
                    <Typography variant="h6">Balance: {balance} coins</Typography>
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
                        disabled={balance < 50}
                    >
                        Play (10 coins)
                    </Button>

                    {currentSession && (
                        <Box textAlign="center">
                            <Typography variant="h6">Result:</Typography>
                            <Typography variant="body1">Symbols: {currentSession.symbols}</Typography>
                            <Typography variant="body1">
                                {currentSession.isWin ? `Prize: +${currentSession.prize} coins!` : "You loosed!"}
                            </Typography>
                        </Box>
                    )}

                    <Typography variant="h6">Game history:</Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                        {sessions.length > 0 ? (
                            sessions.map((session) => (
                                <Box key={session.id} p={1} border="1px solid gray" borderRadius={2}>
                                    <Typography variant="body2">
                                        {session.playedAt} | Symbols: {session.symbols} |{" "}
                                        {session.isWin ? `Prize: +${session.prize} coins` : "Loss"}
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