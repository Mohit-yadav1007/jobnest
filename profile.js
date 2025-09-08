// Profile page functionality
document.addEventListener("DOMContentLoaded", () => {
  loadProfileData()
  loadSavedJobs()
  loadApplications()
  setupEventListeners()
})

// Sample profile data (in a real app, this would come from user authentication)
let profileData = {
  name: "John Sharma",
  title: "Software Engineer",
  location: "Mumbai, Maharashtra",
  about:
    "Experienced software engineer with 5+ years in full-stack development. Passionate about creating innovative solutions and working with cutting-edge technologies.",
  experience: [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Innovations Pvt Ltd",
      duration: "Jan 2022 - Present",
      description:
        "Leading development of web applications using React and Node.js. Managing a team of 3 junior developers.",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Digital Solutions Inc",
      duration: "Jun 2019 - Dec 2021",
      description: "Developed and maintained multiple client projects using JavaScript, Python, and MySQL.",
    },
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science",
      institution: "Indian Institute of Technology, Mumbai",
      duration: "2015 - 2019",
      grade: "CGPA: 8.5/10",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "MySQL", "MongoDB", "Git", "AWS"],
  stats: {
    profileViews: 127,
    applications: 8,
    savedJobs: 15,
  },
}

let isEditMode = false

function loadProfileData() {
  // Check if user is logged in and get their name
  const currentUserEmail = localStorage.getItem("currentUser")
  if (currentUserEmail) {
    const users = JSON.parse(localStorage.getItem("users")) || {}
    if (users[currentUserEmail] && users[currentUserEmail].name) {
      profileData.name = users[currentUserEmail].name
    }
  }

  // Load profile data from localStorage if available
  const savedProfile = localStorage.getItem("profileData")
  if (savedProfile) {
    profileData = { ...profileData, ...JSON.parse(savedProfile) }
  }

  // Update DOM elements
  document.getElementById("profile-name").textContent = profileData.name
  document.getElementById("profile-title-display").textContent = profileData.title
  document.getElementById("profile-location-display").textContent = profileData.location
  document.getElementById("about-content").innerHTML = `<p>${profileData.about}</p>`

  // Update stats
  document.getElementById("profile-views").textContent = profileData.stats.profileViews
  document.getElementById("applications-count").textContent = profileData.stats.applications

  // Load CV info
  const cvInfo = document.querySelector('.cv-info');
  const savedCV = localStorage.getItem('uploadedCV');
  cvInfo.textContent = "Current CV: " + (savedCV || "null");

  // Show remove CV button if CV exists
  const removeCVBtn = document.querySelector('.remove-cv-btn');
  if (savedCV && removeCVBtn) {
    removeCVBtn.style.display = 'inline-block';
  }

  // Load profile photo or show initials
  loadProfilePhoto()

  // Load experience
  loadExperience()

  // Load education
  loadEducation()

  // Load skills
  loadSkills()

  // Update saved jobs count
  updateSavedJobsCount()
}

function loadExperience() {
  const experienceList = document.getElementById("experience-list")
  experienceList.innerHTML = profileData.experience
    .map(
      (exp) => `
        <div class="experience-item" data-id="${exp.id}">
            <h4>${exp.title}</h4>
            <p class="company">${exp.company}</p>
            <p class="duration">${exp.duration}</p>
            <p class="description">${exp.description}</p>
            <div class="item-actions" style="margin-top: 0.5rem;">
                <button class="edit-item-btn" onclick="editExperience(${exp.id})">Edit</button>
                <button class="delete-item-btn" onclick="deleteExperience(${exp.id})">Delete</button>
            </div>
        </div>
    `,
    )
    .join("")
}

function loadEducation() {
  const educationList = document.getElementById("education-list")
  educationList.innerHTML = profileData.education
    .map(
      (edu) => `
        <div class="education-item" data-id="${edu.id}">
            <h4>${edu.degree}</h4>
            <p class="institution">${edu.institution}</p>
            <p class="duration">${edu.duration}</p>
            <p class="grade">${edu.grade}</p>
            <div class="item-actions" style="margin-top: 0.5rem;">
                <button class="edit-item-btn" onclick="editEducation(${edu.id})">Edit</button>
                <button class="delete-item-btn" onclick="deleteEducation(${edu.id})">Delete</button>
            </div>
        </div>
    `,
    )
    .join("")
}

