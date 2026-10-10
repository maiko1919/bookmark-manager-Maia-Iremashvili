function SearchBar({ searchTerm, onSearch }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <input
        type="text"
        placeholder="Search bookmarks..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' }}
      />
    </div>
  )
}

export default SearchBar