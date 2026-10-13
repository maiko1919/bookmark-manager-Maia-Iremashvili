import TagList from './TagList'

function BookmarkCard({ bookmark, onEdit, onDelete, onPin, onArchive, onFavorite }) {
  const { id, title, url, description, tags, isPinned, isArchived, isFavorite } = bookmark

  const domain = (() => {
    try { return new URL(url).hostname }
    catch { return url }
  })()

  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      boxShadow: 'var(--shadow)',
      position: 'relative'
    }}>

      {/* Favorite და Pin ღილაკები */}
      <div style={{
        position: 'absolute', top: '8px', right: '8px',
        display: 'flex', alignItems: 'center', gap: '4px'
      }}>
        {isPinned && <span style={{ fontSize: '14px' }}>📌</span>}
        <button
          onClick={() => onFavorite(id)}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '18px',
            padding: '0', lineHeight: 1,
            color: isFavorite ? '#f59e0b' : 'var(--text-muted)'
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      {/* Title და favicon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingRight: '52px' }}>
        <img
          src={favicon}
          alt=""
          width="20"
          height="20"
          style={{ borderRadius: '4px', flexShrink: 0 }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div style={{ minWidth: 0 }}>
          <h3 style={{
            fontSize: '14px', fontWeight: '600',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>
            {title}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>
            {domain}
          </p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p style={{
          fontSize: '13px', color: 'var(--text-secondary)',
          lineHeight: '1.5', display: '-webkit-box',
          WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {description}
        </p>
      )}

      {/* Tags */}
      <TagList tags={tags} />

      {/* Archived badge */}
      {isArchived && (
        <span style={{
          background: '#fef3c7', color: '#92400e',
          padding: '2px 8px', borderRadius: '20px',
          fontSize: '11px', fontWeight: '500', alignSelf: 'flex-start'
        }}>
          Archived
        </span>
      )}

      {/* Action buttons */}
      <div style={{
        display: 'flex', gap: '6px',
        paddingTop: '8px', borderTop: '1px solid var(--border)'
      }}>
        <button
          onClick={() => onPin(id)}
          style={{
            padding: '4px 10px', fontSize: '12px',
            border: '1px solid var(--border)', borderRadius: '6px',
            background: isPinned ? 'var(--tag-bg)' : 'transparent',
            color: isPinned ? 'var(--accent)' : 'var(--text-secondary)'
          }}
        >
          {isPinned ? '📌 Unpin' : '📌 Pin'}
        </button>
        <button
          onClick={() => onEdit(bookmark)}
          style={{
            padding: '4px 10px', fontSize: '12px',
            border: '1px solid var(--border)', borderRadius: '6px',
            background: 'transparent', color: 'var(--text-secondary)'
          }}
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onArchive(id)}
          style={{
            padding: '4px 10px', fontSize: '12px',
            border: '1px solid var(--border)', borderRadius: '6px',
            background: 'transparent', color: 'var(--text-secondary)'
          }}
        >
          {isArchived ? '📤 Restore' : '🗄️ Archive'}
        </button>
        <button
          onClick={() => onDelete(id)}
          style={{
            padding: '4px 10px', fontSize: '12px',
            border: '1px solid #fca5a5', borderRadius: '6px',
            background: 'transparent', color: '#ef4444', marginLeft: 'auto'
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default BookmarkCard