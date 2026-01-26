import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Server, Database, Shield, ChevronLeft, ChevronRight, RotateCcw, Plus } from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";

export function V3ModuleServerComponents() {
  const [step, setStep] = useState(0);
  const [serverMessages, setServerMessages] = useState<string[]>(["Primo messaggio", "Secondo messaggio"]);
  const [isRendering, setIsRendering] = useState(false);

  const steps = [
    {
      title: "Cos'è un Server Component?",
      description: "Un componente React che gira SOLO sul server, mai nel browser",
      code: `// NESSUN "use client" → Server Component di default

export async function MessageList() {
  // Questo codice gira sul server
  const messages = await db.query("SELECT * FROM messages")
  
  return (
    <ul>
      {messages.map(m => <li key={m.id}>{m.text}</li>)}
    </ul>
  )
}`,
    },
    {
      title: "Cosa possono fare?",
      description: "Accedere a risorse che il browser non può vedere",
      capabilities: [
        { icon: "🗄️", text: "Leggere database direttamente", safe: true },
        { icon: "🔑", text: "Usare API keys segrete", safe: true },
        { icon: "📁", text: "Accedere al file system", safe: true },
        { icon: "🖱️", text: "Gestire onClick", safe: false },
        { icon: "⌨️", text: "Gestire onChange", safe: false },
        { icon: "🔄", text: "Usare useState/useEffect", safe: false },
      ],
    },
    {
      title: "Cosa NON arriva al browser?",
      description: "Il codice del Server Component resta sul server",
      notSent: [
        "La logica di fetch dei dati",
        "Le query al database",
        "Le API keys e secrets",
        "Le dipendenze usate solo server-side",
      ],
    },
  ];

  const simulateRender = () => {
    setIsRendering(true);
    setTimeout(() => {
      setServerMessages(prev => [...prev, `Messaggio #${prev.length + 1}`]);
      setIsRendering(false);
    }, 1500);
  };

  const currentStep = steps[step];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-2 bg-server/20 text-server border-server/30">
          Modulo 3
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          🖥️ Server Components
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cosa sono e perché sono diversi dai Client Components
        </p>
      </div>

      {/* Explainer Boxes */}
      <div className="grid md:grid-cols-2 gap-4">
        <ExplainerBox type="why" title="Perché sono diversi?">
          I Server Components girano <strong>solo sul server</strong>. Il browser riceve solo l'HTML finale, 
          non il codice JavaScript che lo ha generato. Questo significa: meno peso, più sicurezza.
        </ExplainerBox>
        
        <ExplainerBox type="analogy" title="Come una cucina di ristorante">
          Il Server Component è come lo <strong>chef in cucina</strong>: prepara il piatto (HTML) 
          ma il cliente (browser) vede solo il risultato finale, non la ricetta segreta!
        </ExplainerBox>
      </div>

      <ExplainerBox type="tip" title="Il default è Server">
        In Next.js App Router, <strong>tutti i componenti sono Server Components di default</strong>. 
        Devi aggiungere <code>"use client"</code> solo se hai bisogno di interattività.
      </ExplainerBox>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Step Content */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>{currentStep.title}</span>
              <Badge variant="outline">{step + 1}/{steps.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{currentStep.description}</p>

            {/* Step 0: Code */}
            {step === 0 && currentStep.code && (
              <div className="relative">
                <pre className="p-4 rounded-lg bg-muted/50 border border-border/50 text-sm overflow-x-auto">
                  <code className="text-foreground">
                    {currentStep.code.split('\n').map((line, i) => (
                      <div 
                        key={i}
                        className={`${
                          line.includes('await db.query') 
                            ? "bg-server/20 -mx-4 px-4 text-server" 
                            : line.includes('// NESSUN')
                              ? "text-muted-foreground italic"
                              : ""
                        }`}
                      >
                        {line}
                      </div>
                    ))}
                  </code>
                </pre>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-server/20 text-server border-server/30 text-xs">
                    Server
                  </Badge>
                </div>
              </div>
            )}

            {/* Step 1: Capabilities */}
            {step === 1 && currentStep.capabilities && (
              <div className="space-y-2">
                {currentStep.capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`
                      p-3 rounded-lg border flex items-center gap-3
                      ${cap.safe 
                        ? "bg-server/5 border-server/30" 
                        : "bg-destructive/5 border-destructive/30"
                      }
                    `}
                  >
                    <span>{cap.icon}</span>
                    <span className={cap.safe ? "text-foreground" : "text-muted-foreground line-through"}>
                      {cap.text}
                    </span>
                    <Badge 
                      className={`ml-auto text-xs ${
                        cap.safe 
                          ? "bg-server/20 text-server border-server/30" 
                          : "bg-destructive/20 text-destructive border-destructive/30"
                      }`}
                    >
                      {cap.safe ? "✓ Può" : "✗ Non può"}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Step 2: Not Sent */}
            {step === 2 && currentStep.notSent && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-server/10 border border-server/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-server" />
                    <span className="font-medium text-server">Mai inviato al browser:</span>
                  </div>
                  <div className="space-y-2">
                    {currentStep.notSent.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="text-server">🚫</span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Il browser riceve solo l'HTML già renderizzato, non il codice che lo ha generato.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Indietro
              </Button>
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === step ? "w-6 bg-server" : "w-2 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                disabled={step === steps.length - 1}
              >
                Avanti
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Server Visualization */}
        <Card className="border-server/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="w-5 h-5 text-server" />
              Simulazione Server
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* RAM Box */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-mono text-muted-foreground">💾 RAM Server</span>
                <Badge variant="outline" className="text-xs">
                  {serverMessages.length} messaggi
                </Badge>
              </div>
              <div className="font-mono text-xs bg-background/50 p-3 rounded border border-border/30 max-h-40 overflow-y-auto">
                <span className="text-muted-foreground">const messages = [</span>
                {serverMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={i === serverMessages.length - 1 ? { opacity: 0, backgroundColor: "hsl(var(--server) / 0.3)" } : false}
                    animate={{ opacity: 1, backgroundColor: "transparent" }}
                    className="pl-4"
                  >
                    <span className="text-server">"{msg}"</span>
                    {i < serverMessages.length - 1 && <span className="text-muted-foreground">,</span>}
                  </motion.div>
                ))}
                <span className="text-muted-foreground">]</span>
              </div>
            </div>

            {/* Render Simulation */}
            <div className="space-y-3">
              <Button
                onClick={simulateRender}
                disabled={isRendering}
                className="w-full gap-2"
              >
                {isRendering ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </motion.div>
                    Rendering sul server...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Simula nuovo messaggio
                  </>
                )}
              </Button>

              <AnimatePresence>
                {isRendering && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 rounded-lg bg-server/10 border border-server/30 text-sm"
                  >
                    <div className="flex items-center gap-2 text-server">
                      <Server className="w-4 h-4" />
                      <span>Server sta renderizzando...</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      1. Legge lo stato in memoria<br/>
                      2. Genera HTML<br/>
                      3. Invia al browser (solo HTML, no JS)
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Rendered Output */}
            <div className="p-4 rounded-lg bg-background border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-muted-foreground">📄 HTML inviato al browser:</span>
              </div>
              <div className="space-y-1">
                {serverMessages.map((msg, i) => (
                  <div 
                    key={i}
                    className="p-2 rounded bg-muted/30 text-sm border border-border/30"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Message */}
            <div className="p-4 rounded-lg bg-server/10 border border-server/30">
              <p className="text-sm font-medium text-server">
                🚫 Questo componente non viene inviato al browser
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Il server può leggere lo stato direttamente. Non servono fetch o API calls.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Messages */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-server/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">🖥️</span>
            <p className="text-sm font-medium">"Questo componente non viene inviato al browser"</p>
          </CardContent>
        </Card>
        <Card className="border-server/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">📖</span>
            <p className="text-sm font-medium">"Il server può leggere lo stato direttamente"</p>
          </CardContent>
        </Card>
        <Card className="border-server/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">🧠</span>
            <p className="text-sm font-medium">"È più facile costruire un modello mentale pulito"</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
