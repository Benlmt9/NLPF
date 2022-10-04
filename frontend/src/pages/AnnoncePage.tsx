import React from 'react'
import { Box, Stack } from '@mui/material';
import AnnonceCard from '../components/AnnonceCard';
export default function AnnoncePage()
{
    return (
        <Box sx={{
            width: "800px",
            margin: "auto",
        }}>
        <Stack spacing={2}>
            <AnnonceCard></AnnonceCard>
        </Stack>
        </Box>
    );
}