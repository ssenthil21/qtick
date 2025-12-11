/**
 * QTick AI Chat Widget Module
 * Injects chat HTML and handles interaction logic.
 */

(function () {
    // 1. Define UI Structure
    const chatWidgetHTML = `
    <div id="chat-widget-container" class="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
        <!-- Chat Window -->
        <div id="chat-window"
            class="hidden w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-4 transition-all duration-300 origin-bottom-right transform scale-95 opacity-0">
            <!-- Header -->
            <div class="bg-slate-900 p-4 flex items-center justify-between shrink-0">
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white relative">
                        <i data-lucide="bot" class="w-6 h-6"></i>
                        <span
                            class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                    </div>
                    <div>
                        <h3 class="font-bold text-white text-base">QTick AI Assistant</h3>
                        <p class="text-xs text-slate-400">Online • Replies instantly</p>
                    </div>
                </div>
                <button id="close-chat-btn"
                    class="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <!-- Messages Area -->
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
                <!-- Welcome Message -->
                <div class="flex gap-3">
                    <div
                        class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0 mt-1">
                        <i data-lucide="bot" class="w-4 h-4"></i>
                    </div>
                    <div
                        class="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm max-w-[85%]">
                        Hello! 👋 I'm your QTick AI assistant. Ask me anything about our features, pricing,
                        or how to
                        grow your business!
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="flex flex-wrap gap-2 pl-11" id="quick-actions">
                    <button class="quick-action-btn px-3 py-1.5 bg-white border border-indigo-100 text-indigo-600 rounded-full text-xs font-medium hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                        Tell about QTick features
                    </button>
                    <button class="quick-action-btn px-3 py-1.5 bg-white border border-indigo-100 text-indigo-600 rounded-full text-xs font-medium hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                        Setup QTick demo
                    </button>
                    <button class="quick-action-btn px-3 py-1.5 bg-white border border-indigo-100 text-indigo-600 rounded-full text-xs font-medium hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm">
                        Connect with sales team
                    </button>
                </div>
            </div>

            <!-- Input Area -->
            <div class="p-4 bg-white border-t border-slate-100 shrink-0">
                <form id="chat-form" class="relative">
                    <input type="text" id="chat-input"
                        class="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                        placeholder="Type your question..." autocomplete="off">
                    <button type="submit"
                        class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        id="send-btn">
                        <i data-lucide="send" class="w-4 h-4"></i>
                    </button>
                </form>
                <div class="text-center mt-2">
                    <p class="text-[10px] text-slate-400">Powered by QTick AI Engine</p>
                </div>
            </div>
        </div>

        <!-- Toggle Button -->
        <button id="chat-toggle-btn"
            class="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 group animate-glow-pulse">
            <i data-lucide="message-square" class="w-7 h-7 group-hover:scale-110 transition-transform"></i>
        </button>
    </div>
    `;

    // 1.5 Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes glow-pulse {
            0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(79, 70, 229, 0); }
            100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
        }
        .animate-glow-pulse {
            animation: glow-pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);

    // 2. Inject UI
    document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);

    // 3. Initialize Logic (Wait for DOM update)

    // State
    let isChatOpen = false;
    let chatHistory = [];
    let messageCount = 0;
    const LEAD_CAPTURE_THRESHOLD = 10;
    let isLeadCaptured = false;

    // DOM Elements
    const chatWindow = document.getElementById('chat-window');
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatForm = document.getElementById('chat-form');
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');

    // Event Listeners
    chatToggleBtn.addEventListener('click', toggleChat);
    closeChatBtn.addEventListener('click', toggleChat);
    chatForm.addEventListener('submit', (e) => sendMessage(e));

    // Quick Action Listeners
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sendMessage(null, btn.textContent.trim());
        });
    });

    // Functions
    function toggleChat() {
        isChatOpen = !isChatOpen;

        // Google Analytics Tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_toggle', {
                'event_category': 'Chat Widget',
                'event_label': isChatOpen ? 'Open' : 'Close'
            });
        }

        if (isChatOpen) {
            chatWindow.classList.remove('hidden');
            setTimeout(() => {
                chatWindow.classList.remove('scale-95', 'opacity-0');
                chatWindow.classList.add('scale-100', 'opacity-100');
            }, 10);
            chatInput.focus();
        } else {
            chatWindow.classList.remove('scale-100', 'opacity-100');
            chatWindow.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                chatWindow.classList.add('hidden');
            }, 300);
        }
    }

    async function sendMessage(event, customMessage = null) {
        if (event) event.preventDefault();

        const message = customMessage || chatInput.value.trim();
        if (!message) return;

        appendMessage('user', message);
        chatInput.value = '';
        scrollToBottom();

        // Remove quick actions after first message to keep things clean (optional, keeping for now)
        const quickActions = document.getElementById('quick-actions');
        if (quickActions) quickActions.remove();

        if (!isLeadCaptured && messageCount >= LEAD_CAPTURE_THRESHOLD) {
            showLeadForm();
            return;
        }

        messageCount++;

        const loadingId = showLoading();
        scrollToBottom();

        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const API_URL = isLocal
                ? 'http://localhost:8010/website/chat'
                : 'https://qtick-svc-du97k.ondigitalocean.app/website/chat';

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    history: chatHistory
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            removeLoading(loadingId);

            const botResponse = data.response_text || "I'm sorry, I couldn't process that request.";
            appendMessage('model', botResponse);

            chatHistory.push({ role: 'user', content: message });
            chatHistory.push({ role: 'assistant', content: botResponse });

        } catch (error) {
            console.error('Error sending message:', error);
            removeLoading(loadingId);
            appendMessage('model', "I'm having trouble connecting to the server. Please try again later.");
        }

        scrollToBottom();
    }

    function showLeadForm() {
        const formId = 'lead-form-' + Date.now();
        const formDiv = document.createElement('div');
        formDiv.className = 'flex gap-3';
        formDiv.innerHTML = `
            <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0 mt-1">
                <i data-lucide="bot" class="w-4 h-4"></i>
            </div>
            <div class="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm w-full max-w-[85%]">
                <p class="mb-3 font-semibold text-slate-900">We'd love to help you further! Please leave your details, and the QTick team will call you ASAP.</p>
                <form id="${formId}" class="space-y-3">
                    <input type="text" name="name" placeholder="Name" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500">
                    <input type="tel" name="phone" placeholder="Phone Number" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500">
                    <input type="email" name="email" placeholder="Email" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500">
                    <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Submit</button>
                </form>
            </div>
        `;
        chatMessages.appendChild(formDiv);
        if (window.lucide) lucide.createIcons();
        scrollToBottom();

        // Attach listener specifically to this form
        document.getElementById(formId).addEventListener('submit', (e) => handleLeadSubmit(e, formId));
    }

    function handleLeadSubmit(event, formId) {
        event.preventDefault();
        const form = document.getElementById(formId);
        const formData = new FormData(form);
        const name = formData.get('name');

        // Remove form container
        form.closest('.flex').remove();

        appendMessage('model', `Thanks ${name}! The QTick team will call you ASAP.`);
        isLeadCaptured = true;
        messageCount = 0;
    }

    function appendMessage(role, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex gap-3 ' + (role === 'user' ? 'flex-row-reverse' : '');

        const iconDiv = document.createElement('div');
        iconDiv.className = `w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-100 text-indigo-600'}`;

        if (role === 'user') {
            iconDiv.innerHTML = '<i data-lucide="user" class="w-4 h-4"></i>';
        } else {
            iconDiv.innerHTML = '<i data-lucide="bot" class="w-4 h-4"></i>';
        }

        const textDiv = document.createElement('div');
        textDiv.className = `p-3 rounded-2xl text-sm shadow-sm max-w-[85%] ${role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`;
        textDiv.innerHTML = text.replace(/\\n/g, '<br>');

        messageDiv.appendChild(iconDiv);
        messageDiv.appendChild(textDiv);
        chatMessages.appendChild(messageDiv);

        if (window.lucide) lucide.createIcons();
    }

    function showLoading() {
        const id = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = id;
        loadingDiv.className = 'flex gap-3';
        loadingDiv.innerHTML = `
            <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0 mt-1">
                <i data-lucide="bot" class="w-4 h-4"></i>
            </div>
            <div class="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm">
                <div class="flex gap-1">
                    <span class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                    <span class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                    <span class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(loadingDiv);
        if (window.lucide) lucide.createIcons();
        return id;
    }

    function removeLoading(id) {
        const element = document.getElementById(id);
        if (element) element.remove();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Initialize icons if Lucide is present
    if (window.lucide) {
        lucide.createIcons();
    }

})();
