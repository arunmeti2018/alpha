document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.querySelector('.messages-container');


    // Function to create a new message element
    function createMessage(text, isSent = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        messageBubble.textContent = text;

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        messageContent.appendChild(messageBubble);
        messageContent.appendChild(messageTime);

        if (!isSent) {
            const messageAvatar = document.createElement('div');
            messageAvatar.className = 'message-avatar';
            const avatarImg = document.createElement('img');
            avatarImg.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane';
            avatarImg.alt = 'Jane';
            messageAvatar.appendChild(avatarImg);
            messageDiv.appendChild(messageAvatar);
        }

        messageDiv.appendChild(messageContent);
        return messageDiv;
    }

    // Function to add a new message to the chat
    function addMessage(text, isSent = true) {
        const message = createMessage(text, isSent);
        const messageGroup = document.querySelector('.message-group');
        messageGroup.appendChild(message);
        scrollToBottom();
    }

    // Function to scroll to bottom of messages
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Handle message submission
    // messageForm.addEventListener('submit', (e) => {
        // e.preventDefault();
        // const text = messageInput.value.trim();

        // if (text) {
        //     // Add user's message
        //     addMessage(text, true);
        //     messageInput.value = '';

        //     // Simulate received message after a delay
        //     setTimeout(() => {
        //         const responses = [
        //             "That's interesting!",
        //             "Tell me more about it.",
        //             "I see what you mean.",
        //             "Thanks for sharing!",
        //             "Good point!"
        //         ];
        //         const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        //         addMessage(randomResponse, false);
        //     }, 1000);
        // }
    // });



    // Handle input auto-resize
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });

    // Handle emoji button click
    const emojiButton = document.querySelector('.emoji');
    emojiButton.addEventListener('click', () => {
        // You can integrate an emoji picker here
        messageInput.value += '😊';
    });

    // Add hover effects to action buttons
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Initial scroll to bottom
    scrollToBottom();
});