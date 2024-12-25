

document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        // Toggle icon
        this.innerHTML = type === 'password'
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
    });

    // loginForm.addEventListener('submit', async function (e) {
    //     e.preventDefault();
    //     const email = document.getElementById('email').value;
    //     const password = document.getElementById('password').value;

    //     // try {
    //     //     // Send login data to the server
    //     //     const response = await fetch(`/auth/login`, {
    //     //         method: 'POST',
    //     //         headers: {
    //     //             'Content-Type': 'application/json',
    //     //         },
    //     //         body: JSON.stringify({ email, password }),
    //     //         credentials: "include",
    //     //     });
    //     // const data = await response.json();

    //     // // Handle server response
    //     // if (data.success) {



    //     //     // Redirect or show a success message
    //     //     alert('Login successful!');
    //     //     sessionStorage.setItem('userData', JSON.stringify(data))

    //     // window.location.replace('./dashboard.html');  // Replaces the current page with the dashboard

    //     // Redirect to the dashboard or another page
    //     // } else {
    //     //     // const errorData = await response.json();
    //     //     console.error('Login failed:', data.message);
    //     //     alert(`Login failed: ${data.message}`);
    //     // }
    //     // } catch (error) {
    //     //     console.error('Error during login:', error);
    //     //     alert('An error occurred. Please try again.');
    //     // }
    // });
});
