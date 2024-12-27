const baseUrl = "http://localhost:3000"

document.addEventListener('DOMContentLoaded', function () {
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
        window.location.href = './login.ejs';  // Redirect to login if not logged in
    } else {

    }
    // Add hover effect to bubbles
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        bubble.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.1)';
            this.style.opacity = '0.3';
            this.style.transition = 'all 0.3s ease';
        });

        bubble.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.2';
        });
    });

    document.querySelector(".edit").addEventListener('click', () => {
        window.location.href = '/auth/profile';
    })
    document.querySelector(".logout").addEventListener('click', () => {
        window.location.href = '/auth/login';
    })



    // Optional: Add a simple animation for the welcome message
    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText) {
        welcomeText.style.opacity = '0';
        welcomeText.style.transform = 'translateY(20px)';
        welcomeText.style.transition = 'all 0.5s ease';

        // Trigger animation after a small delay
        setTimeout(() => {
            welcomeText.style.opacity = '1';
            welcomeText.style.transform = 'translateY(0)';
        }, 300);
    }



});

const usersForSidebar = async () => {
    try {
        const response = await fetch(`/message/get-users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Ensures cookies are included in the request
        });
        const data = await response.json();

        if (data.success) {
            const users = data.users;

            const userList = document.querySelector('.user-list'); // Ensure this is the correct container class

            // Clear existing user items (if any)
            userList.innerHTML = '';

            // Add each user to the list
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.classList.add('user-item');
                listItem.setAttribute('data-user', JSON.stringify({
                    _id: user._id,
                    fullName: user.fullName,
                    status: user.status,
                    profilePic: user.profilePic,
                    status: "online"
                }));
                // Use user data for avatar and name ""
                listItem.innerHTML = `
                    <div class="user-avatar" >
                        <img src="${user.profilePic}" alt = "${user.fullName} avatar" >
                    </div >
                        <span class="user-name">${user.fullName}</span>`

                userList.appendChild(listItem);
            });
        } else {
            console.error('Failed to fetch users:', data.message);
            alert('Could not load user list. :', data.message);
        }
    } catch (error) {
        console.error(`error ${error}`);
        alert('An error occurred while fetching users.', error.message);
    }

}




document.addEventListener("click", function (event) {
    // Check if the clicked element has the 'user-item' class
    if (event.target.closest(".user-item")) {
        const item = event.target.closest(".user-item");

        // Log the data-user attribute for debugging
        const userData = item.getAttribute("data-user");

        const otherUser = JSON.parse(userData)
        document.querySelector(".chat-container").classList.remove("main-content");


        getMessages(otherUser);







        // Dynamically update the chat header
        document.querySelector(".chat-container").innerHTML = `
                
          <!-- Chat Header -->
        <div class="chat-header">
            <div class="user-info">
                <div class="user-avatar">
                    <img src="${otherUser.profilePic}" alt="User avatar">
                    <span class="status-indicator ${otherUser.status}"></span>
                </div>
                <div class="user-details">
                    <h2>${otherUser.fullName}</h2>
                    <span class="status-text">${otherUser.status}</span>
                </div>
            </div>
            <button class="close-button" onclick=" welcomeText();">
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            </button>
        </div>

        <!-- Messages Section -->
        <div class="messages-container">
            <div class="message-group">
                <div class="message-date">Today</div>
              
               
               
                
                
            </div>
        </div>

        <!-- Message Input Section -->
        <div class="message-input-container">
            <form id="message-form" class="message-form">
                <div class="input-wrapper">
                    <input type="text" placeholder="Type a message..." id="message-input">
                    <div class="message-actions">
                        <button type="button" class="action-button format">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zm0 14h3v-3H5v3zm14 0h-3v-3h3v3zm0-5h-3v-3h3v3z" />
                            </svg>
                        </button>
                        <button type="button" class="action-button attach">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
                            </svg>
                        </button>
                        <button type="button" class="action-button emoji">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <button type="submit" class="send-button">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </form>
        </div>

            `;
    }
});






function welcomeText() {
    document.querySelector(".chat-container").classList.add("main-content");
    document.querySelector(".chat-container").innerHTML = `
     <div class="welcome-container">
            <div class="bubbles">
                <div class="bubble bubble-1"></div>
                <div class="bubble bubble-2"></div>
                <div class="bubble bubble-3"></div>
            </div>
            <h1 class="welcome-text">
                <span class="highlight">Hi!</span> Welcome to
                <span class="brand">Chatty</span> Chat App.
            </h1>
        </div> `

}

const getMessages = async (otherUser) => {
    try {
        const response = await fetch(`/message/${otherUser._id}`, {
            method: 'GET', // Explicitly set the request method
            credentials: 'include', // Include credentials (e.g., cookies, authorization headers)
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (!data.message) {
            console.log(`Error: ${data.message}`);
        }


        if (data.success) {
            console.log("Messages:", data.messages);
            showMessages(data.messages, otherUser)
        } else {
            console.error("Error:", data.message);

        }
    } catch (error) {
        console.log("Failed to fetch messages:", error);

    }
};


function showMessages(messages, otherUser) {

    const messageGroup = document.querySelector('.message-group')
    messages.forEach(message => {
        if (message.senderId === otherUser._id) {

            messageGroup.innerHTML += `
              <div class="message received">
                    <div class="message-avatar">
                        <img src="${otherUser.profilePic}" alt="Jane">
                    </div>
                    <div class="message-content">
                        <div class="message-bubble">
                            ${message.text}
                        </div>
                        <div class="message-time">
                          ${new Date(message.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}<
                                    /div>
                        </div>
                    </div>
                </div>`
        }
        else {
            messageGroup.innerHTML += `
             <div class="message sent">
                    <div class="message-avatar">
                        <img src="" alt="Jane">
                    </div>
                    <div class="message-content">
                        <div class="message-bubble">
                          ${message.text}
                        </div>
                        <div class="message-time">
                         ${new Date(message.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                         </div>
                    </div>
                </div>`
        }
    })
}




usersForSidebar()
welcomeText()