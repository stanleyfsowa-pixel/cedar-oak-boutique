// ===== CALENDAR FUNCTIONALITY =====

let calendar;
let eventsData = [];

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('calendar')) {
        initializeCalendar();
    }
});

async function initializeCalendar() {
    try {
        // Load events data
        const response = await fetch('data/events.json');
        const data = await response.json();
        eventsData = data.events;
        
        // Initialize FullCalendar
        const calendarEl = document.getElementById('calendar');
        
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listMonth'
            },
            height: 'auto',
            events: formatEventsForCalendar(eventsData),
            eventClick: function(info) {
                info.jsEvent.preventDefault();
                
                // Find the full event data
                const eventData = eventsData.find(event => event.id === info.event.id);
                if (eventData) {
                    openModal(eventData);
                }
            },
            eventMouseEnter: function(info) {
                // Add hover effect
                info.el.style.transform = 'scale(1.05)';
                info.el.style.zIndex = '999';
                info.el.style.transition = 'transform 0.2s ease';
            },
            eventMouseLeave: function(info) {
                // Remove hover effect
                info.el.style.transform = 'scale(1)';
                info.el.style.zIndex = 'auto';
            },
            dayCellClassNames: function(info) {
                // Add custom classes to specific days
                const today = new Date();
                if (info.date.toDateString() === today.toDateString()) {
                    return ['today-highlight'];
                }
                return [];
            },
            eventClassNames: function(info) {
                // Add category-based classes to events
                const eventData = eventsData.find(event => event.id === info.event.id);
                if (eventData && eventData.category) {
                    return [`event-${eventData.category}`];
                }
                return [];
            },
            // Styling options
            themeSystem: 'standard',
            eventColor: '#8B5A2B', // Primary color
            eventTextColor: '#ffffff',
            // Responsive options
            windowResize: function() {
                calendar.updateSize();
            }
        });
        
        calendar.render();
        
        // Add custom styles for different event types
        addCustomEventStyles();
        
    } catch (error) {
        console.error('Error initializing calendar:', error);
        displayCalendarError();
    }
}

function formatEventsForCalendar(events) {
    return events.map(event => {
        const startDateTime = event.time ? `${event.date}T${event.time}` : event.date;
        const endDateTime = event.endTime ? `${event.date}T${event.endTime}` : null;
        
        return {
            id: event.id,
            title: event.title,
            start: startDateTime,
            end: endDateTime,
            allDay: !event.time, // If no time specified, treat as all-day event
            description: event.description,
            extendedProps: {
                location: event.location,
                category: event.category,
                featured: event.featured
            }
        };
    });
}

function addCustomEventStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Calendar custom styles */
        .fc-theme-standard .fc-event {
            border-radius: 4px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
        }
        
        .fc-theme-standard .fc-event:hover {
            box-shadow: 0 4px 12px rgba(139, 90, 43, 0.4);
        }
        
        /* Event category colors */
        .event-fashion-show {
            background-color: #8B5A2B !important;
            border-color: #8B5A2B !important;
        }
        
        .event-shopping-event {
            background-color: #D4A574 !important;
            border-color: #D4A574 !important;
            color: #2C1810 !important;
        }
        
        .event-workshop {
            background-color: #A0522D !important;
            border-color: #A0522D !important;
        }
        
        .event-trunk-show {
            background-color: #CD853F !important;
            border-color: #CD853F !important;
        }
        
        /* Today highlight */
        .fc-day.today-highlight {
            background-color: rgba(139, 90, 43, 0.1) !important;
        }
        
        /* Calendar header styling */
        .fc-header-toolbar {
            margin-bottom: 1.5rem;
        }
        
        .fc-button-primary {
            background-color: #8B5A2B;
            border-color: #8B5A2B;
        }
        
        .fc-button-primary:hover {
            background-color: #A0522D;
            border-color: #A0522D;
        }
        
        .fc-button-primary:disabled {
            background-color: #ccc;
            border-color: #ccc;
        }
        
        .fc-today-button {
            background-color: #D4A574;
            border-color: #D4A574;
            color: #2C1810;
        }
        
        /* Calendar title */
        .fc-toolbar-title {
            color: #2C1810;
            font-family: 'Playfair Display', serif;
            font-weight: 600;
        }
        
        /* Day headers */
        .fc-col-header-cell {
            background-color: #F5E6D3;
            color: #2C1810;
            font-weight: 600;
        }
        
        /* List view styling */
        .fc-list-event-title {
            font-weight: 500;
        }
        
        .fc-list-event-time {
            color: #8B5A2B;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .fc-header-toolbar {
                flex-direction: column;
                gap: 1rem;
            }
            
            .fc-toolbar-chunk {
                display: flex;
                justify-content: center;
            }
            
            .fc-button-group {
                margin: 0 !important;
            }
        }
    `;
    document.head.appendChild(style);
}

function displayCalendarError() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        calendarEl.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #777;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #dc3545;"></i>
                <h3>Unable to load calendar</h3>
                <p>Please try refreshing the page or contact us if the problem persists.</p>
                <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">
                    Refresh Page
                </button>
            </div>
        `;
    }
}

