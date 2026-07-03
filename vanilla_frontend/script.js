const API_URL = '/api/chat';
let sessionId = localStorage.getItem('chat_session_id');

// Generate session ID if it doesn't exist
if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chat_session_id', sessionId);
}

// DOM Elements
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

// Auto scroll to bottom
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Format timestamp
function getFormattedTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Create Message Element
function createMessageElement(text, sender, metadata = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    
    let content = `<p>${text}</p>`;
    
    // Add metadata tags for bot messages
    if (sender === 'bot' && metadata && metadata.intent) {
        content += `
            <div class="metadata-tags">
                <span class="tag"><i class="fa-solid fa-tag"></i> ${metadata.intent}</span>
                <span class="tag"><i class="fa-solid fa-chart-line"></i> ${metadata.confidence}%</span>
            </div>
        `;
    }
    
    msgDiv.innerHTML = content;
    return msgDiv;
}

// Show/Hide Typing Indicator
function setTyping(isTyping) {
    typingIndicator.style.display = isTyping ? 'flex' : 'none';
    if (isTyping) {
        scrollToBottom();
    }
}

// Handle sending message
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // Disable input while sending
    messageInput.value = '';
    messageInput.disabled = true;
    sendBtn.disabled = true;

    // Add user message to UI
    const userMsg = createMessageElement(text, 'user');
    messagesContainer.insertBefore(userMsg, typingIndicator);
    scrollToBottom();

    // Show typing indicator
    setTyping(true);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: text,
                session_id: sessionId
            })
        });

        const data = await response.json();
        
        // Hide typing indicator
        setTyping(false);

        if (response.ok) {
            // Add bot message
            const botMsg = createMessageElement(data.bot_response, 'bot', {
                intent: data.intent,
                confidence: data.confidence
            });
            messagesContainer.insertBefore(botMsg, typingIndicator);
        } else {
            // Handle error response
            const errorMsg = createMessageElement("Sorry, I encountered an error. Please try again.", 'bot');
            messagesContainer.insertBefore(errorMsg, typingIndicator);
            console.error("API Error:", data.error);
        }
    } catch (error) {
        setTyping(false);
        const errorMsg = createMessageElement("Unable to connect to the server. Is the backend running?", 'bot');
        messagesContainer.insertBefore(errorMsg, typingIndicator);
        console.error("Network Error:", error);
    } finally {
        // Re-enable input
        messageInput.disabled = false;
        sendBtn.disabled = false;
        messageInput.focus();
        scrollToBottom();
    }
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Clear Chat feature
document.getElementById('clear-chat-btn').addEventListener('click', () => {
    // Keep only the welcome message and typing indicator
    const welcomeMsg = messagesContainer.firstElementChild;
    messagesContainer.innerHTML = '';
    messagesContainer.appendChild(welcomeMsg);
    messagesContainer.appendChild(typingIndicator);
    
    // Clear session in backend
    fetch('/api/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
    }).catch(e => console.error(e));
});

// Focus input on load
window.onload = () => {
    messageInput.focus();
};
