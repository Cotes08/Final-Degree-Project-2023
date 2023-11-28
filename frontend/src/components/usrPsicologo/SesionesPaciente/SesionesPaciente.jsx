import React from 'react';
import { Box, Typography as MuiTypography, Accordion, AccordionSummary, AccordionDetails, List as MuiList, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const List = styled(MuiList)(({ theme }) => ({
    maxHeight: '200px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#aaa',
        borderRadius: '4px',
    },
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
    wordBreak: 'break-word',
}));

const sesionesAnsiedad = [];

const SesionesPaciente = ({ sesionesDepresion }) => {

    
    return (
        <Box sx={{ flex: '0 0 45%', mt: '-2.9%', ml: '1%', color: '#333', p: '16px' }}>
            <Typography variant="h5" sx={{ mb: '2.9%', textAlign: 'center', fontWeight: 'bold' }}>Información de sus sesiónes</Typography>
            <Accordion sx={{backgroundColor: '#ADD8E6' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Depresión</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List sx={{ maxHeight: '500px' }}>
                        {sesionesDepresion.map((sesion, index) => (
                            <ListItem key={index} sx={{ mb: '8px' }}>
                                <Accordion sx={{ width: '100%' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sesión {index + 1}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {sesion.datos_sesion ? (
                                            <>
                                                <Typography variant="body2">{sesion.datos_sesion}</Typography>
                                                {sesion.cuestionario && (
                                                    <Accordion sx={{ width: '100%', mt: '2%'}}>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Cuestionario</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            {sesion.cuestionario.map((pregunta, index) => (
                                                                <Typography key={index} variant="body2">
                                                                    {pregunta.pregunta}: {pregunta.respuesta}
                                                                </Typography>
                                                            ))}
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )}
                                            </>
                                        ) : (
                                            <Typography variant="body2">No se ha realizado esta sesión</Typography>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginTop: '3%', backgroundColor: '#FFB6C1' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Ansiedad</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List sx={{ maxHeight: '500px' }}>
                        {sesionesAnsiedad.map((sesion, index) => (
                            <ListItem key={index} sx={{ mb: '8px' }}>
                                <Accordion sx={{ width: '100%' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="body1">Sesión {index + 1}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {sesion.datos_sesion ? (
                                            <>
                                                <Typography variant="body2">{sesion.datos_sesion}</Typography>
                                                {sesion.cuestionario && (
                                                    <Accordion sx={{ width: '100%' }}>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography variant="body1">Cuestionario</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            {sesion.cuestionario.map((pregunta, index) => (
                                                                <Typography key={index} variant="body2">
                                                                    {pregunta.pregunta}: {pregunta.respuesta}
                                                                </Typography>
                                                            ))}
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )}
                                            </>
                                        ) : (
                                            <Typography variant="body2">No se ha realizado esta sesión</Typography>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default SesionesPaciente;
