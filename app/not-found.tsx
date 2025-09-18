import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Error Icon */}
            <div className="relative">
              <div className="text-8xl font-bold text-muted-foreground/20">404</div>
              <AlertCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-muted-foreground" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Page not found
              </h1>
              <p className="text-sm text-muted-foreground max-w-sm">
                Sorry, we couldn't find the page you're looking for. 
                It might have been removed, had its name changed, or is temporarily unavailable.
              </p>
            </div>

            {/* Suggestions */}
            <div className="bg-muted/50 rounded-lg p-4 w-full">
              <p className="text-sm font-medium text-foreground mb-2">Here are some helpful links:</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Check the URL for typos</li>
                <li>• Return to the homepage</li>
                <li>• Use the search feature</li>
                <li>• Contact support if you need help</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button asChild className="flex-1">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="javascript:history.back()">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </div>

            {/* Search Bar (optional) */}
            <div className="w-full pt-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for something..."
                  className="flex-1 px-3 py-2 text-sm border rounded-md bg-background border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="sm" variant="secondary">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}