function loadSkills() {
  const skillsList = document.getElementById("skills-list")
  skillsList.innerHTML = profileData.skills
    .map(
      (skill) => `
        <span class="skill-tag" onclick="removeSkill('${skill}')">${skill} ×</span>
    `,
    )
    .join("")
}

function setupEventListeners() {
  // Mobile navigation toggle
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // CV upload
  const cvUpload = document.getElementById("cv-upload")
  if (cvUpload) {
    cvUpload.addEventListener("change", handleCVUpload)
  }

  // Photo upload
  const photoUpload = document.getElementById("photo-upload")
  if (photoUpload) {
    photoUpload.addEventListener("change", handlePhotoUpload)
  }

  // Add skill on Enter key
  const newSkillInput = document.getElementById("new-skill")
  if (newSkillInput) {
    newSkillInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addSkill()
      }
    })
  }
}

function toggleEditMode() {
  isEditMode = !isEditMode
  const body = document.body
  const editBtn = document.querySelector(".edit-profile-btn")

  if (isEditMode) {
    body.classList.add("edit-mode")
    editBtn.textContent = "Save Profile"

    // Make title editable
    const titleDisplay = document.getElementById("profile-title-display")
    const titleEdit = document.getElementById("profile-title-input")
    titleEdit.value = profileData.title
    titleDisplay.style.display = "none"
    titleEdit.style.display = "block"

    // Make location editable
    const locationDisplay = document.getElementById("profile-location-display")
    const locationEdit = document.getElementById("profile-location-input")
    locationEdit.value = profileData.location
    locationDisplay.style.display = "none"
    locationEdit.style.display = "block"

    // Make about section editable
    const aboutEdit = document.getElementById("about-edit")
    const aboutContent = document.getElementById("about-content")
    aboutEdit.value = profileData.about
    aboutEdit.style.display = "block"
    aboutContent.style.display = "none"
  } else {
    body.classList.remove("edit-mode")
    editBtn.textContent = "Edit Profile"

    // Save title
    const titleDisplay = document.getElementById("profile-title-display")
    const titleEdit = document.getElementById("profile-title-input")
    profileData.title = titleEdit.value
    titleDisplay.textContent = profileData.title
    titleDisplay.style.display = "block"
    titleEdit.style.display = "none"

    // Save location
    const locationDisplay = document.getElementById("profile-location-display")
    const locationEdit = document.getElementById("profile-location-input")
    profileData.location = locationEdit.value
    locationDisplay.textContent = profileData.location
    locationDisplay.style.display = "block"
    locationEdit.style.display = "none"

    // Save about section
    const aboutEdit = document.getElementById("about-edit")
    const aboutContent = document.getElementById("about-content")
    profileData.about = aboutEdit.value
    aboutContent.innerHTML = `<p>${profileData.about}</p>`
    aboutEdit.style.display = "none"
    aboutContent.style.display = "block"

    // Save to localStorage
    saveProfileData()
  }
}

// Commented out redundant functions as toggleEditMode() handles About section editing
// function editAbout() {
//   const aboutEdit = document.getElementById("about-edit")
//   const aboutContent = document.getElementById("about-content")
//   const editBtn = document.querySelector(".about-edit-btn")
//   const saveBtn = document.querySelector(".about-save-btn")

//   // Set textarea value to current about text
//   aboutEdit.value = profileData.about

//   // Toggle visibility
//   aboutEdit.style.display = "block"
//   aboutContent.style.display = "none"
//   editBtn.style.display = "none"
//   saveBtn.style.display = "inline-block"
// }

// function saveAbout() {
//   const aboutEdit = document.getElementById("about-edit")
//   const aboutContent = document.getElementById("about-content")
//   const editBtn = document.querySelector(".about-edit-btn")
//   const saveBtn = document.querySelector(".about-save-btn")

//   // Save the new about text
//   profileData.about = aboutEdit.value
//   aboutContent.innerHTML = `<p>${profileData.about}</p>`

//   // Toggle visibility back
//   aboutEdit.style.display = "none"
//   aboutContent.style.display = "block"
//   editBtn.style.display = "inline-block"
//   saveBtn.style.display = "none"

//   // Save to localStorage
//   saveProfileData()
// }

function saveProfileData() {
  localStorage.setItem("profileData", JSON.stringify(profileData))
  alert("Profile updated successfully!")
}

