// Sample job data for demonstration
const jobsData = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Solutions Pvt Ltd",
    location: "Bangalore, Karnataka",
    salary: "₹8-12 LPA",
    type: "Full Time",
    category: "technology",
    experience: "5-10",
    description: "We are looking for a Senior Software Engineer to join our dynamic team...",
    tags: ["JavaScript", "React", "Node.js", "MongoDB"],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Digital Marketing Manager",
    company: "Creative Agency India",
    location: "Mumbai, Maharashtra",
    salary: "₹6-9 LPA",
    type: "Full Time",
    category: "marketing",
    experience: "2-5",
    description: "Looking for an experienced Digital Marketing Manager to lead our campaigns...",
    tags: ["SEO", "SEM", "Social Media", "Analytics"],
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "Financial Analyst",
    company: "Investment Corp",
    location: "Delhi, NCR",
    salary: "₹5-8 LPA",
    type: "Full Time",
    category: "finance",
    experience: "2-5",
    description: "Join our finance team as a Financial Analyst and help drive business decisions...",
    tags: ["Excel", "Financial Modeling", "Analysis", "Reporting"],
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Registered Nurse",
    company: "Apollo Hospitals",
    location: "Chennai, Tamil Nadu",
    salary: "₹3-5 LPA",
    type: "Full Time",
    category: "healthcare",
    experience: "0-1",
    description: "We are seeking compassionate and skilled Registered Nurses...",
    tags: ["Patient Care", "Medical Knowledge", "Communication"],
    posted: "1 week ago",
  },
  {
    id: 5,
    title: "Primary School Teacher",
    company: "Bright Future School",
    location: "Pune, Maharashtra",
    salary: "₹2-4 LPA",
    type: "Full Time",
    category: "education",
    experience: "0-1",
    description: "Looking for dedicated Primary School Teachers to inspire young minds...",
    tags: ["Teaching", "Child Development", "Curriculum"],
    posted: "5 days ago",
  },
  {
    id: 6,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Hyderabad, Telangana",
    salary: "₹4-7 LPA",
    type: "Full Time",
    category: "technology",
    experience: "2-5",
    description: "Join our startup as a Full Stack Developer and build amazing products...",
    tags: ["Python", "Django", "React", "PostgreSQL"],
    posted: "4 days ago",
  },
  {
  id: 7,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Hyderabad, Telangana",
    salary: "₹4-7 LPA",
    type: "Full Time",
    category: "technology",
    experience: "2-5",
    description: "Join our startup as a Full Stack Developer and build amazing products...",
    tags: ["Python", "Django", "React", "PostgreSQL"],
    posted: "4 days ago",
  },
    {
  id: 8,
    title: "Data Scientist",
    company: "StartupXYZ",
    location: "Hyderabad, Telangana",
    salary: "₹4-7 LPA",
    type: "Full Time",
    category: "technology",
    experience: "2-5",
    description: "Join our startup as a Full Stack Developer and build amazing products...",
    tags: ["Python", "Django", "React", "PostgreSQL"],
    posted: "4 days ago",
  },
    {
  id: 9,
    title: "UI/UX Designer",
    company: "StartupXYZ",
    location: "Hyderabad, Telangana",
    salary: "₹4-7 LPA",
    type: "Full Time",
    category: "technology",
    experience: "2-5",
    description: "Join our startup as a Full Stack Developer and build amazing products...",
    tags: ["Python", "Django", "React", "PostgreSQL"],
    posted: "4 days ago",
  },
    {
  id: 10,
    title: "Business Analyst",
    company: "StartupXYZ",
    location: "Hyderabad, Telangana",
    salary: "₹4-7 LPA",
    type: "Full Time",
    category: "technology",
    experience: "2-5",
    description: "Join our startup as a Full Stack Developer and build amazing products...",
    tags: ["Python", "Django", "React", "PostgreSQL"],
    posted: "4 days ago",
  },
]

