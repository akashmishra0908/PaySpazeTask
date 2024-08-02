import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export const Loader = ({ isLoading }) => {
    return (
        <Backdrop open={isLoading} style={{ zIndex: 2000, color: '#fff' }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
