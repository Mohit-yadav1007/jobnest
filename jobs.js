// Jobs data and functionality
class JobsPage {
  constructor() {
    this.jobs = []
    this.filteredJobs = []
    this.currentPage = 1
    this.jobsPerPage = 10
    this.init()
  }

  init() {
    this.loadJobs()
    this.setupEventListeners()
    this.displayJobs()
  }

  loadJobs() {
    // Sample job data - in a real app, this would come from an API
    this.jobs = [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp India",
        location: "Bangalore, Karnataka",
        salary: "₹12-18 LPA",
        experience: "3-5 years",
        type: "full-time",
        category: "technology",
        description: "Looking for experienced software engineer with expertise in React and Node.js",
        postedDate: "2024-01-15",
        skills: ["React", "Node.js", "JavaScript", "MongoDB"],
      },
      {
        id: 2,
        title: "Digital Marketing Manager",
        company: "Marketing Solutions",
        location: "Mumbai, Maharashtra",
        salary: "₹8-12 LPA",
        experience: "2-4 years",
        type: "full-time",
        category: "marketing",
        description: "Manage digital marketing campaigns and social media presence",
        postedDate: "2024-01-14",
        skills: ["SEO", "Social Media", "Google Ads", "Analytics"],
      },
      {
        id: 3,
        title: "Data Analyst",
        company: "DataTech Solutions",
        location: "Hyderabad, Telangana",
        salary: "₹6-10 LPA",
        experience: "1-3 years",
        type: "full-time",
        category: "technology",
        description: "Analyze data trends and create insightful reports",
        postedDate: "2024-01-13",
        skills: ["Python", "SQL", "Tableau", "Excel"],
      },
      {
        id: 4,
        title: "Financial Analyst",
        company: "FinanceFirst",
        location: "Delhi, NCR",
        salary: "₹7-11 LPA",
        experience: "2-4 years",
        type: "full-time",
        category: "finance",
        description: "Perform financial analysis and create investment recommendations",
        postedDate: "2024-01-12",
        skills: ["Financial Modeling", "Excel", "Bloomberg", "Risk Analysis"],
      },
      {
        id: 5,
        title: "UI/UX Designer",
        company: "DesignStudio",
        location: "Pune, Maharashtra",
        salary: "₹5-9 LPA",
        experience: "1-3 years",
        type: "full-time",
        category: "technology",
        description: "Create beautiful and intuitive user interfaces",
        postedDate: "2024-01-11",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      },
      {
        id: 6,
        title: "Sales Executive",
        company: "SalesForce India",
        location: "Chennai, Tamil Nadu",
        salary: "₹4-7 LPA",
        experience: "0-2 years",
        type: "full-time",
        category: "sales",
        description: "Drive sales growth and build client relationships",
        postedDate: "2024-01-10",
        skills: ["Communication", "CRM", "Lead Generation", "Negotiation"],
      },
    ]

