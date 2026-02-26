document.addEventListener('DOMContentLoaded', () => {
  const chatWindow = document.getElementById('chat-window');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-button');

  const API_URL = '/chat'; // Use our Flask backend endpoint
  
  // Check connection on load
  async function checkConnection() {
    try {
      const response = await fetch('/api/ollama-status', { timeout: 5000 });
      if (response.ok) {
        console.log('✅ Connected to Flask server');
        return true;
      }
    } catch (error) {
      console.error('❌ Cannot connect to Flask server');
      displayMessage(
        "⚠️ Warning: Cannot connect to the server.\n\n" +
        "Please make sure:\n" +
        "1. Flask is running: python app.py\n" +
        "2. Access via: http://localhost:5000/chat.html\n" +
        "3. Don't open HTML file directly\n\n" +
        "Current URL: " + window.location.href,
        'bot'
      );
      return false;
    }
  }
  
  // Check connection when page loads
  checkConnection();
  
  const systemMsg = {
    role: "user",
    parts: [{ text: "You are an expert agricultural assistant named AgriBot. Provide detailed, accurate and helpful responses about farming, crops, weather impact, soil health, pest control, and sustainable agriculture practices. Format your answers with clear concise minimal paragraphs. If asked about something outside agriculture except greetings, politely decline and refocus on farming topics." }]
  };
  let history = [systemMsg];

  // HTML escaping function to prevent XSS
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  // Secure message rendering function
  function displayMessage(messageContent, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const name = sender === 'user' ? 'You' : 'AgriBot';
    
    // Create message header
    const headerDiv = document.createElement('div');
    headerDiv.className = 'message-header';
    const icon = document.createElement('i');
    icon.className = `fas fa-${sender === 'user' ? 'user' : 'robot'}`;
    headerDiv.appendChild(icon);
    headerDiv.appendChild(document.createTextNode(` ${name}`));
    
    // Create message text (safely formatted)
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.innerHTML = format(escapeHtml(messageContent)); // Safe formatting after escaping
    
    // Create timestamp
    const timeDiv = document.createElement('div');
    timeDiv.className = 'timestamp';
    timeDiv.textContent = time;
    
    // Assemble message
    messageElement.appendChild(headerDiv);
    messageElement.appendChild(textDiv);
    messageElement.appendChild(timeDiv);
    
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion')) {
      chatInput.value = e.target.textContent;
      chatForm.dispatchEvent(new Event('submit'));
    }
  });

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = chatInput.value.trim();
    if (!input) return;

    // Input validation - limit message length
    if (input.length > 1000) {
      alert('Message too long. Please keep messages under 1000 characters.');
      return;
    }

    console.log('📤 Sending message:', input);
    console.log('📍 API URL:', API_URL);
    console.log('🌐 Current location:', window.location.href);

    displayMessage(input, 'user');
    chatInput.value = '';
    const typing = showTyping();
    toggleInput(true);
    history.push({ role: "user", parts: [{ text: input }] });

    try {
      console.log('⏳ Fetching from:', API_URL);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input
        })
      });

      console.log('📥 Response status:', res.status);
      console.log('📥 Response ok:', res.ok);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('✅ API Response:', data);
      
      if (data.status === 'success') {
        const reply = data.message || "⚠️ I didn't receive a proper response. Please try again.";
        console.log('💬 Bot reply:', reply.substring(0, 100) + '...');
        displayMessage(reply, 'bot');
        history.push({ role: "model", parts: [{ text: reply }] });
      } else {
        console.error('❌ API returned error:', data.message);
        displayMessage("⚠️ " + (data.message || "Something went wrong. Please try again."), 'bot');
      }
    } catch (error) {
      console.error('❌ Error details:', error);
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      let errorMessage = "⚠️ I'm having trouble connecting right now.";
      
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        errorMessage = "⚠️ Cannot connect to the server. Please make sure:\n\n" +
                      "1. You're accessing this page through Flask (http://localhost:5000/chat.html)\n" +
                      "2. Flask server is running (python app.py)\n" +
                      "3. You're not opening the HTML file directly\n\n" +
                      "Current URL: " + window.location.href;
      } else if (error.message.includes('timeout')) {
        errorMessage = "⚠️ The request timed out. The AI might be processing. Please try again.";
      }
      
      displayMessage(errorMessage, 'bot');
    } finally {
      typing.remove();
      toggleInput(false);
    }
  });

  const addMessage = (who, txt) => {
    displayMessage(txt, who);
  };

  const showTyping = () => {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = `<div>AgriBot is typing</div><span></span><span></span><span></span>`;
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return typing;
  };

  const toggleInput = (disable) => {
    sendBtn.disabled = disable;
    chatInput.disabled = disable;
    if (!disable) chatInput.focus();
  };

  const format = (txt) =>
    txt.replace(/\n/g, '<br>')
       .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
       .replace(/\*(.*?)\*/g, '<em>$1</em>')
       .replace(/`(.*?)`/g, '<code>$1</code>');

  setTimeout(() => {
    displayMessage('Hello! 🌱 I\'m AgriBot, your agricultural assistant. I can help you with farming questions, crop management, soil health, pest control, and more. How can I assist you today?', 'bot');
  }, 500);

  chatInput.focus();
});