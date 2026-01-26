import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, RotateCcw, ChevronLeft, ChevronRight, Trophy,
  User, Lock, Cookie, Send, Server, Database, FileCode, Globe
} from "lucide-react";

interface V4Module7SummaryProps {
  onNext: () => void;
}

interface TimelineStep {
  icon: React.ReactNode;
  label: string;
  layer: "frontend" | "backend" | "database" | "network";
  description: string;
}

const layerColors = {
  frontend: "bg-client text-white",
  backend: "bg-server text-white",
  database: "bg-request text-white",
  network: "bg-accent text-accent-foreground",
};

const layerBadges = {
  frontend: "🌐 Frontend",
  backend: "⚡ Backend",
  database: "📊 Database",
  network: "🔗 Network",
};

export function V4Module7Summary({ onNext }: V4Module7SummaryProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const timeline: TimelineStep[] = useMemo(() => [
    {
      icon: <User className="w-5 h-5" />,
      label: "Utente",
      layer: "frontend",
      description: "L'utente apre l'app e vuole accedere ai suoi dati",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      label: "Login",
      layer: "frontend",
      description: "Inserisce email e password nel form",
    },
    {
      icon: <Send className="w-5 h-5" />,
      label: "Richiesta HTTP",
      layer: "network",
      description: "Il browser invia le credenziali al server",
    },
    {
      icon: <Server className="w-5 h-5" />,
      label: "Backend",
      layer: "backend",
      description: "Il server riceve e valida le credenziali",
    },
    {
      icon: <Database className="w-5 h-5" />,
      label: "Database",
      layer: "database",
      description: "Prisma cerca l'utente e verifica la password",
    },
    {
      icon: <Cookie className="w-5 h-5" />,
      label: "Sessione",
      layer: "backend",
      description: "Il server crea un token di sessione",
    },
    {
      icon: <Server className="w-5 h-5" />,
      label: "Query filtrata",
      layer: "backend",
      description: "Il server richiede i dati filtrati per utente",
    },
    {
      icon: <Database className="w-5 h-5" />,
      label: "Dati utente",
      layer: "database",
      description: "Il database restituisce solo i dati dell'utente",
    },
    {
      icon: <FileCode className="w-5 h-5" />,
      label: "Rendering",
      layer: "backend",
      description: "Il server prepara la risposta HTML/JSON",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: "UI",
      layer: "frontend",
      description: "L'interfaccia mostra i dati all'utente",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      label: "App Online",
      layer: "frontend",
      description: "L'utente usa l'app. Tutto funziona.",
    },
  ], []);

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < timeline.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1200);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  const goToStep = (index: number) => {
    if (!isAnimating) {
      setCurrentStep(index);
    }
  };

  const goPrevStep = () => {
    if (!isAnimating && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goNextStep = () => {
    if (!isAnimating && currentStep < timeline.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="outline" className="mb-2">Modulo 7 - Finale</Badge>
        <h1 className="text-3xl font-bold">Flusso Completo: Da Utente a App Online</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Tutto insieme: login, sessione, database, rendering. Il ciclo completo.
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
          {isAnimating ? "In corso..." : "Avvia timeline"}
        </Button>
        <Button variant="outline" onClick={resetAnimation} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {/* Manual navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={goPrevStep}
          disabled={isAnimating || currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="flex gap-1.5 overflow-y-visible py-3 flex-wrap justify-center max-w-xs">
          {timeline.map((step, i) => (
            <motion.button
              key={i}
              onClick={() => goToStep(i)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentStep 
                  ? `scale-125 ${layerColors[step.layer].split(' ')[0]}` 
                  : i < currentStep 
                    ? "bg-accent" 
                    : "bg-muted"
              }`}
              whileHover={!isAnimating ? { scale: 1.3 } : {}}
            />
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={goNextStep}
          disabled={isAnimating || currentStep === timeline.length - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Timeline visualization */}
      <div className="relative overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max px-4">
          {timeline.map((step, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === currentStep ? 1.1 : 1,
                opacity: i <= currentStep ? 1 : 0.3,
              }}
              className="flex flex-col items-center"
            >
              {/* Step icon */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                transition-all
                ${i <= currentStep ? layerColors[step.layer] : "bg-muted text-muted-foreground"}
              `}>
                {step.icon}
              </div>

              {/* Label */}
              <span className="text-xs font-medium mt-2 text-center max-w-[80px]">
                {step.label}
              </span>

              {/* Layer badge */}
              <span className={`text-[10px] mt-1 ${i <= currentStep ? "" : "opacity-50"}`}>
                {layerBadges[step.layer]}
              </span>

              {/* Arrow */}
              {i < timeline.length - 1 && (
                <div className="absolute top-5 ml-[68px]">
                  <motion.span
                    animate={{
                      opacity: i < currentStep ? 1 : 0.2,
                      color: i < currentStep ? "var(--primary)" : "var(--muted-foreground)",
                    }}
                    className="text-lg"
                  >
                    →
                  </motion.span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current step details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Card className={`border-2 ${
            timeline[currentStep].layer === "frontend" ? "border-client/30 bg-client/5" :
            timeline[currentStep].layer === "backend" ? "border-server/30 bg-server/5" :
            timeline[currentStep].layer === "database" ? "border-request/30 bg-request/5" :
            "border-accent/30 bg-accent/5"
          }`}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center
                ${layerColors[timeline[currentStep].layer]}
              `}>
                {timeline[currentStep].icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">{timeline[currentStep].label}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {layerBadges[timeline[currentStep].layer]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {timeline[currentStep].description}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Celebration when complete */}
      {currentStep === timeline.length - 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-2 border-primary/30"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-5xl mb-4"
          >
            🏆
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Hai completato il percorso!</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Ora sai come funziona un'applicazione web reale: dal click dell'utente 
            fino al database e ritorno. Non è più magia, è ingegneria.
          </p>
        </motion.div>
      )}

      {/* Final philosophy */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-muted/30">
          <CardContent className="p-6 text-center">
            <h4 className="font-bold mb-2">Prima la comprensione</h4>
            <p className="text-sm text-muted-foreground">
              Non importa quante righe di codice scrivi, importa che capisci cosa fanno.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="p-6 text-center">
            <h4 className="font-bold mb-2">Poi la complessità</h4>
            <p className="text-sm text-muted-foreground">
              Una volta che hai le basi solide, puoi aggiungere qualsiasi feature.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Final message */}
      <div className="text-center p-6 rounded-xl bg-gradient-to-r from-client/10 via-server/10 to-request/10 border">
        <p className="text-lg font-medium">
          "Questa app è semplice da usare, ma completa dal punto di vista tecnico"
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Hai visto come nasce un prodotto reale, come si integrano le tecnologie, 
          e come si passa dallo studio alla produzione.
        </p>
      </div>
    </div>
  );
}
