import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '~/homePage/HomePage'

const RouteSwitch = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/home'} />} />
        <Route path={'/home'} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch