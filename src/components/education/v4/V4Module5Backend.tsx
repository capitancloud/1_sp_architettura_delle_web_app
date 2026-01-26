import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, ChevronLeft, ChevronRight, Database, Server, Code2 } from "lucide-react";

interface V4Module5BackendProps {
  onNext: () => void;
}

const codeExamples = {
  create: {
    title: "CREATE - Nuovo item",
    endpoint: "POST /api/items",
    prisma: `const newItem = await prisma.item.create({
  data: {
    content: "Lista spesa",
    userId: user.id  // ← ID utente autenticato
  }
});`,
    explanation: "Prisma crea automaticamente l'ID e il timestamp",
  },
  read: {
    title: "READ - Leggi items",
    endpoint: "GET /api/items",
    prisma: `const items = await prisma.item.findMany({
  where: { 
    userId: user.id  // ← Solo i suoi items!
  },
  orderBy: { createdAt: 'desc' }
});`,
    explanation: "WHERE garantisce isolamento tra utenti",
  },
  update: {
    title: "UPDATE - Modifica",
    endpoint: "PUT /api/items/:id",
    prisma: `const updated = await prisma.item.update({
  where: { 
    id: itemId,
    userId: user.id  // ← Sicurezza: solo se suo
  },
  data: { content: "Nuovo contenuto" }
});`,
    explanation: "Doppia condizione: ID item + proprietario",
  },
  delete: {
    title: "DELETE - Elimina",
    endpoint: "DELETE /api/items/:id",
    prisma: `await prisma.item.delete({
  where: { 
    id: itemId,
    userId: user.id  // ← Non puoi eliminare item di altri
  }
});`,
    explanation: "Nessun dato viene restituito dopo la delete",
  },
};

export function V4Module5Backend({ onNext }: V4Module5BackendProps) {
  const [activeOperation, setActiveOperation] = useState<keyof typeof codeExamples>("create");
  const [isAnimating, setIsAnimating] = useState(false);
  const [flowStep, setFlowStep] = useState(0);

  const flowSteps = useMemo(() => [
    { icon: "🌐", label: "Frontend", desc: "Invia richiesta HTTP" },
    { icon: "⚡", label: "API Route", desc: "Riceve e valida" },
    { icon: "🔐", label: "Auth Check", desc: "Verifica il token" },
    { icon: "📊", label: "Prisma", desc: "Esegue la query" },
    { icon: "💾", label: "PostgreSQL", desc: "Legge/scrive dati" },
    { icon: "←", label: "Response", desc: "JSON al frontend" },
  ], []);

  const startFlow = () => {
    setIsAnimating(true);
    setFlowStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < flowSteps.length) {
        setFlowStep(step);
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1000);
  };

  const resetFlow = () => {
    setIsAnimating(false);
    setFlowStep(0);
  };

  const goToFlowStep = (index: number) => {
    if (!isAnimating) {
      setFlowStep(index);
    }
  };

  const goPrevFlowStep = () => {
    if (!isAnimating && flowStep > 0) {
      setFlowStep(flowStep - 1);
    }
  };

  const goNextFlowStep = () => {
    if (!isAnimating && flowStep < flowSteps.length - 1) {
      setFlowStep(flowStep + 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="outline" className="mb-2">Modulo 5</Badge>
        <h1 className="text-3xl font-bold">Backend Reale: API + Database</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Le API non fanno magie: ricevono richieste, interrogano il database, restituiscono risposte.
        </p>
      </div>

      {/* Flow animation */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Server className="w-5 h-5" />
            Flusso di una richiesta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-3">
            <Button
              variant={isAnimating ? "secondary" : "default"}
              size="sm"
              onClick={startFlow}
              disabled={isAnimating}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              Anima
            </Button>
            <Button variant="outline" size="sm" onClick={resetFlow} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          {/* Flow steps */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-4">
            {flowSteps.map((step, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === flowStep ? 1.1 : 1,
                  opacity: i <= flowStep ? 1 : 0.4,
                }}
                className="flex flex-col items-center min-w-[80px]"
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl
                  transition-colors
                  ${i === flowStep ? "bg-primary text-primary-foreground" : "bg-muted"}
                `}>
                  {step.icon}
                </div>
                <span className="text-xs font-medium mt-2">{step.label}</span>
                <span className="text-[10px] text-muted-foreground">{step.desc}</span>
              </motion.div>
            ))}
          </div>

          {/* Manual step navigation */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={goPrevFlowStep}
              disabled={isAnimating || flowStep === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2 overflow-y-visible py-2">
              {flowSteps.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goToFlowStep(i)}
                  disabled={isAnimating}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === flowStep ? "bg-primary scale-125" : i < flowStep ? "bg-accent" : "bg-muted"
                  }`}
                  whileHover={!isAnimating ? { scale: 1.3 } : {}}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={goNextFlowStep}
              disabled={isAnimating || flowStep === flowSteps.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CRUD operations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Operazioni CRUD con Prisma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeOperation} onValueChange={(v) => setActiveOperation(v as keyof typeof codeExamples)}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
              <TabsTrigger value="update">Update</TabsTrigger>
              <TabsTrigger value="delete">Delete</TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([key, example]) => (
              <TabsContent key={key} value={key} className="mt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{example.title}</h4>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {example.endpoint}
                      </Badge>
                    </div>
                    
                    <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-foreground">{example.prisma}</code>
                    </pre>
                    
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">💡</span>
                      {example.explanation}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* What Prisma does / doesn't do */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-6">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Cosa fa Prisma
            </h4>
            <ul className="space-y-2 text-sm">
              <li>✓ Traduce TypeScript in SQL</li>
              <li>✓ Gestisce le migrazioni del database</li>
              <li>✓ Fornisce tipizzazione completa</li>
              <li>✓ Semplifica relazioni complesse</li>
              <li>✓ Previene SQL injection</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-6">
            <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Cosa NON fa Prisma
            </h4>
            <ul className="space-y-2 text-sm">
              <li>✗ Non valida i dati in ingresso (usa Zod)</li>
              <li>✗ Non gestisce l'autenticazione</li>
              <li>✗ Non decide chi può vedere cosa</li>
              <li>✗ Non gestisce le sessioni</li>
              <li>✗ Non si occupa delle risposte HTTP</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Key message */}
      <div className="text-center p-6 rounded-xl bg-gradient-to-r from-server/10 via-request/10 to-primary/10 border">
        <p className="text-lg font-medium">
          "Prisma è il ponte tra il tuo codice e il database"
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Scrivi TypeScript, lui genera SQL sicuro e tipizzato.
        </p>
      </div>
    </div>
  );
}
