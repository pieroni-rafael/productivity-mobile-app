'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCcw, Home, Bug } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Error Icon */}
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Something went wrong!
              </h1>
              <p className="text-sm text-muted-foreground max-w-sm">
                An unexpected error occurred while processing your request. 
                Don't worry, our team has been notified and is working on a fix.
              </p>
            </div>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="w-full bg-muted/50 rounded-lg p-4">
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {error.message || 'Unknown error'}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* What to do */}
            <div className="bg-muted/50 rounded-lg p-4 w-full">
              <p className="text-sm font-medium text-foreground mb-2">What you can try:</p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Refresh the page to try again</li>
                <li>• Clear your browser cache and cookies</li>
                <li>• Check your internet connection</li>
                <li>• Return to the homepage</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button 
                onClick={reset}
                className="flex-1"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Report Button */}
            <div className="w-full pt-4 border-t">
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full"
                onClick={() => {
                  // You can implement error reporting here
                  console.log('Error reported:', error)
                  alert('Thank you for reporting this issue!')
                }}
              >
                <Bug className="mr-2 h-4 w-4" />
                Report this issue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}