function addExperience() {
  const title = prompt("Job Title:")
  const company = prompt("Company:")
  const duration = prompt("Duration (e.g., Jan 2020 - Present):")
  const description = prompt("Job Description:")

  if (title && company && duration && description) {
    const newExp = {
      id: Date.now(),
      title,
      company,
      duration,
      description,
    }

    profileData.experience.push(newExp)
    loadExperience()
    saveProfileData()
  }
}

function editExperience(id) {
  const exp = profileData.experience.find((e) => e.id === id)
  if (!exp) return

  const title = prompt("Job Title:", exp.title)
  const company = prompt("Company:", exp.company)
  const duration = prompt("Duration:", exp.duration)
  const description = prompt("Job Description:", exp.description)

  if (title && company && duration && description) {
    exp.title = title
    exp.company = company
    exp.duration = duration
    exp.description = description

    loadExperience()
    saveProfileData()
  }
}

function deleteExperience(id) {
  if (confirm("Are you sure you want to delete this experience?")) {
    profileData.experience = profileData.experience.filter((e) => e.id !== id)
    loadExperience()
    saveProfileData()
  }
}

function addEducation() {
  const degree = prompt("Degree/Qualification:")
  const institution = prompt("Institution:")
  const duration = prompt("Duration (e.g., 2015 - 2019):")
  const grade = prompt("Grade/CGPA:")

  if (degree && institution && duration) {
    const newEdu = {
      id: Date.now(),
      degree,
      institution,
      duration,
      grade: grade || "",
    }

    profileData.education.push(newEdu)
    loadEducation()
    saveProfileData()
  }
}

function editEducation(id) {
  const edu = profileData.education.find((e) => e.id === id)
  if (!edu) return

  const degree = prompt("Degree/Qualification:", edu.degree)
  const institution = prompt("Institution:", edu.institution)
  const duration = prompt("Duration:", edu.duration)
  const grade = prompt("Grade/CGPA:", edu.grade)

  if (degree && institution && duration) {
    edu.degree = degree
    edu.institution = institution
    edu.duration = duration
    edu.grade = grade || ""

    loadEducation()
    saveProfileData()
  }
}

function deleteEducation(id) {
  if (confirm("Are you sure you want to delete this education entry?")) {
    profileData.education = profileData.education.filter((e) => e.id !== id)
    loadEducation()
    saveProfileData()
  }
}

function addSkill() {
  const newSkillInput = document.getElementById("new-skill")
  const skill = newSkillInput.value.trim()

  if (skill && !profileData.skills.includes(skill)) {
    profileData.skills.push(skill)
    newSkillInput.value = ""
    loadSkills()
    saveProfileData()
  } else if (profileData.skills.includes(skill)) {
    alert("Skill already exists!")
  }
}

function removeSkill(skill) {
  if (confirm(`Remove ${skill} from your skills?`)) {
    profileData.skills = profileData.skills.filter((s) => s !== skill)
    loadSkills()
    saveProfileData()
  }
}

function handleCVUpload(event) {
    const file = event.target.files[0];
    const cvInfo = document.querySelector('.cv-info');
    const removeBtn = document.querySelector('.remove-cv-btn');
    if (file) {
        const fileName = file.name;
        cvInfo.textContent = `Current CV: ${fileName}`;
        // Optional: show alert
        alert("CV uploaded successfully!");
        localStorage.setItem("uploadedCV", fileName);
        if (removeBtn) removeBtn.style.display = 'inline-block';
    }
}

function removeCV() {
    const cvInfo = document.querySelector('.cv-info');
    const removeBtn = document.querySelector('.remove-cv-btn');
    cvInfo.textContent = "Current CV: null";
    localStorage.removeItem("uploadedCV");
    if (removeBtn) removeBtn.style.display = 'none';
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    const removeBtn = document.querySelector('.remove-photo-btn');
    if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageDataUrl = e.target.result;
            const avatar = document.getElementById("avatar");
            avatar.innerHTML = '';
            const img = document.createElement('img');
            img.src = imageDataUrl;
            img.alt = 'Profile Photo';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            avatar.appendChild(img);
            localStorage.setItem("profilePhoto", imageDataUrl);
            alert("Profile photo uploaded successfully!");
            if (removeBtn) removeBtn.style.display = 'inline-block';
        }
        reader.readAsDataURL(file);
    }
}

