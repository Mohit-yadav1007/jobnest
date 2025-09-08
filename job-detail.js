// Job detail page functionality
document.addEventListener("DOMContentLoaded", () => {
  loadJobDetail()
  loadSimilarJobs()
  setupEventListeners()
})

// Sample job data (in a real app, this would come from an API)
const jobsData = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Solutions Pvt Ltd",
    location: "Bangalore, Karnataka",
    salary: "₹8-12 LPA",
    type: "Full Time",
    category: "technology",
    description:
      "We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions that meet our clients' needs.",
    responsibilities: [
      "Design and develop scalable web applications using modern technologies",
      "Collaborate with cross-functional teams including designers, product managers, and other engineers",
      "Write clean, maintainable, and well-documented code following best practices",
      "Participate in code reviews and provide constructive feedback to team members",
      "Mentor junior developers and contribute to their professional growth",
      "Stay updated with latest technology trends and implement innovative solutions",
      "Troubleshoot and debug applications to optimize performance",
    ],
    requirements: [
      "Bachelor's degree in Computer Science, Engineering, or related field",
      "5+ years of experience in software development with strong programming skills",
      "Proficiency in JavaScript, React, Node.js, and modern web technologies",
      "Experience with databases (MySQL, MongoDB) and RESTful API development",
      "Strong problem-solving skills and attention to detail",
      "Excellent communication and teamwork abilities",
      "Experience with version control systems (Git) and agile methodologies",
    ],
    benefits: [
      "Competitive salary package with performance-based bonuses",
      "Comprehensive health insurance for employee and family",
      "Flexible working hours and work-from-home options",
      "Professional development opportunities and training programs",
      "Modern office environment with latest technology and tools",
      "Annual team outings and company-sponsored events",
      "Retirement savings plan with company matching",
    ],
    companyInfo: {
      name: "Tech Solutions Pvt Ltd",
      description:
        "A leading technology company specializing in innovative software solutions for businesses across India. We are committed to delivering high-quality products and services that help our clients achieve their digital transformation goals.",
      founded: "2015",
      employees: "500+",
      industry: "Technology",
    },
    posted: "3 days ago",
  },
  // Add more job data as needed
]

function loadJobDetail() {
  const jobId = localStorage.getItem("selectedJobId") || 1
  const job = jobsData.find((j) => j.id == jobId)

  if (!job) {
    // Redirect to home page if job not found
    window.location.href = "job-detail.html"
    return
  }

  // Update page title
  document.title = `${job.title} - ${job.company} | JobNest India`

  // Populate job details
  document.getElementById("job-title").textContent = job.title
  document.getElementById("job-company").textContent = job.company
  document.getElementById("job-location").textContent = job.location
  document.getElementById("job-salary").textContent = job.salary
  document.getElementById("job-type").textContent = job.type

  // Job description
  document.getElementById("job-description-content").innerHTML = `<p>${job.description}</p>`

  // Responsibilities
  const responsibilitiesList = document.getElementById("job-responsibilities")
  responsibilitiesList.innerHTML = job.responsibilities.map((item) => `<li>${item}</li>`).join("")

  // Requirements
  const requirementsList = document.getElementById("job-requirements")
  requirementsList.innerHTML = job.requirements.map((item) => `<li>${item}</li>`).join("")

  // Benefits
  const benefitsList = document.getElementById("job-benefits")
  benefitsList.innerHTML = job.benefits.map((item) => `<li>${item}</li>`).join("")

  // Company information
  document.getElementById("company-name").textContent = job.companyInfo.name
  document.getElementById("company-description").textContent = job.companyInfo.description

  // Update company stats
  const companyStats = document.querySelector(".company-stats")
  companyStats.innerHTML = `
        <span>Founded: ${job.companyInfo.founded}</span>
        <span>Employees: ${job.companyInfo.employees}</span>
        <span>Industry: ${job.companyInfo.industry}</span>
    `

  // Update save button state
  updateSaveButtonState(jobId)
}

