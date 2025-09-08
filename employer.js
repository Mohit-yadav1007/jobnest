// Employer profile page functionality
document.addEventListener("DOMContentLoaded", () => {
  loadEmployerData()
  loadPostedJobs()
  loadRecentApplications()
  setupEventListeners()
})

// Sample employer data
let employerData = {
  companyName: "Tech Solutions Pvt Ltd",
  industry: "Technology • Software Development",
  location: "Bangalore, Karnataka",
  founded: "2015",
  employees: "500+",
  description:
    "Tech Solutions Pvt Ltd is a leading technology company specializing in innovative software solutions for businesses across India. We are committed to delivering high-quality products and services that help our clients achieve their digital transformation goals.",
  stats: {
    activeJobs: 12,
    totalApplications: 156,
    profileViews: 1234,
    hiredCandidates: 23,
  },
}

// Sample posted jobs data
let postedJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    type: "Full Time",
    salary: "₹8-12 LPA",
    location: "Bangalore",
    posted: "3 days ago",
    applications: 45,
    views: 234,
    status: "Active",
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Engineering",
    type: "Full Time",
    salary: "₹5-8 LPA",
    location: "Bangalore",
    posted: "1 week ago",
    applications: 67,
    views: 456,
    status: "Active",
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    type: "Full Time",
    salary: "₹10-15 LPA",
    location: "Bangalore",
    posted: "2 weeks ago",
    applications: 89,
    views: 567,
    status: "Active",
  },
]

// Sample recent applications
const recentApplications = [
  {
    id: 1,
    applicantName: "Priya Sharma",
    jobTitle: "Senior Software Engineer",
    appliedTime: "2 hours ago",
    status: "New",
  },
  {
    id: 2,
    applicantName: "Rahul Gupta",
    jobTitle: "Frontend Developer",
    appliedTime: "5 hours ago",
    status: "New",
  },
  {
    id: 3,
    applicantName: "Anjali Patel",
    jobTitle: "Product Manager",
    appliedTime: "1 day ago",
    status: "Reviewed",
  },
]

function loadEmployerData() {
  // Load employer data from localStorage if available
  const savedEmployerData = localStorage.getItem("employerData")
  if (savedEmployerData) {
    employerData = { ...employerData, ...JSON.parse(savedEmployerData) }
  }

  // Update DOM elements
  document.getElementById("company-name").textContent = employerData.companyName
  document.querySelector("#company-industry").textContent = employerData.industry
  document.querySelector("#company-location").textContent = employerData.location
  document.getElementById("company-description").innerHTML = `
        <p>${employerData.description}</p>
        <p>Our team of experienced professionals works with cutting-edge technologies to create scalable and efficient solutions. We foster a culture of innovation, collaboration, and continuous learning.</p>
    `

  // Update company stats
  document.getElementById("active-jobs-count").textContent = employerData.stats.activeJobs

  // Update sidebar stats
  const statNumbers = document.querySelectorAll(".stat-number")
  if (statNumbers.length >= 3) {
    statNumbers[0].textContent = employerData.stats.totalApplications
    statNumbers[1].textContent = employerData.stats.profileViews
    statNumbers[2].textContent = employerData.stats.hiredCandidates
  }

  // Update company logo initials
  const logoElements = document.querySelectorAll(".company-logo-large")
  const initials = employerData.companyName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
  logoElements.forEach((logo) => {
    logo.textContent = initials
  })
}

function loadPostedJobs() {
  const postedJobsList = document.getElementById("posted-jobs-list")

  postedJobsList.innerHTML = postedJobs
    .map(
      (job) => `
        <div class="posted-job-item">
            <div class="job-info">
                <h4>${job.title}</h4>
                <p class="job-details">${job.type} • ${job.salary} • ${job.location}</p>
                <p class="job-posted">Posted ${job.posted}</p>
            </div>
            <div class="job-stats">
                <span>Applications: <strong>${job.applications}</strong></span>
                <span>Views: <strong>${job.views}</strong></span>
            </div>
            <div class="job-actions">
                <button class="view-applications-btn" onclick="viewApplications(${job.id})">View Applications</button>
                <button class="edit-job-btn" onclick="editJob(${job.id})">Edit</button>
                <button class="close-job-btn" onclick="closeJob(${job.id})">Close</button>
            </div>
        </div>
    `,
    )
    .join("")
}

