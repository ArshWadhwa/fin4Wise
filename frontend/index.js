document.addEventListener("DOMContentLoaded", function () {
    const profilePic = document.getElementById("profile-pic");
    // Store the username in local storage
    localStorage.setItem('username', username);
    const dropdown = document.getElementById("profileDropdown");

    profilePic.addEventListener("click", function (event) {
        dropdown.classList.toggle("show-dropdown");
        event.stopPropagation(); // Prevents closing when clicking inside dropdown
    });

    // Close dropdown if clicking outside
    document.addEventListener("click", function (event) {
        if (!profilePic.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove("show-dropdown");
        }
    });
});
const username = sessionStorage.getItem('username');
        // Update profile dropdown content
        if (username) {
            document.getElementById('profileName').textContent = username;
        } else {
            // If no user is logged in, hide the profile dropdown or show a message
            document.getElementById('profileDropdown').innerHTML = "<p>Please log in to view your profile.</p>";
        }

        // Show Edit Profile Form
        document.getElementById('editProfileLink').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('editProfileForm').style.display = 'block';
        });

        // Hide Edit Profile Form on Cancel
        document.getElementById('cancelEdit').addEventListener('click', function () {
            document.getElementById('editProfileForm').style.display = 'none';
        });

        // Handle Edit Profile Form Submission
        document.getElementById('editProfileForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const newUsername = document.getElementById('newUsername').value.trim();

            if (newUsername) {
                // Update username in session storage
                sessionStorage.setItem('username', newUsername);

                // Update profile dropdown content
                document.getElementById('profileName').textContent = newUsername;
                document.getElementById('profileEmail').textContent = `${newUsername}@example.com`;

                // Hide the form
                document.getElementById('editProfileForm').style.display = 'none';
                alert('Username updated successfully!');
            } else {
                alert('Please enter a valid username.');
            }
        });

        // Logout functionality
        document.getElementById('logoutLink').addEventListener('click', function (e) {
            e.preventDefault();
            sessionStorage.clear(); // Clear session storage
            window.location.href = "login.html"; // Redirect to login page
        });