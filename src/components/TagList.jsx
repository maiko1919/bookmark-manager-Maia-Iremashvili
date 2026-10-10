function TagList({ tags }) {
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <span key={tag} style={{
          background: 'var(--tag-bg)',
          color: 'var(--tag-text)',
          padding: '2px 8px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '500'
        }}>
          {tag}
        </span>
      ))}
    </div>
  )
}

export default TagList