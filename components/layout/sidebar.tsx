"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart3, 
  FileText,
  Bell,
  Shield,
  Zap,
  Database,
  Globe,
  Package,
  Palette,
  Wrench
} from "lucide-react"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Package,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Integrations",
    href: "/integrations",
    icon: Zap,
  },
  {
    title: "Database",
    href: "/database",
    icon: Database,
  },
  {
    title: "API",
    href: "/api-settings",
    icon: Globe,
  },
  {
    title: "Appearance",
    href: "/appearance",
    icon: Palette,
  },
  {
    title: "Tools",
    href: "/tools",
    icon: Wrench,
  },
  {
    title: "Security",
    href: "/security",
    icon: Shield,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-8 px-3">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI SaaS
            </h2>
            <p className="text-xs text-muted-foreground mt-1">AI-Powered Platform</p>
          </div>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-1">
              {sidebarNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    pathname === item.href && "bg-secondary"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}