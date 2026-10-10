import { useState, useEffect } from 'react'

function BookmarkForm({ onSubmit, editingBookmark, onClose }) {
  const [form, setForm] = useState({ title: '', url: '', description: '', tags: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingBookmark) {
      setForm({
        title: editingBookmark.title,
        url: editingBookmark.url,
        description: editingBookmark.description,
        tags: editingBookmark.tags.join(', ')
      })
    } else {
      setForm({ title: '', url: '', description: '', tags: '' })
    }
    setErrors({})
  }, [editingBookmark])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.url.trim()) {
      newErrors.url = 'URL is required'
    } else {
      try { new URL(form.url) } catch { newErrors.url = 'Please enter a valid URL' }
    }
    if (!form.tags.trim()) newErrors.tags = 'At least one tag is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit({
      title: form.title.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    })
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '14px',
    background: 'var(--input-bg)',
    color: 'var(--text-primary)',
    marginTop: '6px',
    marginBottom: '4px'
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--text-primary)',
    display: 'block'
  }

  const errorStyle = {
    color: '#ef4444',
    fontSize: '12px',
    marginBottom: '12px',
    display: 'block'
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>
        {editingBookmark ? 'Edit bookmark' : 'Add a bookmark'}
      </h2>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        {editingBookmark
          ? 'Update your saved link details.'
          : 'Save a link with details to keep your collection organized.'}
      </p>

      <label style={labelStyle}>
        Title *
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. React Documentation"
          style={{ ...inputStyle, borderColor: errors.title ? '#ef4444' : 'var(--border)' }}
        />
      </label>
      {errors.title && <span style={errorStyle}>{errors.title}</span>}

      <label style={labelStyle}>
        Description *
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief description of this bookmark..."
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </label>

      <label style={labelStyle}>
        Website URL *
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="https://example.com"
          style={{ ...inputStyle, borderColor: errors.url ? '#ef4444' : 'var(--border)' }}
        />
      </label>
      {errors.url && <span style={errorStyle}>{errors.url}</span>}

      <label style={labelStyle}>
        Tags *
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="e.g. Design, Learning, Tools"
          style={{ ...inputStyle, borderColor: errors.tags ? '#ef4444' : 'var(--border)' }}
        />
      </label>
      {errors.tags && <span style={errorStyle}>{errors.tags}</span>}

      <div style={{ display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '10px 20px',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          {editingBookmark ? 'Save Bookmark' : 'Add Bookmark'}
        </button>
      </div>
    </form>
  )
}

export default BookmarkForm