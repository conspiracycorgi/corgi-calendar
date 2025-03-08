document.addEventListener("DOMContentLoaded", () => {
  // Constants and configuration
  const START_DATE = new Date(2025, 2, 29) // March 29, 2025
  let currentDate = new Date(START_DATE)

  // Day images for each day of the week
  const dayImages = [
    {
      day: "Sat",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%2821%29-NlB9wAMiP2rFEqkcp1WkMwtPta3LAB.png",
    },
    {
      day: "Sun",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%2818%29-GPmgJmj7rTGOtkNjsF94KsUlrwIroL.png",
    },
    {
      day: "Mon",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%2816%29-7SdlnpzbFCE6TftUUQZv2V86DxxXvt.png",
    },
    {
      day: "Tue",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%2819%29-ckdlms9gUqdbJGXioj0IFpqQEkfobn.png",
    },
    {
      day: "Wed",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%2815%29-RwJ1yiTzBJAa3WuTLJLNT5EcLjz3PL.png",
    },
    {
      day: "Thu",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%2817%29-SZWM5qQsmwngq6u34u0E4FvgbrM0sC.png",
    },
    {
      day: "Fri",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%2822%29-48x9YhQJ7uNVybcnHDmJANkS6z9h9x.png",
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
      headerElement.className = "flex flex-col items-center"
      headerElement.innerHTML = `
        <div class="w-16 h-16 sm:w-20 sm:h-20 relative mb-2 day-header-image">
          <img src="${dayInfo.image}" alt="${dayInfo.day}" width="80" height="80" class="object-contain">
        </div>
        <div class="text-center font-bold text-orange-300 text-base sm:text-lg">${dayInfo.day}</div>
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

    // Add fade-in animation to the calendar
    calendarDaysContainer.style.opacity = "0"
    setTimeout(() => {
      calendarDaysContainer.style.transition = "opacity 0.3s ease"
      calendarDaysContainer.style.opacity = "1"
    }, 50)
  }

  function createCalendarDay(gregorianDate, lunarDay) {
    // Determine if this is a special moon day
    const isSpecialMoonDay = lunarDay === 1 || lunarDay === 8 || lunarDay === 15 || lunarDay === 22

    // Get corgi mood and activity suggestion
    const corgiMood = getCorgiMood(lunarDay)
    const activitySuggestion = getActivitySuggestion(lunarDay)

    // Get moon phase
    const moonPhase = getMoonPhase(lunarDay)

    // Create day element
    const dayElement = document.createElement("div")
    dayElement.className = `calendar-day flex flex-col rounded-xl overflow-hidden transition-all relative ${
      isSpecialMoonDay ? "special-moon-day" : "regular-day hover:border-orange-400/50"
    }`

    // Add hover event for non-special days to show activity
    if (!isSpecialMoonDay) {
      dayElement.addEventListener("mouseenter", function () {
        const activityElement = this.querySelector(".activity-suggestion")
        if (activityElement) {
          activityElement.style.opacity = "1"
        }
      })

      dayElement.addEventListener("mouseleave", function () {
        const activityElement = this.querySelector(".activity-suggestion")
        if (activityElement) {
          activityElement.style.opacity = "0"
        }
      })
    }

    dayElement.innerHTML = `
      <!-- Header section with dates -->
      <div class="bg-gray-900/60 p-2 flex justify-between items-center">
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-orange-300">${formatDate(gregorianDate, "EEE")}</span>
          <span class="text-lg font-bold text-white">G${formatDate(gregorianDate, "d")}</span>
        </div>
        <div class="flex flex-col items-end">
          <span class="text-xs text-orange-200/80">${formatDate(gregorianDate, "MMM")}</span>
          <span class="text-2xl font-bold text-orange-400">L${lunarDay}</span>
        </div>
      </div>

      <!-- Content section -->
      <div class="p-2 flex-grow flex flex-col">
        <!-- Corgi mood - now at the top -->
        <div class="mb-auto mt-2">
          <div class="text-center">
            <div class="text-xs font-bold text-gray-400 uppercase tracking-wider">Corgi Mood</div>
            <div class="text-sm font-bold text-orange-300">${corgiMood}</div>
          </div>

          <!-- Activity suggestion - only show on special moon days or when hovered -->
          <div class="activity-suggestion mt-1 text-center transition-opacity duration-300 ${isSpecialMoonDay ? "opacity-100" : "opacity-0"}">
            <div class="text-xs font-bold text-gray-400 uppercase tracking-wider">Activity</div>
            <div class="text-xs font-bold text-white">${activitySuggestion}</div>
          </div>
        </div>

        <!-- Moon phase - now at the bottom -->
        <div class="flex justify-center items-center mt-auto">
          <div class="flex items-center bg-gray-900/30 py-1 px-3 rounded-full">
            <span class="${isSpecialMoonDay ? "text-2xl animate-wiggle" : "text-2xl"}" role="img" aria-label="Moon Phase">
              ${moonPhase}
            </span>
          </div>
        </div>
      </div>

      <!-- Special indicator -->
      ${isSpecialMoonDay ? '<div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>' : ""}
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

  // Enhanced corgi mood function with more variations
  function getCorgiMood(day) {
    // Define mood categories based on lunar phases
    const newMoonMoods = [
      "Adventurous & Bold",
      "Excitedly Curious",
      "Ready to Explore",
      "Boundlessly Energetic",
      "Playfully Mischievous",
    ]

    const waxingCrescentMoods = [
      "Energetically Hopeful",
      "Bright & Bouncy",
      "Eagerly Attentive",
      "Spirited & Lively",
      "Cheerfully Active",
    ]

    const firstQuarterMoods = [
      "Playfully Social",
      "Enthusiastically Engaged",
      "Joyfully Interactive",
      "Happily Frisky",
      "Delightfully Animated",
    ]

    const waxingGibbousMoods = [
      "Curiously Inquisitive",
      "Actively Exploring",
      "Intently Focused",
      "Keenly Observant",
      "Thoughtfully Engaged",
    ]

    const fullMoonMoods = [
      "Peacefully Relaxed",
      "Contentedly Calm",
      "Serenely Balanced",
      "Blissfully Tranquil",
      "Harmoniously Centered",
    ]

    const waningGibbousMoods = [
      "Dreamily Reflective",
      "Softly Contemplative",
      "Gently Pensive",
      "Quietly Thoughtful",
      "Calmly Introspective",
    ]

    const lastQuarterMoods = [
      "Thoughtfully Wise",
      "Insightfully Calm",
      "Deeply Observant",
      "Mindfully Present",
      "Sagely Perceptive",
    ]

    const waningCrescentMoods = [
      "Restfully Serene",
      "Peacefully Quiet",
      "Gently Recharging",
      "Softly Recuperating",
      "Calmly Renewing",
    ]

    // Get a random mood from the appropriate category based on lunar day
    const getRandomMood = (moodArray) => {
      const randomIndex = Math.floor(Math.random() * moodArray.length)
      return moodArray[randomIndex]
    }

    // Return a mood based on the lunar day
    if (day === 1) return getRandomMood(newMoonMoods)
    if (day < 8) return getRandomMood(waxingCrescentMoods)
    if (day === 8) return getRandomMood(firstQuarterMoods)
    if (day < 15) return getRandomMood(waxingGibbousMoods)
    if (day === 15) return getRandomMood(fullMoonMoods)
    if (day < 22) return getRandomMood(waningGibbousMoods)
    if (day === 22) return getRandomMood(lastQuarterMoods)
    return getRandomMood(waningCrescentMoods)
  }

  // Enhanced activity suggestions with more variations
  function getActivitySuggestion(day) {
    // Define activity categories based on lunar phases
    const newMoonActivities = [
      "Try a new walking route",
      "Explore a new park",
      "Introduce a new toy",
      "Visit new friends",
      "Start a training challenge",
    ]

    const waxingCrescentActivities = [
      "Fetch games with variety",
      "Energetic play sessions",
      "Morning adventure walks",
      "Interactive puzzle toys",
      "Backyard obstacle course",
    ]

    const firstQuarterActivities = [
      "Agility training fun",
      "Social playdates",
      "Frisbee in the park",
      "Swimming adventures",
      "Trick training sessions",
    ]

    const waxingGibbousActivities = [
      "Hide and seek games",
      "Scent work activities",
      "Moderate hikes",
      "Toy rotation day",
      "Enrichment activities",
    ]

    const fullMoonActivities = [
      "Gentle cuddle sessions",
      "Relaxing brushing time",
      "Calm evening walks",
      "Peaceful bonding time",
      "Soothing music therapy",
    ]

    const waningGibbousActivities = [
      "Relaxing massage time",
      "Gentle stretching",
      "Quiet garden time",
      "Slow-paced walks",
      "Calming chew toys",
    ]

    const lastQuarterActivities = [
      "Quiet play time",
      "Mental stimulation games",
      "Gentle training review",
      "Moderate exercise",
      "Balanced rest & play",
    ]

    const waningCrescentActivities = [
      "Short, calm walks",
      "Restful nap times",
      "Gentle indoor games",
      "Quiet companionship",
      "Cozy blanket time",
    ]

    // Get a random activity from the appropriate category
    const getRandomActivity = (activityArray) => {
      const randomIndex = Math.floor(Math.random() * activityArray.length)
      return activityArray[randomIndex]
    }

    // Return an activity based on the lunar day
    if (day === 1) return getRandomActivity(newMoonActivities)
    if (day < 8) return getRandomActivity(waxingCrescentActivities)
    if (day === 8) return getRandomActivity(firstQuarterActivities)
    if (day < 15) return getRandomActivity(waxingGibbousActivities)
    if (day === 15) return getRandomActivity(fullMoonActivities)
    if (day < 22) return getRandomActivity(waningGibbousActivities)
    if (day === 22) return getRandomActivity(lastQuarterActivities)
    return getRandomActivity(waningCrescentActivities)
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

