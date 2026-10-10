function FilterBar({ tags, selectedTag, onSelectTag }) {
  return (
    <div style={{
      display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px'
    }}>
      <button
        onClick={() => onSelectTag('All')}
        style={{
          padding: '4px 12px', fontSize: '13px', borderRadius: '20px',
          border: '1px solid var(--border)',
          background: selectedTag === 'All' ? 'var(--accent)' : 'transparent',
          color: selectedTag === 'All' ? 'white' : 'var(--text-secondary)',
          fontWeight: selectedTag === 'All' ? '600' : '400',
          cursor: 'pointer'
        }}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag)}
          style={{
            padding: '4px 12px', fontSize: '13px', borderRadius: '20px',
            border: '1px solid var(--border)',
            background: selectedTag === tag ? 'var(--accent)' : 'transparent',
            color: selectedTag === tag ? 'white' : 'var(--text-secondary)',
            fontWeight: selectedTag === tag ? '600' : '400',
            cursor: 'pointer'
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

export default FilterBar