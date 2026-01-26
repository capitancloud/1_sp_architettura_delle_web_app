import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Send, Server, Globe, Eye, ChevronLeft, ChevronRight, RotateCcw, Play } from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";
interface V3ModuleInterfaceProps {
  onNext?: () => void;
}

export function V3ModuleInterface({ onNext }: V3ModuleInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<string[]>(["Messaggio di esempio", "Un altro messaggio"]);
  const [lastAction, setLastAction] = useState<"none" | "typing" | "click" | "render">("none");
  const [showLegend, setShowLegend] = useState(true);
  const [step, setStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [manualHighlight, setManualHighlight] = useState<"none" | "client" | "server" | "both">("none");

  const steps = [
    { 
      id: "intro", 
      title: "Interfaccia Utente", 
      description: "Questa è un'interfaccia semplice: input, bottone, lista messaggi",
      highlight: "none" as const
    },
    { 
      id: "input", 
      title: "Input (Browser)", 
      description: "L'input è un Client Component - gestisce eventi nel browser",
      highlight: "client" as const
    },
    { 
      id: "click", 
      title: "Click Invia (Browser)", 
      description: "Il click attiva una Server Action - la richiesta va al server",
      highlight: "client" as const
    },
    { 
      id: "server", 
      title: "Lista (Server)", 
      description: "La lista è un Server Component - renderizzata sul server",
      highlight: "server" as const
    },
    { 
      id: "summary", 
      title: "Riepilogo", 
      description: "Input+eventi = Browser, Dati+lista = Server",
      highlight: "both" as const
    },
  ];

  const currentStep = steps[step];

  // Sincronizza l'highlight manuale con lo step corrente
  useEffect(() => {
    setManualHighlight(currentStep.highlight);
  }, [step, currentStep.highlight]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setLastAction("typing");
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      setLastAction("click");
      setTimeout(() => {
        setMessages(prev => [...prev, inputValue]);
        setInputValue("");
        setLastAction("render");
        setTimeout(() => setLastAction("none"), 2000);
      }, 1000);
    }
  };

  const handleStepChange = (newStep: number) => {
    if (!isAutoPlaying && newStep >= 0 && newStep < steps.length) {
      setStep(newStep);
      // Reset lastAction quando si naviga manualmente per evitare conflitti
      setLastAction("none");
    }
  };

  const runAutoPlay = () => {
    setIsAutoPlaying(true);
    setStep(0);
    setLastAction("none");
    let currentStepIndex = 0;
    const interval = setInterval(() => {
      currentStepIndex++;
      if (currentStepIndex >= steps.length) {
        clearInterval(interval);
        setIsAutoPlaying(false);
      } else {
        setStep(currentStepIndex);
      }
    }, 2500);
  };

  const resetDemo = () => {
    setStep(0);
    setMessages(["Messaggio di esempio", "Un altro messaggio"]);
    setInputValue("");
    setLastAction("none");
    setManualHighlight("none");
  };

  // Determina se un'area deve essere evidenziata
  const isClientHighlighted = manualHighlight === "client" || manualHighlight === "both" || lastAction === "typing" || lastAction === "click";
  const isServerHighlighted = manualHighlight === "server" || manualHighlight === "both" || lastAction === "render";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
          Modulo 1
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          🖥️ L'Interfaccia Base
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cosa vede l'utente e dove gira ogni pezzo
        </p>
      </div>

      {/* Explainer Boxes */}
      <div className="grid md:grid-cols-2 gap-4">
        <ExplainerBox type="tip" title="Cosa stai vedendo">
          Un'interfaccia semplice: input, bottone, lista. Interagisci e osserva dove gira ogni pezzo. 
          La <strong>Legenda Runtime</strong> ti mostra in tempo reale cosa sta succedendo.
        </ExplainerBox>
        
        <ExplainerBox type="analogy" title="Come un modulo radio">
          L'input è come il <strong>microfono</strong> (cattura la tua voce nel browser), 
          la lista è come l'<strong>altoparlante</strong> (riceve dati dal server e li mostra).
        </ExplainerBox>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Runtime Legend */}
        <Card className={`border-border/50 transition-all ${showLegend ? "" : "opacity-50"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Legenda Runtime
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowLegend(!showLegend)}
              >
                {showLegend ? "Nascondi" : "Mostra"}
              </Button>
            </CardTitle>
          </CardHeader>
          {showLegend && (
            <CardContent className="space-y-3">
              <div className={`
                p-3 rounded-lg border-2 transition-all
                ${lastAction === "typing" || lastAction === "click" 
                  ? "border-client bg-client/10 scale-105" 
                  : "border-border/30 bg-muted/20"
                }
              `}>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-client" />
                  <Badge className="bg-client/20 text-client border-client/30">Browser</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Input, click, eventi utente
                </p>
              </div>

              <div className={`
                p-3 rounded-lg border-2 transition-all
                ${lastAction === "render" 
                  ? "border-server bg-server/10 scale-105" 
                  : "border-border/30 bg-muted/20"
                }
              `}>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-server" />
                  <Badge className="bg-server/20 text-server border-server/30">Server</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recupero dati, rendering lista
                </p>
              </div>

              <div className="p-3 rounded-lg border-2 border-border/30 bg-muted/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs">🚫</span>
                  <Badge variant="outline">Non inviato</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Codice che resta sul server
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Interactive Demo */}
        <Card className={`lg:col-span-2 border-2 transition-all ${
          currentStep.highlight === "both" ? "border-purple-500" : "border-border/50"
        }`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Demo Interattiva</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetDemo} disabled={isAutoPlaying}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={runAutoPlay} disabled={isAutoPlaying}>
                  <Play className="w-4 h-4 mr-1" />
                  {isAutoPlaying ? "..." : "Auto"}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step Controls */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStepChange(step - 1)}
                  disabled={step === 0 || isAutoPlaying}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="text-center flex-1 px-4">
                  <Badge variant="outline" className="mb-1">{step + 1}/{steps.length}</Badge>
                  <p className="font-medium text-sm">{currentStep.title}</p>
                  <p className="text-xs text-muted-foreground">{currentStep.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStepChange(step + 1)}
                  disabled={step === steps.length - 1 || isAutoPlaying}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleStepChange(i)}
                    disabled={isAutoPlaying}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === step ? "w-6 bg-purple-500" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    } ${isAutoPlaying ? "cursor-not-allowed opacity-50" : ""}`}
                  />
                ))}
              </div>
            </div>
            {/* Input Area - Client */}
            <motion.div
              className={`
                p-4 rounded-lg border-2 transition-all
                ${isClientHighlighted
                  ? "border-client bg-client/5 ring-2 ring-client/20"
                  : "border-border/30"
                }
              `}
              animate={{
                scale: isClientHighlighted ? 1.01 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-client" />
                <Badge className="bg-client/20 text-client border-client/30 text-xs">
                  Client Component
                </Badge>
                <span className="text-xs text-muted-foreground">"use client"</span>
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend} className="gap-2">
                  <Send className="w-4 h-4" />
                  Invia
                </Button>
              </div>

              <AnimatePresence>
                {lastAction === "typing" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-client mt-2"
                  >
                    ⌨️ onChange nel browser → stato locale aggiornato
                  </motion.p>
                )}
                {lastAction === "click" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-client mt-2"
                  >
                    🖱️ onClick nel browser → chiamata verso il server...
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Arrow */}
            <AnimatePresence>
              {lastAction === "click" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <div className="px-4 py-2 rounded-full bg-request/20 border border-request/30 text-sm">
                    📤 Server Action in corso...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List Area - Server */}
            <motion.div
              className={`
                p-4 rounded-lg border-2 transition-all
                ${isServerHighlighted
                  ? "border-server bg-server/5 ring-2 ring-server/20"
                  : "border-border/30"
                }
              `}
              animate={{
                scale: isServerHighlighted ? 1.01 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-4 h-4 text-server" />
                <Badge className="bg-server/20 text-server border-server/30 text-xs">
                  Server Component
                </Badge>
                <span className="text-xs text-muted-foreground">default (no "use client")</span>
              </div>

              <div className="space-y-2">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={i === messages.length - 1 && lastAction === "render" ? { opacity: 0, x: -20 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    className={`
                      p-3 rounded bg-muted/30 border border-border/30
                      ${i === messages.length - 1 && lastAction === "render" ? "ring-2 ring-server" : ""}
                    `}
                  >
                    <span className="text-sm">{msg}</span>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {lastAction === "render" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-server mt-3"
                  >
                    ✓ Server ha aggiornato lo stato → lista re-renderizzata sul server → HTML inviato al browser
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Key Messages */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-client/30 bg-client/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-client mt-0.5" />
              <div>
                <p className="font-medium text-client">Input + Click = Browser</p>
                <p className="text-sm text-muted-foreground">
                  L'interazione utente avviene sempre nel browser. Servono Client Components.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-server/30 bg-server/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Server className="w-5 h-5 text-server mt-0.5" />
              <div>
                <p className="font-medium text-server">Recupero dati + Lista = Server</p>
                <p className="text-sm text-muted-foreground">
                  I dati vengono letti e la lista renderizzata sul server. Niente JavaScript inutile al client.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
