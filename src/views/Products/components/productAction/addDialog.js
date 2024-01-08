import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const QuantitySelector = ({ onQuantityChange, onClose }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
    };

    const handleUpdate = () => {
        // You can perform any database update logic here
        onQuantityChange(quantity);
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Add more of this product</DialogTitle>
            <DialogContent>
                <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleUpdate} variant="contained"
                    //Set mui-button-root bg to be green
                    sx={{ backgroundColor: "#2C7A51" }}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default QuantitySelector;
