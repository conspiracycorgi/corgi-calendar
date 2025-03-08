document.addEventListener("DOMContentLoaded", () => {
  // Constants and configuration
  const START_DATE = new Date(2025, 2, 29) // March 29, 2025
  let currentDate = new Date(START_DATE)

  // Day images for each day of the week
  const dayImages = [
    {
      day: "Sat",
      image: "/assets/images/saturday corgi.png",
    },
    {
      day: "Sun",
      image: "/assets/images/sunday corgi.png",
    },
    {
      day: "Mon",
      image: "/assets/images/monday corgi.png",
    },
    {
      day: "Tue",
      image: "/assets/images/tuesday corgi.png",
    },
    {
      day: "Wed",
      image: "/assets/images/wednesday corgi.png",
    },
    {
      day: "Thu",
      image: "/assets/images/thursday corgi.png",
    },
    {
      day: "Fri",
      image: "/assets/images/friday corgi.png",
    },
  ]

  // DOM elements
  const prevMonthButton = document.getElementById("prev-month")
  const nextMonthButton = document.getElementById("next-month")
  const lunarMonthYearElement = document.getElementById("lunar-month-year")
  const dayHeadersContainer = document.getElementById("day-headers")
  const calendarDaysContainer = document.getElementById("calendar-days")

  // Event listeners
  prevMonthButton.addEventListener("click", handlePrevMonth)
  nextMonthButton.addEventListener("click", handleNextMonth)

  // Initialize the calendar
  renderDayHeaders()
  renderCalendar()

  // Functions
  function handlePrevMonth() {
    currentDate = addDays(currentDate, -28)
    renderCalendar()
  }

  function handleNextMonth() {
    currentDate = addDays(currentDate, 28)
    renderCalendar()
  }

  function renderDayHeaders() {
    dayHeadersContainer.innerHTML = ""

    dayImages.forEach((dayInfo) => {
      const headerElement = document.createElement("div")
      headerElement.className = "day-header"
      headerElement.innerHTML = `
        <img src="${dayInfo.image}" alt="${dayInfo.day} Corgi" class="day-header-image">
        <div class="day-name">${dayInfo.day}</div>
      `
      dayHeadersContainer.appendChild(headerElement)
    })
  }

  function renderCalendar() {
    // Update lunar month and year
    const lunarMonthYear = getLunarMonthYear(currentDate)
    lunarMonthYearElement.textContent = lunarMonthYear

    // Clear and render calendar days
    calendarDaysContainer.innerHTML = ""

    const weekStart = startOfWeek(currentDate)

    for (let i = 0; i < 28; i++) {
      const currentDay = addDays(weekStart, i)
      const lunarDay = (i % 28) + 1

      const dayElement = createCalendarDay(currentDay, lunarDay)
      calendarDaysContainer.appendChild(dayElement)
    }
  }

  function createCalendarDay(gregorianDate, lunarDay) {
    // Determine if this is a special moon day
    const isSpecialMoonDay = lunarDay === 1 || lunarDay === 8 || lunarDay === 15 || lunarDay === 22

    // Get corgi mood and activity suggestion
    const corgiMood = getCorgiMood(lunarDay)
    const activitySuggestion = getActivitySuggestion(lunarDay)

    // Get moon phase
    const moonPhase = getMoonPhase(lunarDay)
    const weekday = formatDate(gregorianDate, "EEE")

    // Create day element
    const dayElement = document.createElement("div")
    dayElement.className = `calendar-day ${isSpecialMoonDay ? "special-moon-day" : ""}`

    dayElement.innerHTML = `
      <div class="date-section">
        <div class="gregorian-date">
          <span class="weekday">${weekday}</span>
          <span class="day-number">G${gregorianDate.getDate()}</span>
        </div>
        <span class="lunar-day">L${lunarDay}</span>
      </div>

      <div class="mood-text">${corgiMood}</div>

      <div class="activity-section">
        <div class="activity-text">${activitySuggestion}</div>
      </div>

      <div class="moon-phase">
        <div class="moon-phase-inner">
          <span class="moon-emoji" aria-label="${getMoonPhaseName(lunarDay)}">${moonPhase}</span>
        </div>
      </div>

      ${isSpecialMoonDay ? '<div class="special-indicator" aria-hidden="true"></div>' : ""}
    `

    return dayElement
  }

  // Helper functions
  function getLunarMonthYear(date) {
    const daysSinceStart = Math.floor((date.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24))
    const lunarMonth = (Math.floor(daysSinceStart / 28) % 13) + 1
    const lunarYear = Math.floor(daysSinceStart / (28 * 13)) + 1
    return `Corgi Month ${lunarMonth}, Year ${lunarYear}`
  }

  function getMoonPhase(day) {
    if (day === 1) return "🌑" // New Moon
    if (day < 8) return "🌒" // Waxing Crescent
    if (day === 8) return "🌓" // First Quarter
    if (day < 15) return "🌔" // Waxing Gibbous
    if (day === 15) return "🌕" // Full Moon
    if (day < 22) return "🌖" // Waning Gibbous
    if (day === 22) return "🌗" // Last Quarter
    return "🌘" // Waning Crescent
  }

  function getMoonPhaseName(day) {
    if (day === 1) return "New Moon"
    if (day < 8) return "Waxing Crescent"
    if (day === 8) return "First Quarter"
    if (day < 15) return "Waxing Gibbous"
    if (day === 15) return "Full Moon"
    if (day < 22) return "Waning Gibbous"
    if (day === 22) return "Last Quarter"
    return "Waning Crescent"
  }

  // Enhanced corgi mood function with more specific and engaging moods
  function getCorgiMood(day) {
    const moods = {
      newMoon: ["Adventure Ready!", "Super Curious", "Explorer Mode", "Peak Energy", "Adventure Time"],
      waxingCrescent: ["Playful & Fun", "Bouncy Joy", "Happy Zoomies", "Tail Wags", "Active & Bright"],
      firstQuarter: ["Social Time", "Party Pup", "Friend Mode", "Play Ready", "Extra Social"],
      waxingGibbous: ["Alert & Sharp", "Keen & Quick", "Fast Learner", "Focused Up", "Smart Cookie"],
      fullMoon: ["Zen Pup", "Balanced", "Peace Mode", "Happy Calm", "Content"],
      waningGibbous: ["Thoughtful", "Gentle Mind", "Wise Soul", "Present", "Mindful"],
      lastQuarter: ["Quiet Mind", "Deep Think", "Calm Watch", "Observant", "Serene"],
      waningCrescent: ["Rest Mode", "Dreamy", "Recharge", "Peaceful", "Relaxed"],
    }

    let phase
    if (day === 1) phase = "newMoon"
    else if (day < 8) phase = "waxingCrescent"
    else if (day === 8) phase = "firstQuarter"
    else if (day < 15) phase = "waxingGibbous"
    else if (day === 15) phase = "fullMoon"
    else if (day < 22) phase = "waningGibbous"
    else if (day === 22) phase = "lastQuarter"
    else phase = "waningCrescent"

    const selectedMoods = moods[phase]
    return selectedMoods[Math.floor(Math.random() * selectedMoods.length)]
  }

  // Enhanced activity suggestions with more variations and mood matching
  function getActivitySuggestion(day) {
    const activities = {
      energetic: [
        "Agility Training",
        "Beach Run",
        "Dog Park Time",
        "Hiking Trip",
        "Frisbee Play",
        "Splash Time",
        "Obstacle Fun",
        "Morning Jog",
        "Fetch Games",
        "Playdate",
      ],
      moderate: [
        "Nature Walk",
        "Training Time",
        "Scent Games",
        "Toy Play",
        "Garden Time",
        "Fetch Fun",
        "Balance Work",
        "Tug Games",
        "Hide & Seek",
        "Puzzle Time",
      ],
      calm: [
        "Brush Time",
        "Gentle Massage",
        "Garden Rest",
        "Slow Walk",
        "Cuddle Time",
        "Stretching",
        "Porch Sit",
        "Quiet Bond",
        "Soft Play",
        "Meditation",
      ],
    }

    // Determine activity intensity based on lunar phase
    let intensity
    if (day === 1 || day === 8 || (day > 1 && day < 15)) {
      intensity = "energetic" // Waxing phase - higher energy
    } else if (day === 15 || (day > 15 && day < 22)) {
      intensity = "moderate" // Waning gibbous - moderate energy
    } else {
      intensity = "calm" // Waning crescent - calmer energy
    }

    const selectedActivities = activities[intensity]
    return selectedActivities[Math.floor(Math.random() * selectedActivities.length)]
  }

  // Date utility functions
  function addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  function startOfWeek(date, options = { weekStartsOn: 6 }) {
    const result = new Date(date)
    const day = result.getDay()
    const diff = (day < options.weekStartsOn ? 7 : 0) + day - options.weekStartsOn
    result.setDate(result.getDate() - diff)
    return result
  }

  function formatDate(date, format) {
    const d = new Date(date)

    // Simple date formatter
    switch (format) {
      case "d":
        return d.getDate()
      case "EEE":
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()]
      case "MMM":
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()]
      default:
        return d.toString()
    }
  }
})

