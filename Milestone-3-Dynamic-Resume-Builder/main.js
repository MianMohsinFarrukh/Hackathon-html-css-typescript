"use strict";
// Function to validate and generate the resume dynamically
function generateResume() {
    // Fetch form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const education = document.getElementById("education").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const skills = document.getElementById("skills").value.trim();
    // Validate Name (should be at most 3 words)
    const nameWords = name.split(" ");
    if (nameWords.length > 3) {
        alert("Name should be at most 3 words.");
        return;
    }
    // Ensure all other fields are filled
    if (!name || !email || !contact || !education || !experience || !skills) {
        alert("Please fill in all fields.");
        return;
    }
    // Validate Email (should contain "@gmail.com")
    if (!email.endsWith("@gmail.com")) {
        alert("Email must be a Gmail address (e.g., yourname@gmail.com).");
        return;
    }
    // Validate Contact (should be numeric)
    if (isNaN(Number(contact)) || contact.length === 0) {
        alert("Contact must contain numbers only.");
        return;
    }
    // Generate resume HTML content
    const resumeContent = `
      <h2 style =" color: #4a90e2;">Resume</h2>
      <h3 style =" color: #4a90e2; text-decoration: underline;">Personal Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact:</strong> ${contact}</p>

      <h3 style =" color: #4a90e2; text-decoration: underline;">Education</h3>
      <p>${education}</p>

      <h3 style =" color: #4a90e2; text-decoration: underline;">Work Experience</h3>
      <p>${experience}</p>

      <h3 style =" color: #4a90e2; text-decoration: underline;">Skills</h3>
      <p>${skills.split(',').map(skill => skill.trim()).join(', ')}</p>
    `;
    // Display the resume content
    const resumeOutput = document.getElementById("resumeOutput");
    if (resumeOutput) {
        resumeOutput.innerHTML = resumeContent;
    }
}
// Page load par event listener ko initialize karna
document.addEventListener("DOMContentLoaded", () => {
    // Initially empty the resume output
    const resumeOutput = document.getElementById("resumeOutput");
    if (resumeOutput) {
        resumeOutput.innerHTML = "";
    }
});