    this.filteredJobs = [...this.jobs]
  }

  setupEventListeners() {
    // Search functionality
    document.getElementById("jobSearch").addEventListener("input", () => this.filterJobs())
    document.getElementById("locationSearch").addEventListener("input", () => this.filterJobs())

    // Filter dropdowns
    document.getElementById("categoryFilter").addEventListener("change", () => this.filterJobs())
    document.getElementById("experienceFilter").addEventListener("change", () => this.filterJobs())
    document.getElementById("salaryFilter").addEventListener("change", () => this.filterJobs())
    document.getElementById("typeFilter").addEventListener("change", () => this.filterJobs())

    // Sort functionality
    document.getElementById("sortBy").addEventListener("change", () => this.sortJobs())

    // Clear filters
    document.querySelector(".clear-filters").addEventListener("click", () => this.clearFilters())

    // Search button
    document.querySelector(".search-btn").addEventListener("click", () => this.filterJobs())

    // Mobile navigation
    document.querySelector(".nav-toggle").addEventListener("click", () => {
      document.querySelector(".nav-menu").classList.toggle("active")
    })
  }

  filterJobs() {
    const searchTerm = document.getElementById("jobSearch").value.toLowerCase()
    const location = document.getElementById("locationSearch").value.toLowerCase()
    const category = document.getElementById("categoryFilter").value
    const experience = document.getElementById("experienceFilter").value
    const salary = document.getElementById("salaryFilter").value
    const type = document.getElementById("typeFilter").value

    this.filteredJobs = this.jobs.filter((job) => {
      const matchesSearch =
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm))

      const matchesLocation = !location || job.location.toLowerCase().includes(location)
      const matchesCategory = !category || job.category === category
      const matchesType = !type || job.type === type

      let matchesExperience = true
      if (experience) {
        // Simple experience matching logic
        matchesExperience = job.experience.includes(experience.split("-")[0])
      }

      let matchesSalary = true
      if (salary) {
        // Simple salary matching logic - would need more sophisticated parsing in real app
        matchesSalary = true // Simplified for demo
      }

      return matchesSearch && matchesLocation && matchesCategory && matchesType && matchesExperience && matchesSalary
    })

    this.currentPage = 1
    this.displayJobs()
  }

  sortJobs() {
    const sortBy = document.getElementById("sortBy").value

    this.filteredJobs.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.postedDate) - new Date(a.postedDate)
        case "salary":
          // Simple salary comparison - would need better parsing in real app
          return b.salary.localeCompare(a.salary)
        case "company":
          return a.company.localeCompare(b.company)
        case "relevance":
        default:
          return 0
      }
    })

    this.displayJobs()
  }

  clearFilters() {
    document.getElementById("jobSearch").value = ""
    document.getElementById("locationSearch").value = ""
    document.getElementById("categoryFilter").value = ""
    document.getElementById("experienceFilter").value = ""
    document.getElementById("salaryFilter").value = ""
    document.getElementById("typeFilter").value = ""
    document.getElementById("sortBy").value = "date"

    this.filteredJobs = [...this.jobs]
    this.currentPage = 1
    this.displayJobs()
  }

  displayJobs() {
    const startIndex = (this.currentPage - 1) * this.jobsPerPage
    const endIndex = startIndex + this.jobsPerPage
    const jobsToShow = this.filteredJobs.slice(startIndex, endIndex)

    const jobsGrid = document.getElementById("jobsGrid")
    const jobsCount = document.getElementById("jobsCount")

    jobsCount.textContent = this.filteredJobs.length

    if (jobsToShow.length === 0) {
      jobsGrid.innerHTML = `
                <div class="no-jobs">
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search criteria or filters</p>
                </div>
            `
      return
    }

    jobsGrid.innerHTML = jobsToShow
      .map(
        (job) => `
            <div class="job-card" data-job-id="${job.id}" onclick="window.location.href='job-detail.html?id=${job.id}'">
                <button class="save-job" data-job-id="${job.id}">
                    <span class="save-icon">♡</span>
                </button>
                <div class="job-header">
                    <h3 class="job-title">${job.title}</h3>
                </div>
                <div class="job-company">${job.company}</div>
                <div class="job-location">📍 ${job.location}</div>
                <div class="job-details">
                    <span class="job-salary">${job.salary}</span>
                    <span class="job-experience">${job.experience}</span>
                    <span class="job-type">${job.type}</span>
                </div>
                <div class="job-description">${job.description}</div>
                <div class="job-skills">
                    ${job.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
                </div>
                <div class="job-footer">
                    <span class="job-date">Posted ${this.formatDate(job.postedDate)}</span>
                </div>
            </div>
        `,
      )
      .join("")

    // Add event listeners for save buttons
    document.querySelectorAll(".save-job").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.toggleSaveJob(btn.dataset.jobId)
      })
    })

    this.displayPagination()
  }

  toggleSaveJob(jobId) {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]")
    const jobIndex = savedJobs.indexOf(jobId)

    if (jobIndex > -1) {
      savedJobs.splice(jobIndex, 1)
    } else {
      savedJobs.push(jobId)
    }

    localStorage.setItem("savedJobs", JSON.stringify(savedJobs))
    this.updateSaveButtons()
  }

  updateSaveButtons() {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]")
    document.querySelectorAll(".save-job").forEach((btn) => {
      const isSaved = savedJobs.includes(btn.dataset.jobId)
      btn.querySelector(".save-icon").textContent = isSaved ? "♥" : "♡"
      btn.classList.toggle("saved", isSaved)
    })
  }

  displayPagination() {
    const totalPages = Math.ceil(this.filteredJobs.length / this.jobsPerPage)
    const pagination = document.getElementById("pagination")

    if (totalPages <= 1) {
      pagination.innerHTML = ""
      return
    }

    let paginationHTML = ""

    // Previous button
    if (this.currentPage > 1) {
      paginationHTML += `<button class="page-btn" onclick="jobsPage.goToPage(${this.currentPage - 1})">Previous</button>`
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === this.currentPage) {
        paginationHTML += `<button class="page-btn active">${i}</button>`
      } else {
        paginationHTML += `<button class="page-btn" onclick="jobsPage.goToPage(${i})">${i}</button>`
      }
    }

    // Next button
    if (this.currentPage < totalPages) {
      paginationHTML += `<button class="page-btn" onclick="jobsPage.goToPage(${this.currentPage + 1})">Next</button>`
    }

    pagination.innerHTML = paginationHTML
  }

  goToPage(page) {
    this.currentPage = page
    this.displayJobs()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }
}

// Initialize the jobs page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.jobsPage = new JobsPage()
})
