import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, Alert, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import { useMediaQuery } from '@mui/material';
import { Loader } from './Loader';
import mock from '../mock'; ``

function PaymentError() {
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        to: '',
        from: '',
        amount: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [isFormBlurred, setIsFormBlurred] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setIsLoading(false);
        setIsFormBlurred(false);
        setShowAlert(false);
    };
    const isFormDataEmpty = () => {
        return !formData.to && !formData.from && !formData.amount || !formData.description;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);

    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };
        switch (name) {
            case 'to':
                newErrors.to = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
                break;
            case 'amount':
                newErrors.amount = value > 0 ? '' : 'Amount must be positive';
                break;
            default:
                break;
        }
        setErrors(newErrors);
    }

    let res;
    const isMobile = useMediaQuery('(max-width:600px)');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsFormBlurred(true);
        setIsLoading(true);


        try {
            const response = await axios.post('/api/mock/payments', {
                payments: [
                    {
                        to: formData.to,
                        from: formData.from,
                        amount: formData.amount,
                        description: formData.description
                    }
                ]


            });

            setTimeout(() => {
                setIsLoading(false);
                setIsFormBlurred(false);
                setFormData({
                    to: '',
                    from: '',
                    amount: '',
                    description: ''
                });
                setShowAlert(true);

            }, 3000);

        } catch (error) {
            setIsLoading(false);
            setIsFormBlurred(false);
            setErrors({ submit: response.data.message });
            console.error('Error:', error);
        };
    }

    return (
        <>
            <Button variant="contained" color="primary"
                sx={{
                    fontSize: isMobile ? '0.75rem' : '1rem',
                    padding: isMobile ? '6px 12px' : '8px 16px'
                }}
                onClick={handleOpen}>Make Payment</Button>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                BackdropProps={{ style: { pointerEvents: 'none' } }}
            >
                <DialogTitle textAlign={'center'} color={'green'}>Make a Payment</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            filter: isFormBlurred ? 'blur(4px)' : 'none',
                            transition: 'filter 0.3s'
                        }}
                    >
                        <TextField
                            margin="dense"
                            name="to"
                            label="To (Email)"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={formData.to}
                            onChange={handleChange}
                            error={!!errors.to}
                            helperText={errors.to}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>From</InputLabel>
                            <Select
                                name="from"
                                value={formData.from}
                                onChange={handleChange}
                            >
                                <MenuItem value="BTC">BTC</MenuItem>
                                <MenuItem value="ETH">ETH</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            name="amount"
                            label="Amount"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={formData.amount}
                            onChange={handleChange}
                            error={!!errors.amount}
                            helperText={errors.amount}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description (optional)"
                            fullWidth
                            variant="outlined"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={handleSubmit}>Pay Now</Button>
                </DialogActions>
            </Dialog>
            <Loader isLoading={isLoading} />
            {showAlert && (
                <Alert
                    variant="filled"
                    severity="error"
                    onClose={() => {
                        setShowAlert(false);
                        handleClose();
                    }}
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2000
                    }}
                >
                    Bad Request 404: Please check your input.
                </Alert>
            )}

        </>
    );
}

export default PaymentError;
