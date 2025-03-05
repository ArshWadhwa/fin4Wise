document.addEventListener('DOMContentLoaded', function () {
    const termsCheckbox = document.getElementById('terms');
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.querySelector('input[type="text"]');

    termsCheckbox.addEventListener('change', function () {
        loginBtn.disabled = !termsCheckbox.checked;
    });

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = usernameInput.value.trim();

        if (termsCheckbox.checked) {
            if (username) {
                // Store username in session storage
                sessionStorage.setItem('username', username);

                alert('Login successful!');
                window.location.href = "index.html"; // Redirect to home page
            } else {
                alert("Please enter a username.");
            }
        } else {
            alert("Please agree to the terms & conditions before logging in.");
        }
    });
});