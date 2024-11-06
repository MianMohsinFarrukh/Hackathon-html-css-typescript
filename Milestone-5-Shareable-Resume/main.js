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
      <h2 style="color: #4a90e2;">Editable Resume</h2>
      <h3 style="color: #4a90e2; text-decoration: underline;">Personal Information</h3>
      <p><strong>Name:</strong> <span contenteditable="true">${name}</span></p>
      <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
      <p><strong>Contact:</strong> <span contenteditable="true">${contact}</span></p>

      <h3 style="color: #4a90e2; text-decoration: underline;">Education</h3>
      <p contenteditable="true">${education}</p>

      <h3 style="color: #4a90e2; text-decoration: underline;">Work Experience</h3>
      <p contenteditable="true">${experience}</p>

      <h3 style="color: #4a90e2; text-decoration: underline;">Skills</h3>
      <p contenteditable="true">${skills.split(',').map(skill => skill.trim()).join(', ')}</p>
    `;

    // Display the resume content
    const resumeOutput = document.getElementById("resumeOutput");
    if (resumeOutput) {
        resumeOutput.innerHTML = resumeContent;
    }

    // Show the download button after generating the resume
    const downloadButton = document.getElementById("downloadButton");
    if (downloadButton) {
        downloadButton.style.display = "block";
    }
}

// Function to download the resume as PDF
function downloadResume() {
    const resumeOutput = document.getElementById("resumeOutput");
    if (resumeOutput) {
        const pdfOptions = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate PDF
        html2pdf()
            .from(resumeOutput)
            .set(pdfOptions)
            .save();
    }
}

// Page load par event listener ko initialize karna
document.addEventListener("DOMContentLoaded", () => {
    // Initially empty the resume output
    const resumeOutput = document.getElementById("resumeOutput");
    if (resumeOutput) {
        resumeOutput.innerHTML = "";
    }

    // Add event listener for download button
    const downloadButton = document.getElementById("downloadButton");
    if (downloadButton) {
        downloadButton.addEventListener("click", resumeContent);
    }
});
