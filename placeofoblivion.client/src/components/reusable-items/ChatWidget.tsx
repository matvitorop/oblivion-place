import { useEffect, useState } from "react";
import { useUserStore } from "../state-manager/useStore";
import * as signalR from "@microsoft/signalr";
import {
    Box,
    Fab,
    Card,
    CardContent,
    Typography,
    IconButton,
    TextField,
    Button,
    Paper
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);
    const [input, setInput] = useState("");

    const user = useUserStore((state) => state.user); 
    const username = user?.username || "Me";

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7024/chatHub", { withCredentials: true })
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(() => {
                console.log("Connected to chatHub!");
                newConnection.on("ReceiveMessage", (user: string, message: string) => {
                    setMessages(prev => [...prev, { user, message }]);
                });
            })
            .catch(err => console.error("Connection failed: ", err));

        setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, []);

    const sendMessage = async () => {
        if (connection && input.trim()) {
            await connection.invoke("SendMessage", input);
            setInput("");
        }
    };

    return (
        <>
            {/* Floating button */}
            {!open && (
                <Fab
                    color="primary"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                    onClick={() => setOpen(true)}
                >
                    <ChatIcon />
                </Fab>
            )}

            {/* Chat window */}
            {open && (
                <Card sx={{ position: "fixed", bottom: 16, right: 16, width: 320, height: 420, display: "flex", flexDirection: "column", boxShadow: 6, borderRadius: 3, backgroundColor: "#fafafa" }}>
                    <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 1 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="h6" fontWeight="bold">Chat</Typography>
                            <IconButton size="small" onClick={() => setOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Messages area */}
                        <Box sx={{ flex: 1, overflowY: "auto", my: 1, p: 1, border: "1px solid #ddd", borderRadius: 2, backgroundColor: "#fff" }}>
                            {messages.map((m, i) => {
                                const isOwn = m.user.trim().toLowerCase() === username.trim().toLowerCase(); // <-- використання username зі Zustand
                                return (
                                    <Box key={i} display="flex" justifyContent={isOwn ? "flex-end" : "flex-start"} mb={1} width="100%">
                                        <Paper elevation={2} sx={{ p: 1, maxWidth: "75%", backgroundColor: isOwn ? "#E3F2FD" : "#F1F8E9", border: "1px solid #ccc", borderRadius: 2, alignSelf: isOwn ? "flex-end" : "flex-start" }}>
                                            <Typography variant="subtitle2" sx={{ color: isOwn ? "#1565C0" : "#2E7D32", fontWeight: "bold", mb: 0.5 }}>
                                                {m.user}
                                            </Typography>
                                            <Typography variant="body2">{m.message}</Typography>
                                        </Paper>
                                    </Box>
                                );
                            })}
                        </Box>

                        {/* Input field */}
                        <Box display="flex" gap={1}>
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Type a message..."
                            />
                            <Button variant="contained" onClick={sendMessage}>Send</Button>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </>
    );
}