function removePhoto() {
    const avatar = document.getElementById("avatar");
    const removeBtn = document.querySelector('.remove-photo-btn');
    avatar.innerHTML = '';
    avatar.style.color = 'white';
    avatar.style.background = 'linear-gradient(135deg, #6c63ff, #00bfa6)';
    const initials = localStorage.getItem("profileData") ? JSON.parse(localStorage.getItem("profileData")).name : "JS";
    avatar.textContent = initials.split(" ").map(n => n[0]).join("");
    localStorage.removeItem("profilePhoto");
    if (removeBtn) removeBtn.style.display = 'none';
}

function loadProfilePhoto() {
  const savedPhoto = localStorage.getItem("profilePhoto")
  const avatar = document.getElementById("avatar")
  const removeBtn = document.querySelector('.remove-photo-btn')

  if (savedPhoto) {
    // Display saved photo
    avatar.innerHTML = ''
    const img = document.createElement('img')
    img.src = savedPhoto
    img.alt = 'Profile Photo'
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.objectFit = 'cover'
    img.style.borderRadius = '50%'
    avatar.appendChild(img)
    if (removeBtn) removeBtn.style.display = 'inline-block'
  } else {
    // Show initials
    const initials = profileData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
    avatar.textContent = initials
    avatar.style.color = 'white'
    avatar.style.background = 'linear-gradient(135deg, #6c63ff, #00bfa6)'
    if (removeBtn) removeBtn.style.display = 'none'
  }
}

function loadSavedJobs() {
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]")
  const savedJobsList = document.getElementById("saved-jobs-list")
  const savedJobsCount = document.getElementById("saved-jobs-count")

  savedJobsCount.textContent = savedJobs.length

  if (savedJobs.length === 0) {
    savedJobsList.innerHTML = '<p style="color: var(--gray-500); font-size: 0.9rem;">No saved jobs yet.</p>'
    return
  }

  // Show only the first 3 saved jobs
  const recentSavedJobs = savedJobs.slice(0, 3)

  savedJobsList.innerHTML = recentSavedJobs
    .map(
      (job) => `
        <div class="saved-job-item" style="padding: 0.75rem; border: 1px solid var(--gray-200); border-radius: 6px; margin-bottom: 0.5rem; cursor: pointer;" onclick="viewJob(${job.id})">
            <h5 style="margin: 0 0 0.25rem 0; font-size: 0.9rem; color: var(--neutral-dark);">${job.title}</h5>
            <p style="margin: 0; font-size: 0.8rem; color: var(--gray-600);">${job.company}</p>
            <p style="margin: 0; font-size: 0.8rem; color: var(--secondary-color);">${job.salary}</p>
        </div>
    `,
    )
    .join("")
}

function loadApplications() {
  const applications = JSON.parse(localStorage.getItem("applications") || "[]")
  const applicationsList = document.getElementById("applications-list")
  const applicationsCount = document.getElementById("applications-count")

  applicationsCount.textContent = applications.length

  if (applications.length === 0) {
    applicationsList.innerHTML = '<p style="color: var(--gray-500); font-size: 0.9rem;">No applications yet.</p>'
    return
  }

  // Show only the first 3 recent applications
  const recentApplications = applications.slice(0, 3)

  applicationsList.innerHTML = recentApplications
    .map(
      (app) => `
        <div class="application-item" style="padding: 0.75rem; border: 1px solid var(--gray-200); border-radius: 6px; margin-bottom: 0.5rem;">
            <h5 style="margin: 0 0 0.25rem 0; font-size: 0.9rem; color: var(--neutral-dark);">${app.jobTitle}</h5>
            <p style="margin: 0; font-size: 0.8rem; color: var(--gray-600);">${app.company}</p>
            <p style="margin: 0; font-size: 0.8rem; color: var(--primary-color);">Status: ${app.status}</p>
            <small style="color: var(--gray-500);">${formatDate(app.appliedDate)}</small>
        </div>
    `,
    )
    .join("")
}

function updateSavedJobsCount() {
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]")
  document.getElementById("saved-jobs-count").textContent = savedJobs.length
}

function viewJob(jobId) {
  localStorage.setItem("selectedJobId", jobId)
  window.location.href = "job-detail.html"
}

// Utility function to format dates
function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "Applied 1 day ago"
  if (diffDays < 7) return `Applied ${diffDays} days ago`
  if (diffDays < 30) return `Applied ${Math.ceil(diffDays / 7)} weeks ago`
  return `Applied ${Math.ceil(diffDays / 30)} months ago`
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error on profile page:", e.error)
})