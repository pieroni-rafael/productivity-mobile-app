import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Folder,
  Clock,
  Users as UsersIcon,
  GitBranch,
  Activity,
  Star
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const projects = [
  {
    id: 1,
    name: "Plataforma E-commerce",
    description: "Solução moderna de e-commerce com recomendações baseadas em IA",
    status: "ativo",
    team: 5,
    lastUpdated: "2 horas atrás",
    progress: 75,
    starred: true,
  },
  {
    id: 2,
    name: "Dashboard de Analytics",
    description: "Dashboard de analytics e relatórios em tempo real",
    status: "ativo",
    team: 3,
    lastUpdated: "5 horas atrás",
    progress: 90,
    starred: false,
  },
  {
    id: 3,
    name: "App Mobile",
    description: "Aplicativo mobile multiplataforma",
    status: "desenvolvimento",
    team: 8,
    lastUpdated: "1 dia atrás",
    progress: 45,
    starred: false,
  },
  {
    id: 4,
    name: "Gateway de API",
    description: "Serviço centralizado de gerenciamento e gateway de API",
    status: "planejamento",
    team: 2,
    lastUpdated: "3 dias atrás",
    progress: 20,
    starred: true,
  },
  {
    id: 5,
    name: "Pipeline de Machine Learning",
    description: "Treinamento e implantação automatizada de modelos ML",
    status: "ativo",
    team: 6,
    lastUpdated: "1 semana atrás",
    progress: 60,
    starred: false,
  },
  {
    id: 6,
    name: "Portal de Documentação",
    description: "Base de conhecimento e documentação abrangente",
    status: "concluído",
    team: 2,
    lastUpdated: "2 semanas atrás",
    progress: 100,
    starred: false,
  },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground">
            Gerencie e monitore seus projetos
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar projetos..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos os Projetos</TabsTrigger>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="archived">Arquivados</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        {project.name}
                        {project.starred && (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        )}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar Projeto</DropdownMenuItem>
                        <DropdownMenuItem>Configurações da Equipe</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Excluir Projeto
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <UsersIcon className="h-3 w-3" />
                        <span>{project.team}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{project.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progresso</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <Badge variant={
                      project.status === "ativo" ? "default" :
                      project.status === "concluído" ? "secondary" :
                      project.status === "desenvolvimento" ? "outline" :
                      project.status === "planejamento" ? "secondary" :
                      "secondary"
                    }>
                      {project.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <GitBranch className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Activity className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            Projetos ativos aparecerão aqui
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            Projetos concluídos aparecerão aqui
          </div>
        </TabsContent>

        <TabsContent value="archived">
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            Projetos arquivados aparecerão aqui
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}