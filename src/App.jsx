import { Routes, Route } from 'react-router-dom'
import LBLLanding from './pages/LBLLanding'
import AdminDashboard from './pages/AdminDashboard'
import About from './pages/About'
import News from './pages/News'
import Watch from './pages/Watch'
import Tickets from './pages/Tickets'
import Donate from './pages/Donate'
import LeagueLayout from './pages/league/LeagueLayout'
import Teams from './pages/league/Teams'
// Remove Standings and Stats imports
import Schedule from './pages/league/Schedule'
import Support from './pages/Support'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LBLLanding />} />
      <Route path="/admin" element={<AdminDashboard />} />
      
      <Route element={<LeagueLayout />}>
        <Route path="/teams" element={<Teams />} />
        {/* Remove standalone Standings and Stats routes */}
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/support" element={<Support />} />
      </Route>
    </Routes>
  )
}

export default App