// Chat Widget Logic

// State
let isChatOpen = false;
let chatHistory = []; // Stores { role: 'user' | 'assistant', content: string }
let messageCount = 0;
const LEAD_CAPTURE_THRESHOLD = 10;
let isLeadCaptured = false;

// DOM Elements
const chatWidgetContainer = document.getElementById('chat-widget-container');
const chatWindow = document.getElementById('chat-window');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Toggle Chat Window
function toggleChat() {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        chatWindow.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
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
        }, 300); // Match transition duration
    }
}

// Send Message
async function sendMessage(event) {
    event.preventDefault();

    const message = chatInput.value.trim();
    if (!message) return;

    // 1. Add User Message to UI
    appendMessage('user', message);
    chatInput.value = '';
    scrollToBottom();

    // Check for Lead Capture Threshold
    if (!isLeadCaptured && messageCount >= LEAD_CAPTURE_THRESHOLD) {
        showLeadForm();
        return;
    }

    messageCount++;

    // 2. Show Loading State
    const loadingId = showLoading();
    scrollToBottom();

    try {
        // 3. Call API
        // Determine API URL based on environment
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

        // Remove Loading State
        removeLoading(loadingId);

        // 4. Add Bot Message to UI
        // The API returns { response_text: "..." } based on previous context
        const botResponse = data.response_text || "I'm sorry, I couldn't process that request.";
        appendMessage('model', botResponse);

        // 5. Update History
        // Add user message
        chatHistory.push({
            role: 'user',
            content: message
        });
        // Add bot response
        chatHistory.push({
            role: 'assistant',
            content: botResponse
        });

    } catch (error) {
        console.error('Error sending message:', error);
        removeLoading(loadingId);
        appendMessage('model', "I'm having trouble connecting to the server. Please try again later.");
    }

    scrollToBottom();
}

// Show Lead Capture Form
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
            <form id="${formId}" onsubmit="handleLeadSubmit(event, '${formId}')" class="space-y-3">
                <input type="text" name="name" placeholder="Name" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500">
                <input type="tel" name="phone" placeholder="Phone Number" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500">
                <input type="email" name="email" placeholder="Email" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500">
                <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Submit</button>
            </form>
        </div>
    `;
    chatMessages.appendChild(formDiv);
    lucide.createIcons();
    scrollToBottom();
}

// Handle Lead Form Submission
function handleLeadSubmit(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');

    // Here you would typically send this data to your backend
    console.log('Lead Captured:', { name, phone, email });

    // Remove form and show success message
    form.closest('.flex').remove();

    appendMessage('model', `Thanks ${name}! The QTick team will call you ASAP.`);
    isLeadCaptured = true;

    // Reset count or disable chat if needed, for now we let them continue
    messageCount = 0;
}

// Append Message to UI
function appendMessage(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex gap-3 ' + (role === 'user' ? 'flex-row-reverse' : '');

    const iconDiv = document.createElement('div');
    iconDiv.className = `w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-100 text-indigo-600'}`;

    // Icon
    if (role === 'user') {
        iconDiv.innerHTML = '<i data-lucide="user" class="w-4 h-4"></i>';
    } else {
        iconDiv.innerHTML = '<i data-lucide="bot" class="w-4 h-4"></i>';
    }

    const textDiv = document.createElement('div');
    textDiv.className = `p-3 rounded-2xl text-sm shadow-sm max-w-[85%] ${role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`;

    // Convert newlines to <br> for basic formatting
    textDiv.innerHTML = text.replace(/\n/g, '<br>');

    messageDiv.appendChild(iconDiv);
    messageDiv.appendChild(textDiv);
    chatMessages.appendChild(messageDiv);

    // Re-initialize icons for the new element
    lucide.createIcons();
}

// Show Loading Indicator
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
    lucide.createIcons();
    return id;
}

// Remove Loading Indicator
function removeLoading(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

// Scroll to Bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