// Search suggestions data
const searchSuggestions = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "Digital Marketing",
  "Business Analyst",
]

// Global variables
let currentJobs = [...jobsData]
let displayedJobsCount = 3
const activeFilters = {
  category: "all",
  jobType: "",
  experience: "",
  salary: "",
  search: "",
  location: "",
}

// Utility function to parse salary
function parseSalary(salaryStr) {
  const match = salaryStr.match(/₹(\d+)-(\d+)\s*LPA/)
  if (match) {
    return { min: parseInt(match[1]) * 100000, max: parseInt(match[2]) * 100000 }
  }
  // Handle cases like "₹10+ LPA"
  const plusMatch = salaryStr.match(/₹(\d+)\+\s*LPA/)
  if (plusMatch) {
    return { min: parseInt(plusMatch[1]) * 100000, max: Infinity }
  }
  return null
}

// DOM Elements
const jobsGrid = document.getElementById("jobs-grid")
const searchInput = document.getElementById("job-search")
const locationInput = document.getElementById("location-search")
const searchSuggestionsDiv = document.getElementById("search-suggestions")
const filterButtons = document.querySelectorAll(".filter-btn")
// const jobTypeFilter = document.getElementById("job-type-filter")
// const experienceFilter = document.getElementById("experience-filter")
// const salaryFilter = document.getElementById("salary-filter")
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  renderJobs()
  setupEventListeners()
  loadSavedSearches()

    const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn !== "true") {
    console.log("User not logged in");
    // Optional: you can redirect to login page if needed
    // window.location.href = "login_page.html";
  } else {
    console.log("User is logged in");
  }
})

// Event Listeners Setup
function setupEventListeners() {
  // Mobile navigation toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Search input with suggestions
  searchInput.addEventListener("input", handleSearchInput)
  searchInput.addEventListener("focus", showSearchSuggestions)
  searchInput.addEventListener("blur", hideSearchSuggestions)

  // Location input
  locationInput.addEventListener("input", handleLocationInput)

  // Filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")
      activeFilters.category = this.dataset.category
      filterJobs()
    })
  })


  
  // // Advanced filters
  // jobTypeFilter.addEventListener("change", function () {
  //   activeFilters.jobType = this.value
  //   filterJobs()
  // })

  // experienceFilter.addEventListener("change", function () {
  //   activeFilters.experience = this.value
  //   filterJobs()
  // })

  // salaryFilter.addEventListener("change", function () {
  //   activeFilters.salary = this.value
  //   filterJobs()
  // })




  // Close suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestionsDiv.contains(e.target)) {
      hideSearchSuggestions()
    }
  })
}

// Search functionality
function handleSearchInput() {
  const query = searchInput.value.toLowerCase()
  activeFilters.search = query

  if (query.length > 0) {
    showFilteredSuggestions(query)
  } else {
    showSearchSuggestions()
  }

  // Debounce the search
  clearTimeout(window.searchTimeout)
  window.searchTimeout = setTimeout(() => {
    filterJobs()
  }, 300)
}

function showSearchSuggestions() {
  const suggestions = searchSuggestions.slice(0, 6)
  displaySuggestions(suggestions)
}

function showFilteredSuggestions(query) {
  const filtered = searchSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(query)).slice(0, 6)
  displaySuggestions(filtered)
}

function displaySuggestions(suggestions) {
  if (suggestions.length === 0) {
    searchSuggestionsDiv.style.display = "none"
    return
  }

  searchSuggestionsDiv.innerHTML = suggestions
    .map((suggestion) => `<div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`)
    .join("")

  searchSuggestionsDiv.style.display = "block"
}

function selectSuggestion(suggestion) {
  searchInput.value = suggestion
  activeFilters.search = suggestion.toLowerCase()
  hideSearchSuggestions()
  filterJobs()
}

function hideSearchSuggestions() {
  setTimeout(() => {
    searchSuggestionsDiv.style.display = "none"
  }, 200)
}

