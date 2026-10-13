import { useState, useEffect } from 'react'

function Header({ theme, onToggleTheme, onAddClick, searchTerm, onSearch }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <header style={{
      height: '64px',
      background: 'var(--bg-header)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      gap: '16px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-main)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '8px 12px',
          maxWidth: '400px'
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '14px',
              color: 'var(--text-primary)',
              width: '100%'
            }}
          />
        </div>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.4
      }}>
        <span style={{ fontWeight: '600', fontSize: '14px' }}>{formattedTime}</span>
        <span>{formattedDate}</span>
      </div>

      <button
        onClick={onToggleTheme}
        style={{
          background: 'var(--bg-main)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '16px',
          color: 'var(--text-secondary)'
        }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <button
        onClick={onAddClick}
        style={{
          background: 'var(--accent)',
          color: 'var(--accent-text)',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        + Add Bookmark
      </button>
    </header>
  )
}

export default Header