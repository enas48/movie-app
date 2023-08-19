import { useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ isAllowed, children }) => {
  let location = useLocation()
  let navigate = useNavigate()
  useEffect(() => {
    if (!isAllowed) {
      navigate('/login', { state: { prevPath: location.pathname } })
    }
  }, [])
  return children ? children : <Outlet />
}
export default ProtectedRoute
