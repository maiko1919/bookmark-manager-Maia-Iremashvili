function FilterBar({ tags, selectedTags, onSelectTag }) {
  return (
    <div style={{
      display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px'
    }}>
      <button
        onClick={() => onSelectTag('All')}
        style={{
          padding: '4px 12px', fontSize: '13px', borderRadius: '20px',
          border: '1px solid var(--border)',
          background: selectedTags.length === 0 ? 'var(--accent)' : 'transparent',
          color: selectedTags.length === 0 ? 'white' : 'var(--text-secondary)',
          fontWeight: selectedTags.length === 0 ? '600' : '400',
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
            background: selectedTags.includes(tag) ? 'var(--accent)' : 'transparent',
            color: selectedTags.includes(tag) ? 'white' : 'var(--text-secondary)',
            fontWeight: selectedTags.includes(tag) ? '600' : '400',
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