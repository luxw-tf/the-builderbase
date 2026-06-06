import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext.jsx';
import { Web3Service } from '../services/web3Service.js';
import { Calendar as CalendarIcon, MapPin, Users, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';

const GRADIENTS = [
  { name: 'Neon Indigo', value: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)' },
  { name: 'Electric Violet', value: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' },
  { name: 'Cyber Amber', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  { name: 'Lime Void', value: 'linear-gradient(135deg, #b6ff40 0%, #10b981 100%)' },
  { name: 'Coral Blaze', value: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)' }
];

const CalendarHub = ({ addLog, member }) => {
  const { account } = useWallet();
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // All, Hackathon, Workshop, Meetup
  const [viewMode, setViewMode] = useState('feed'); // feed, grid
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 6)); // Locked to June 2026 for initial seed visibility
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states for new event
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState('Hackathon');
  const [formDate, setFormDate] = useState('2026-06-15');
  const [formTime, setFormTime] = useState('18:00');
  const [formLocation, setFormLocation] = useState('');
  const [formHostName, setFormHostName] = useState('');
  const [formBannerGradient, setFormBannerGradient] = useState(GRADIENTS[0].value);
  const [formRsvpLink, setFormRsvpLink] = useState('');

  // Prefill Host Name from Member profile when available
  useEffect(() => {
    if (member) {
      try {
        const data = JSON.parse(member.profileIpfsHash || '{}');
        if (data.username) {
          setFormHostName(`@${data.username.replace('@', '')}`);
        } else if (data.displayName) {
          setFormHostName(data.displayName);
        }
      } catch (e) {
        console.error("Error parsing profile for host name prefill", e);
      }
    }
  }, [member, isModalOpen]);

  useEffect(() => {
    fetchEventsAndMembers();
  }, []);

  const fetchEventsAndMembers = async () => {
    setLoading(true);
    try {
      const [eventsData, membersData] = await Promise.all([
        Web3Service.getEvents(),
        Web3Service.getMembers()
      ]);
      setEvents(eventsData);
      setMembers(membersData || {});
      
      if (eventsData.length > 0 && !selectedEvent) {
        // Auto select first non-cancelled event, or just first event
        const active = eventsData.find(e => !e.isCancelled) || eventsData[0];
        setSelectedEvent(active);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!account) return;

    setSubmitting(true);
    const eventTimestamp = new Date(`${formDate}T${formTime}:00Z`).getTime();
    addLog(`Creating event on Base Sepolia: "${formTitle}"...`, 'info');
    
    try {
      const res = await Web3Service.createEvent(
        formTitle,
        formDesc,
        formCategory,
        eventTimestamp,
        formLocation,
        formHostName,
        formBannerGradient,
        formRsvpLink,
        account
      );
      
      addLog(`Event listed onchain successfully! Tx: ${res.txHash.substring(0, 16)}...`, 'success');
      
      // Reset form
      setFormTitle('');
      setFormDesc('');
      setFormCategory('Hackathon');
      setFormLocation('');
      setFormRsvpLink('');
      setFormBannerGradient(GRADIENTS[0].value);
      setIsModalOpen(false);
      
      // Reload events
      await fetchEventsAndMembers();
      
      // Select the newly created event
      if (res.event) {
        setSelectedEvent(res.event);
      }
    } catch (err) {
      addLog(`Failed to create event: ${err.message}`, 'warning');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEvent = async (eventId) => {
    if (!account) return;
    addLog(`Initiating transaction to cancel Event #${eventId}...`, 'info');
    try {
      const res = await Web3Service.cancelEvent(eventId, account);
      addLog(`Event cancelled onchain. Tx: ${res.txHash.substring(0, 16)}...`, 'success');
      
      await fetchEventsAndMembers();
      
      const storeData = await Web3Service.getEvents();
      const updatedEvent = storeData.find(ev => ev.id === eventId);
      setSelectedEvent(updatedEvent);
    } catch (err) {
      addLog(`Cancellation failed: ${err.message}`, 'warning');
    }
  };

  // Calendar rendering helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate calendar cells for large grid
  const calendarCells = [];

  // Previous month padding cells
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    calendarCells.push({ day, isCurrentMonth: false, date: new Date(year, month - 1, day) });
  }

  // Current month cells
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
  }

  // Next month padding cells to make grid multiple of 7
  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({ day: i, isCurrentMonth: false, date: new Date(year, month + 1, i) });
  }

  // Filter events
  const filteredEvents = events.filter(e => {
    if (filter === 'All') return true;
    return e.category.toLowerCase() === filter.toLowerCase();
  });

  // Check if a calendar cell has events
  const getEventsForDate = (cellDate) => {
    return events.filter(e => {
      const eventDate = new Date(e.eventTimestamp);
      return eventDate.getDate() === cellDate.getDate() &&
             eventDate.getMonth() === cellDate.getMonth() &&
             eventDate.getFullYear() === cellDate.getFullYear();
    });
  };

  const formatEventDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) + " UTC";
  };

  const getEventDateParts = (timestamp) => {
    const d = new Date(timestamp);
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const day = d.getDate();
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return { month, day, weekday, time };
  };

  const getGroupHeaderDate = (timestamp) => {
    const d = new Date(timestamp);
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const day = d.getDate();
    const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
    return `${month} ${day} ${weekday}`; // e.g. "Jun 13 Saturday"
  };

  // Group events by header date for timeline layout
  const groupEventsByDate = (eventsList) => {
    const sorted = [...eventsList].sort((a, b) => a.eventTimestamp - b.eventTimestamp);
    const groups = [];
    sorted.forEach(ev => {
      const groupDate = getGroupHeaderDate(ev.eventTimestamp);
      let group = groups.find(g => g.date === groupDate);
      if (!group) {
        group = { date: groupDate, events: [] };
        groups.push(group);
      }
      group.events.push(ev);
    });
    return groups;
  };

  const renderSelectedEventDetails = () => {
    if (!selectedEvent) {
      return (
        <div className="glass-panel" style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '40px' }}>
          Select an event from the feed to view full details.
        </div>
      );
    }
    
    const dateParts = getEventDateParts(selectedEvent.eventTimestamp);
    
    return (
      <div className="glass-panel" style={{ borderLeft: '4px solid var(--accent-lime)', display: 'flex', flexDirection: 'column', gap: '20px', padding: 0, overflow: 'hidden' }}>
        {/* Floating rounded Cover Banner (Apple / Luma styled) */}
        <div style={{ 
          height: '140px', 
          background: selectedEvent.bannerGradient, 
          margin: '20px 20px 0 20px', 
          borderRadius: '12px',
          padding: '20px', 
          display: 'flex', 
          alignItems: 'flex-end', 
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(8,8,10,0.85) 0%, transparent 100%)' }} />
          <span className="luma-event-cat" style={{ position: 'relative', zIndex: 2, background: '#08080a', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--accent-lime)', fontSize: '0.65rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>{selectedEvent.category}</span>
          {selectedEvent.isCancelled && (
            <span className="luma-event-cat" style={{ position: 'relative', zIndex: 2, background: '#ff6347', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginLeft: '10px', fontSize: '0.65rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>Cancelled</span>
          )}
        </div>
        
        <div style={{ padding: '0 25px 25px 25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-light)', margin: 0 }}>{selectedEvent.title}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarIcon size={14} className="text-lime" />
              <span style={{ color: 'var(--text-light)' }}>{dateParts.weekday}, {dateParts.month} {dateParts.day}, {year} • {dateParts.time} UTC</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} />
              <span style={{ color: 'var(--text-light)' }}>{selectedEvent.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="luma-host-avatar" style={{ width: '18px', height: '18px', fontSize: '0.55rem' }}>
                {selectedEvent.hostName ? selectedEvent.hostName.replace('@', '').substring(0, 2).toUpperCase() : 'B'}
              </div>
              <span>Hosted by <strong style={{ color: 'var(--text-light)' }}>{selectedEvent.hostName || '@builder'}</strong></span>
            </div>
          </div>
          
          <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, margin: '10px 0', whiteSpace: 'pre-wrap' }}>
            {selectedEvent.description}
          </p>

          {/* Redirect RSVP Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '15px', marginTop: '10px' }}>
            {selectedEvent.isCancelled ? (
              <span style={{ color: '#ff6347', fontWeight: 700, fontSize: '0.9rem' }}>This event has been cancelled</span>
            ) : (
              <>
                <span className="rsvp-badge" style={{ fontSize: '0.85rem' }}>
                  Redirects to host platform
                </span>
                <a 
                  href={selectedEvent.rsvpLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '8px 24px', fontSize: '0.85rem' }}
                >
                  Register / Join
                </a>
              </>
            )}
          </div>

          <div style={{ marginTop: '15px', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-dim)', wordBreak: 'break-all', display: 'flex', flexDirection: 'column', gap: '4px' }}>
             <div>Creator wallet: {selectedEvent.creator}</div>
             <div>IPFS Metadata Hash: <span style={{ color: 'var(--accent-lime)' }}>{selectedEvent.ipfsHash}</span></div>
          </div>

          {/* Cancel Event button for creator */}
          {account && selectedEvent.creator.toLowerCase() === account.toLowerCase() && !selectedEvent.isCancelled && (
            <button 
              className="btn-exit-portal" 
              onClick={() => handleCancelEvent(selectedEvent.id)}
              style={{ width: 'max-content', marginTop: '10px', padding: '6px 14px', fontSize: '0.75rem', border: '1px solid rgba(255, 99, 71, 0.2)' }}
            >
              Cancel Event
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderCompactCalendar = () => {
    // Generate calendar cell items
    const cellItems = [];
    const yr = currentDate.getFullYear();
    const mt = currentDate.getMonth();

    const firstDayIdx = new Date(yr, mt, 1).getDay();
    const daysInMt = new Date(yr, mt + 1, 0).getDate();
    const daysInPrevMt = new Date(yr, mt, 0).getDate();

    // Previous month padding cells
    for (let i = firstDayIdx - 1; i >= 0; i--) {
      const day = daysInPrevMt - i;
      cellItems.push({ day, isCurrentMonth: false, date: new Date(yr, mt - 1, day) });
    }

    // Current month cells
    for (let i = 1; i <= daysInMt; i++) {
      cellItems.push({ day: i, isCurrentMonth: true, date: new Date(yr, mt, i) });
    }

    // Next month padding cells
    const remaining = 42 - cellItems.length;
    for (let i = 1; i <= remaining; i++) {
      cellItems.push({ day: i, isCurrentMonth: false, date: new Date(yr, mt + 1, i) });
    }

    return (
      <div className="luma-compact-calendar">
        <div className="luma-compact-calendar-header">
          <h4>{monthNames[mt]} {yr}</h4>
          <div className="month-nav">
            <button className="month-nav-btn" onClick={handlePrevMonth} style={{ width: '24px', height: '24px' }} type="button"><ChevronLeft size={12} /></button>
            <button className="month-nav-btn" onClick={handleNextMonth} style={{ width: '24px', height: '24px' }} type="button"><ChevronRight size={12} /></button>
          </div>
        </div>

        <div className="luma-compact-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
            <div key={idx} className="luma-compact-day-hdr">{d}</div>
          ))}
          {cellItems.map((cell, idx) => {
            const dateEvents = getEventsForDate(cell.date);
            const isToday = cell.date.getDate() === 6 && cell.date.getMonth() === 5 && cell.date.getFullYear() === 2026;
            const hasEvent = dateEvents.length > 0;
            const isSelected = selectedEvent && getEventsForDate(cell.date).some(de => de.id === selectedEvent.id);

            return (
              <div 
                key={idx}
                className={`luma-compact-day ${!cell.isCurrentMonth ? 'different-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'active' : ''} ${hasEvent ? 'has-event' : ''}`}
                onClick={() => {
                  if (dateEvents.length > 0) {
                    setSelectedEvent(dateEvents[0]);
                  }
                }}
              >
                {cell.day}
              </div>
            );
          })}
        </div>

        {/* Filter Pill capsule */}
        <div className="luma-filter-capsule">
          {['All', 'Hackathon', 'Workshop', 'Meetup'].map(cat => (
            <button 
              key={cat}
              type="button"
              className={`luma-filter-capsule-btn ${filter === cat ? 'active' : ''}`} 
              onClick={() => setFilter(cat)}
            >
              {cat === 'All' ? 'All' : cat + 's'}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header Actions / Toggles */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '15px' }}>
        <div className="luma-dual-toggle" style={{ margin: 0 }}>
          <button 
            className={`luma-toggle-btn ${viewMode === 'feed' ? 'active' : ''}`}
            onClick={() => setViewMode('feed')}
          >
            Feed View
          </button>
          <button 
            className={`luma-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Calendar Grid
          </button>
        </div>
        
        <button className="btn-create-event" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          List Event
        </button>
      </div>

      {viewMode === 'feed' ? (
        <div className="calendar-view-split">
          {/* Left Column - Scrollable Luma Timeline List */}
          <div className="luma-feed-container">
            {loading ? (
              <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '40px' }}>Syncing with Base Sepolia RPC...</div>
            ) : filteredEvents.length === 0 ? (
              <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '40px', background: 'var(--void-bg-panel)', borderRadius: '16px', border: '1px solid var(--void-border-glass)' }}>No events listed for this category.</div>
            ) : (
              groupEventsByDate(filteredEvents).map((group, groupIdx) => (
                <div key={groupIdx} className="luma-timeline-group">
                  {/* Timeline dot */}
                  <div className="luma-timeline-dot"></div>
                  
                  {/* Group header date: e.g. "Jun 13 Saturday" */}
                  <div className="luma-group-date">{group.date}</div>
                  
                  {/* Render events on this date */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {group.events.map(ev => {
                      const isSelected = selectedEvent && selectedEvent.id === ev.id;
                      const dateParts = getEventDateParts(ev.eventTimestamp);
                      
                      return (
                        <div 
                          key={ev.id} 
                          className={`luma-timeline-card ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedEvent(ev)}
                          style={{ opacity: ev.isCancelled ? 0.6 : 1 }}
                        >
                          {/* Left Details */}
                          <div className="luma-card-left">
                            <span className="luma-timeline-time">{dateParts.time} UTC</span>
                            <h4 className="luma-timeline-title">{ev.title}</h4>
                            
                            <div className="luma-timeline-hosts">
                              <div className="luma-host-avatar" style={{ width: '16px', height: '16px', fontSize: '0.5rem' }}>
                                {ev.hostName ? ev.hostName.replace('@', '').substring(0, 2).toUpperCase() : 'B'}
                              </div>
                              <span>By {ev.hostName || '@builder'}</span>
                            </div>

                            <div className="luma-timeline-row">
                              <MapPin size={13} style={{ color: 'var(--text-dim)' }} />
                              <span style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.location}</span>
                            </div>
                            
                            <div className="luma-timeline-actions">
                              {ev.isCancelled ? (
                                <span style={{ color: '#ff6347', fontSize: '0.75rem', fontWeight: 700 }}>Cancelled</span>
                              ) : (
                                <a 
                                  href={ev.rsvpLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="luma-timeline-btn"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Register
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Right Cover Thumbnail */}
                          <div className="luma-card-right">
                            <div className="luma-thumbnail" style={{ background: ev.bannerGradient }}>
                              <span className="luma-thumbnail-cat">{ev.category}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column - Calendar widgets & Details */}
          <div className="luma-right-column">
            {renderCompactCalendar()}
            {renderSelectedEventDetails()}
          </div>
        </div>
      ) : (
        <div className="calendar-view-split">
          {/* Left Column - Large Monthly Grid */}
          <div className="glass-panel calendar-grid-container">
            <h3>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalendarIcon size={20} className="text-lime" />
                {monthNames[month]} {year}
              </span>
              <div className="month-nav">
                <button className="month-nav-btn" onClick={handlePrevMonth} type="button"><ChevronLeft size={16} /></button>
                <button className="month-nav-btn" onClick={handleNextMonth} type="button"><ChevronRight size={16} /></button>
              </div>
            </h3>

            {/* Category Filters for Large Grid */}
            <div className="filter-pills" style={{ marginBottom: '20px' }}>
              {['All', 'Hackathon', 'Workshop', 'Meetup'].map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Header */}
            <div className="calendar-grid-header">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
            </div>

            {/* Grid Body */}
            <div className="calendar-grid-body">
              {calendarCells.map((cell, idx) => {
                const dateEvents = getEventsForDate(cell.date);
                const isToday = cell.date.getDate() === 6 && cell.date.getMonth() === 5 && cell.date.getFullYear() === 2026;
                
                return (
                  <div 
                    key={idx}
                    className={`calendar-cell ${!cell.isCurrentMonth ? 'different-month' : ''} ${isToday ? 'today' : ''} ${selectedEvent && dateEvents.some(de => de.id === selectedEvent.id) ? 'selected' : ''}`}
                    onClick={() => {
                      if (dateEvents.length > 0) {
                        setSelectedEvent(dateEvents[0]);
                      }
                    }}
                  >
                    <span className="cell-number">{cell.day}</span>
                    <div className="cell-events">
                      {dateEvents.map(e => (
                        <span 
                          key={e.id} 
                          className={`cell-event-indicator ${e.category.toLowerCase()}`}
                          title={e.title}
                          style={{ background: e.isCancelled ? '#ff6347' : undefined }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Details pane */}
          <div className="luma-right-column">
            {renderSelectedEventDetails()}
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>Register Onchain Event</h3>
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label>Event Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Base Sepolia Buildathon Wrapup" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Explain event details, schedules, and link highlights..." 
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    className="form-control"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Meetup">Meetup</option>
                  </select>
                </div>
                
                <div className="form-row" style={{ gap: '10px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Date</label>
                    <input 
                      type="date" 
                      className="form-control"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Time (UTC)</label>
                    <input 
                      type="time" 
                      className="form-control"
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Host Name / Project</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. @builderbase" 
                    value={formHostName}
                    onChange={(e) => setFormHostName(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Location Platform / Venue</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Zoom / Discord Stage / NYC" 
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>RSVP / Registration Link</label>
                <input 
                  type="url" 
                  className="form-control" 
                  placeholder="https://lu.ma/your-event-link" 
                  value={formRsvpLink}
                  onChange={(e) => setFormRsvpLink(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Cover Banner Preset</label>
                <div style={{ display: 'flex', gap: '12px', marginTop: '5px', flexWrap: 'wrap' }}>
                  {GRADIENTS.map(grad => (
                    <button
                      key={grad.name}
                      type="button"
                      style={{
                        background: grad.value,
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        border: formBannerGradient === grad.value ? '2px solid var(--accent-lime)' : '2px solid transparent',
                        cursor: 'pointer',
                        boxShadow: formBannerGradient === grad.value ? 'var(--glow-lime)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setFormBannerGradient(grad.value)}
                      title={grad.name}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Broadcasting transaction...' : 'Approve & List Onchain'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarHub;
