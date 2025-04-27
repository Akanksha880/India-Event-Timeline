/**
 * India Event Horizon - Calendar and Event Countdown App
 * Vanilla JavaScript version
 */

// ================ App State ================
let state = {
    events: [],
    theme: 'light',
    view: 'dashboard', // 'dashboard', 'calendar', 'settings'
    filter: 'all',
    searchQuery: '',
    selectedEvent: null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear()
  };
  
  // ================ Constants ================
  const LOCAL_STORAGE_KEYS = {
    EVENTS: "india-events-horizon-events",
    THEME: "india-events-horizon-theme",
    NOTIFICATION_SEEN: "india-events-horizon-notifications",
    NOTIFICATION_PREFERENCES: "india-events-horizon-notification-prefs",
    ALARM_SOUND: "india-events-horizon-alarm-sound"
  };
  
  const DEFAULT_ALARM_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
  
  // Available alarm sounds
  const AVAILABLE_SOUNDS = [
    { 
      id: 'default', 
      name: 'Classic Alarm',
      url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
    },
    { 
      id: 'bell', 
      name: 'Temple Bell',
      url: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' 
    },
    { 
      id: 'celebration', 
      name: 'Celebration',
      url: 'https://assets.mixkit.co/active_storage/sfx/1927/1927-preview.mp3' 
    },
    { 
      id: 'notification', 
      name: 'Gentle Notification',
      url: 'https://assets.mixkit.co/active_storage/sfx/1513/1513-preview.mp3'
    }
  ];
  
  // Common emojis
  const EMOJIS = [
    "🎉", "🎊", "🎂", "🎁", "🎆", "🎇", "🧨", "✨", "🎈", "🎏", 
    "🎐", "🎀", "🎗", "🏆", "🏅", "🥇", "🥈", "🥉", "⚽", "🏀",
    "🏐", "🏈", "🏉", "🎾", "🏸", "🏓", "🏒", "🥍", "🏏", "🥎",
    "⚾", "🥏", "🎯", "🪁", "🎮", "🕹", "🎲", "♟", "🧩", "🪔",
    "🎭", "🎬", "🎼", "🎵", "🎶", "🎤", "🎧", "🎷", "🎸", "🎹",
    "🎺", "🎻", "🥁", "🎨", "🎭", "🌏", "🌍", "🌎", "🏔️", "🏞️",
    "🏙️", "🌅", "🌄", "🌠", "🌌", "🌉", "🌁", "🏕️", "🏖️", "🏜️",
    "🏝️", "🏞️", "⛰️", "🌋", "🗻", "🏜️", "🏔️", "⛱️", "🏕️"
  ];
  
  // ================ Default Events ================
  const DEFAULT_EVENTS = [
    {
      id: "new-year-2025",
      name: "New Year",
      date: new Date("2025-01-01T00:00:00+05:30"),
      icon: "🎉",
      category: "festival",
      isCustom: false
    },
    {
      id: "makar-sankranti-2025",
      name: "Makar Sankranti",
      date: new Date("2025-01-14T00:00:00+05:30"),
      icon: "🪁",
      category: "festival",
      isCustom: false
    },
    {
      id: "republic-day-2025",
      name: "Republic Day",
      date: new Date("2025-01-26T00:00:00+05:30"),
      icon: "🇮🇳",
      category: "national",
      isCustom: false
    },
    {
      id: "basant-panchami-2025",
      name: "Basant Panchami",
      date: new Date("2025-01-29T00:00:00+05:30"),
      icon: "📚",
      category: "festival",
      isCustom: false
    },
    {
      id: "valentines-day-2025",
      name: "Valentine's Day",
      date: new Date("2025-02-14T00:00:00+05:30"),
      icon: "❤️",
      category: "other",
      isCustom: false
    },
    {
      id: "maha-shivratri-2025",
      name: "Maha Shivratri",
      date: new Date("2025-02-26T00:00:00+05:30"),
      icon: "🕉️",
      category: "festival",
      isCustom: false
    },
    {
      id: "holi-2025",
      name: "Holi",
      date: new Date("2025-03-14T00:00:00+05:30"),
      icon: "🎨",
      category: "festival",
      isCustom: false
    },
    {
      id: "ram-navami-2025",
      name: "Ram Navami",
      date: new Date("2025-03-28T00:00:00+05:30"),
      icon: "🏹",
      category: "festival",
      isCustom: false
    },
    {
      id: "eid-ul-fitr-2025",
      name: "Eid-ul-Fitr",
      date: new Date("2025-03-31T00:00:00+05:30"),
      icon: "🌙",
      category: "festival",
      isCustom: false
    },
    {
      id: "ambedkar-jayanti-2025",
      name: "Ambedkar Jayanti",
      date: new Date("2025-04-14T00:00:00+05:30"),
      icon: "📜",
      category: "national",
      isCustom: false
    },
    {
      id: "easter-2025",
      name: "Easter",
      date: new Date("2025-04-20T00:00:00+05:30"),
      icon: "🐰",
      category: "festival",
      isCustom: false
    },
    {
      id: "world-environment-day-2025",
      name: "World Environment Day",
      date: new Date("2025-06-05T00:00:00+05:30"),
      icon: "🌱",
      category: "other",
      isCustom: false
    },
    {
      id: "yoga-day-2025",
      name: "International Yoga Day",
      date: new Date("2025-06-21T00:00:00+05:30"),
      icon: "🧘",
      category: "national",
      isCustom: false
    },
    {
      id: "independence-day-2025",
      name: "Independence Day",
      date: new Date("2025-08-15T00:00:00+05:30"),
      icon: "🇮🇳",
      category: "national",
      isCustom: false
    },
    {
      id: "diwali-2025",
      name: "Diwali",
      date: new Date("2025-10-20T00:00:00+05:30"),
      icon: "🪔",
      category: "festival",
      isCustom: false
    },
    {
      id: "Akanksha-birthday-2025",
      name: "Akanksha's Birthday",
      date: new Date("2025-12-08T00:00:00+05:30"),
      icon: "🥂",
      category: "personal",
      isCustom: false
    },
    {
      id: "christmas-2025",
      name: "Christmas",
      date: new Date("2025-12-25T00:00:00+05:30"),
      icon: "🎄",
      category: "festival",
      isCustom: false
    },
    {
      id: "new-year-eve-2025",
      name: "New Year's Eve",
      date: new Date("2025-12-31T00:00:00+05:30"),
      icon: "🥂",
      category: "other",
      isCustom: false
    }
  ];
  
  // ================ Utils ================
  
  // Format date to display format
  function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}, ${month} ${dateNum}, ${year}`;
  }
  
  // Calculate time remaining between now and target date
  function calculateTimeRemaining(targetDate) {
    // Get current date in IST (UTC+5:30)
    const now = new Date();
    const nowIST = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (5.5 * 60 * 60000));
    const targetIST = new Date(targetDate);
    
    // Calculate the difference
    const difference = targetIST.getTime() - nowIST.getTime();
    
    // If the event has already passed
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0, 
        minutes: 0,
        seconds: 0,
        isPast: true,
        totalSeconds: 0
      };
    }
    
    // Calculate days, hours, minutes and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const totalSeconds = Math.floor(difference / 1000);
    
    return {
      days,
      hours,
      minutes,
      seconds,
      isPast: false,
      totalSeconds
    };
  }
  
  // Check if an event is today
  function isEventToday(eventDate) {
    const now = new Date();
    const nowIST = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (5.5 * 60 * 60000));
    
    return (
      nowIST.getDate() === eventDate.getDate() &&
      nowIST.getMonth() === eventDate.getMonth() &&
      nowIST.getFullYear() === eventDate.getFullYear()
    );
  }
  
  // Check if a notification should be shown
  function shouldShowNotification(targetDate, daysBeforeEvent) {
    const now = new Date();
    const nowIST = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (5.5 * 60 * 60000));
    
    const notificationDate = new Date(targetDate);
    notificationDate.setDate(notificationDate.getDate() - daysBeforeEvent);
    
    return (
      nowIST.getDate() === notificationDate.getDate() &&
      nowIST.getMonth() === notificationDate.getMonth() &&
      nowIST.getFullYear() === notificationDate.getFullYear()
    );
  }
  
  // Calculate progress for today's events
  function calculateProgress() {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    
    // Calculate progress based on time passed today
    const totalDaySeconds = 24 * 60 * 60;
    const secondsPassed = (now.getTime() - todayStart.getTime()) / 1000;
    return Math.min(100, (secondsPassed / totalDaySeconds) * 100);
  }
  
  // Generate a unique ID
  function generateId() {
    return 'custom-' + Date.now();
  }
  
  // Show a toast notification
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s ease forwards';
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 5000);
    
    // Close button functionality
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.style.animation = 'toast-out 0.3s ease forwards';
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    });
  }
  
  // Filter events based on current filter and search
  function filterEvents() {
    let filteredEvents = [...state.events];
    
    // Apply filter
    if (state.filter === 'upcoming') {
      filteredEvents = filteredEvents.filter(event => {
        const timeRemaining = calculateTimeRemaining(event.date);
        return !timeRemaining.isPast;
      });
    } else if (state.filter === 'past') {
      filteredEvents = filteredEvents.filter(event => {
        const timeRemaining = calculateTimeRemaining(event.date);
        return timeRemaining.isPast;
      });
    } else if (state.filter === 'today') {
      filteredEvents = filteredEvents.filter(event => isEventToday(event.date));
    } else if (state.filter.startsWith('category-')) {
      const category = state.filter.split('-')[1];
      filteredEvents = filteredEvents.filter(event => event.category === category);
    }
    
    // Apply search
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.name.toLowerCase().includes(query)
      );
    }
    
    return filteredEvents;
  }
  
  // ================ Local Storage Functions ================
  
  // Get all events from storage
  function getEvents() {
    const storedEventsJSON = localStorage.getItem(LOCAL_STORAGE_KEYS.EVENTS);
    
    if (!storedEventsJSON) {
      return DEFAULT_EVENTS;
    }
    
    try {
      const parsedEvents = JSON.parse(storedEventsJSON).map(event => ({
        ...event,
        date: new Date(event.date)
      }));
      
      return parsedEvents;
    } catch (error) {
      console.error("Error parsing stored events:", error);
      return DEFAULT_EVENTS;
    }
  }
  
  // Save events to storage
  function saveEvents(events) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (error) {
      console.error("Error saving events to localStorage:", error);
    }
  }
  
  // Add a new custom event
  function addCustomEvent(event) {
    const newEvent = {
      ...event,
      id: generateId(),
      isCustom: true
    };
    
    state.events = [...state.events, newEvent];
    saveEvents(state.events);
    return newEvent;
  }
  
  // Update an existing event
  function updateEvent(updatedEvent) {
    state.events = state.events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    );
    
    saveEvents(state.events);
  }
  
  // Delete an event
  function deleteEvent(eventId) {
    state.events = state.events.filter(event => event.id !== eventId);
    saveEvents(state.events);
  }
  
  // Get theme preference
  function getThemePreference() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) || 'light';
  }
  
  // Save theme preference
  function saveThemePreference(theme) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
  }
  
  // Get alarm sound
  function getAlarmSound() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ALARM_SOUND) || DEFAULT_ALARM_SOUND;
  }
  
  // Save alarm sound
  function saveAlarmSound(soundUrl) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ALARM_SOUND, soundUrl);
  }
  
  // Mark notification as seen
  function markNotificationAsSeen(eventId, daysBefore) {
    const key = `${LOCAL_STORAGE_KEYS.NOTIFICATION_SEEN}-${eventId}-${daysBefore}`;
    localStorage.setItem(key, Date.now().toString());
  }
  
  // Check if notification has been seen
  function hasNotificationBeenSeen(eventId, daysBefore) {
    const key = `${LOCAL_STORAGE_KEYS.NOTIFICATION_SEEN}-${eventId}-${daysBefore}`;
    const lastSeen = localStorage.getItem(key);
    
    if (!lastSeen) return false;
    
    const lastSeenTime = parseInt(lastSeen);
    return Date.now() - lastSeenTime < 24 * 60 * 60 * 1000;
  }
  
  // ================ Sound Functions ================
  let alarmSound = new Audio(getAlarmSound());
  
  // Play a preview of the sound
  function previewAlarmSound(soundUrl) {
    const previewSound = new Audio(soundUrl);
    previewSound.volume = 0.5;
    previewSound.play();
  }
  
  // Play the alarm sound
  function playAlarmSound() {
    alarmSound = new Audio(getAlarmSound());
    alarmSound.play();
  }
  
  // Stop the alarm sound
  function stopAlarmSound() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
  
  // ================ UI Rendering ================
  
  // Render the dashboard
  function renderDashboard() {
    const mainContent = document.getElementById('main-content');
    const dashboardTemplate = document.getElementById('dashboard-template');
    
    mainContent.innerHTML = '';
    mainContent.appendChild(dashboardTemplate.content.cloneNode(true));
    
    // Update stats
    document.getElementById('total-events-count').textContent = state.events.length;
    
    const upcomingEvents = state.events.filter(event => {
      const timeRemaining = calculateTimeRemaining(event.date);
      return !timeRemaining.isPast;
    });
    document.getElementById('upcoming-events-count').textContent = upcomingEvents.length;
    
    const todayEvents = state.events.filter(event => isEventToday(event.date));
    document.getElementById('today-events-count').textContent = todayEvents.length;
    
    const nationalEvents = state.events.filter(event => event.category === 'national');
    document.getElementById('national-events-count').textContent = nationalEvents.length;
    
    // Setup search and filter
    const searchInput = document.getElementById('search-input');
    searchInput.value = state.searchQuery;
    searchInput.addEventListener('input', e => {
      state.searchQuery = e.target.value;
      renderEventList();
      
      // Show/hide clear button
      const clearButton = document.getElementById('clear-filters-button');
      if (state.searchQuery || state.filter !== 'all') {
        clearButton.classList.remove('hidden');
      } else {
        clearButton.classList.add('hidden');
      }
    });
    
    // Filter dropdown
    const filterButton = document.getElementById('filter-button');
    const filterDropdown = document.getElementById('filter-dropdown-content');
    
    filterButton.addEventListener('click', () => {
      filterDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    window.addEventListener('click', e => {
      if (!e.target.matches('.dropdown-button') && !e.target.closest('.dropdown-button')) {
        filterDropdown.classList.remove('show');
      }
    });
    
    // Filter options
    const filterOptions = document.querySelectorAll('.dropdown-item');
    filterOptions.forEach(option => {
      option.addEventListener('click', () => {
        state.filter = option.dataset.filter;
        document.getElementById('current-filter').textContent = option.textContent;
        filterDropdown.classList.remove('show');
        renderEventList();
        
        // Show/hide clear button
        const clearButton = document.getElementById('clear-filters-button');
        if (state.searchQuery || state.filter !== 'all') {
          clearButton.classList.remove('hidden');
        } else {
          clearButton.classList.add('hidden');
        }
      });
    });
    
    // Clear filters button
    const clearButton = document.getElementById('clear-filters-button');
    if (state.searchQuery || state.filter !== 'all') {
      clearButton.classList.remove('hidden');
    }
    
    clearButton.addEventListener('click', () => {
      state.searchQuery = '';
      state.filter = 'all';
      searchInput.value = '';
      document.getElementById('current-filter').textContent = 'All Events';
      clearButton.classList.add('hidden');
      renderEventList();
    });
    
    // Add event button
    document.getElementById('add-event-button').addEventListener('click', openAddEventModal);
    
    // Calendar view button
    document.getElementById('calendar-view-button').addEventListener('click', () => {
      state.view = 'calendar';
      render();
    });
    
    // Render events list
    renderEventList();
  }
  
  // Render the event list
  function renderEventList() {
    const eventsGrid = document.getElementById('events-grid');
    eventsGrid.innerHTML = '';
    
    const filteredEvents = filterEvents();
    
    if (filteredEvents.length === 0) {
      const noEvents = document.createElement('div');
      noEvents.className = 'no-events';
      noEvents.textContent = 'No events found.';
      eventsGrid.appendChild(noEvents);
      return;
    }
    
    // Sort events by date
    filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    filteredEvents.forEach(event => {
      const eventCard = createEventCard(event);
      eventsGrid.appendChild(eventCard);
    });
  }
  
  // Create an event card
  function createEventCard(event) {
    const template = document.getElementById('event-card-template');
    const eventCard = template.content.cloneNode(true).querySelector('.event-card');
    
    // Set event category class
    if (event.category) {
      eventCard.classList.add(event.category);
    }
    
    // Event info
    eventCard.querySelector('.event-name').textContent = event.name;
    eventCard.querySelector('.event-date').textContent = formatDate(event.date);
    eventCard.querySelector('.event-icon').textContent = event.icon;
    
    // Time remaining
    const timeRemaining = calculateTimeRemaining(event.date);
    
    if (timeRemaining.isPast) {
      eventCard.classList.add('past');
      eventCard.querySelector('.countdown-timer').style.display = 'none';
      const pastNote = document.createElement('div');
      pastNote.className = 'text-sm text-muted-foreground';
      pastNote.textContent = 'Event has passed';
      eventCard.querySelector('.countdown-display').prepend(pastNote);
    } else {
      // Update countdown values
      eventCard.querySelector('.countdown-value.days').textContent = timeRemaining.days;
      eventCard.querySelector('.countdown-value.hours').textContent = timeRemaining.hours;
      eventCard.querySelector('.countdown-value.minutes').textContent = timeRemaining.minutes;
      eventCard.querySelector('.countdown-value.seconds').textContent = timeRemaining.seconds;
      
      // Highlight countdown values
      if (timeRemaining.days === 0) {
        eventCard.querySelector('.countdown-value.days').classList.add('highlight');
        eventCard.querySelector('.countdown-unit:first-child').classList.add('pulse');
        
        if (timeRemaining.hours < 12) {
          eventCard.querySelector('.countdown-value.hours').classList.add('highlight');
        }
        
        if (timeRemaining.hours === 0) {
          eventCard.querySelector('.countdown-value.minutes').classList.add('highlight');
          
          if (timeRemaining.minutes === 0) {
            eventCard.querySelector('.countdown-value.seconds').classList.add('highlight');
          }
        }
      }
    }
    
    // Today's progress bar
    const progressContainer = eventCard.querySelector('.progress-container');
    
    if (isEventToday(event.date)) {
      const progress = calculateProgress();
      eventCard.querySelector('.progress-percent').textContent = `${Math.round(progress)}%`;
      eventCard.querySelector('.progress-fill').style.width = `${progress}%`;
    } else {
      progressContainer.style.display = 'none';
    }
    
    // Event actions
    eventCard.querySelector('.snooze-button').addEventListener('click', () => {
      openSnoozeModal(event);
    });
    
    eventCard.querySelector('.edit-button').addEventListener('click', () => {
      openEditEventModal(event);
    });
    
    eventCard.querySelector('.delete-button').addEventListener('click', () => {
      openDeleteModal(event);
    });
    
    // Store event ID on the card for reference
    eventCard.dataset.eventId = event.id;
    
    return eventCard;
  }
  
  // Render the calendar view
  function renderCalendar() {
    const mainContent = document.getElementById('main-content');
    const calendarTemplate = document.getElementById('calendar-template');
    
    mainContent.innerHTML = '';
    mainContent.appendChild(calendarTemplate.content.cloneNode(true));
    
    // Update calendar header
    updateCalendarHeader();
    
    // Populate calendar days
    renderCalendarDays();
    
    // Dashboard view button
    document.getElementById('dashboard-view-button').addEventListener('click', () => {
      state.view = 'dashboard';
      render();
    });
    
    // Calendar navigation
    document.getElementById('prev-month-btn').addEventListener('click', () => {
      state.currentMonth--;
      if (state.currentMonth < 0) {
        state.currentMonth = 11;
        state.currentYear--;
      }
      updateCalendarHeader();
      renderCalendarDays();
    });
    
    document.getElementById('next-month-btn').addEventListener('click', () => {
      state.currentMonth++;
      if (state.currentMonth > 11) {
        state.currentMonth = 0;
        state.currentYear++;
      }
      updateCalendarHeader();
      renderCalendarDays();
    });
    
    document.getElementById('prev-year-btn').addEventListener('click', () => {
      state.currentYear--;
      updateCalendarHeader();
      renderCalendarDays();
    });
    
    document.getElementById('next-year-btn').addEventListener('click', () => {
      state.currentYear++;
      updateCalendarHeader();
      renderCalendarDays();
    });
    
    document.getElementById('today-btn').addEventListener('click', () => {
      const today = new Date();
      state.currentMonth = today.getMonth();
      state.currentYear = today.getFullYear();
      updateCalendarHeader();
      renderCalendarDays();
    });
  }
  
  // Update calendar header with current month and year
  function updateCalendarHeader() {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    document.getElementById('calendar-header').textContent = `${months[state.currentMonth]} ${state.currentYear}`;
  }
  
  // Render calendar days for current month
  function renderCalendarDays() {
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    
    // Get first day of month and last day
    const firstDay = new Date(state.currentYear, state.currentMonth, 1);
    const lastDay = new Date(state.currentYear, state.currentMonth + 1, 0);
    
    // Get day of week of first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Get days from previous month
    const prevMonthLastDay = new Date(state.currentYear, state.currentMonth, 0).getDate();
    
    // Create days for previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const dayNumber = prevMonthLastDay - firstDayOfWeek + i + 1;
      const dayElement = createCalendarDay(
        dayNumber, 
        new Date(state.currentYear, state.currentMonth - 1, dayNumber), 
        true
      );
      calendarDays.appendChild(dayElement);
    }
    
    // Create days for current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dayElement = createCalendarDay(
        i, 
        new Date(state.currentYear, state.currentMonth, i), 
        false
      );
      calendarDays.appendChild(dayElement);
    }
    
    // Fill remaining grid with next month's days
    const totalDaysDisplayed = firstDayOfWeek + lastDay.getDate();
    const remainingDays = 7 - (totalDaysDisplayed % 7);
    
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        const dayElement = createCalendarDay(
          i, 
          new Date(state.currentYear, state.currentMonth + 1, i), 
          true
        );
        calendarDays.appendChild(dayElement);
      }
    }
  }
  
  // Create a single calendar day element
  function createCalendarDay(dayNumber, date, isOtherMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (isOtherMonth) {
      dayElement.classList.add('other-month');
    }
    
    // Check if this day is today
    const today = new Date();
    if (
      date.getDate() === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear()
    ) {
      dayElement.classList.add('today');
    }
    
    // Add day number
    const dayNumberElement = document.createElement('div');
    dayNumberElement.className = 'calendar-day-number';
    dayNumberElement.textContent = dayNumber;
    dayElement.appendChild(dayNumberElement);
    
    // Add events for this day
    const dayEvents = state.events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() && 
        eventDate.getMonth() === date.getMonth() && 
        eventDate.getFullYear() === date.getFullYear()
      );
    });
    
    if (dayEvents.length > 0) {
      const eventsContainer = document.createElement('div');
      eventsContainer.className = 'calendar-events';
      
      // Sort events by category
      dayEvents.sort((a, b) => {
        const categoryOrder = { national: 1, festival: 2, personal: 3, other: 4 };
        return (categoryOrder[a.category] || 5) - (categoryOrder[b.category] || 5);
      });
      
      // Display up to 3 events, then show "more" indicator
      const displayEvents = dayEvents.slice(0, 3);
      
      displayEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = `calendar-event ${event.category || 'other'}`;
        eventElement.textContent = `${event.icon} ${event.name}`;
        eventsContainer.appendChild(eventElement);
        
        // Add click event to navigate to dashboard and highlight this event
        eventElement.addEventListener('click', (e) => {
          e.stopPropagation();
          state.view = 'dashboard';
          state.filter = 'all';
          state.searchQuery = event.name;
          render();
        });
      });
      
      if (dayEvents.length > 3) {
        const moreElement = document.createElement('div');
        moreElement.className = 'calendar-more-events';
        moreElement.textContent = `+${dayEvents.length - 3} more`;
        
        // Show all events on click
        moreElement.addEventListener('click', (e) => {
          e.stopPropagation();
          alert(`All events on ${formatDate(date)}:\n\n${dayEvents.map(event => `${event.icon} ${event.name}`).join('\n')}`);
        });
        
        eventsContainer.appendChild(moreElement);
      }
      
      dayElement.appendChild(eventsContainer);
    }
    
    // Add day click handler to add event on this date
    dayElement.addEventListener('click', () => {
      openAddEventModal(date);
    });
    
    return dayElement;
  }
  
  // Render settings view
  function renderSettings() {
    const mainContent = document.getElementById('main-content');
    const settingsTemplate = document.getElementById('settings-template');
    
    mainContent.innerHTML = '';
    mainContent.appendChild(settingsTemplate.content.cloneNode(true));
    
    // Setup tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        
        // Hide all tab contents
        tabContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Deactivate all tab buttons
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Activate selected tab
        document.getElementById(`${tabId}-tab`).classList.add('active');
        button.classList.add('active');
      });
    });
    
    // Initialize theme
    const themeInputs = document.querySelectorAll('input[name="theme"]');
    themeInputs.forEach(input => {
      if (input.value === state.theme) {
        input.checked = true;
      }
      
      input.addEventListener('change', () => {
        if (input.checked) {
          setTheme(input.value);
        }
      });
    });
    
    // Auto-start setting
    const autoStartInput = document.getElementById('auto-start');
    autoStartInput.checked = localStorage.getItem('auto-start-countdowns') === 'true';
    autoStartInput.addEventListener('change', () => {
      localStorage.setItem('auto-start-countdowns', autoStartInput.checked);
      showToast(`Auto-start ${autoStartInput.checked ? 'enabled' : 'disabled'} for countdowns`, 'info');
    });
    
    // Sound settings
    const soundInputs = document.querySelectorAll('input[name="sound"]');
    const currentSound = getAlarmSound();
    
    soundInputs.forEach(input => {
      if (input.value === currentSound) {
        input.checked = true;
      }
    });
    
    // Preview buttons
    document.querySelectorAll('.preview-button').forEach(button => {
      button.addEventListener('click', () => {
        previewAlarmSound(button.dataset.sound);
      });
    });
    
    // Save sound button
    document.getElementById('save-sound-button').addEventListener('click', () => {
      const selectedSound = document.querySelector('input[name="sound"]:checked').value;
      saveAlarmSound(selectedSound);
      showToast('Sound settings saved successfully!', 'success');
    });
    
    // Setup notification settings
    const notificationToggles = {
      'enable-notifications': true,
      'notify-7-days': true,
      'notify-3-days': true,
      'notify-1-day': true,
      'notify-day-of': true
    };
    
    Object.keys(notificationToggles).forEach(id => {
      const toggle = document.getElementById(id);
      const savedValue = localStorage.getItem(`notify-setting-${id}`);
      toggle.checked = savedValue !== null ? savedValue === 'true' : notificationToggles[id];
      
      toggle.addEventListener('change', () => {
        localStorage.setItem(`notify-setting-${id}`, toggle.checked);
      });
    });
  }
  
  // Open add event modal
  function openAddEventModal(defaultDate = null) {
    const modal = document.getElementById('event-modal');
    const form = document.getElementById('event-form');
    
    // Reset form
    form.reset();
    document.getElementById('modal-title').textContent = 'Add New Event';
    
    // Set default date if provided
    if (defaultDate) {
      const inputDate = document.getElementById('event-date');
      // Format date to YYYY-MM-DD
      const year = defaultDate.getFullYear();
      const month = String(defaultDate.getMonth() + 1).padStart(2, '0');
      const day = String(defaultDate.getDate()).padStart(2, '0');
      inputDate.value = `${year}-${month}-${day}`;
    }
    
    // Populate emoji picker
    const emojiPicker = document.querySelector('.emoji-picker');
    emojiPicker.innerHTML = '';
    
    EMOJIS.forEach(emoji => {
      const emojiButton = document.createElement('button');
      emojiButton.type = 'button';
      emojiButton.className = 'emoji-item';
      emojiButton.textContent = emoji;
      emojiButton.addEventListener('click', () => {
        document.getElementById('event-icon').value = emoji;
        document.querySelector('.selected-icon').textContent = emoji;
      });
      emojiPicker.appendChild(emojiButton);
    });
    
    // Show the modal
    modal.classList.add('show');
    
    // Handle form submission
    form.onsubmit = function(e) {
      e.preventDefault();
      
      const name = document.getElementById('event-name').value;
      const dateString = document.getElementById('event-date').value;
      const category = document.getElementById('event-category').value;
      const icon = document.getElementById('event-icon').value;
      
      if (!name || !dateString) {
        showToast('Please fill out all required fields', 'error');
        return;
      }
      
      // Create date with IST timezone
      const dateParts = dateString.split('-');
      const date = new Date(
        parseInt(dateParts[0]), 
        parseInt(dateParts[1]) - 1, 
        parseInt(dateParts[2])
      );
      
      const newEvent = addCustomEvent({
        name,
        date,
        category,
        icon: icon || '🎉'
      });
      
      showToast(`${name} has been added to your events.`, 'success');
      closeEventModal();
      
      // Refresh UI
      if (state.view === 'dashboard') {
        renderEventList();
      } else if (state.view === 'calendar') {
        renderCalendarDays();
      }
    };
    
    // Handle cancel and close
    document.querySelector('.modal .cancel-button').addEventListener('click', closeEventModal);
    document.querySelector('.modal .close-button').addEventListener('click', closeEventModal);
  }
  
  // Open edit event modal
  function openEditEventModal(event) {
    const modal = document.getElementById('event-modal');
    const form = document.getElementById('event-form');
    
    // Set form title
    document.getElementById('modal-title').textContent = 'Edit Event';
    
    // Populate form fields
    document.getElementById('event-name').value = event.name;
    
    // Format date to YYYY-MM-DD
    const year = event.date.getFullYear();
    const month = String(event.date.getMonth() + 1).padStart(2, '0');
    const day = String(event.date.getDate()).padStart(2, '0');
    document.getElementById('event-date').value = `${year}-${month}-${day}`;
    
    document.getElementById('event-category').value = event.category || 'other';
    document.getElementById('event-icon').value = event.icon || '🎉';
    document.querySelector('.selected-icon').textContent = event.icon || '🎉';
    
    // Populate emoji picker
    const emojiPicker = document.querySelector('.emoji-picker');
    emojiPicker.innerHTML = '';
    
    EMOJIS.forEach(emoji => {
      const emojiButton = document.createElement('button');
      emojiButton.type = 'button';
      emojiButton.className = 'emoji-item';
      emojiButton.textContent = emoji;
      emojiButton.addEventListener('click', () => {
        document.getElementById('event-icon').value = emoji;
        document.querySelector('.selected-icon').textContent = emoji;
      });
      emojiPicker.appendChild(emojiButton);
    });
    
    // Show the modal
    modal.classList.add('show');
    
    // Handle form submission
    form.onsubmit = function(e) {
      e.preventDefault();
      
      const name = document.getElementById('event-name').value;
      const dateString = document.getElementById('event-date').value;
      const category = document.getElementById('event-category').value;
      const icon = document.getElementById('event-icon').value;
      
      if (!name || !dateString) {
        showToast('Please fill out all required fields', 'error');
        return;
      }
      
      // Create date with IST timezone
      const dateParts = dateString.split('-');
      const date = new Date(
        parseInt(dateParts[0]), 
        parseInt(dateParts[1]) - 1, 
        parseInt(dateParts[2])
      );
      
      // Update the event
      const updatedEvent = {
        ...event,
        name,
        date,
        category,
        icon: icon || '🎉'
      };
      
      updateEvent(updatedEvent);
      showToast(`${name} has been updated.`, 'success');
      closeEventModal();
      
      // Refresh UI
      if (state.view === 'dashboard') {
        renderEventList();
      } else if (state.view === 'calendar') {
        renderCalendarDays();
      }
    };
    
    // Handle cancel and close
    document.querySelector('.modal .cancel-button').addEventListener('click', closeEventModal);
    document.querySelector('.modal .close-button').addEventListener('click', closeEventModal);
  }
  
  // Close event modal
  function closeEventModal() {
    const modal = document.getElementById('event-modal');
    modal.classList.remove('show');
  }
  
  // Open snooze modal
  function openSnoozeModal(event) {
    const modal = document.getElementById('snooze-modal');
    
    // Set event name
    modal.querySelector('h2').textContent = `Snooze notifications for ${event.name}?`;
    
    // Show the modal
    modal.classList.add('show');
    
    // Handle confirm
    const confirmButton = modal.querySelector('.confirm-snooze');
    confirmButton.onclick = function() {
      // Implement snooze functionality
      localStorage.setItem(`event-snoozed-${event.id}`, 'true');
      showToast(`Notifications for ${event.name} have been snoozed`, 'success');
      closeSnoozeModal();
    };
    
    // Handle cancel and close
    modal.querySelector('.cancel-button').addEventListener('click', closeSnoozeModal);
    modal.querySelector('.close-button').addEventListener('click', closeSnoozeModal);
  }
  
  // Close snooze modal
  function closeSnoozeModal() {
    const modal = document.getElementById('snooze-modal');
    modal.classList.remove('show');
  }
  
  // Open delete modal
  function openDeleteModal(event) {
    const modal = document.getElementById('delete-modal');
    
    // Set message
    modal.querySelector('p').textContent = `Are you sure you want to delete "${event.name}"? This action cannot be undone.`;
    
    // Show the modal
    modal.classList.add('show');
    
    // Handle confirm
    const confirmButton = modal.querySelector('.delete-confirm');
    confirmButton.onclick = function() {
      deleteEvent(event.id);
      showToast(`${event.name} has been deleted`, 'success');
      closeDeleteModal();
      
      // Refresh UI
      if (state.view === 'dashboard') {
        renderEventList();
      } else if (state.view === 'calendar') {
        renderCalendarDays();
      }
    };
    
    // Handle cancel and close
    modal.querySelector('.cancel-button').addEventListener('click', closeDeleteModal);
    modal.querySelector('.close-button').addEventListener('click', closeDeleteModal);
  }
  
  // Close delete modal
  function closeDeleteModal() {
    const modal = document.getElementById('delete-modal');
    modal.classList.remove('show');
  }
  
  // Set theme
  function setTheme(theme) {
    state.theme = theme;
    saveThemePreference(theme);
    
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      document.body.classList.remove('dark-theme');
      document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    showToast(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied!`, 'info');
  }
  
  // Update countdown timers
  function updateCountdowns() {
    document.querySelectorAll('.event-card').forEach(card => {
      const eventId = card.dataset.eventId;
      const event = state.events.find(e => e.id === eventId);
      
      if (!event) return;
      
      const timeRemaining = calculateTimeRemaining(event.date);
      
      if (timeRemaining.isPast) {
        if (!card.classList.contains('past')) {
          card.classList.add('past');
          card.querySelector('.countdown-timer').style.display = 'none';
          const pastNote = document.createElement('div');
          pastNote.className = 'text-sm text-muted-foreground';
          pastNote.textContent = 'Event has passed';
          card.querySelector('.countdown-display').prepend(pastNote);
        }
        return;
      }
      
      // Update countdown values
      card.querySelector('.countdown-value.days').textContent = timeRemaining.days;
      card.querySelector('.countdown-value.hours').textContent = timeRemaining.hours;
      card.querySelector('.countdown-value.minutes').textContent = timeRemaining.minutes;
      card.querySelector('.countdown-value.seconds').textContent = timeRemaining.seconds;
      
      // Today's progress
      if (isEventToday(event.date)) {
        const progressContainer = card.querySelector('.progress-container');
        if (progressContainer) {
          const progress = calculateProgress();
          card.querySelector('.progress-percent').textContent = `${Math.round(progress)}%`;
          card.querySelector('.progress-fill').style.width = `${progress}%`;
        }
      }
    });
  }
  
  // Check for notifications
  function checkNotifications() {
    // Check if notifications are enabled
    const notificationsEnabled = localStorage.getItem('notify-setting-enable-notifications') !== 'false';
    
    if (!notificationsEnabled) return;
    
    // Notification days before the event
    const notificationDays = [];
    
    if (localStorage.getItem('notify-setting-notify-7-days') !== 'false') notificationDays.push(7);
    if (localStorage.getItem('notify-setting-notify-3-days') !== 'false') notificationDays.push(3);
    if (localStorage.getItem('notify-setting-notify-1-day') !== 'false') notificationDays.push(1);
    if (localStorage.getItem('notify-setting-notify-day-of') !== 'false') notificationDays.push(0);
    
    // Check each event for notification
    state.events.forEach(event => {
      // Skip if event is snoozed
      if (localStorage.getItem(`event-snoozed-${event.id}`) === 'true') {
        return;
      }
      
      notificationDays.forEach(days => {
        // Check if notification should be displayed today
        if (shouldShowNotification(event.date, days) && !hasNotificationBeenSeen(event.id, days)) {
          // Show the notification
          const message = `${days} ${days === 1 ? 'day' : 'days'} left for ${event.name}! ${event.icon}`;
          showToast(message, 'info');
          
          // Mark this notification as seen to prevent duplicate notifications
          markNotificationAsSeen(event.id, days);
          
          // Play sound for today's events
          if (days === 0) {
            playAlarmSound();
          }
        }
      });
    });
  }
  
  // Render function
  function render() {
    // Choose which view to render
    switch (state.view) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'calendar':
        renderCalendar();
        break;
      case 'settings':
        renderSettings();
        break;
      default:
        renderDashboard();
    }
  }
  
  // Initialize app
  function initApp() {
    // Load events
    state.events = getEvents();
    
    // Load theme
    state.theme = getThemePreference();
    setTheme(state.theme);
    
    // Setup header links
    document.getElementById('logo').addEventListener('click', (e) => {
      e.preventDefault();
      state.view = 'dashboard';
      render();
    });
    
    document.getElementById('theme-toggle').addEventListener('click', () => {
      setTheme(state.theme === 'light' ? 'dark' : 'light');
    });
    
    document.getElementById('settings-button').addEventListener('click', () => {
      state.view = 'settings';
      render();
    });
    
    // Initial render
    render();
    
    // Check notifications
    checkNotifications();
    
    // Start countdown timers
    setInterval(updateCountdowns, 1000);
    
    // Check notifications every hour
    setInterval(checkNotifications, 60 * 60 * 1000);
  }
  
  // Start the app when DOM is loaded
  document.addEventListener('DOMContentLoaded', initApp);
  