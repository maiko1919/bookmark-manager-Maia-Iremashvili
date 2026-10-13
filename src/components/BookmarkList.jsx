import BookmarkCard from './BookmarkCard'

function BookmarkList({ bookmarks, onEdit, onDelete, onPin, onArchive, onFavorite, view, searchTerm }) {
  if (bookmarks.length === 0) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 20px', color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {searchTerm ? '🔍' : view === 'archived' ? '🗄️' : view === 'favorites' ? '⭐' : '🔖'}
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-secondary)' }}>
          {searchTerm
            ? `No results for "${searchTerm}"`
            : view === 'archived'
            ? 'No archived bookmarks'
            : view === 'favorites'
            ? 'No favorite bookmarks'
            : 'No bookmarks yet'}
        </h3>
        <p style={{ fontSize: '14px' }}>
          {searchTerm
            ? 'Try a different search term'
            : view === 'archived'
            ? 'Archived bookmarks will appear here'
            : view === 'favorites'
            ? 'Click ☆ to add bookmarks to favorites'
            : 'Click "+ Add Bookmark" to get started'}
        </p>
      </div>
    )
  }

  return (
    <div className="bookmarks-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px'
    }}>
      {bookmarks.map(bookmark => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onEdit={onEdit}
          onDelete={onDelete}
          onPin={onPin}
          onArchive={onArchive}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  )
}

export default BookmarkList