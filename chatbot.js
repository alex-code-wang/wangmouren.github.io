// 聊天机器人组件 - 百度文心一言版本
class Chatbot {
    constructor() {
        this.messages = [];
        this.apiKey = '';
        this.secretKey = '';
        this.accessToken = '';
        this.isTyping = false;
        this.tokenExpiry = 0;
        this.init();
    }

    init() {
        this.loadApiKey();
        this.addMessage('你好！我是你的 AI 助手，有什么可以帮助你的吗？', 'ai');
        this.bindEvents();
    }

    loadApiKey() {
        const savedKey = localStorage.getItem('baidu_api_key');
        const savedSecret = localStorage.getItem('baidu_secret_key');
        if (savedKey && savedSecret) {
            this.apiKey = savedKey;
            this.secretKey = savedSecret;
            const apiKeyInput = document.getElementById('chatbot-api-key');
            const secretKeyInput = document.getElementById('chatbot-secret-key');
            if (apiKeyInput) apiKeyInput.value = savedKey;
            if (secretKeyInput) secretKeyInput.value = savedSecret;
        }
    }

    saveApiKey(key, secret) {
        this.apiKey = key.trim();
        this.secretKey = secret.trim();
        localStorage.setItem('baidu_api_key', this.apiKey);
        localStorage.setItem('baidu_secret_key', this.secretKey);
        this.accessToken = '';
        this.tokenExpiry = 0;
    }

    bindEvents() {
        const button = document.getElementById('chatbot-button');
        const window = document.getElementById('chatbot-window');

        if (button && window) {
            button.addEventListener('click', () => {
                window.classList.toggle('active');
            });
        }

        const closeBtn = document.getElementById('chatbot-close');
        if (closeBtn && window) {
            closeBtn.addEventListener('click', () => {
                window.classList.remove('active');
            });
        }

        const saveKeyBtn = document.getElementById('chatbot-save-key');
        const apiKeyInput = document.getElementById('chatbot-api-key');
        const secretKeyInput = document.getElementById('chatbot-secret-key');

        if (saveKeyBtn) {
            saveKeyBtn.addEventListener('click', () => {
                const key = apiKeyInput ? apiKeyInput.value.trim() : '';
                const secret = secretKeyInput ? secretKeyInput.value.trim() : '';
                if (key && secret) {
                    this.saveApiKey(key, secret);
                    this.addMessage('API Key 已保存！现在可以开始聊天了。', 'ai');
                } else {
                    this.addMessage('请输入完整的 API Key 和 Secret Key！', 'ai');
                }
            });
        }

        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        if (sendBtn && input) {
            sendBtn.addEventListener('click', () => this.sendMessage());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    }

    addMessage(text, sender) {
        const message = {
            id: Date.now(),
            text: text,
            sender: sender,
            time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        };

        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }

    renderMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${message.sender}`;
        messageDiv.innerHTML = `
            <div class="chatbot-bubble">
                ${message.text.replace(/\n/g, '<br>')}
                <div class="chatbot-time">${message.time}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
    }

    showTyping() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.id = 'chatbot-typing';
        typingDiv.className = 'chatbot-message ai';
        typingDiv.innerHTML = `
            <div class="chatbot-bubble">
                <div class="chatbot-typing">
                    <div class="chatbot-typing-dot"></div>
                    <div class="chatbot-typing-dot"></div>
                    <div class="chatbot-typing-dot"></div>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        const typing = document.getElementById('chatbot-typing');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    async getAccessToken() {
        if (this.accessToken && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }

        const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.secretKey}`;

        try {
            const response = await fetch(tokenUrl, { method: 'POST' });
            const data = await response.json();

            if (data.access_token) {
                this.accessToken = data.access_token;
                this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
                return this.accessToken;
            } else {
                throw new Error(data.error_description || '获取Access Token失败');
            }
        } catch (error) {
            throw new Error('无法获取访问令牌，请检查API Key和Secret Key');
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        if (!input || !input.value.trim() || this.isTyping) return;

        const userText = input.value.trim();
        input.value = '';

        this.addMessage(userText, 'user');

        if (!this.apiKey || !this.secretKey) {
            this.addMessage('请先在顶部输入并保存您的百度 API Key 和 Secret Key！', 'ai');
            return;
        }

        this.isTyping = true;
        this.showTyping();

        try {
            const accessToken = await this.getAccessToken();

            const response = await fetch(
                `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/eb-instant?access_token=${accessToken}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            { role: 'user', content: userText }
                        ],
                        temperature: 0.7,
                        top_p: 0.95
                    })
                }
            );

            const data = await response.json();

            this.hideTyping();

            if (data.error_code) {
                throw new Error(data.error_msg || 'API调用失败');
            }

            const aiResponse = data.result || '抱歉，我没有收到有效的回复。';
            this.addMessage(aiResponse, 'ai');
        } catch (error) {
            console.error('Error:', error);
            this.hideTyping();
            this.addMessage(`抱歉，${error.message}。请稍后再试。`, 'ai');
        } finally {
            this.isTyping = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
});
