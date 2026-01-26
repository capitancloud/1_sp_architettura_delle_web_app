import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModuleNavigation } from "@/components/education/ModuleNavigation";
import { ModuleOverview } from "@/components/education/modules/ModuleOverview";
import { ModuleClient } from "@/components/education/modules/ModuleClient";
import { ModuleRequest } from "@/components/education/modules/ModuleRequest";
import { ModuleServer } from "@/components/education/modules/ModuleServer";
import { ModuleResponse } from "@/components/education/modules/ModuleResponse";
import { ModuleUIUpdate } from "@/components/education/modules/ModuleUIUpdate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  { id: 0, component: ModuleOverview },
  { id: 1, component: ModuleClient },
  { id: 2, component: ModuleRequest },
  { id: 3, component: ModuleServer },
  { id: 4, component: ModuleResponse },
  { id: 5, component: ModuleUIUpdate },
];

const Index = () => {
  const [currentModule, setCurrentModule] = useState(0);

  const CurrentModuleComponent = modules[currentModule].component;

  const goToNext = () => {
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  const goToPrevious = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-background blueprint-grid">
      {/* Sidebar Navigation */}
      <ModuleNavigation 
        currentModule={currentModule} 
        onModuleChange={setCurrentModule} 
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentModuleComponent />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t border-border">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={currentModule === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Precedente
            </Button>

            <div className="flex items-center gap-2">
              {modules.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentModule(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentModule 
                      ? 'w-6 bg-primary' 
                      : i < currentModule 
                        ? 'bg-accent' 
                        : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              disabled={currentModule === modules.length - 1}
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
};

export default Index;
