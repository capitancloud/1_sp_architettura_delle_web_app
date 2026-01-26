import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, RotateCcw, ChevronLeft, ChevronRight,
  User, Lock, Key, Shield, Cookie, CheckCircle, XCircle 
} from "lucide-react";

interface V4Module4AuthProps {
  onNext: () => void;
}

type Phase = "idle" | "register" | "login" | "session" | "access" | "protected";

interface Step {
  phase: Phase;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

export function V4Module4Auth({ onNext }: V4Module4AuthProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showWithoutAuth, setShowWithoutAuth] = useState(false);

  const steps: Step[] = useMemo(() => [
    {
      phase: "register",
      title: "1. Registrazione",
      description: "L'utente crea un account",
      icon: <User className="w-6 h-6" />,
      details: [
        "Email e password inviate al server",
        "Password hashata (mai salvata in chiaro!)",
        "Nuovo record creato nel database",
        "Utente ora esiste nel sistema",
      ],
    },
    {
      phase: "login",
      title: "2. Login",
      description: "L'utente si identifica",
      icon: <Lock className="w-6 h-6" />,
      details: [
        "Email e password inviate",
        "Server verifica le credenziali",
        "Se corrette → genera un token",
        "Se errate → errore 401",
      ],
    },
    {
      phase: "session",
      title: "3. Sessione",
      description: "Il token viene salvato",
      icon: <Cookie className="w-6 h-6" />,
      details: [
        "Token salvato in un cookie/localStorage",
        "Inviato automaticamente ad ogni richiesta",
        "Il server riconosce l'utente",
        "Nessun bisogno di rifare login",
      ],
    },
    {
      phase: "access",
      title: "4. Accesso Protetto",
      description: "Solo dati dell'utente",
      icon: <Shield className="w-6 h-6" />,
      details: [
        "Richiesta include il token",
        "Server decodifica → identifica utente",
        "Query filtrata: WHERE userId = ...",
        "Dati di altri utenti invisibili",
      ],
    },
    {
      phase: "protected",
      title: "5. Route Protette",
      description: "Pagine accessibili solo se loggati",
      icon: <Key className="w-6 h-6" />,
      details: [
        "Middleware verifica il token",
        "Token valido → accesso consentito",
        "Token mancante/invalido → redirect a login",
        "Protezione lato server, non client",
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
    }, 2000);
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
        <Badge variant="outline" className="mb-2">Modulo 4</Badge>
        <h1 className="text-3xl font-bold">Autenticazione: Identità e Sessioni</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Come fa il server a sapere <strong>chi sei</strong>? E come ricorda che sei già entrato?
        </p>
      </div>

      {/* Toggle: with/without auth */}
      <div className="flex justify-center gap-4">
        <Button
          variant={!showWithoutAuth ? "default" : "outline"}
          onClick={() => setShowWithoutAuth(false)}
          className="gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Con autenticazione
        </Button>
        <Button
          variant={showWithoutAuth ? "destructive" : "outline"}
          onClick={() => setShowWithoutAuth(true)}
          className="gap-2"
        >
          <XCircle className="w-4 h-4" />
          Senza autenticazione
        </Button>
      </div>

      {/* Without auth warning */}
      <AnimatePresence mode="wait">
        {showWithoutAuth ? (
          <motion.div
            key="without"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 rounded-xl bg-destructive/10 border border-destructive/30"
          >
            <h3 className="font-bold text-destructive flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5" />
              Senza autenticazione
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                Chiunque può vedere i dati di tutti
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                Nessuna separazione tra utenti
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                Impossibile personalizzare l'esperienza
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                Nessuna protezione delle route
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              "Multi-utente senza autenticazione non esiste"
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="with"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Controls */}
            <div className="flex justify-center gap-3">
              <Button
                variant={isAnimating ? "secondary" : "default"}
                onClick={startAnimation}
                disabled={isAnimating}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                {isAnimating ? "In corso..." : "Anima flusso auth"}
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

            {/* Step visualization */}
            <div className="grid md:grid-cols-5 gap-3">
              {steps.map((step, i) => (
                <motion.div
                  key={step.phase}
                  animate={{
                    scale: i === currentStep ? 1.05 : 1,
                    opacity: i <= currentStep ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`h-full transition-all ${i === currentStep ? "ring-2 ring-primary" : ""}`}>
                    <CardContent className="p-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center mb-3
                        ${i === currentStep ? "bg-primary text-primary-foreground" : "bg-muted"}
                      `}>
                        {step.icon}
                      </div>
                      <h4 className="font-semibold text-sm">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Current step details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 rounded-xl bg-muted/50"
              >
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  {steps[currentStep].icon}
                  {steps[currentStep].title}
                </h4>
                <ul className="space-y-2">
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
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key messages */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
          <p className="font-semibold text-sm">"Autenticazione = Identità"</p>
          <p className="text-xs text-muted-foreground mt-1">Chi sei?</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
          <p className="font-semibold text-sm">"Sessione = Continuità"</p>
          <p className="text-xs text-muted-foreground mt-1">Rimani loggato</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
          <p className="font-semibold text-sm">"Token = Prova"</p>
          <p className="text-xs text-muted-foreground mt-1">Il server ti riconosce</p>
        </div>
      </div>
    </div>
  );
}
