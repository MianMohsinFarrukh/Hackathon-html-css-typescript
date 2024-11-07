"use strict";
// Main function to generate the resume
function generateResume() {
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    document.getElementById('errorMessages').innerHTML = "";
    const resumeData = { username, name, email, contact, education, experience, skills };
    if (!validateForm(resumeData)) {
        return;
    }
    let output = `
        <h3>Generated Resume:</h3>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Skills:</strong> ${skills}</p>
    `;
    document.getElementById('output').innerHTML = output;
    document.getElementById('resumeBtn').style.display = 'block';
    generateUniqueURL(resumeData);
}
// Function to validate the form
function validateForm(data) {
    let valid = true;
    let errorMessages = "";
    const nameWords = data.name.trim().split(' ');
    if (nameWords.length < 3) {
        errorMessages += "Full Name must have at least 3 words.<br>";
        valid = false;
    }
    if (!data.email.endsWith('@gmail.com')) {
        errorMessages += "Email must be a Gmail address.<br>";
        valid = false;
    }
    const contactRegex = /^[0-9]+$/;
    if (!data.contact.match(contactRegex)) {
        errorMessages += "Contact Number should only contain numbers.<br>";
        valid = false;
    }
    if (!data.education.trim()) {
        errorMessages += "Education is required.<br>";
        valid = false;
    }
    if (!data.experience.trim()) {
        errorMessages += "Experience is required.<br>";
        valid = false;
    }
    if (!data.skills.trim()) {
        errorMessages += "Skills are required.<br>";
        valid = false;
    }
    document.getElementById('errorMessages').innerHTML = errorMessages;
    return valid;
}
// Function to generate unique URL
function generateUniqueURL(data) {
    const uniqueURL = `https://example.com/resume/${data.username}?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&contact=${encodeURIComponent(data.contact)}&education=${encodeURIComponent(data.education)}&experience=${encodeURIComponent(data.experience)}&skills=${encodeURIComponent(data.skills)}`;
    document.getElementById('resumeURL').value = uniqueURL;
    document.getElementById('shareLink').style.display = 'block';
}
// Function to copy the generated URL to clipboard
function copyToClipboard() {
    const resumeURL = document.getElementById('resumeURL');
    resumeURL.select();
    document.execCommand('copy');
    alert("Link copied to clipboard!");
}
// Event listener for downloading resume as PDF
document.getElementById('downloadBtn').addEventListener('click', () => {
    const element = document.getElementById('output');
    html2pdf(element);
});
