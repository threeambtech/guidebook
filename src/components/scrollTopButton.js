import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab, useScrollTrigger, Zoom, Box } from '@mui/material';

function ScrollTopButton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true, 
    threshold: 100, 
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <Fab color="primary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

export default ScrollTopButton;