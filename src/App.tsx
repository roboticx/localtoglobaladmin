import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

// pages
import Dashboard from './pages/Dashboard'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import Login from './pages/Login'
import User from './pages/User'
import Plans from './pages/Plans'
import Subdomains from './pages/Subdomains'
import Subscriptions from './pages/Subscriptions'
import Transactions from './pages/Transactions'
import PrivateLayout from './components/PrivateLayout'
const App = () => {
  return (
    <Routes>
      {/* 🔓 Public Route */}
      <Route path="/login" element={<Login />} />

      {/* 🔐 Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/user" element={<User />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/subdomains" element={<Subdomains />} />
        <Route path="/subscription" element={<Subscriptions />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  )
}

export default App
