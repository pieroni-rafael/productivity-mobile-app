import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  Download, 
  Check,
  X,
  TrendingUp,
  Calendar,
  DollarSign,
  Zap,
  Info
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small teams",
    features: [
      "Up to 5 users",
      "10 GB storage",
      "Basic analytics",
      "Email support",
      "API access",
    ],
    notIncluded: [
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    current: false,
  },
  {
    name: "Professional",
    price: "$99",
    description: "For growing businesses",
    features: [
      "Up to 20 users",
      "100 GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Team collaboration",
    ],
    notIncluded: [
      "White-label options",
      "Dedicated support",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    description: "For large organizations",
    features: [
      "Unlimited users",
      "Unlimited storage",
      "Advanced analytics",
      "Dedicated support",
      "API access",
      "Custom integrations",
      "Team collaboration",
      "White-label options",
      "SLA guarantee",
    ],
    notIncluded: [],
    current: false,
  },
]

const invoices = [
  { id: "INV-001", date: "Jan 1, 2024", amount: "$99.00", status: "paid" },
  { id: "INV-002", date: "Dec 1, 2023", amount: "$99.00", status: "paid" },
  { id: "INV-003", date: "Nov 1, 2023", amount: "$99.00", status: "paid" },
  { id: "INV-004", date: "Oct 1, 2023", amount: "$99.00", status: "paid" },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing details
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Professional</div>
            <p className="text-xs text-muted-foreground">
              $99/month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 1, 2024</div>
            <p className="text-xs text-muted-foreground">
              In 15 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,188</div>
            <p className="text-xs text-muted-foreground">
              Last 12 months
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="payment">Payment Method</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.popular && (
                      <Badge className="bg-gradient-to-r from-primary to-primary/60">
                        Most Popular
                      </Badge>
                    )}
                    {plan.current && (
                      <Badge variant="secondary">Current Plan</Badge>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 opacity-50">
                        <X className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.current ? "outline" : "default"}>
                    {plan.current ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Manage your payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-8 w-8" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/24</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Default</Badge>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>
                    Download your past invoices
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
                <CardDescription>
                  Monitor your resource consumption
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Users</span>
                    <span className="text-sm text-muted-foreground">15 / 20</span>
                  </div>
                  <Progress value={75} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage</span>
                    <span className="text-sm text-muted-foreground">45 GB / 100 GB</span>
                  </div>
                  <Progress value={45} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Calls</span>
                    <span className="text-sm text-muted-foreground">78,234 / 100,000</span>
                  </div>
                  <Progress value={78} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bandwidth</span>
                    <span className="text-sm text-muted-foreground">234 GB / 500 GB</span>
                  </div>
                  <Progress value={47} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base">Usage Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your usage resets on the 1st of each month. If you exceed your plan limits,
                  additional charges may apply. Consider upgrading your plan for more resources.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}