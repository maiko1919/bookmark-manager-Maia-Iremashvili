function SortSelect({ sortOrder, onSort }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>↕️ Sort by</span>
      <select
        value={sortOrder}
        onChange={(e) => onSort(e.target.value)}
        style={{
          padding: '6px 10px',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          fontSize: '13px',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          cursor: 'pointer'
        }}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
    </div>
  )
}

export default SortSelect