// Location input handler
function handleLocationInput() {
  const query = locationInput.value.toLowerCase()
  activeFilters.location = query

  // Debounce the search
  clearTimeout(window.locationTimeout)
  window.locationTimeout = setTimeout(() => {
    filterJobs()
  }, 300)
}

function filterJobs() {
  let filtered = [...jobsData]

  // Filter by category
  if (activeFilters.category !== "all") {
    filtered = filtered.filter((job) => job.category === activeFilters.category)
  }

  // Filter by job type
  if (activeFilters.jobType) {
    filtered = filtered.filter((job) => job.type.toLowerCase().replace(" ", "-") === activeFilters.jobType)
  }

  // Filter by experience
  if (activeFilters.experience) {
    filtered = filtered.filter((job) => job.experience === activeFilters.experience)
  }

  // Filter by salary with proper parsing
  if (activeFilters.salary) {
    const [minSalary, maxSalary] = activeFilters.salary.split("-")
    const min = parseInt(minSalary) * 100000
    const max = maxSalary === "+" ? Infinity : parseInt(maxSalary) * 100000

    filtered = filtered.filter((job) => {
      const salaryRange = parseSalary(job.salary)
      if (!salaryRange) return false
      return salaryRange.min >= min && salaryRange.max <= max
    })
  }

  // Filter by search query
  if (activeFilters.search) {
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(activeFilters.search) ||
        job.company.toLowerCase().includes(activeFilters.search) ||
        job.tags.some((tag) => tag.toLowerCase().includes(activeFilters.search)),
    )
  }

  // Filter by location
  if (activeFilters.location) {
    filtered = filtered.filter((job) => job.location.toLowerCase().includes(activeFilters.location))
  }

  currentJobs = filtered
  displayedJobsCount = Math.min(3, filtered.length)
  renderJobs()
}

