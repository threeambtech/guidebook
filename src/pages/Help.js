import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandMore,
  Help as HelpIcon,
  Code,
  Edit,
  GitHub,
  Web,
  Email,
  Phone,
  Person,
} from '@mui/icons-material';

const Help = () => {
  const helpSections = [
    {
      id: 'updates',
      title: 'Making Updates to the Website',
      icon: <Code />,
      content: [
        {
          type: 'text',
          content: 'To update content on this website, you have several options depending on your technical expertise:'
        },
        {
          type: 'list',
          items: [
            'Contact the development team (Users)',
            'Access the GitHub repository (Developers)',
          ]
        }
      ]
    },
    {
      id: 'contacts',
      title: 'Key Contacts for Website Management',
      icon: <Person />,
      content: [
        {
          type: 'contact',
          name: 'Web Development Team',
          email: 'threeambtech@gmail.com',
          phone: '+65 XXXX XXXX',
          role: 'Primary contact for all website updates'
        },
      ]
    },
    {
      id: 'technical',
      title: 'Technical Resources',
      icon: <GitHub />,
      content: [
        {
          type: 'text',
          content: 'For developers and technical staff, here are the key resources:'
        },
        {
          type: 'resource',
          title: 'GitHub Repository',
          url: 'https://github.com/threeambtech/guidebook',
          description: 'Source code and version control'
        },
        {
          type: 'resource',
          title: 'Documentation Wiki',
          url: 'https://wiki.3amb.mil.sg/guidebook',
          description: 'NOT YET AVAILABLE - Technical documentation and setup guides'
        },
      ]
    },
    {
      id: 'procedures',
      title: 'Update Procedures',
      icon: <Edit />,
      content: [
        {
          type: 'text',
          content: 'Follow these procedures for different types of updates:'
        },
        {
          type: 'procedure',
          title: 'Content Updates (Users)',
          steps: [
            'Identify the specific content that needs updating',
            'Prepare the new content in a clear format',
            'Contact the Developement Team via Email',
            'Provide context and specify reasons for changes',
            'Wait for confirmation and testing before publication'
          ]
        },
        {
          type: 'procedure',
          title: 'Technical & Content Updates (Developers)',
          steps: [
            'Navigate to the GitHub repository',
            'Fork the repository if you want to make changes',
            'Create a new branch for your changes',
            'Make your changes and commit them with clear messages',
            'Push your changes to your forked repository',
            'Create a pull request to the main repository for review',
            'Wait for review and approval before merging'
          ]
        },
      ]
    }
  ];

  const renderContent = (contentItem) => {
    switch (contentItem.type) {
      case 'text':
        return (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {contentItem.content}
          </Typography>
        );
      
      case 'list':
        return (
          <List dense>
            {contentItem.items.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <HelpIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        );
      
      case 'contact':
        return (
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {contentItem.name}
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 1, fontSize: 'small' }} />
                  <Typography variant="body2">{contentItem.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1, fontSize: 'small' }} />
                  <Typography variant="body2">{contentItem.phone}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {contentItem.role}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        );
      
      case 'resource':
        return (
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Web sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">{contentItem.title}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {contentItem.description}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => window.open(contentItem.url, '_blank')}
              >
                Access Resource
              </Button>
            </CardContent>
          </Card>
        );
      
      case 'procedure':
        return (
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {contentItem.title}
              </Typography>
              <List dense>
                {contentItem.steps.map((step, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Chip 
                        label={index + 1} 
                        size="small" 
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText primary={step} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Help & Resources
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Find resources and procedures for updating and managing the 3AMB Guidebook website.
        </Typography>
      </Box>

      {/* Help Sections */}
      <Stack spacing={2}>
        {helpSections.map((section) => (
          <Accordion key={section.id} defaultExpanded id={section.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {section.icon}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {section.title}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {section.content.map((contentItem, index) => (
                <Box key={index}>
                  {renderContent(contentItem)}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

    </Container>
  );
};

export default Help;
