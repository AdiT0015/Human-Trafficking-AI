// Basic server implementation for Human Trafficking AI Chatbot
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/landing.html'));
});

app.get('/chatbot', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API endpoint for chatbot messages
app.post('/api/chat', (req, res) => {
  const { message, sessionId } = req.body;
  
  // In a real implementation, this would process the message through NLP pipeline
  // and return a proper response. For demo purposes, we'll return a simple response.
  
  const demoResponses = {
    "what is human trafficking": "Human trafficking is the recruitment, transportation, transfer, harboring or receipt of people through force, fraud or deception, with the aim of exploiting them for profit. It is a form of modern slavery and a crime under international law.",
    "statistics": "According to global estimates, there are approximately 29 million victims of human trafficking worldwide. About 61% of victims are women and girls, and 34% of cases involve forced labor. Human trafficking generates around $150 billion in annual profits.",
    "warning signs": "Warning signs of human trafficking include physical abuse, restricted movement, poor living conditions, working excessive hours, appearing fearful or anxious, avoiding eye contact, being monitored by others, and not being allowed to speak for themselves.",
    "how to report": "In the United States, you can report suspected human trafficking to the National Human Trafficking Hotline at 1-888-373-7888 or text 'BEFREE' to 233733. If someone is in immediate danger, call emergency services (911).",
    "help": "If you or someone you know needs help, please contact the National Human Trafficking Hotline at 1-888-373-7888 or text 'BEFREE' to 233733. All communications are confidential and available 24/7."
  };
  
  // Simple keyword matching for demo
  let response = "I don't have specific information about that. Please try asking about human trafficking definitions, statistics, warning signs, or resources for help.";
  
  const messageLower = message.toLowerCase();
  
  for (const [key, value] of Object.entries(demoResponses)) {
    if (messageLower.includes(key)) {
      response = value;
      break;
    }
  }
  
  // Simulate processing delay
  setTimeout(() => {
    res.json({
      text: response,
      sessionId: sessionId || 'demo-session',
      timestamp: new Date().toISOString()
    });
  }, 500);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

module.exports = app;