function renderJobs() {
  // Update jobs count
  document.getElementById("jobsCount").textContent = currentJobs.length

  const jobsToShow = currentJobs.slice(0, displayedJobsCount)

  if (jobsToShow.length === 0) {
    jobsGrid.innerHTML = '<div class="no-jobs"><h3>No jobs found</h3><p>Try adjusting your search criteria or filters</p></div>'
    return
  }

  jobsGrid.innerHTML = jobsToShow
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
            <p class="job-description">${job.description}</p>
            <div class="job-tags">
                ${job.tags.map((tag) => `<span class="job-tag">${tag}</span>`).join("")}
            </div>
            <div class="job-actions">
                <button class="apply-btn" onclick="event.stopPropagation(); applyForJob(${job.id})">Apply Now</button>
                <span style="font-size: 0.8rem; color: var(--gray-500);">${job.posted}</span>
            </div>
        </div>
    `,
    )
    .join("")

  // Update save button states
  updateSaveButtonStates()

  // Show/hide load more button
  const loadMoreBtn = document.querySelector(".load-more-btn")
  if (loadMoreBtn) {
    loadMoreBtn.style.display = displayedJobsCount < currentJobs.length ? "block" : "none"
  }
}

// Job actions
function searchJobs() {
  const jobQuery = searchInput.value
  const locationQuery = locationInput.value

  activeFilters.search = jobQuery.toLowerCase()
  activeFilters.location = locationQuery.toLowerCase()

  // Save search to localStorage
  saveSearch(jobQuery, locationQuery)

  filterJobs()
}

function loadMoreJobs() {
  displayedJobsCount = Math.min(displayedJobsCount + 3, currentJobs.length)
  renderJobs()
}

function viewJobDetail(jobId) {
  // Store job ID in localStorage and navigate to job detail page
  localStorage.setItem("selectedJobId", jobId)
  window.location.href = "job-detail.html"
}




// Commented out to allow direct access to profile page for development
// document.querySelector(".profile-link").addEventListener("click", function(e){
//   e.preventDefault(); // stop default link

//   if(localStorage.getItem("loggedIn") === "true"){
//     // user is logged in → go to profile
//     window.location.href = "profile.html";
//   } else {
//     // user not logged in → alert + save redirect
//     alert("⚠️ Please log in first.");
//     localStorage.setItem("redirectAfterLogin", "profile.html");
//     window.location.href = "login_page.html";
//   }
// });








////// login function checker
function applyForJob(jobId) {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    alert("⚠️ Please sign in to apply for jobs!");
    window.location.href = "login_page.html"; // redirect to login page
    return;
  }

  // If logged in → continue application process
  const job = jobsData.find((j) => j.id === jobId);
  if (job) {
    alert(`✅ Application submitted for ${job.title} at ${job.company}!`);

    // Save application in localStorage
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    applications.push({
      jobId: jobId,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString(),
      status: "Applied",
    });
    localStorage.setItem("applications", JSON.stringify(applications));
  }
}
///////the login function checker





function toggleSaveJob(jobId) {
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]")
  const jobIndex = savedJobs.findIndex((job) => job.id === jobId)

  if (jobIndex > -1) {
    // Remove from saved jobs
    savedJobs.splice(jobIndex, 1)
    alert("Job removed from saved jobs!")
  } else {
    // Add to saved jobs
    const job = jobsData.find((j) => j.id === jobId)
    if (job) {
      savedJobs.push({
        ...job,
        savedDate: new Date().toISOString(),
      })
      alert("Job saved successfully!")
    }
  }

  localStorage.setItem("savedJobs", JSON.stringify(savedJobs))
  updateSaveButtonStates()
}

function updateSaveButtonStates() {
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]")
  const savedJobIds = savedJobs.map((job) => job.id)

  savedJobIds.forEach((jobId) => {
    const saveBtn = document.getElementById(`save-${jobId}`)
    if (saveBtn) {
      saveBtn.classList.add("saved")
      saveBtn.innerHTML = "♥"
    }
  })
}

// Search history functionality
function saveSearch(jobQuery, locationQuery) {
  if (!jobQuery.trim()) return

  const searches = JSON.parse(localStorage.getItem("savedSearches") || "[]")
  const newSearch = {
    jobQuery: jobQuery,
    locationQuery: locationQuery,
    timestamp: new Date().toISOString(),
  }

  // Remove duplicate searches
  const filteredSearches = searches.filter(
    (search) => search.jobQuery !== jobQuery || search.locationQuery !== locationQuery,
  )

  // Add new search to beginning and limit to 10
  filteredSearches.unshift(newSearch)
  const limitedSearches = filteredSearches.slice(0, 10)

  localStorage.setItem("savedSearches", JSON.stringify(limitedSearches))
}

function loadSavedSearches() {
  const searches = JSON.parse(localStorage.getItem("savedSearches") || "[]")
  // You can use this data to show recent searches in the UI
  console.log("Saved searches:", searches)
}

// Utility functions
// function formatDate(dateString) {
//   const date = new Date(dateString)
//   const now = new Date()
//   const diffTime = Math.abs(now - date)
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

//   if (diffDays === 1) return "1 day ago"
//   if (diffDays < 7) return `${diffDays} days ago`
//   if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
//   return `${Math.ceil(diffDays / 30)} months ago`
// }

// Initialize autocomplete functionality
// function initializeAutocomplete() {
  // This would typically connect to a backend API for real autocomplete data
  // For now, we're using the predefined suggestions array
// }

// Error handling
// window.addEventListener("error", (e) => {
//   console.error("JavaScript error:", e.error)
//   // In a production app, you might want to send this to an error tracking service
// })

// Performance optimization - lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Call lazy loading when DOM is ready
// document.addEventListener("DOMContentLoaded", lazyLoadImages)



function logoutUser() {
  localStorage.removeItem("loggedIn");
  alert("You have been logged out!");
  window.location.href = "login_page.html";
}

