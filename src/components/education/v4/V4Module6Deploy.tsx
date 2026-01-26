import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, RotateCcw, ChevronLeft, ChevronRight,
  Laptop, GitBranch, Github, Cloud, Database, Globe, Lock
} from "lucide-react";

interface V4Module6DeployProps {
  onNext: () => void;
}

interface DeployStep {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  details: string[];
  command?: string;
}

export function V4Module6Deploy({ onNext }: V4Module6DeployProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps: DeployStep[] = useMemo(() => [
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "1. Codice Locale",
      subtitle: "Sviluppo sulla tua macchina",
      details: [
        "Scrivi codice nel tuo editor",
        "Testi in localhost:3000",
        "Database locale per sviluppo",
        "Nessuno può vederlo ancora",
      ],
      command: "npm run dev",
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "2. Commit Git",
      subtitle: "Salva le modifiche",
      details: [
        "Aggiungi i file modificati",
        "Scrivi un messaggio descrittivo",
        "Crea un punto di salvataggio",
        "Cronologia completa delle modifiche",
      ],
      command: 'git commit -m "Add user authentication"',
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "3. Push su GitHub",
      subtitle: "Codice nel cloud",
      details: [
        "Repository remoto",
        "Backup del codice",
        "Collaborazione con altri",
        "Trigger per il deploy",
      ],
      command: "git push origin main",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "4. Variabili d'Ambiente",
      subtitle: "Segreti sicuri",
      details: [
        "DATABASE_URL per PostgreSQL",
        "JWT_SECRET per i token",
        "Mai nel codice!",
        "Diverse per dev/prod",
      ],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "5. Database Produzione",
      subtitle: "Dati reali",
      details: [
        "PostgreSQL su cloud (Supabase, Railway)",
        "Migrazioni applicate",
        "Backup automatici",
        "Separato dal database locale",
      ],
      command: "npx prisma migrate deploy",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "6. Deploy Vercel",
      subtitle: "Build automatica",
      details: [
        "Vercel rileva il push",
        "Installa dipendenze",
        "Esegue la build",
        "Crea l'ambiente di produzione",
      ],
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "7. URL Pubblico",
      subtitle: "Online per tutti!",
      details: [
        "myapp.vercel.app",
        "HTTPS automatico",
        "CDN globale",
        "Accessibile da chiunque",
      ],
    },
  ], []);

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1500);
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
    if (!isAnimating && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="outline" className="mb-2">Modulo 6</Badge>
        <h1 className="text-3xl font-bold">Dal Codice al Mondo: Git e Deploy</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Come si passa da "funziona sul mio computer" a "funziona per tutti"?
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
          {isAnimating ? "In corso..." : "Anima il deploy"}
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
        <div className="flex gap-2 overflow-y-visible py-3">
          {steps.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goToStep(i)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentStep ? "bg-primary scale-125" : i < currentStep ? "bg-accent" : "bg-muted"
              }`}
              whileHover={!isAnimating ? { scale: 1.3 } : {}}
            />
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={goNextStep}
          disabled={isAnimating || currentStep === steps.length - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Visual pipeline */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 hidden md:block" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 hidden md:block"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Steps */}
        <div className="grid grid-cols-7 gap-2 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === currentStep ? 1.1 : 1,
                opacity: i <= currentStep ? 1 : 0.4,
              }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => goToStep(i)}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                transition-colors bg-background border-2
                ${i === currentStep 
                  ? "border-primary bg-primary text-primary-foreground" 
                  : i < currentStep 
                    ? "border-accent bg-accent/10"
                    : "border-muted"
                }
              `}>
                {step.icon}
              </div>
              <span className="text-[10px] font-medium mt-2 text-center hidden md:block">
                {step.title.split(' ').slice(1).join(' ')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current step details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  {steps[currentStep].icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{steps[currentStep].title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{steps[currentStep].subtitle}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {steps[currentStep].details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-primary">→</span>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>

                  {steps[currentStep].command && (
                    <code className="block bg-muted rounded-lg p-3 font-mono text-sm">
                      $ {steps[currentStep].command}
                    </code>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Env variables note */}
      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <h4 className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2 mb-2">
          <Lock className="w-4 h-4" />
          Le variabili d'ambiente sono cruciali
        </h4>
        <p className="text-sm text-muted-foreground">
          In locale usi <code className="bg-muted px-1 rounded">.env.local</code>, 
          in produzione le configuri su Vercel. <strong>Mai committare segreti su Git!</strong>
        </p>
      </div>

      {/* Key messages */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
          <p className="font-semibold text-sm">"In produzione non sei più solo"</p>
          <p className="text-xs text-muted-foreground mt-1">
            Chiunque può accedere, devi pensare a sicurezza e performance
          </p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
          <p className="font-semibold text-sm">"Il codice ora gira per altri"</p>
          <p className="text-xs text-muted-foreground mt-1">
            Non è più un esercizio: è un prodotto reale
          </p>
        </div>
      </div>
    </div>
  );
}