// Calendar management functions (for future admin interface)
function addEvent(eventData) {
    eventsData.push(eventData);
    if (calendar) {
        calendar.addEvent(formatEventsForCalendar([eventData])[0]);
    }
}

function updateEvent(eventId, updatedData) {
    const index = eventsData.findIndex(event => event.id === eventId);
    if (index !== -1) {
        eventsData[index] = { ...eventsData[index], ...updatedData };
        if (calendar) {
            const calendarEvent = calendar.getEventById(eventId);
            if (calendarEvent) {
                calendarEvent.remove();
                calendar.addEvent(formatEventsForCalendar([eventsData[index]])[0]);
            }
        }
    }
}

function deleteEvent(eventId) {
    eventsData = eventsData.filter(event => event.id !== eventId);
    if (calendar) {
        const calendarEvent = calendar.getEventById(eventId);
        if (calendarEvent) {
            calendarEvent.remove();
        }
    }
}

// Export calendar data as JSON (for backup/management)
function exportEvents() {
    const dataStr = JSON.stringify({ events: eventsData }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'events-backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Import calendar data from JSON file
function importEvents(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.events && Array.isArray(data.events)) {
                eventsData = data.events;
                if (calendar) {
                    calendar.removeAllEvents();
                    calendar.addEventSource(formatEventsForCalendar(eventsData));
                }
                showNotification('Events imported successfully!', 'success');
            } else {
                throw new Error('Invalid file format');
            }
        } catch (error) {
            showNotification('Error importing events. Please check the file format.', 'error');
        }
    };
    reader.readAsText(file);
}

// Filter events by category
function filterEventsByCategory(category) {
    if (calendar) {
        const events = calendar.getEvents();
        events.forEach(event => {
            if (category === 'all' || event.extendedProps.category === category) {
                event.setProp('display', 'auto');
            } else {
                event.setProp('display', 'none');
            }
        });
    }
}

// Search events by title or description
function searchEvents(searchTerm) {
    if (calendar) {
        const events = calendar.getEvents();
        const term = searchTerm.toLowerCase();
        
        events.forEach(event => {
            const title = event.title.toLowerCase();
            const description = event.extendedProps.description?.toLowerCase() || '';
            
            if (term === '' || title.includes(term) || description.includes(term)) {
                event.setProp('display', 'auto');
            } else {
                event.setProp('display', 'none');
            }
        });
    }
}

// Navigate to specific date
function goToDate(dateString) {
    if (calendar) {
        calendar.gotoDate(dateString);
    }
}

// Get events for a specific date range
function getEventsInRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return eventsData.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= start && eventDate <= end;
    });
}

// Generate iCal file for all events
function generateICalFile() {
    let icalContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Cedar & Oak Boutique//Events//EN',
        'CALSCALE:GREGORIAN'
    ];
    
    eventsData.forEach(event => {
        const startDate = new Date(`${event.date}T${event.time || '00:00'}`);
        const endDate = event.endTime ? new Date(`${event.date}T${event.endTime}`) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
        
        const formatICalDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        icalContent.push(
            'BEGIN:VEVENT',
            `UID:${event.id}@cedarandoakboutique.com`,
            `DTSTAMP:${formatICalDate(new Date())}`,
            `DTSTART:${formatICalDate(startDate)}`,
            `DTEND:${formatICalDate(endDate)}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description}`,
            `LOCATION:${event.location}`,
            'END:VEVENT'
        );
    });
    
    icalContent.push('END:VCALENDAR');
    
    const icalBlob = new Blob([icalContent.join('\r\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(icalBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cedar-oak-events.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Expose functions for potential admin interface
window.CalendarManager = {
    addEvent,
    updateEvent,
    deleteEvent,
    exportEvents,
    importEvents,
    filterEventsByCategory,
    searchEvents,
    goToDate,
    getEventsInRange,
    generateICalFile
};