function loadSimilarJobs() {
  const jobId = localStorage.getItem("selectedJobId") || 1
  const currentJob = jobsData.find((j) => j.id == jobId)

  if (!currentJob) return

  // Filter similar jobs (same category, excluding current job)
  const similarJobs = jobsData.filter((job) => job.id != jobId && job.category === currentJob.category).slice(0, 3)

  const similarJobsGrid = document.getElementById("similar-jobs-grid")

  if (similarJobs.length === 0) {
    similarJobsGrid.innerHTML = "<p>No similar jobs found.</p>"
    return
  }

  similarJobsGrid.innerHTML = similarJobs
    .map(
      (job) => `
        <div class="job-card" onclick="viewJobDetail(${job.id})">
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-company">${job.company}</p>
                </div>
                <button class="save-btn" onclick="event.stopPropagation(); toggleSaveJob(${job.id})" 
                        id="save-${job.id}">♡</button>
            </div>
            <div class="job-meta">
                <span>📍 ${job.location}</span>
                <span class="job-salary">💰 ${job.salary}</span>
                <span>⏰ ${job.type}</span>
            </div>
            <p class="job-description">${job.description.substring(0, 120)}...</p>
            <div class="job-actions">
                <button class="apply-btn" onclick="event.stopPropagation(); applyForJob(${job.id})">Apply Now</button>
            </div>
        </div>
    `,
    )
    .join("")

  // Update save button states for similar jobs
  similarJobs.forEach((job) => updateSaveButtonState(job.id))
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
}

function applyForJob() {
  const jobId = localStorage.getItem("selectedJobId") || 1
  const job = jobsData.find((j) => j.id == jobId)

  if (job) {
    // In a real application, this would open an application form or redirect to an application page
    alert(
      `Thank you for your interest in the ${job.title} position at ${job.company}! Your application has been submitted.`,
    )

    // Save application to localStorage
    const applications = JSON.parse(localStorage.getItem("applications") || "[]")
    const existingApplication = applications.find((app) => app.jobId == jobId)

    if (!existingApplication) {
      applications.push({
        jobId: jobId,
        jobTitle: job.title,
        company: job.company,
        appliedDate: new Date().toISOString(),
        status: "Applied",
      })
      localStorage.setItem("applications", JSON.stringify(applications))
    } else {
      alert("You have already applied for this position.")
    }
  }
}

function saveJob() {
  const jobId = localStorage.getItem("selectedJobId") || 1
  toggleSaveJob(jobId)
}

function toggleSaveJob(jobId) {
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]")
  const jobIndex = savedJobs.findIndex((job) => job.id == jobId)
  const job = jobsData.find((j) => j.id == jobId)

  if (!job) return

  if (jobIndex > -1) {
    // Remove from saved jobs
    savedJobs.splice(jobIndex, 1)
    alert("Job removed from saved jobs!")
  } else {
    // Add to saved jobs
    savedJobs.push({
      ...job,
      savedDate: new Date().toISOString(),
    })
    alert("Job saved successfully!")
  }

  localStorage.setItem("savedJobs", JSON.stringify(savedJobs))
  updateSaveButtonState(jobId)
}

function updateSaveButtonState(jobId) {
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]")
  const isSaved = savedJobs.some((job) => job.id == jobId)
  const saveBtn = document.getElementById(`save-${jobId}`) || document.getElementById("save-btn")

  if (saveBtn) {
    if (isSaved) {
      saveBtn.classList.add("saved")
      saveBtn.innerHTML = "♥"
      saveBtn.title = "Remove from saved jobs"
    } else {
      saveBtn.classList.remove("saved")
      saveBtn.innerHTML = "♡"
      saveBtn.title = "Save job"
    }
  }
}

function shareJob(platform) {
  const jobId = localStorage.getItem("selectedJobId") || 1
  const job = jobsData.find((j) => j.id == jobId)

  if (!job) return

  const jobUrl = window.location.href
  const jobTitle = `${job.title} at ${job.company}`
  const jobDescription = `Check out this job opportunity: ${jobTitle} in ${job.location}. Salary: ${job.salary}`

  let shareUrl = ""

  switch (platform) {
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}&title=${encodeURIComponent(jobTitle)}&summary=${encodeURIComponent(jobDescription)}`
      break
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(jobDescription)}&url=${encodeURIComponent(jobUrl)}`
      break
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodeURIComponent(jobDescription + " " + jobUrl)}`
      break
    default:
      // Copy to clipboard
      navigator.clipboard.writeText(jobUrl).then(() => {
        alert("Job URL copied to clipboard!")
      })
      return
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=400")
  }
}

function viewJobDetail(jobId) {
  localStorage.setItem("selectedJobId", jobId)
  window.location.reload()
}

// Utility function to format dates
function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "1 day ago"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  return `${Math.ceil(diffDays / 30)} months ago`
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error on job detail page:", e.error)
})
