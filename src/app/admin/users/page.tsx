'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, UserCog, Shield, ShieldOff, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'

interface User {
  id: string
  name: string | null
  email: string
  createdAt: string
  roles: string[]
}

export default function AdminUsersPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/users?limit=100')
      const data = await response.json()
      if (data.success) {
        setUsers(data.data.items)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAdmin = async (userId: string, currentlyAdmin: boolean) => {
    if (userId === session?.user?.id) {
      alert("You cannot change your own admin status.")
      return
    }

    try {
      const method = currentlyAdmin ? 'DELETE' : 'PUT'
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin' })
      })

      if (response.ok) {
        fetchUsers() // Refresh list
      } else {
        const errorData = await response.json()
        alert(errorData.message || "Failed to update role")
      }
    } catch (error) {
      console.error('Failed to toggle role:', error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (userId === session?.user?.id) {
      alert("You cannot delete yourself.")
      return
    }

    if (!confirm('Are you absolutely sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchUsers()
      } else {
        const errorData = await response.json()
        alert(errorData.message || "Failed to delete user")
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(search.toLowerCase()) || 
    user.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            View, modify roles, or remove accounts from the system.
          </p>
        </div>
      </div>

      <Card className="border-t-4 border-t-primary">
        <CardHeader className="pb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 shadow-sm border-muted-foreground/30 focus-visible:ring-primary"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border shadow-sm overflow-hidden bg-background">
            {loading ? (
              <div className="flex justify-center items-center h-48 text-muted-foreground animate-pulse font-medium">
                Loading users...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left align-middle">
                  <thead className="bg-muted/50 text-muted-foreground uppercase text-xs border-b">
                    <tr>
                      <th className="px-6 py-4 font-semibold tracking-wider">User Info</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Roles</th>
                      <th className="px-6 py-4 font-semibold text-right tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground text-base">
                          No users found matching your search.
                        </td>
                      </tr>
                    ) : filteredUsers.map((user) => {
                      const isAdmin = user.roles.includes('admin')
                      const isSelf = user.id === session?.user?.id

                      return (
                        <tr key={user.id} className="transition-colors hover:bg-muted/30">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-foreground">{user.name || 'Unnamed User'}</span>
                              <span className="text-sm text-muted-foreground">{user.email}</span>
                              <span className="text-xs text-muted-foreground/70 mt-1 uppercase tracking-widest">ID: {user.id.substring(0, 8)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 flex-wrap">
                              {user.roles.map(role => (
                                <span 
                                  key={role} 
                                  className={`px-2.5 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${
                                    role === 'admin' 
                                      ? 'bg-primary/10 text-primary border-primary/20 border' 
                                      : 'bg-secondary text-secondary-foreground border-border border'
                                  }`}
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant={isAdmin ? "outline" : "default"} 
                                size="sm" 
                                disabled={isSelf}
                                className={`shadow-sm ${isSelf ? "opacity-40" : ""}`}
                                onClick={() => handleToggleAdmin(user.id, isAdmin)}
                                title={isAdmin ? "Remove Admin Role" : "Make Admin"}
                              >
                                {isAdmin ? <ShieldOff className="h-4 w-4 sm:mr-1" /> : <Shield className="h-4 w-4 sm:mr-1" />}
                                <span className="hidden sm:inline font-medium">{isAdmin ? "Revoke Admin" : "Make Admin"}</span>
                              </Button>
                              
                              <Button 
                                variant="destructive" 
                                size="icon"
                                className="shadow-sm hover:bg-destructive/90"
                                disabled={isSelf}
                                onClick={() => handleDeleteUser(user.id)}
                                title="Delete User"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="mt-5 text-sm font-medium text-muted-foreground flex items-center gap-2 bg-muted/40 p-3 rounded-md border border-border/50">
            <UserCog className="h-5 w-5 text-primary" />
            <span>Note: You cannot modify your own role or delete your own account for safety.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
