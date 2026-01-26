import { motion } from "framer-motion";
import { 
  Globe, 
  Server, 
  ArrowRight, 
  ArrowLeft, 
  Database, 
  RefreshCw,
  Layout
} from "lucide-react";

interface ModuleNavigationProps {
  currentModule: number;
  onModuleChange: (module: number) => void;
}

const modules = [
  { id: 0, title: "Panoramica", subtitle: "Chi fa cosa?", icon: Layout },
  { id: 1, title: "Il Client", subtitle: "Frontend", icon: Globe },
  { id: 2, title: "Request HTTP", subtitle: "Dal client al server", icon: ArrowRight },
  { id: 3, title: "Il Server", subtitle: "Backend", icon: Server },
  { id: 4, title: "Response HTTP", subtitle: "Dal server al client", icon: ArrowLeft },
  { id: 5, title: "Aggiornamento UI", subtitle: "Il ciclo completo", icon: RefreshCw },
];

export function ModuleNavigation({ currentModule, onModuleChange }: ModuleNavigationProps) {
  return (
    <nav className="w-72 min-h-screen bg-sidebar border-r border-sidebar-border p-4">
      <div className="mb-8">
        <h1 className="text-lg font-bold text-foreground mb-1">
          Web App 101
        </h1>
        <p className="text-xs text-muted-foreground">
          Senza framework, senza magia
        </p>
      </div>

      <div className="space-y-1">
        {modules.map((module, index) => {
          const Icon = module.icon;
          const isActive = currentModule === module.id;
          const isCompleted = currentModule > module.id;

          return (
            <motion.button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`nav-item w-full text-left ${isActive ? 'active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : isCompleted 
                    ? 'bg-accent/20 text-accent' 
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isActive ? 'text-primary' : ''}`}>
                  {module.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {module.subtitle}
                </p>
              </div>
              {isCompleted && (
                <div className="w-2 h-2 rounded-full bg-accent" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-card border border-border">
        <p className="text-xs text-muted-foreground mb-2">Progresso</p>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentModule + 1) / modules.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {currentModule + 1} di {modules.length} moduli
        </p>
      </div>
    </nav>
  );
}