function loadRecentApplications() {
  const recentApplicationsDiv = document.getElementById("recent-applications")

  recentApplicationsDiv.innerHTML = recentApplications
    .map(
      (app) => `
        <div class="application-item">
            <div class="applicant-info">
                <strong>${app.applicantName}</strong>
                <p>Applied for ${app.jobTitle}</p>
                <small>${app.appliedTime}</small>
            </div>
            <button class="review-btn" onclick="reviewApplication(${app.id})">Review</button>
        </div>
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

  // Quick job form submission
  const quickJobForm = document.getElementById("quick-job-form")
  if (quickJobForm) {
    quickJobForm.addEventListener("submit", handleQuickJobSubmission)
  }

  // Post job form submission
  const postJobForm = document.getElementById("post-job-form")
  if (postJobForm) {
    postJobForm.addEventListener("submit", handleJobSubmission)
  }
}

function showPostJobForm() {
  const modal = document.getElementById("post-job-modal")
  modal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function hidePostJobForm() {
  const modal = document.getElementById("post-job-modal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

function handleQuickJobSubmission(e) {
  e.preventDefault()
  const formData = new FormData(e.target)

  const jobData = {
    title: formData.get("title") || e.target.querySelector('input[type="text"]').value,
    department: formData.get("department") || e.target.querySelector("select").value,
    salary: formData.get("salary") || e.target.querySelector('input[placeholder*="Salary"]').value,
    type: "Full Time",
    location: employerData.location,
    posted: "Just now",
    applications: 0,
    views: 0,
    status: "Active",
  }

  if (jobData.title && jobData.department) {
    // Add new job to posted jobs
    const newJob = {
      id: Date.now(),
      ...jobData,
    }

    postedJobs.unshift(newJob)
    employerData.stats.activeJobs++

    // Update UI
    loadPostedJobs()
    document.getElementById("active-jobs-count").textContent = employerData.stats.activeJobs

    // Reset form
    e.target.reset()

    alert("Job posted successfully!")

    // Save to localStorage
    saveEmployerData()
  }
}

function handleJobSubmission(e) {
  e.preventDefault()
  const formData = new FormData(e.target)

  const jobData = {
    title: formData.get("title"),
    department: formData.get("department"),
    type: formData.get("jobType"),
    salary: formData.get("salary"),
    location: formData.get("location"),
    description: formData.get("description"),
    requirements: formData.get("requirements"),
    posted: "Just now",
    applications: 0,
    views: 0,
    status: "Active",
  }

  if (jobData.title && jobData.department && jobData.type) {
    // Add new job to posted jobs
    const newJob = {
      id: Date.now(),
      ...jobData,
    }

    postedJobs.unshift(newJob)
    employerData.stats.activeJobs++

    // Update UI
    loadPostedJobs()
    document.getElementById("active-jobs-count").textContent = employerData.stats.activeJobs

    // Hide modal and reset form
    hidePostJobForm()
    e.target.reset()

    alert("Job posted successfully!")

    // Save to localStorage
    saveEmployerData()
  }
}

function viewApplications(jobId) {
  const job = postedJobs.find((j) => j.id === jobId)
  if (job) {
    alert(`Viewing ${job.applications} applications for ${job.title}`)
    // In a real application, this would navigate to an applications management page
  }
}

function editJob(jobId) {
  const job = postedJobs.find((j) => j.id === jobId)
  if (job) {
    const newTitle = prompt("Job Title:", job.title)
    const newSalary = prompt("Salary Range:", job.salary)

    if (newTitle && newSalary) {
      job.title = newTitle
      job.salary = newSalary
      loadPostedJobs()
      saveEmployerData()
      alert("Job updated successfully!")
    }
  }
}

function closeJob(jobId) {
  if (confirm("Are you sure you want to close this job posting?")) {
    const jobIndex = postedJobs.findIndex((j) => j.id === jobId)
    if (jobIndex > -1) {
      postedJobs[jobIndex].status = "Closed"
      employerData.stats.activeJobs--
      loadPostedJobs()
      document.getElementById("active-jobs-count").textContent = employerData.stats.activeJobs
      saveEmployerData()
      alert("Job posting closed successfully!")
    }
  }
}

function reviewApplication(appId) {
  const application = recentApplications.find((app) => app.id === appId)
  if (application) {
    alert(`Reviewing application from ${application.applicantName} for ${application.jobTitle}`)
    // In a real application, this would navigate to the application review page

    // Mark as reviewed
    application.status = "Reviewed"
    loadRecentApplications()
  }
}

function editCompanyProfile() {
  const newName = prompt("Company Name:", employerData.companyName)
  const newDescription = prompt("Company Description:", employerData.description)

  if (newName && newDescription) {
    employerData.companyName = newName
    employerData.description = newDescription
    loadEmployerData()
    saveEmployerData()
    alert("Company profile updated successfully!")
  }
}

function saveEmployerData() {
  localStorage.setItem("employerData", JSON.stringify(employerData))
  localStorage.setItem("postedJobs", JSON.stringify(postedJobs))
}

// Load saved data on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedJobs = localStorage.getItem("postedJobs")
  if (savedJobs) {
    postedJobs = JSON.parse(savedJobs)
  }
})

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("post-job-modal")
  if (e.target === modal) {
    hidePostJobForm()
  }
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error on employer page:", e.error)
})
