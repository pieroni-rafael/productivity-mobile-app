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
    name: "Inicial",
    price: "$29",
    description: "Perfeito para pequenas equipes",
    features: [
      "Até 5 usuários",
      "10 GB de armazenamento",
      "Análises básicas",
      "Suporte por email",
      "Acesso à API",
    ],
    notIncluded: [
      "Análises avançadas",
      "Suporte prioritário",
      "Integrações personalizadas",
    ],
    current: false,
  },
  {
    name: "Profissional",
    price: "$99",
    description: "Para empresas em crescimento",
    features: [
      "Até 20 usuários",
      "100 GB de armazenamento",
      "Análises avançadas",
      "Suporte prioritário",
      "Acesso à API",
      "Integrações personalizadas",
      "Colaboração em equipe",
    ],
    notIncluded: [
      "Opções de marca branca",
      "Suporte dedicado",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Empresarial",
    price: "$299",
    description: "Para grandes organizações",
    features: [
      "Usuários ilimitados",
      "Armazenamento ilimitado",
      "Análises avançadas",
      "Suporte dedicado",
      "Acesso à API",
      "Integrações personalizadas",
      "Colaboração em equipe",
      "Opções de marca branca",
      "Garantia de SLA",
    ],
    notIncluded: [],
    current: false,
  },
]

const invoices = [
  { id: "INV-001", date: "1 Jan, 2024", amount: "$99.00", status: "pago" },
  { id: "INV-002", date: "1 Dez, 2023", amount: "$99.00", status: "pago" },
  { id: "INV-003", date: "1 Nov, 2023", amount: "$99.00", status: "pago" },
  { id: "INV-004", date: "1 Out, 2023", amount: "$99.00", status: "pago" },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faturamento</h1>
        <p className="text-muted-foreground">
          Gerencie sua assinatura e detalhes de faturamento
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plano Atual</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Profissional</div>
            <p className="text-xs text-muted-foreground">
              $99/month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pagamento</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 Fev, 2024</div>
            <p className="text-xs text-muted-foreground">
              Em 15 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,188</div>
            <p className="text-xs text-muted-foreground">
              Últimos 12 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uso</CardTitle>
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
          <TabsTrigger value="plans">Planos</TabsTrigger>
          <TabsTrigger value="payment">Forma de Pagamento</TabsTrigger>
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
          <TabsTrigger value="usage">Uso</TabsTrigger>
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
                        Mais Popular
                      </Badge>
                    )}
                    {plan.current && (
                      <Badge variant="secondary">Plano Atual</Badge>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/mês</span>
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
                    {plan.current ? "Plano Atual" : "Fazer Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Forma de Pagamento</CardTitle>
              <CardDescription>
                Gerencie suas formas de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-8 w-8" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expira em 12/24</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Padrão</Badge>
                  <Button size="sm" variant="outline">Editar</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Adicionar Forma de Pagamento
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Histórico de Faturas</CardTitle>
                  <CardDescription>
                    Baixe suas faturas anteriores
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Todas
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fatura</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
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
                <CardTitle>Uso de Recursos</CardTitle>
                <CardDescription>
                  Monitore o consumo dos seus recursos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Usuários</span>
                    <span className="text-sm text-muted-foreground">15 / 20</span>
                  </div>
                  <Progress value={75} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Armazenamento</span>
                    <span className="text-sm text-muted-foreground">45 GB / 100 GB</span>
                  </div>
                  <Progress value={45} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Chamadas API</span>
                    <span className="text-sm text-muted-foreground">78,234 / 100,000</span>
                  </div>
                  <Progress value={78} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Largura de Banda</span>
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
                  <CardTitle className="text-base">Informações de Uso</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Seu uso é reiniciado no dia 1º de cada mês. Se você exceder os limites do seu plano,
                  taxas adicionais podem ser aplicadas. Considere fazer upgrade do seu plano para mais recursos.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}