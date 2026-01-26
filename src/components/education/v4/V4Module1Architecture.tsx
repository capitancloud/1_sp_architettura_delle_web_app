import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

interface V4Module1ArchitectureProps {
  onNext: () => void;
}

type LayerKey = "frontend" | "backend" | "database";

interface Layer {
  id: LayerKey;
  label: string;
  badge: string;
  color: string;
  bgColor: string;
  borderColor: string;
  responsibilities: string[];
  notResponsible: string[];
}

const layers: Layer[] = [
  {
    id: "frontend",
    label: "Frontend",
    badge: "🌐 Browser",
    color: "text-client",
    bgColor: "bg-client/10",
    borderColor: "border-client/30",
    responsibilities: [
      "Mostrare l'interfaccia utente",
      "Gestire interazioni (click, form)",
      "Inviare richieste al backend",
      "Visualizzare dati ricevuti",
    ],
    notResponsible: [
      "Salvare dati permanentemente",
      "Verificare identità utente",
      "Accedere direttamente al database",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    badge: "⚡ Server",
    color: "text-server",
    bgColor: "bg-server/10",
    borderColor: "border-server/30",
    responsibilities: [
      "Ricevere richieste dal frontend",
      "Verificare autenticazione",
      "Eseguire logica applicativa",
      "Comunicare con il database",
      "Restituire risposte",
    ],
    notResponsible: [
      "Mostrare interfacce grafiche",
      "Memorizzare dati a lungo termine",
    ],
  },
  {
    id: "database",
    label: "Database",
    badge: "📊 PostgreSQL",
    color: "text-request",
    bgColor: "bg-request/10",
    borderColor: "border-request/30",
    responsibilities: [
      "Salvare dati permanentemente",
      "Organizzare dati in tabelle",
      "Garantire integrità dei dati",
      "Permettere query efficienti",
    ],
    notResponsible: [
      "Decidere chi può vedere cosa",
      "Eseguire logica applicativa",
      "Comunicare con il browser",
    ],
  },
];

export function V4Module1Architecture({ onNext }: V4Module1ArchitectureProps) {
  const [activeLayer, setActiveLayer] = useState<LayerKey | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const animationSteps = useMemo(() => [
    { layer: "frontend" as LayerKey, message: "L'utente interagisce con l'interfaccia" },
    { layer: "backend" as LayerKey, message: "Il server elabora la richiesta" },
    { layer: "database" as LayerKey, message: "Il database salva o recupera i dati" },
    { layer: "backend" as LayerKey, message: "Il server prepara la risposta" },
    { layer: "frontend" as LayerKey, message: "L'interfaccia si aggiorna" },
  ], []);

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    setActiveLayer("frontend");
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < animationSteps.length) {
        setAnimationStep(step);
        setActiveLayer(animationSteps[step].layer);
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1500);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationStep(0);
    setActiveLayer(null);
  };

  const goToStep = (index: number) => {
    if (!isAnimating) {
      setAnimationStep(index);
      setActiveLayer(animationSteps[index].layer);
    }
  };

  const goPrevStep = () => {
    if (!isAnimating && animationStep > 0) {
      goToStep(animationStep - 1);
    }
  };

  const goNextStep = () => {
    if (!isAnimating && animationStep < animationSteps.length - 1) {
      goToStep(animationStep + 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="outline" className="mb-2">Modulo 1</Badge>
        <h1 className="text-3xl font-bold">Architettura a Tre Livelli</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Un'app reale è un <strong>sistema</strong>: frontend, backend e database lavorano insieme.
          Nessuno fa il lavoro dell'altro.
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <Button
          variant={isAnimating ? "secondary" : "default"}
          onClick={startAnimation}
          disabled={isAnimating}
          className="gap-2"
        >
          <Play className="w-4 h-4" />
          {isAnimating ? "In corso..." : "Anima flusso"}
        </Button>
        <Button variant="outline" onClick={resetAnimation} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {/* Animation message */}
      <AnimatePresence mode="wait">
        {activeLayer && (
          <motion.div
            key={animationStep}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center p-3 rounded-lg bg-muted"
          >
            <span className="text-sm font-medium">{animationSteps[animationStep]?.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual navigation for steps */}
      {activeLayer && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={goPrevStep}
            disabled={isAnimating || animationStep === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex gap-2 overflow-y-visible py-3">
            {animationSteps.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goToStep(i)}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === animationStep ? "bg-primary scale-125" : i < animationStep ? "bg-accent" : "bg-muted"
                }`}
                whileHover={!isAnimating ? { scale: 1.3 } : {}}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={goNextStep}
            disabled={isAnimating || animationStep === animationSteps.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Three-tier architecture diagram */}
      <div className="relative">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-muted-foreground/30" />
            </marker>
          </defs>
        </svg>

        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          {layers.map((layer) => {
            const isActive = activeLayer === layer.id;
            return (
              <motion.div
                key={layer.id}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  boxShadow: isActive ? "0 0 30px rgba(var(--primary), 0.3)" : "none",
                }}
                transition={{ duration: 0.3 }}
                className={`
                  rounded-xl border-2 p-6 transition-colors cursor-pointer
                  ${layer.bgColor} ${layer.borderColor}
                  ${isActive ? "ring-2 ring-primary ring-offset-2" : ""}
                `}
                onClick={() => !isAnimating && setActiveLayer(layer.id)}
              >
                <div className="text-center mb-4">
                  <Badge 
                    variant="outline" 
                    className={`${layer.color} border-current bg-background/80 mb-2`}
                  >
                    {layer.badge}
                  </Badge>
                  <h3 className={`text-xl font-bold ${layer.color}`}>{layer.label}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Responsabilità
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {layer.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Non fa
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {layer.notResponsible.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Arrows between layers */}
        <div className="hidden md:flex absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            animate={{
              x: activeLayer === "backend" && animationStep <= 1 ? [0, 10, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: activeLayer === "backend" && animationStep <= 1 ? Infinity : 0 }}
            className="text-2xl text-muted-foreground/50"
          >
            →
          </motion.div>
        </div>
        <div className="hidden md:flex absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            animate={{
              x: activeLayer === "database" ? [0, 10, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: activeLayer === "database" ? Infinity : 0 }}
            className="text-2xl text-muted-foreground/50"
          >
            →
          </motion.div>
        </div>
      </div>

      {/* Key message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center p-6 rounded-xl bg-gradient-to-r from-client/5 via-server/5 to-request/5 border"
      >
        <p className="text-lg font-medium">
          "Un'app reale è un sistema, non solo codice"
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Ogni livello ha un compito preciso. Se uno smette di funzionare, tutto si ferma.
        </p>
      </motion.div>
    </div>
  );
}
