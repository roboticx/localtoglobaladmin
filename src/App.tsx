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
const App = () => {
  return (
    <div className="text-red-900 flex min-h-screen w-full">
      <Sidebar />

      <div className="flex-1 flex flex-col ">
        <Header />

        <div className="">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User/>} />
            <Route path="/plans" element={<Plans/>} />
            <Route path="/subdomains" element={<Subdomains/>} />
            <Route path="/subscription" element={<Subscriptions/>} />
            <Route path="/transactions" element={<Transactions/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
