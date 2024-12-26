document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.getElementById('fileInput');
    const cameraButton = document.querySelector('.camera-button');

    cameraButton.addEventListener('click', () => {
        photoInput.click();
    });

    document.getElementById('fileInput').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const base64Image = reader.result;
            document.getElementById('previewImage').src = base64Image;
            document.getElementById('previewImage').style.display = 'block';

            // Optionally, save the base64 image for later upload
            document.getElementById('uploadButton').onclick = async () => {
                try {
                    const response = await fetch('/auth/update-profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ profilePic: base64Image }),
                    });

                    const result = await response.json();
                    if (result.success) {
                        alert('Profile picture uploaded successfully!');
                    } else {
                        alert('Upload failed: ' + result.message);
                    }
                } catch (error) {
                    console.error('Error uploading profile picture:', error);
                }
            };
        };

        reader.readAsDataURL(file); // Converts file to base64
    });

    document.querySelector("#logout").addEventListener('click', () => {
        logout();
    })

    document.querySelector("#home").addEventListener('click', () => {
        window.location.href = "/auth/dashboard"
    })
})

// Define the logout function
function logout() {
    fetch('/auth/logout', {
        method: 'GET', // Request method
        credentials: 'include'  // Include cookies (if you're using cookies for sessions)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect the user to the login page after logout
                window.location.href = '/auth/login';  // Or any other page
            } else {
                alert('Logout failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
            alert('An error occurred while logging out.');
        });
}
