export function DebugEnv() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      background: 'red',
      color: 'white',
      padding: '10px',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      API: {apiUrl || 'UNDEFINED'}
    </div>
  )
}