const baseUrl = "http://localhost:3000"

document.addEventListener('DOMContentLoaded', function () {
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
        window.location.href = './login.html';  // Redirect to login if not logged in
    } else {
        // console.log('User data:', JSON.parse(userData));
        console.log(document.cookie)
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
        const response = await fetch(`${baseUrl}/message/get-users`, {
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
                const avatar = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                // Use user data for avatar and name ""
                listItem.innerHTML = `
                    <div class="user-avatar">
                        <img src="${avatar}" alt = "${user.fullName} avatar" >
                    </div >
    <span class="user-name">${user.fullName}</span>
`;

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
};

// usersForSidebar()