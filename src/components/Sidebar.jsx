function Sidebar({ view, onViewChange, tags, selectedTags, onSelectTag, bookmarks }) {
  const activeCount = bookmarks.filter(b => !b.isArchived).length
  const archivedCount = bookmarks.filter(b => b.isArchived).length
  const favoritesCount = bookmarks.filter(b => b.isFavorite && !b.isArchived).length

  const getTagCount = (tag) => bookmarks.filter(b => !b.isArchived && b.tags.includes(tag)).length

  const navButtonStyle = (isActive) => ({
    width: '100%', textAlign: 'left', padding: '8px 12px',
    border: 'none', borderRadius: '8px', fontSize: '14px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: isActive ? 'var(--sidebar-active)' : 'transparent',
    color: isActive ? 'var(--sidebar-active-text)' : 'var(--text-secondary)',
    fontWeight: isActive ? '600' : '400',
    marginBottom: '2px', cursor: 'pointer'
  })

  return (
    <aside className="sidebar" style={{
      width: '240px', minHeight: '100vh',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0
    }}>
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🔖</span>
          <span style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>
            Bookmark Manager
          </span>
        </div>
      </div>

      <nav style={{ padding: '12px 8px' }}>
        <button onClick={() => onViewChange('all')} style={navButtonStyle(view === 'all')}>
          <span>🏠 Home</span>
          <span style={{ fontSize: '12px' }}>{activeCount}</span>
        </button>
        <button onClick={() => onViewChange('favorites')} style={navButtonStyle(view === 'favorites')}>
          <span>⭐ Favorites</span>
          <span style={{ fontSize: '12px' }}>{favoritesCount}</span>
        </button>
        <button onClick={() => onViewChange('archived')} style={navButtonStyle(view === 'archived')}>
          <span>🗄️ Archived</span>
          <span style={{ fontSize: '12px' }}>{archivedCount}</span>
        </button>
      </nav>

      <div className="sidebar-tags" style={{ padding: '0 8px', flex: 1, overflowY: 'auto' }}>
        <p style={{
          fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)',
          padding: '8px 12px', textTransform: 'uppercase', letterSpacing: '0.5px'
        }}>
          TAGS
        </p>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            style={{
              width: '100%', textAlign: 'left', padding: '6px 12px',
              border: 'none', borderRadius: '6px', fontSize: '13px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: selectedTags.includes(tag) ? 'var(--sidebar-active)' : 'transparent',
              color: selectedTags.includes(tag) ? 'var(--sidebar-active-text)' : 'var(--text-secondary)',
              marginBottom: '1px', cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                readOnly
                checked={selectedTags.includes(tag)}
                style={{ width: '14px', height: '14px', accentColor: 'var(--accent)' }}
              />
              <span>{tag}</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{getTagCount(tag)}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar