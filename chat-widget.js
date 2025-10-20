// Chat Widget JavaScript
class ChatWidget {
  constructor() {
    this.isOpen = false;
    this.isTyping = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.createWidget();
    this.bindEvents();
    this.addWelcomeMessage();
  }

  createWidget() {
    // Create chat widget HTML
    const chatHTML = `
      <div class="chat-widget">
        <div class="chat-bubble" id="chatBubble">
          <span class="chat-icon">💬</span>
        </div>
        <div class="chat-window" id="chatWindow">
          <div class="chat-header">
            <div class="chat-header-info">
              <div class="chat-avatar">🤖</div>
              <div>
                <h3 class="chat-title">AI Assistant</h3>
                <p class="chat-subtitle">Sẵn sàng hỗ trợ bạn</p>
              </div>
            </div>
            <button class="chat-close" id="chatClose">×</button>
          </div>
          <div class="chat-messages" id="chatMessages">
            <div class="chat-welcome">
              <span class="chat-welcome-icon">👋</span>
              <p>Xin chào! Tôi là AI Assistant của iView NEU. Tôi có thể giúp bạn:</p>
              <ul style="text-align: left; margin-top: 10px; padding-left: 20px;">
                <li>Hướng dẫn sử dụng hệ thống</li>
                <li>Giải đáp thắc mắc về phỏng vấn</li>
                <li>Gợi ý câu hỏi luyện tập</li>
                <li>Hỗ trợ kỹ thuật</li>
              </ul>
            </div>
          </div>
          <div class="chat-input-container">
            <div class="chat-input-wrapper">
              <textarea 
                class="chat-input" 
                id="chatInput" 
                placeholder="Nhập câu hỏi của bạn..."
                rows="1"
              ></textarea>
              <button class="chat-send" id="chatSend">
                <span>➤</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add to body
    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  bindEvents() {
    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    // Toggle chat window
    chatBubble.addEventListener('click', () => {
      this.toggleChat();
    });

    // Close chat
    chatClose.addEventListener('click', () => {
      this.closeChat();
    });

    // Send message
    chatSend.addEventListener('click', () => {
      this.sendMessage();
    });

    // Send on Enter (but allow Shift+Enter for new line)
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', () => {
      this.autoResizeTextarea(chatInput);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !e.target.closest('.chat-widget')) {
        this.closeChat();
      }
    });
  }

  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatBubble = document.getElementById('chatBubble');
    
    chatWindow.classList.add('active');
    chatBubble.style.transform = 'scale(0.9)';
    this.isOpen = true;
    
    // Focus input after animation
    setTimeout(() => {
      document.getElementById('chatInput').focus();
    }, 300);
  }

  closeChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatBubble = document.getElementById('chatBubble');
    
    chatWindow.classList.remove('active');
    chatBubble.style.transform = 'scale(1)';
    this.isOpen = false;
  }

  sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    chatInput.value = '';
    this.autoResizeTextarea(chatInput);

    // Show typing indicator
    this.showTypingIndicator();

    // Simulate AI response
    setTimeout(() => {
      this.hideTypingIndicator();
      this.generateAIResponse(message);
    }, 1000 + Math.random() * 2000);
  }

  addMessage(content, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const avatar = sender === 'ai' ? '🤖' : '👤';
    const avatarClass = sender === 'ai' ? 'ai' : 'user';
    
    messageDiv.innerHTML = `
      <div class="chat-message-avatar ${avatarClass}">${avatar}</div>
      <div class="chat-message-content">${this.formatMessage(content)}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
    
    // Store message
    this.messages.push({ content, sender, timestamp: new Date() });
  }

  showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message ai';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
      <div class="chat-message-avatar ai">🤖</div>
      <div class="chat-typing">
        <div class="chat-typing-dots">
          <div class="chat-typing-dot"></div>
          <div class="chat-typing-dot"></div>
          <div class="chat-typing-dot"></div>
        </div>
      </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    this.scrollToBottom();
    this.isTyping = true;
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
    this.isTyping = false;
  }

  generateAIResponse(userMessage) {
    const responses = this.getAIResponses(userMessage);
    const response = responses[Math.floor(Math.random() * responses.length)];
    this.addMessage(response, 'ai');
  }

  getAIResponses(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes('xin chào') || message.includes('hello') || message.includes('hi')) {
      return [
        'Xin chào! Tôi rất vui được hỗ trợ bạn. Bạn cần giúp gì về hệ thống iView NEU?',
        'Chào bạn! Tôi là AI Assistant của iView NEU. Tôi có thể giúp bạn với các câu hỏi về phỏng vấn và luyện tập.',
        'Hello! Tôi sẵn sàng hỗ trợ bạn. Hãy cho tôi biết bạn muốn tìm hiểu gì nhé!'
      ];
    }
    
    // Interview related
    if (message.includes('phỏng vấn') || message.includes('interview')) {
      return [
        'Để chuẩn bị tốt cho phỏng vấn, bạn nên: 1) Nghiên cứu kỹ về công ty/vị trí, 2) Chuẩn bị CV và portfolio, 3) Luyện tập trả lời các câu hỏi thường gặp, 4) Chuẩn bị câu hỏi cho nhà tuyển dụng.',
        'Hệ thống iView NEU có thể giúp bạn luyện tập phỏng vấn với AI. Bạn có thể tạo phiên phỏng vấn việc làm hoặc thi vấn đáp môn học.',
        'Một số câu hỏi phỏng vấn thường gặp: "Hãy giới thiệu về bản thân", "Tại sao bạn muốn làm việc ở đây?", "Điểm mạnh/yếu của bạn là gì?". Bạn muốn luyện tập câu nào?'
      ];
    }
    
    // Academic related
    if (message.includes('thi') || message.includes('vấn đáp') || message.includes('môn học')) {
      return [
        'Để thi vấn đáp hiệu quả: 1) Ôn tập kỹ lý thuyết, 2) Chuẩn bị ví dụ thực tế, 3) Luyện tập trình bày rõ ràng, 4) Chuẩn bị câu hỏi mở rộng. Bạn đang ôn môn nào?',
        'Hệ thống có thể tạo câu hỏi vấn đáp theo môn học của bạn. Bạn chỉ cần upload giáo trình và bảng điểm để AI tạo câu hỏi phù hợp.',
        'Một số môn học phổ biến: Kinh tế vi mô, Tài chính doanh nghiệp, Kinh tế lượng, Triết học Mác-Lênin. Bạn muốn luyện tập môn nào?'
      ];
    }
    
    // Technical support
    if (message.includes('lỗi') || message.includes('không hoạt động') || message.includes('help')) {
      return [
        'Nếu gặp lỗi kỹ thuật, bạn có thể: 1) Refresh trang, 2) Kiểm tra kết nối internet, 3) Thử trình duyệt khác, 4) Liên hệ support@neu.edu.vn',
        'Tôi có thể hướng dẫn bạn sử dụng các tính năng của hệ thống. Bạn gặp vấn đề gì cụ thể?',
        'Để được hỗ trợ tốt nhất, hãy mô tả chi tiết vấn đề bạn đang gặp phải.'
      ];
    }
    
    // Default responses
    return [
      'Cảm ơn bạn đã hỏi! Tôi có thể giúp bạn với các vấn đề về phỏng vấn, thi vấn đáp, hoặc sử dụng hệ thống iView NEU. Bạn muốn tìm hiểu gì?',
      'Tôi hiểu câu hỏi của bạn. Bạn có thể thử: 1) Tạo phiên phỏng vấn mới, 2) Xem lịch sử luyện tập, 3) Kiểm tra dashboard cá nhân. Cần hỗ trợ gì thêm?',
      'Đó là một câu hỏi hay! Tôi khuyên bạn nên sử dụng tính năng luyện tập của hệ thống để cải thiện kỹ năng. Bạn có muốn tôi hướng dẫn cách sử dụng không?',
      'Tôi có thể giúp bạn hiểu rõ hơn về hệ thống iView NEU. Bạn quan tâm đến tính năng nào: phỏng vấn việc làm hay thi vấn đáp môn học?'
    ];
  }

  formatMessage(content) {
    // Simple formatting for better readability
    return content
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
  }

  scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  addWelcomeMessage() {
    // Add some sample messages to make it look more realistic
    setTimeout(() => {
      if (this.messages.length === 0) {
        this.addMessage('Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?', 'ai');
      }
    }, 2000);
  }
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ChatWidget();
});
