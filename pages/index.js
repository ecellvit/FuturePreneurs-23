import Image from 'next/image'
import { Inter } from 'next/font/google'
import LeaderDashboardCards from './LeaderDashboardCards'
import LeaderDashboard from './LeaderDashboard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='m-10'>
      <LeaderDashboard />
    </div>
  )
}
