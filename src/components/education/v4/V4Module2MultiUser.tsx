import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, RotateCcw, User, Database, Server, ChevronLeft, ChevronRight } from "lucide-react";

interface V4Module2MultiUserProps {
  onNext: () => void;
}

interface UserData {
  id: string;
  name: string;
  color: string;
  items: string[];
}

const users: UserData[] = [
  { id: "alice", name: "Alice", color: "bg-blue-500", items: ["Lista spesa", "Appunti lavoro"] },
  { id: "bob", name: "Bob", color: "bg-green-500", items: ["Ricette", "Film da vedere", "Libri"] },
];

export function V4Module2MultiUser({ onNext }: V4Module2MultiUserProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [activeUser, setActiveUser] = useState<string | null>(null);

  const steps = useMemo(() => [
    { user: "alice", phase: "request", message: "Alice richiede i suoi dati" },
    { user: "alice", phase: "server", message: "Il server identifica Alice" },
    { user: "alice", phase: "database", message: "Il database filtra: WHERE user_id = 'alice'" },
    { user: "alice", phase: "response", message: "Alice vede solo i SUOI dati" },
    { user: "bob", phase: "request", message: "Bob richiede i suoi dati" },
    { user: "bob", phase: "server", message: "Il server identifica Bob" },
    { user: "bob", phase: "database", message: "Il database filtra: WHERE user_id = 'bob'" },
    { user: "bob", phase: "response", message: "Bob vede solo i SUOI dati" },
  ], []);

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    setActiveUser("alice");

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setAnimationStep(step);
        setActiveUser(steps[step].user);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }
    }, 1200);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationStep(0);
    setActiveUser(null);
  };

  const goToStep = (index: number) => {
    if (!isAnimating) {
      setAnimationStep(index);
      setActiveUser(steps[index].user);
    }
  };

  const goPrevStep = () => {
    if (!isAnimating && animationStep > 0) {
      goToStep(animationStep - 1);
    }
  };

  const goNextStep = () => {
    if (!isAnimating && animationStep < steps.length - 1) {
      goToStep(animationStep + 1);
    }
  };

  const currentStep = steps[animationStep];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="outline" className="mb-2">Modulo 2</Badge>
        <h1 className="text-3xl font-bold">Multi-utente: Perché Serve un Database</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Due utenti, stesso server, stesso database. Ma dati <strong>completamente separati</strong>.
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
          {isAnimating ? "In corso..." : "Simula due utenti"}
        </Button>
        <Button variant="outline" onClick={resetAnimation} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {/* Animation message */}
      <AnimatePresence mode="wait">
        {activeUser && (
          <motion.div
            key={animationStep}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center p-3 rounded-lg bg-muted"
          >
            <span className="text-sm font-medium">{currentStep?.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual navigation */}
      {activeUser && (
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
            {steps.map((step, i) => (
              <motion.button
                key={i}
                onClick={() => goToStep(i)}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === animationStep 
                    ? `scale-125 ${step.user === "alice" ? "bg-blue-500" : "bg-green-500"}` 
                    : i < animationStep 
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
            disabled={isAnimating || animationStep === steps.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Visual diagram */}
      <div className="grid md:grid-cols-4 gap-4 items-stretch">
        {/* Users column */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-center text-muted-foreground">Utenti</h3>
          {users.map((user) => (
            <motion.div
              key={user.id}
              animate={{
                scale: activeUser === user.id ? 1.05 : 1,
                opacity: activeUser && activeUser !== user.id ? 0.5 : 1,
              }}
            >
              <Card className={`${activeUser === user.id ? "ring-2 ring-primary" : ""}`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center`}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Server */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Server</h3>
          <motion.div
            animate={{
              scale: currentStep?.phase === "server" ? 1.1 : 1,
              boxShadow: currentStep?.phase === "server" ? "0 0 20px rgba(var(--server), 0.5)" : "none",
            }}
            className="w-20 h-20 rounded-xl bg-server/10 border-2 border-server/30 flex items-center justify-center"
          >
            <Server className="w-8 h-8 text-server" />
          </motion.div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Stesso endpoint<br />per tutti</p>
        </div>

        {/* Database */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Database</h3>
          <motion.div
            animate={{
              scale: currentStep?.phase === "database" ? 1.1 : 1,
              boxShadow: currentStep?.phase === "database" ? "0 0 20px rgba(var(--request), 0.5)" : "none",
            }}
            className="w-20 h-20 rounded-xl bg-request/10 border-2 border-request/30 flex items-center justify-center"
          >
            <Database className="w-8 h-8 text-request" />
          </motion.div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Stesse tabelle<br />righe diverse</p>
        </div>

        {/* Data column */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-center text-muted-foreground">Dati visti</h3>
          {users.map((user) => (
            <motion.div
              key={user.id}
              animate={{
                opacity: activeUser === user.id && currentStep?.phase === "response" ? 1 : 0.3,
                scale: activeUser === user.id && currentStep?.phase === "response" ? 1.05 : 1,
              }}
            >
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${user.color}`} />
                    <span className="text-xs font-medium">Dati di {user.name}</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {user.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SQL visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl bg-muted/50 p-6 font-mono text-sm"
      >
        <div className="text-muted-foreground mb-2">Query eseguita dal server:</div>
        <motion.code
          key={activeUser || "default"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary"
        >
          SELECT * FROM items WHERE user_id = '{activeUser || "???"}'
        </motion.code>
        <div className="text-xs text-muted-foreground mt-4">
          👆 Questo è il segreto del multi-utente: ogni query è <strong>filtrata per utente</strong>.
        </div>
      </motion.div>

      {/* Key messages */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="font-medium text-sm">"Senza database non esiste multi-utente"</p>
          <p className="text-xs text-muted-foreground mt-1">
            La RAM si svuota, i dati spariscono. Il database mantiene tutto separato.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="font-medium text-sm">"La persistenza rende l'app affidabile"</p>
          <p className="text-xs text-muted-foreground mt-1">
            Gli utenti tornano e trovano i loro dati. Sempre.
          </p>
        </div>
      </div>
    </div>
  );
}
