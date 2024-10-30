// Function to validate phone number
function isValidPhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/; // Regex for exactly 10 digits
    return phoneRegex.test(phone);
}

// Function to validate URLs
function isValidURL(url) {
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}(\/[^\s]*)?$/; // Basic URL validation regex
    return urlRegex.test(url);
}
// Show portfolio form and hide welcome section
document.getElementById('start-builder').addEventListener('click', function () {
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
});

// Handle form submission and build portfolio
document.getElementById('portfolioForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data including new fields
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const bio = document.getElementById('bio').value;
    const phone = document.getElementById('phone').value; // Phone Number
    const location = document.getElementById('location').value; // Location
    const skills = document.getElementById('skills').value.split(',');
    const experience = document.getElementById('experience').value.split(',');
    const projects = document.getElementById('projects').value.split(',');
    const social = document.getElementById('social').value.split(',');
    const theme = document.getElementById('theme').value;


    // Validate phone number
    if (!isValidPhoneNumber(phone)) {
        alert("Please enter a valid phone number (10 digits).");
        return; // Stop execution if invalid
    }

    // Validate social links
    for (let link of social) {
        if (!isValidURL(link.trim())) {
            alert(`The following link is not valid: ${link}`);
            return; // Stop execution if any link is invalid
        }
    }

    // Build the portfolio HTML with new fields
    const portfolioHTML = `
        <h3>${name}</h3>
        <h4>${title}</h4>
        <p><strong>Bio:</strong> ${bio}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <ul><strong>Skills:</strong> ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
        <ul><strong>Experience:</strong> ${experience.map(exp => `<li>${exp.trim()}</li>`).join('')}</ul>
        <ul><strong>Projects:</strong> ${projects.map(project => `<li>${project.trim()}</li>`).join('')}</ul>
        <ul><strong>Social Links:</strong> ${social.map(link => `<li>${link.trim()}</li>`).join('')}</ul>
    `;

    document.getElementById('portfolio-display').innerHTML = portfolioHTML;
    

    // Toggle visibility
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('portfolio-section').style.display = 'block';

    // Apply selected theme
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
});

// Edit portfolio button functionality
document.getElementById('edit-portfolio').addEventListener('click', function () {
    document.getElementById('portfolio-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
});

// Download portfolio as PDF
document.getElementById('download-portfolio').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    const portfolioContent = document.getElementById('portfolio-display').innerHTML;
    pdf.text(portfolioContent, 10, 10);
    
    pdf.save('portfolio.pdf');
});
