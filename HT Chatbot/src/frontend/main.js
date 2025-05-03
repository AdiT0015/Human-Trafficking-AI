// Main JavaScript file for Human Trafficking AI Chatbot
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const suggestionChips = document.getElementById('suggestion-chips');
    const visualizationPanel = document.getElementById('visualization-panel');
    const closeVizPanel = document.getElementById('close-viz-panel');
    const infoButton = document.getElementById('info-button');
    const infoModal = document.getElementById('info-modal');
    const closeModal = document.getElementById('close-modal');
    
    // Session ID
    const sessionId = generateSessionId();
    
    // Add welcome message
    addBotMessage(`
        <p>Welcome to the Human Trafficking Information Assistant.</p>
        <p>I can provide information about human trafficking definitions, statistics, warning signs, and resources for help.</p>
        <p>How can I assist you today?</p>
    `);
    
    // Add initial suggestion chips
    updateSuggestionChips([
        "What is human trafficking?",
        "Show trafficking statistics",
        "Warning signs to look for",
        "How to report trafficking",
        "Resources for help"
    ]);
    
    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    userInput.addEventListener('input', function() {
        // Auto-resize textarea
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    closeVizPanel.addEventListener('click', function() {
        visualizationPanel.classList.remove('active');
    });
    
    infoButton.addEventListener('click', function() {
        infoModal.classList.add('active');
    });
    
    closeModal.addEventListener('click', function() {
        infoModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === infoModal) {
            infoModal.classList.remove('active');
        }
    });
    
    // Functions
    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        addUserMessage(message);
        
        // Clear input
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Add loading indicator
        const loadingId = addLoadingIndicator();
        
        // Send message to server
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                sessionId: sessionId
            })
        })
        .then(response => response.json())
        .then(data => {
            // Remove loading indicator
            removeLoadingIndicator(loadingId);
            
            // Add bot response
            addBotMessage(data.text);
            
            // Check if visualization is needed
            if (message.toLowerCase().includes('statistic') || 
                message.toLowerCase().includes('data') || 
                message.toLowerCase().includes('numbers') ||
                message.toLowerCase().includes('show')) {
                showVisualization(message);
            }
            
            // Update suggestion chips based on context
            updateSuggestionChipsBasedOnContext(message, data.text);
        })
        .catch(error => {
            console.error('Error:', error);
            removeLoadingIndicator(loadingId);
            addBotMessage('Sorry, there was an error processing your request. Please try again.');
        });
    }
    
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-content">${escapeHTML(message)}</div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function addLoadingIndicator() {
        const id = 'loading-' + Date.now();
        const loadingElement = document.createElement('div');
        loadingElement.className = 'message bot-message';
        loadingElement.id = id;
        loadingElement.innerHTML = `
            <div class="message-content">
                <span class="loading-indicator"></span>
                <span>Thinking...</span>
            </div>
        `;
        chatMessages.appendChild(loadingElement);
        scrollToBottom();
        return id;
    }
    
    function removeLoadingIndicator(id) {
        const loadingElement = document.getElementById(id);
        if (loadingElement) {
            loadingElement.remove();
        }
    }
    
    function updateSuggestionChips(suggestions) {
        suggestionChips.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.textContent = suggestion;
            chip.addEventListener('click', function() {
                userInput.value = suggestion;
                sendMessage();
            });
            suggestionChips.appendChild(chip);
        });
    }
    
    function updateSuggestionChipsBasedOnContext(userMessage, botResponse) {
        const messageLower = userMessage.toLowerCase();
        
        if (messageLower.includes('what is') || messageLower.includes('definition')) {
            updateSuggestionChips([
                "Types of human trafficking",
                "Difference between trafficking and smuggling",
                "Who are the victims?",
                "Show trafficking statistics",
                "Warning signs to look for"
            ]);
        } else if (messageLower.includes('statistic') || messageLower.includes('data') || messageLower.includes('numbers')) {
            updateSuggestionChips([
                "Which countries have highest rates?",
                "How many victims are children?",
                "Economic impact of trafficking",
                "Warning signs to look for",
                "How to report trafficking"
            ]);
        } else if (messageLower.includes('warning') || messageLower.includes('signs') || messageLower.includes('indicator')) {
            updateSuggestionChips([
                "Physical indicators",
                "Behavioral indicators",
                "Labor trafficking signs",
                "Sex trafficking signs",
                "How to report trafficking"
            ]);
        } else if (messageLower.includes('report') || messageLower.includes('help')) {
            updateSuggestionChips([
                "National Human Trafficking Hotline",
                "How to help a victim",
                "What happens when I report?",
                "Resources for survivors",
                "Prevention strategies"
            ]);
        } else {
            updateSuggestionChips([
                "What is human trafficking?",
                "Show trafficking statistics",
                "Warning signs to look for",
                "How to report trafficking",
                "Resources for help"
            ]);
        }
    }
    
    function showVisualization(query) {
        // In a real implementation, this would fetch visualization data from the server
        // For demo purposes, we'll show a static visualization
        
        const visualizationContent = document.getElementById('visualization-content');
        
        if (query.toLowerCase().includes('statistic') || query.toLowerCase().includes('data')) {
            visualizationContent.innerHTML = `
                <div class="visualization-card">
                    <div class="visualization-title">Global Human Trafficking Statistics</div>
                    <div id="trafficking-chart" style="width:100%;height:400px;"></div>
                    <div class="visualization-description">
                        This chart shows the estimated number of trafficking victims by region and type of exploitation.
                    </div>
                    <div class="visualization-source">
                        Source: UNODC Global Report on Trafficking in Persons
                    </div>
                </div>
            `;
            
            // Create a simple bar chart using Plotly
            const regions = ['Asia-Pacific', 'Europe', 'Americas', 'Africa', 'Middle East'];
            const victims = [13500000, 5700000, 4800000, 3900000, 1100000];
            
            Plotly.newPlot('trafficking-chart', [{
                x: regions,
                y: victims,
                type: 'bar',
                marker: {
                    color: '#4a6fa5'
                }
            }], {
                title: 'Estimated Trafficking Victims by Region',
                xaxis: {
                    title: 'Region'
                },
                yaxis: {
                    title: 'Number of Victims'
                }
            });
            
            visualizationPanel.classList.add('active');
        }
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    function generateSessionId() {
        return 'session-' + Date.now() + '-' + Math.random().toString(36).substring(2, 15);
    }
    
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
