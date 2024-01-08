import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useGlobalSnackbar } from "../../Base/basePage";

const ChangePasswordDialog = ({ onClose = null, onSubmit = null, isSubmitting = false }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { showSnackbar } = useGlobalSnackbar();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onConfirm = () => {
        if (newPassword.length < 6) {
            showSnackbar("Password must be at least 6 characters", "error");
            return;
        }
        if (newPassword !== confirmPassword) {
            showSnackbar("Passwords do not match", "error");
            return;
        }
        if (onSubmit) {
            onSubmit(newPassword);
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Change password</DialogTitle>
            <DialogContent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                        id="new-password"
                        label="New password"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(event) => {
                            setNewPassword(event.target.value);
                        }}
                        variant="standard"
                        margin="normal"
                        disabled={isSubmitting}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="confirm-password"
                        label="Confirm password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                        variant="standard"
                        margin="normal"
                        disabled={isSubmitting}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        onConfirm();
                    }}
                    variant="contained"
                    sx={{ backgroundColor: "#2C7A51" }}
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{ backgroundColor: "#2C7A51" }}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordDialog;
