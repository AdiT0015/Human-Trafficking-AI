// Netlify serverless function for chatbot API
const { handler } = require('./api');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  try {
    // Parse the incoming request body
    const body = JSON.parse(event.body);
    const { message, sessionId } = body;
    
    // Simple keyword matching for demo
    const demoResponses = {
      "what is human trafficking": "Human trafficking is the recruitment, transportation, transfer, harboring or receipt of people through force, fraud or deception, with the aim of exploiting them for profit. It is a form of modern slavery and a crime under international law.",
      "statistics": "According to global estimates, there are approximately 29 million victims of human trafficking worldwide. About 61% of victims are women and girls, and 34% of cases involve forced labor. Human trafficking generates around $150 billion in annual profits.",
      "warning signs": "Warning signs of human trafficking include physical abuse, restricted movement, poor living conditions, working excessive hours, appearing fearful or anxious, avoiding eye contact, being monitored by others, and not being allowed to speak for themselves.",
      "how to report": "In the United States, you can report suspected human trafficking to the National Human Trafficking Hotline at 1-888-373-7888 or text 'BEFREE' to 233733. If someone is in immediate danger, call emergency services (911).",
      "help": "If you or someone you know needs help, please contact the National Human Trafficking Hotline at 1-888-373-7888 or text 'BEFREE' to 233733. All communications are confidential and available 24/7."
    };
    
    // Default response
    let response = "I don't have specific information about that. Please try asking about human trafficking definitions, statistics, warning signs, or resources for help.";
    
    // Check for keywords in the message
    const messageLower = message.toLowerCase();
    for (const [key, value] of Object.entries(demoResponses)) {
      if (messageLower.includes(key)) {
        response = value;
        break;
      }
    }
    
    // Return the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        text: response,
        sessionId: sessionId || 'netlify-session',
        timestamp: new Date().toISOString()
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};
