import { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Fade,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  visualization?: string;
}

const Lung = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [visualizationDialog, setVisualizationDialog] = useState(false);
  const [selectedVisualization, setSelectedVisualization] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setError(null);

      try {
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError('Failed to process image. Please try again.');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.dicom']
    },
    maxFiles: 1
  });

  const handleAnalyze = async () => {
    try {
      if (!selectedFile) {
        setError('Please select an image file');
        return;
      }

      setAnalyzing(true);
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.error || 'Analysis failed');
      }

      // Format the analysis result message
      let resultMessage = `Analysis of your ${data.image_type} shows:\n`;
      resultMessage += `• Disease Type: ${data.disease_type}\n`;
      resultMessage += `• Confidence: ${(data.confidence * 100).toFixed(1)}%\n`;
      
      if (data.disease_type === "Pneumonia") {
        resultMessage += `• Severity: ${data.pneumonia_severity}\n`;
      } else {
        resultMessage += `• Cancer Subtype: ${data.cancer_subtype}\n`;
      }

      // Add the analysis result to chat history with visualization
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: resultMessage,
        timestamp: new Date(),
        visualization: data.visualization
      }]);
    } catch (error) {
      console.error('Error during analysis:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze image');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage;
    setChatMessage('');
    
    // Add user message
    setChatHistory(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Add AI response
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response. Please try again.');
    }
  };

  const handleVisualizationClick = (visualization: string) => {
    setSelectedVisualization(visualization);
    setVisualizationDialog(true);
  };

  return (
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: { xs: 1, sm: 2, md: 3 },
      boxSizing: 'border-box',
      margin: 0,
      overflow: 'hidden',
      bgcolor: 'background.default'
    }}>
      <Box sx={{ 
        width: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        py: 4,
        px: { xs: 2, md: 4 },
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Box sx={{ maxWidth: '1200px', width: '100%' }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Lung Disease Analysis
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" sx={{ color: 'white' }}>
            Select image type and upload your chest image for analysis
          </Typography>
        </Box>
      </Box>

      <Box sx={{ 
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: 4,
        px: { xs: 2, md: 4 }
      }}>
        <Box sx={{ 
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          {/* Left Column - Image Upload */}
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Upload Chest Image
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Paper
                  {...getRootProps()}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: isDragActive ? 'action.hover' : 'background.paper',
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'grey.300',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <input {...getInputProps()} />
                  <Zoom in={!preview}>
                    <Box>
                      <CloudUploadIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        {isDragActive ? 'Drop your image here' : 'Drag & drop your chest image here'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Supported formats: JPEG, PNG, DICOM
                      </Typography>
                    </Box>
                  </Zoom>

                  {preview && (
                    <Fade in={true}>
                      <Box>
                        <img
                          src={preview}
                          alt="Preview"
                          style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                        />
                      </Box>
                    </Fade>
                  )}
                </Paper>

                {preview && (
                  <Button
                    variant="contained"
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    {analyzing ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 1 }} />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </Button>
                )}

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
              </Box>
            </Paper>
          </Box>

          {/* Right Column - Chat Interface */}
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">
                  <ChatIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Medical Assistant
                </Typography>
              </Box>

              <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                {chatHistory.map((message, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                      mb: 2
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main'
                        }}
                      >
                        {message.role === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <Paper
                      sx={{
                        maxWidth: '70%',
                        p: 2,
                        ml: message.role === 'user' ? 1 : 2,
                        mr: message.role === 'user' ? 2 : 1,
                        bgcolor: message.role === 'user' ? 'primary.light' : 'secondary.light',
                        color: message.role === 'user' ? 'primary.contrastText' : 'secondary.contrastText'
                      }}
                    >
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {message.content}
                      </Typography>
                      {message.visualization && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => message.visualization && handleVisualizationClick(message.visualization)}
                          sx={{ mt: 1 }}
                        >
                          View Heatmap
                        </Button>
                      )}
                      <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
                        {message.timestamp.toLocaleTimeString()}
                      </Typography>
                    </Paper>
                  </ListItem>
                ))}
              </List>

              <Box
                component="form"
                onSubmit={handleChatSubmit}
                sx={{
                  p: 2,
                  borderTop: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  gap: 1
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Ask about the condition or preventive measures..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  size="small"
                />
                <Button type="submit" variant="contained" disabled={!chatMessage.trim()}>
                  Send
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Visualization Dialog */}
      <Dialog
        open={visualizationDialog}
        onClose={() => setVisualizationDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Model Visualization
          <IconButton
            aria-label="close"
            onClick={() => setVisualizationDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedVisualization && (
            <img
              src={`data:image/png;base64,${selectedVisualization}`}
              alt="Model Visualization"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVisualizationDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Lung; 