import { createTheme } from '@mui/material/styles';
import '@fontsource/quicksand';

export const createAppTheme = (mode = 'light', fontSize = 16, highContrast = false) => {
    const getColors = () => {
        if (highContrast) {
            return {
                primary: {
                    main: mode === 'dark' ? '#ffffff' : '#000000',
                },
                secondary: {
                    main: mode === 'dark' ? '#ffff00' : '#0000ff',
                },
                background: {
                    default: mode === 'dark' ? '#000000' : '#ffffff',
                    paper: mode === 'dark' ? '#000000' : '#ffffff',
                },
                text: {
                    primary: mode === 'dark' ? '#ffffff' : '#000000',
                    secondary: mode === 'dark' ? '#ffffff' : '#000000',
                },
                divider: mode === 'dark' ? '#ffffff' : '#000000',
            };
        } else {
            return {
                primary: {
                    main: '#ffb300',
                },
                secondary: {
                    main: '#f50057',
                },
                background: {
                    default: mode === 'dark' ? '#121212' : '#f5f5f5',
                    paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
                },
                text: {
                    primary: mode === 'dark' ? '#ffffff' : '#000000',
                    secondary: mode === 'dark' ? '#b0b0b0' : '#666666',
                },
                divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
            };
        }
    };

    return createTheme({
        palette: {
            mode,
            ...getColors(),
        },
        typography: {
            fontFamily: 'Quicksand, Roboto, sans-serif',
            fontSize: fontSize,
            h1: {
                fontSize: `${fontSize * 2.5}px`,
            },
            h2: {
                fontSize: `${fontSize * 2}px`,
            },
            h3: {
                fontSize: `${fontSize * 1.75}px`,
            },
            h4: {
                fontSize: `${fontSize * 1.5}px`,
            },
            h5: {
                fontSize: `${fontSize * 1.25}px`,
            },
            h6: {
                fontSize: `${fontSize * 1.1}px`,
            },
            body1: {
                fontSize: `${fontSize}px`,
            },
            body2: {
                fontSize: `${fontSize * 0.875}px`,
            },
            caption: {
                fontSize: `${fontSize * 0.75}px`,
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        fontSize: `${fontSize}px`,
                    },
                },
            },
            ...(highContrast && {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            border: `2px solid ${mode === 'dark' ? '#ffffff' : '#000000'}`,
                            fontWeight: 'bold',
                        },
                    },
                },
                MuiCard: {
                    styleOverrides: {
                        root: {
                            border: `2px solid ${mode === 'dark' ? '#ffffff' : '#000000'}`,
                        },
                    },
                },
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            '& .MuiOutlinedInput-root': {
                                border: `2px solid ${mode === 'dark' ? '#ffffff' : '#000000'}`,
                            },
                        },
                    },
                },
                MuiChip: {
                    styleOverrides: {
                        root: {
                            border: `2px solid ${mode === 'dark' ? '#ffffff' : '#000000'}`,
                            fontWeight: 'bold',
                        },
                    },
                },
            }),
        },
    });
};

// Default theme
const theme = createAppTheme();

export default theme;
