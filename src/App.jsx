import { useState, useEffect } from 'react'
import BookmarkList from './components/BookmarkList'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import SortSelect from './components/SortSelect'
import Modal from './components/Modal'
import BookmarkForm from './components/BookmarkForm'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)
  const [view, setView] = useState('all')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks')
    if (saved) {
      setBookmarks(JSON.parse(saved))
      setIsLoading(false)
    } else {
      setTimeout(() => {
        fetch('/data/bookmarks.json')
          .then(res => res.json())
          .then(data => {
            setBookmarks(data)
            setIsLoading(false)
          })
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
  }, [bookmarks, isLoading])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleDelete = (id) => setDeleteConfirmId(id)

  const confirmDelete = () => {
    setBookmarks(prev => prev.filter(b => b.id !== deleteConfirmId))
    setDeleteConfirmId(null)
  }

  const handlePin = (id) => {
    setBookmarks(prev =>
      prev.map(b => b.id === id ? { ...b, isPinned: !b.isPinned } : b)
    )
  }

  const handleArchive = (id) => {
    setBookmarks(prev =>
      prev.map(b => b.id === id ? { ...b, isArchived: !b.isArchived } : b)
    )
  }

  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark)
    setIsModalOpen(true)
  }

  const handleSubmit = (formData) => {
    if (editingBookmark) {
      setBookmarks(prev =>
        prev.map(b => b.id === editingBookmark.id ? { ...b, ...formData } : b)
      )
    } else {
      const newBookmark = {
        id: Date.now(),
        ...formData,
        isPinned: false,
        isArchived: false
      }
      setBookmarks(prev => [newBookmark, ...prev])
    }
    setIsModalOpen(false)
    setEditingBookmark(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingBookmark(null)
  }

  const allTags = [...new Set(bookmarks.flatMap(b => b.tags))].sort()

  const filteredBookmarks = bookmarks
    .filter(b => view === 'archived' ? b.isArchived : !b.isArchived)
    .filter(b => {
      const term = searchTerm.toLowerCase()
      return b.title.toLowerCase().includes(term) || b.description.toLowerCase().includes(term)
    })
    .filter(b => selectedTag === 'All' || b.tags.includes(selectedTag))
    .sort((a, b) => {
      if (view === 'all') {
        if (a.isPinned !== b.isPinned) return b.isPinned - a.isPinned
      }
      if (sortOrder === 'az') return a.title.localeCompare(b.title)
      if (sortOrder === 'za') return b.title.localeCompare(a.title)
      if (sortOrder === 'oldest') return a.id - b.id
      return b.id - a.id
    })

  if (isLoading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)',
        fontSize: '18px', gap: '12px'
      }}>
        <span>⏳</span> Loading...
      </div>
    )
  }

  return (
    <div className="app">
      <Sidebar
        view={view}
        onViewChange={(v) => { setView(v); setSelectedTag('All') }}
        tags={allTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        bookmarks={bookmarks}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          theme={theme}
          onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          onAddClick={() => setIsModalOpen(true)}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

        <main style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
              {view === 'archived' ? 'Archived bookmarks' : searchTerm ? `Results for: "${searchTerm}"` : 'All bookmarks'}
            </h2>
            <SortSelect sortOrder={sortOrder} onSort={setSortOrder} />
          </div>

          <FilterBar tags={allTags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />

          <BookmarkList
            bookmarks={filteredBookmarks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPin={handlePin}
            onArchive={handleArchive}
            view={view}
            searchTerm={searchTerm}
          />
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BookmarkForm
          onSubmit={handleSubmit}
          editingBookmark={editingBookmark}
          onClose={handleCloseModal}
        />
      </Modal>

      <Modal isOpen={deleteConfirmId !== null} onClose={() => setDeleteConfirmId(null)}>
        <div style={{ padding: '8px' }}>
          <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>Delete bookmark?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>This action cannot be undone.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setDeleteConfirmId(null)}
              style={{ padding: '8px 16px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', borderRadius: '8px' }}
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px' }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default App