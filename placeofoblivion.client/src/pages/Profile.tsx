import { useUserStore } from "../components/state-manager/useStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

/**
 * Validation schema for the profile update form.
 */
const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    hashedPassword: yup.string().min(6, "Password must be at least 6 characters").optional(),
});

/**
 * `ProfileSettings` component allows users to update their profile information (username, email, password)
 * and delete their account.
 */
export default function Profile() {
    const { user, updateUser, deleteUser } = useUserStore();
    const [loading, setLoading] = useState(false);

    // Setting up the form with react-hook-form and yup validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: user?.username || "",
            email: user?.email || "",
            hashedPassword: "",
        },
    });

    /**
     * Handles form submission for updating profile information.
     * @param data - Object containing new profile data.
     */
    const onSubmit = async (data: { username: string; email: string; hashedPassword?: string }) => {
        setLoading(true);
        try {
            await updateUser(data);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles account deletion request.
     * Asks for confirmation before proceeding.
     */
    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await deleteUser();
                alert("Account deleted successfully.");
            } catch (error) {
                console.error(error);
                alert("Failed to delete account.");
            }
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%" maxWidth="400px" mx="auto">
            <Typography variant="h5">Profile Settings</Typography>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <TextField label="Username" {...register("username")} error={!!errors.username} helperText={errors.username?.message} fullWidth margin="dense" />
                <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} fullWidth margin="dense" />
                <TextField label="New Password" type="password" {...register("hashedPassword")} error={!!errors.hashedPassword} helperText={errors.hashedPassword?.message} fullWidth margin="dense" />

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </Button>
            </form>

            <Button variant="outlined" color="error" onClick={handleDeleteAccount}>
                Delete Account
            </Button>
        </Box>
    );
}
