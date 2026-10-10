function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white', padding: '24px', borderRadius: '12px',
        width: '90%', maxWidth: '500px', position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal