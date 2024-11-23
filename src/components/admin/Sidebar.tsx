'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  Building2,
  ScrollText,
  LifeBuoy,
  Bell,
  CreditCard,
  FileBox,
  Activity,
  Shield,
  UsersRound,
  BarChart3,
  Settings,
  Terminal,
  LogOut
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Organizations',
    href: '/admin/organizations',
    icon: Building2,
    children: [
      { name: 'All Organizations', href: '/admin/organizations' },
      { name: 'Create Organization', href: '/admin/organizations/create' }
    ]
  },
  {
    name: 'User Management',
    href: '/admin/users',
    icon: Users,
    children: [
      { name: 'All Users', href: '/admin/users' },
      { name: 'Create User', href: '/admin/users/create' }
    ]
  },
  {
    name: 'Audit Logs',
    href: '/admin/logs',
    icon: ScrollText
  },
  {
    name: 'Support',
    icon: LifeBuoy,
    children: [
      { name: 'Help Tickets', href: '/admin/help-tickets' },
      { name: 'Feedback', href: '/admin/feedback' }
    ]
  },
  {
    name: 'Notifications',
    href: '/admin/notifications',
    icon: Bell
  },
  {
    name: 'Subscriptions',
    icon: CreditCard,
    children: [
      { name: 'All Subscriptions', href: '/admin/subscriptions' },
      { name: 'Plans', href: '/admin/plans' }
    ]
  },
  {
    name: 'Files',
    href: '/admin/files',
    icon: FileBox
  },
  {
    name: 'System',
    icon: Activity,
    children: [
      { name: 'System Info', href: '/admin/system' },
      { name: 'Tasks', href: '/admin/tasks' }
    ]
  },
  {
    name: 'Roles',
    href: '/admin/roles',
    icon: Shield
  },
  {
    name: 'Groups',
    href: '/admin/groups',
    icon: UsersRound
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: BarChart3
  },
  {
    name: 'Settings',
    icon: Settings,
    children: [
      { name: 'System Settings', href: '/admin/settings/system' },
      { name: 'Organization Settings', href: '/admin/settings/organizations' }
    ]
  },
  {
    name: 'Developer',
    icon: Terminal,
    children: [
      { name: 'API Keys', href: '/admin/api-keys' },
      { name: 'Webhooks', href: '/admin/webhooks' }
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex h-14 items-center px-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        {navigation.map((item) => (
          <div key={item.name} className="mb-2">
            {!item.children ? (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                  pathname === item.href && 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </div>
                {item.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-4',
                      pathname === child.href && 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    )}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/logout"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  )
} 