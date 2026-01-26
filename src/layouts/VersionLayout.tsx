import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VersionConfig } from "@/config/versions";

interface VersionLayoutProps {
  version: VersionConfig;
  currentModuleIndex: number;
  onModuleChange: (index: number) => void;
  children: ReactNode;
}

export function VersionLayout({ 
  version, 
  currentModuleIndex, 
  onModuleChange, 
  children 
}: VersionLayoutProps) {
  const navigate = useNavigate();
  const currentModule = version.modules[currentModuleIndex];

  const goToNext = () => {
    if (currentModuleIndex < version.modules.length - 1) {
      onModuleChange(currentModuleIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentModuleIndex > 0) {
      onModuleChange(currentModuleIndex - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border bg-sidebar-background flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Menu principale</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{version.icon}</span>
            <div>
              <h2 className="font-bold text-foreground">{version.title}</h2>
              <p className="text-xs text-muted-foreground">{version.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Module List */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {version.modules.map((module, index) => {
              const isActive = index === currentModuleIndex;
              const isCompleted = index < currentModuleIndex;

              return (
                <li key={module.id}>
                  <button
                    onClick={() => onModuleChange(index)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all
                      ${isActive 
                        ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                        : isCompleted
                          ? 'text-muted-foreground hover:bg-muted/50'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <span className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : isCompleted 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {isCompleted ? '✓' : index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-primary' : ''}`}>
                        {module.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {module.subtitle}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Progress */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground mb-2">Progresso</div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentModuleIndex + 1) / version.modules.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {currentModuleIndex + 1} di {version.modules.length} moduli
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModuleIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t border-border">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={currentModuleIndex === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Precedente
            </Button>

            <div className="flex items-center gap-2">
              {version.modules.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onModuleChange(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentModuleIndex 
                      ? 'w-6 bg-primary' 
                      : i < currentModuleIndex 
                        ? 'w-2 bg-accent' 
                        : 'w-2 bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              disabled={currentModuleIndex === version.modules.length - 1}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              Successivo
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
