import React, { useState, useEffect } from 'react';
import { Web3Service } from '../services/web3Service.js';
import Link from '../components/Link.jsx';
import { MapPin, Users, Calendar, ArrowUpRight } from 'lucide-react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(false);
      try {
        const data = await Web3Service.getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => {
    if (filter === 'All') return true;
    return e.category.toLowerCase() === filter.toLowerCase();
  });

  const upcomingEvents = filteredEvents.filter(e => !e.isCancelled && e.eventTimestamp > Date.now());
  const pastEvents = filteredEvents.filter(e => e.isCancelled || e.eventTimestamp <= Date.now());

  const formatEventDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div className="subpage-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>EVENTS</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Hackathons · Builder Nights · Workshops · IRL Sessions across India.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="filter-pills" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {['All', 'Hackathon', 'Builder Night', 'Workshop', 'Meetup'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-pill ${filter === cat ? 'active' : ''}`}
            style={{
              background: filter === cat ? 'rgba(182, 255, 64, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: filter === cat ? '1px solid var(--accent-lime)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: filter === cat ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.7)',
              padding: '8px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-body)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="events-grid-section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* UPCOMING EVENTS */}
        <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', color: 'var(--accent-lime)' }}>
          Upcoming Sessions
        </h2>
        {upcomingEvents.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '50px' }}>No upcoming sessions listed in this category right now.</p>
        ) : (
          <div className="upcoming-events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px', marginBottom: '60px' }}>
            {upcomingEvents.map(e => (
              <div
                key={e.id}
                className="event-card upcoming"
                style={{
                  background: 'rgba(18, 18, 22, 0.8)',
                  border: '1px solid rgba(182, 255, 64, 0.25)',
                  boxShadow: '0 0 20px rgba(182, 255, 64, 0.08)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', background: 'rgba(182, 255, 64, 0.1)', color: 'var(--accent-lime)', border: '1px solid rgba(182, 255, 64, 0.2)' }}>
                      {e.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                      Host: {e.hostName}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', lineHeight: 1.4 }}>{e.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '20px' }}>{e.description}</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} style={{ color: 'var(--accent-lime)' }} />
                      <span>{formatEventDate(e.eventTimestamp)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={14} />
                      <span>{e.location}</span>
                    </div>
                  </div>
                  <a
                    href={e.rsvpLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: 'var(--accent-lime)',
                      color: '#000',
                      padding: '12px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      fontSize: '0.8rem',
                      letterSpacing: '1px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(182, 255, 64, 0.4)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    RSVP on Luma <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAST EVENTS */}
        <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', color: 'rgba(255,255,255,0.6)' }}>
          Past Gatherings & Stats
        </h2>
        {pastEvents.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>No past events listed in this category.</p>
        ) : (
          <div className="past-events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
            {pastEvents.map(e => (
              <div
                key={e.id}
                className="event-card past"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                  opacity: 0.85
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '5px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>
                      {e.category}
                    </span>
                    {e.rsvpCount > 0 && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={12} /> {e.rsvpCount} builders
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: 'rgba(255,255,255,0.9)' }}>{e.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: '15px' }}>{e.description}</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>Date: {formatEventDate(e.eventTimestamp)}</div>
                  <div>Location: {e.location}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Partner With Us CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '80px', borderTop: '1px solid rgba(182, 255, 64, 0.1)', paddingTop: '50px' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>Want to host a session?</h3>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: '400px' }}>
          We co-host events, workshops, and build sessions with Web3 ecosystems and developer groups.
        </p>
        <Link
          to="/apply"
          style={{
            background: 'transparent',
            border: '1px solid rgba(182,255,64,0.4)',
            color: 'var(--accent-lime)',
            padding: '10px 24px',
            borderRadius: '20px',
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(182, 255, 64, 0.05)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          Co-Organize With Us
        </Link>
      </div>
    </div>
  );
};

export default EventsPage;
