document.addEventListener('DOMContentLoaded', () => {
    // 1. Update Date
    function updateDate() {
        const dateDisplay = document.getElementById('date-display');
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
    updateDate();

    // 2. Search Bar Shortcut (Simulated)
    const searchInput = document.querySelector('.search-bar input');

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.disabled = false;
            searchInput.focus();
            searchInput.placeholder = "Type to search...";
        }
    });

    searchInput.addEventListener('blur', () => {
        searchInput.disabled = true;
        searchInput.placeholder = "Search commands...";
    });

    // 3. Simple Hover tilt effect for cards (Subtle)
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });

        // 4. Chatbot Logic
        const chatWidget = document.querySelector('.chat-widget');
        const chatToggle = document.querySelector('.chat-toggle');
        const closeChat = document.querySelector('.close-chat');

        // Toggle Chat Window
        function toggleChat() {
            chatWidget.classList.toggle('active');
        }

        chatToggle.addEventListener('click', toggleChat);
        closeChat.addEventListener('click', toggleChat);

        // Chat API Logic
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const chatMessages = document.getElementById('chat-messages');

        // GROQ API Config
        const API_KEY = "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"; // Client-side for demo
        const API_URL = "https://api.groq.com/openai/v1/chat/completions";

        const SYSTEM_PROMPT = `
        You are an AI assistant for Rinkal Panda's portfolio website. 
        Your goal is to answer questions about Rinkal based STRICTLY on his resume data.
        
        RESUME DATA:
        Name: Rinkal Panda
        Role: Software Engineer Graduate (Dec 2021 - May 2025)
        Institution: Vignan Institute of Technology and Management (B.Tech CSE)
        Location: Brahmapur, Odisha, India
        Email: rinkal861@gmail.com
        Skills: Computer Science, Programming, Communication, Java, HTML/CSS.
        Summary: Passionate about leveraging computer science expertise to drive meaningful change. Open to engaging discussions.
        
        Guidelines:
        - Be polite, professional, and concise.
        - Answer in the first person ("I am Rinkal's AI assistant" or "Rinkal studied at...").
        - If asked about projects, say "Rinkal is currently documenting his projects, but he is skilled in Java and Web Development."
        - If asked for contact info, provide the email.
    `;

        async function sendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            // Add User Message
            addMessage(text, 'user');
            chatInput.value = '';

            // Show Typing Indicator (Optional, simpler to just wait)
            const botLoadingMsg = addMessage("Typing...", 'bot');

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "mixtral-8x7b-32768",
                        messages: [
                            { role: "system", content: SYSTEM_PROMPT },
                            { role: "user", content: text }
                        ],
                        temperature: 0.7,
                        max_tokens: 200
                    })
                });

                const data = await response.json();
                const botReply = data.choices[0].message.content;

                // Update Bot Message
                botLoadingMsg.textContent = botReply;

            } catch (error) {
                console.error("Chat Error:", error);
                botLoadingMsg.textContent = "Sorry, I encountered an error connecting to the brain.";
            }
        }

        function addMessage(text, sender) {
            const div = document.createElement('div');
            div.classList.add('message', sender);
            div.textContent = text;
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return div;
        }

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    });
});
