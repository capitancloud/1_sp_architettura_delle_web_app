import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Server, Globe, FileCode, ArrowRight, Play, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";

type SSRPhase = "idle" | "request" | "server-render" | "html-sent" | "hydration" | "interactive";

export function V3ModuleSSR() {
  const [phase, setPhase] = useState<SSRPhase>("idle");
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const phases = [
    { id: "request", label: "Browser richiede pagina", icon: "🌐", side: "client" },
    { id: "server-render", label: "Server genera HTML", icon: "🖥️", side: "server" },
    { id: "html-sent", label: "HTML inviato", icon: "📄", side: "transfer" },
    { id: "hydration", label: "Hydration (JS caricato)", icon: "💧", side: "client" },
    { id: "interactive", label: "Pagina interattiva", icon: "✨", side: "client" },
  ];

  const explanations = [
    {
      title: "Cos'è SSR?",
      description: "Server-Side Rendering: il server genera l'HTML prima di inviarlo al browser",
      benefit: "L'utente vede la pagina subito, senza aspettare JavaScript",
    },
    {
      title: "Perché esiste?",
      description: "Con le SPA tradizionali, il browser riceve una pagina vuota e poi la riempie con JS",
      benefit: "SSR manda una pagina già pronta → SEO migliore, caricamento percepito più veloce",
    },
    {
      title: "Cosa sono i Server Components in questo contesto?",
      description: "Componenti che vengono renderizzati SOLO sul server, riducendo il JS inviato al client",
      benefit: "Meno JavaScript = pagina più leggera e veloce",
    },
  ];

  const runAnimation = () => {
    setIsAnimating(true);
    const phaseOrder: SSRPhase[] = ["request", "server-render", "html-sent", "hydration", "interactive"];
    let i = 0;

    const interval = setInterval(() => {
      if (i < phaseOrder.length) {
        setPhase(phaseOrder[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 1500);
  };

  const currentExplanation = explanations[step];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
          Modulo 5
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          📄 Server-Side Rendering (SSR)
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Perché il server genera HTML e cosa significa per la tua app
        </p>
      </div>

      {/* Explainer Boxes */}
      <div className="grid md:grid-cols-2 gap-4">
        <ExplainerBox type="why" title="Perché SSR esiste?">
          Con le SPA tradizionali (React classico), il browser riceve una <strong>pagina vuota</strong> e poi la riempie con JavaScript. 
          Con SSR, il browser riceve <strong>HTML già pronto</strong> → l'utente vede subito il contenuto.
        </ExplainerBox>
        
        <ExplainerBox type="analogy" title="Come un libro vs. un puzzle">
          <strong>SPA</strong> = ricevi una scatola di pezzi (JS) e devi costruire il puzzle.<br/>
          <strong>SSR</strong> = ricevi il libro già stampato, pronto da leggere!
        </ExplainerBox>
      </div>

      <ExplainerBox type="tip" title="Hydration: il tocco finale">
        Dopo che il browser riceve l'HTML, <strong>React "idrata" la pagina</strong>: collega gli event handler 
        e rende interattivi i Client Components. L'utente vede subito il contenuto, poi arriva l'interattività.
      </ExplainerBox>

      {/* SSR Animation */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Ciclo SSR</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => { setPhase("idle"); setIsAnimating(false); }}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              <Button 
                size="sm" 
                onClick={runAnimation}
                disabled={isAnimating}
              >
                <Play className="w-4 h-4 mr-1" />
                {isAnimating ? "In corso..." : "Anima"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Phase Indicators */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
            {phases.map((p, i) => {
              const currentIndex = phases.findIndex(ph => ph.id === phase);
              const isActive = p.id === phase;
              const isPast = currentIndex > i;

              return (
                <div key={p.id} className="flex items-center">
                  <motion.div
                    className={`
                      flex flex-col items-center min-w-[90px]
                      ${isPast || isActive ? "opacity-100" : "opacity-40"}
                    `}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-xl
                      border-2 transition-all
                      ${isActive
                        ? p.side === "server" 
                          ? "border-server bg-server/20" 
                          : p.side === "client"
                            ? "border-client bg-client/20"
                            : "border-request bg-request/20"
                        : isPast
                          ? "border-accent bg-accent/20"
                          : "border-border bg-muted/20"
                      }
                    `}>
                      {p.icon}
                    </div>
                    <span className="text-xs mt-2 text-center font-medium">{p.label}</span>
                  </motion.div>
                  {i < phases.length - 1 && (
                    <ArrowRight className={`w-5 h-5 mx-1 ${
                      currentIndex > i ? "text-accent" : "text-muted-foreground/30"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Visualization */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Browser */}
            <motion.div
              className={`
                p-4 rounded-lg border-2 transition-all
                ${phase === "request" || phase === "hydration" || phase === "interactive"
                  ? "border-client bg-client/5"
                  : "border-border/30"
                }
              `}
            >
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-client" />
                <span className="font-medium text-client">Browser</span>
              </div>
              
              <div className="min-h-[120px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {phase === "idle" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-muted-foreground text-center"
                    >
                      In attesa...
                    </motion.p>
                  )}
                  {phase === "request" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <p className="text-sm">📤 GET /page</p>
                      <p className="text-xs text-muted-foreground mt-1">Richiesta inviata al server</p>
                    </motion.div>
                  )}
                  {phase === "server-render" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <p className="text-sm text-muted-foreground">⏳ Aspettando...</p>
                    </motion.div>
                  )}
                  {(phase === "html-sent" || phase === "hydration") && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full space-y-2"
                    >
                      <div className="p-2 rounded bg-muted/30 border border-border/30 text-xs">
                        📄 HTML ricevuto
                      </div>
                      {phase === "hydration" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-2 rounded bg-client/20 border border-client/30 text-xs"
                        >
                          💧 Caricando JS...
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                  {phase === "interactive" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full space-y-2"
                    >
                      <div className="p-2 rounded bg-accent/20 border border-accent/30 text-xs">
                        ✨ Pagina interattiva!
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Client Components ora funzionano
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Transfer */}
            <div className="flex items-center justify-center">
              <AnimatePresence>
                {phase === "html-sent" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <FileCode className="w-8 h-8 text-request" />
                    <span className="text-xs text-request mt-2">HTML pronto</span>
                    <motion.div
                      animate={{ x: [0, 20, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <ArrowRight className="w-6 h-6 text-request mt-2" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Server */}
            <motion.div
              className={`
                p-4 rounded-lg border-2 transition-all
                ${phase === "server-render"
                  ? "border-server bg-server/5"
                  : "border-border/30"
                }
              `}
            >
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-5 h-5 text-server" />
                <span className="font-medium text-server">Server</span>
              </div>
              
              <div className="min-h-[120px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {phase === "idle" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-muted-foreground text-center"
                    >
                      In attesa...
                    </motion.p>
                  )}
                  {phase === "request" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <p className="text-sm">📥 Ricevuto GET</p>
                    </motion.div>
                  )}
                  {phase === "server-render" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full space-y-2"
                    >
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="p-2 rounded bg-server/20 border border-server/30 text-xs"
                      >
                        🔄 Rendering componenti...
                      </motion.div>
                      <p className="text-xs text-muted-foreground text-center">
                        Server Components → HTML
                      </p>
                    </motion.div>
                  )}
                  {(phase === "html-sent" || phase === "hydration" || phase === "interactive") && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <p className="text-sm text-muted-foreground">✅ HTML inviato</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Explanation Steps */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{currentExplanation.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{currentExplanation.description}</p>
          
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
            <p className="text-sm font-medium text-accent">
              ✓ {currentExplanation.benefit}
            </p>
          </div>

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
              {explanations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === step ? "w-6 bg-purple-500" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep(s => Math.min(explanations.length - 1, s + 1))}
              disabled={step === explanations.length - 1}
            >
              Avanti
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Messages */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">📄</span>
            <p className="text-sm font-medium">"SSR esiste per avere UI pronta e coerente"</p>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">⚡</span>
            <p className="text-sm font-medium">"Meno lavoro nel browser"</p>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">📦</span>
            <p className="text-sm font-medium">"Server Components riducono JS inviato"</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
