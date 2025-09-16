"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  FileText,
  Menu,
  Package,
  Settings,
  CreditCard,
  Bell,
  Shield,
  Zap,
  Database,
  Globe,
  Palette,
  Wrench,
  Plus
} from "lucide-react"

const mainNavItems = [
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
]

const moreNavItems = [
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

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex items-center justify-around h-16">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full px-2 text-xs transition-colors",
              pathname === item.href
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="truncate">{item.title}</span>
          </Link>
        ))}
        
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center justify-center flex-1 h-full px-2 text-xs"
            >
              <Plus className="h-5 w-5 mb-1" />
              <span>More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <div className="mt-6 space-y-2">
              <h3 className="font-semibold text-lg mb-4">More Options</h3>
              {moreNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}