import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Task Management</CardTitle>
          <CardDescription className="text-center">
            Production-ready Next.js application with Task Management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Features:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Role-Based Access Control (RBAC)</li>
              <li>✓ Task Management with CRUD operations</li>
              <li>✓ Email/Password & Google OAuth Authentication</li>
              <li>✓ Search & Pagination</li>
              <li>✓ Audit Logging</li>
              <li>✓ Soft Delete</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Tech Stack:</h3>
            <p className="text-sm text-muted-foreground">
              Next.js 16, PostgreSQL, Prisma, Auth.js, Tailwind CSS, shadcn/ui
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/auth/login" className="w-full">
            <Button className="w-full">Sign In</Button>
          </Link>
          <Link href="/auth/register" className="w-full">
            <Button variant="outline" className="w-full">Create Account</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
