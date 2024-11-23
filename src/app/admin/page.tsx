import { Card } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Tenants</h3>
          <p className="text-2xl font-bold mt-2">56</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Tickets</h3>
          <p className="text-2xl font-bold mt-2">23</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">$45,678</p>
        </Card>
      </div>
    </div>
  )
} 