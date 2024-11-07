// Define types for form values
interface ResumeData {
    username: string;
    name: string;
    email: string;
    contact: string;
    education: string;
    experience: string;
    skills: string;
}

// Declare html2pdf as any to avoid TypeScript errors
declare const html2pdf: any;

// Main function to generate the resume
function generateResume(): void {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    (document.getElementById('errorMessages') as HTMLElement).innerHTML = "";

    const resumeData: ResumeData = { username, name, email, contact, education, experience, skills };

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
    (document.getElementById('output') as HTMLElement).innerHTML = output;
    (document.getElementById('resumeBtn') as HTMLElement).style.display = 'block';

    generateUniqueURL(resumeData);
}

// Function to validate the form
function validateForm(data: ResumeData): boolean {
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

    (document.getElementById('errorMessages') as HTMLElement).innerHTML = errorMessages;
    return valid;
}

// Function to generate unique URL
function generateUniqueURL(data: ResumeData): void {
    const uniqueURL = `https://example.com/resume/${data.username}?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&contact=${encodeURIComponent(data.contact)}&education=${encodeURIComponent(data.education)}&experience=${encodeURIComponent(data.experience)}&skills=${encodeURIComponent(data.skills)}`;
    
    (document.getElementById('resumeURL') as HTMLInputElement).value = uniqueURL;
    (document.getElementById('shareLink') as HTMLElement).style.display = 'block';
}

// Function to copy the generated URL to clipboard
function copyToClipboard(): void {
    const resumeURL = document.getElementById('resumeURL') as HTMLInputElement;
    resumeURL.select();
    document.execCommand('copy');
    alert("Link copied to clipboard!");
}

// Event listener for downloading resume as PDF
(document.getElementById('downloadBtn') as HTMLElement).addEventListener('click', () => {
    const element = document.getElementById('output') as HTMLElement;
    html2pdf(element);
});
