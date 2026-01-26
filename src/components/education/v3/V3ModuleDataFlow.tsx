import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Globe, Server, ArrowRight, Send, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";

type FlowStep = "idle" | "click" | "action" | "update" | "render" | "done";

interface V3ModuleDataFlowProps {
  onNext?: () => void;
}

export function V3ModuleDataFlow({ onNext }: V3ModuleDataFlowProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<string[]>(["Messaggio esistente"]);
  const [flowStep, setFlowStep] = useState<FlowStep>("idle");
  const [isAnimating, setIsAnimating] = useState(false);

  const flowSteps = useMemo(
    () => [
    { id: "click", label: "Click nel Browser", icon: "🖱️", env: "client" },
    { id: "action", label: "Server Action chiamata", icon: "📤", env: "request" },
    { id: "update", label: "Stato aggiornato in RAM", icon: "💾", env: "server" },
    { id: "render", label: "Server re-renderizza", icon: "🔄", env: "server" },
    { id: "done", label: "UI aggiornata", icon: "✅", env: "client" },
    ],
    []
  );

  const orderedStepIds = useMemo(() => ["click", "action", "update", "render", "done"] as const, []);

  const getStepIndex = () => flowSteps.findIndex(s => s.id === flowStep);

  const goToStepIndex = (idx: number) => {
    if (isAnimating) return;
    if (idx < 0) {
      setFlowStep("idle");
      return;
    }
    if (idx >= flowSteps.length) return;
    setFlowStep(flowSteps[idx].id as FlowStep);
  };

  const goPrev = () => goToStepIndex(getStepIndex() - 1);
  const goNext = () => goToStepIndex(getStepIndex() + 1);

  const runFlow = () => {
    if (!inputValue.trim()) return;
    
    setIsAnimating(true);
    const steps: FlowStep[] = [...orderedStepIds];
    let i = 0;

    const interval = setInterval(() => {
      if (i < steps.length) {
        setFlowStep(steps[i]);
        if (steps[i] === "update") {
          setMessages(prev => [...prev, inputValue]);
        }
        i++;
      } else {
        clearInterval(interval);
        setInputValue("");
        setTimeout(() => {
          setFlowStep("idle");
          setIsAnimating(false);
        }, 1500);
      }
    }, 1200);
  };

  const reset = () => {
    setFlowStep("idle");
    setMessages(["Messaggio esistente"]);
    setInputValue("");
    setIsAnimating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-2 bg-request/20 text-request border-request/30">
          Modulo 4
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          🔄 Flusso Dati: Server Actions
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Come i dati passano dal browser al server e tornano indietro
        </p>
      </div>

      {/* Explainer Boxes */}
      <div className="grid md:grid-cols-2 gap-4">
        <ExplainerBox type="why" title="Cosa sono le Server Actions?">
          Una Server Action è una <strong>funzione che gira sul server</strong> ma può essere chiamata 
          dal client come se fosse locale. È il modo moderno per far comunicare browser e server.
        </ExplainerBox>
        
        <ExplainerBox type="analogy" title="Come ordinare al ristorante">
          Cliccare "Invia" è come <strong>chiamare il cameriere</strong>. Tu (browser) fai l'ordine, 
          il cameriere (Server Action) lo porta in cucina (server), e torna con il piatto (UI aggiornata).
        </ExplainerBox>
      </div>

      <ExplainerBox type="remember">
        Il flusso è sempre: <strong>Browser → HTTP → Server → Aggiorna stato → Re-render → Browser</strong>. 
        La magia di Next.js è rendere questo flusso trasparente con <code>"use server"</code>.
      </ExplainerBox>

      {/* Flow Diagram */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Flusso Completo</span>
            <div className="flex gap-2">
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goPrev}
                  disabled={isAnimating || getStepIndex() <= 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goNext}
                  disabled={isAnimating || getStepIndex() >= flowSteps.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step Indicators */}
          <div className="mb-6">
            <div className="flex items-center justify-between overflow-x-auto overflow-y-visible py-3">
              {flowSteps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <motion.button
                    type="button"
                    disabled={isAnimating}
                    onClick={() => goToStepIndex(i)}
                    className={
                      `flex flex-col items-center min-w-[92px] px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-md ` +
                      `${getStepIndex() >= i ? "opacity-100" : "opacity-40"} ` +
                      `${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`
                    }
                    animate={{
                      scale: flowStep === step.id ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <div className={
                      `w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all ` +
                      (flowStep === step.id
                        ? step.env === "client"
                          ? "border-client bg-client/20"
                          : step.env === "server"
                            ? "border-server bg-server/20"
                            : "border-request bg-request/20"
                        : getStepIndex() > i
                          ? "border-accent bg-accent/20"
                          : "border-border bg-muted/20")
                    }>
                      {step.icon}
                    </div>
                    <span className="text-xs mt-2 text-center font-medium leading-tight">{step.label}</span>
                    <Badge
                      variant="outline"
                      className={`mt-1 text-[10px] ${
                        step.env === "client" ? "text-client" :
                        step.env === "server" ? "text-server" : "text-request"
                      }`}
                    >
                      {step.env === "client" ? "Browser" : step.env === "server" ? "Server" : "HTTP"}
                    </Badge>
                  </motion.button>
                  {i < flowSteps.length - 1 && (
                    <ArrowRight
                      className={`w-6 h-6 mx-2 ${
                        getStepIndex() > i ? "text-accent" : "text-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Manual step dots (mobile + quick navigation) */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goPrev}
                disabled={isAnimating || getStepIndex() <= 0}
                className="sm:hidden"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {flowSteps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToStepIndex(i)}
                  disabled={isAnimating}
                  className={`h-2 rounded-full transition-all ${
                    i === getStepIndex() ? "w-6 bg-request" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  } ${isAnimating ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  aria-label={`Vai allo step ${i + 1}: ${s.label}`}
                />
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={goNext}
                disabled={isAnimating || getStepIndex() >= flowSteps.length - 1}
                className="sm:hidden"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Client Side */}
            <motion.div
              className={`
                p-4 rounded-lg border-2 transition-all
                ${flowStep === "click" || flowStep === "done" 
                  ? "border-client bg-client/5" 
                  : "border-border/30"
                }
              `}
            >
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-client" />
                <span className="font-medium text-client">Browser</span>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    disabled={isAnimating}
                  />
                  <Button 
                    onClick={runFlow}
                    disabled={isAnimating || !inputValue.trim()}
                    className="gap-2"
                  >
                    {isAnimating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Invia
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {flowStep === "click" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-2 rounded bg-client/20 text-xs"
                    >
                      🖱️ onClick → chiama addMessage(formData)
                    </motion.div>
                  )}
                  {flowStep === "done" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-2 rounded bg-accent/20 text-xs"
                    >
                      ✅ UI aggiornata automaticamente!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Server Side */}
            <motion.div
              className={`
                p-4 rounded-lg border-2 transition-all
                ${flowStep === "update" || flowStep === "render" 
                  ? "border-server bg-server/5" 
                  : "border-border/30"
                }
              `}
            >
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-5 h-5 text-server" />
                <span className="font-medium text-server">Server</span>
              </div>

              {/* RAM State */}
              <div className="p-3 rounded bg-muted/30 border border-border/30 mb-3">
                <span className="text-xs text-muted-foreground">💾 Stato in RAM:</span>
                <div className="font-mono text-xs mt-1">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={i === messages.length - 1 && flowStep === "update" ? { opacity: 0, x: -10 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      className={i === messages.length - 1 && flowStep === "update" ? "text-server font-bold" : ""}
                    >
                      • {msg}
                    </motion.div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {flowStep === "action" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2 rounded bg-request/20 text-xs"
                  >
                    📤 Server Action riceve la richiesta...
                  </motion.div>
                )}
                {flowStep === "update" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2 rounded bg-server/20 text-xs"
                  >
                    💾 messages.push(newMessage)
                  </motion.div>
                )}
                {flowStep === "render" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2 rounded bg-server/20 text-xs"
                  >
                    🔄 revalidatePath('/') → re-render lista
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Code Example */}
          <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">Server Action</Badge>
              <span className="text-xs text-muted-foreground">app/actions.ts</span>
            </div>
            <pre className="text-xs overflow-x-auto">
              <code>{`"use server"  // ← Gira SOLO sul server

let messages: string[] = []

export async function addMessage(formData: FormData) {
  const text = formData.get("text") as string
  messages.push(text)      // ← Aggiorna stato in RAM
  revalidatePath("/")      // ← Triggera re-render
}`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Key Messages */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-server/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">🖥️</span>
            <p className="text-sm font-medium">"Il server aggiorna lo stato"</p>
          </CardContent>
        </Card>
        <Card className="border-server/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">🔄</span>
            <p className="text-sm font-medium">"La UI può essere re-renderizzata sul server"</p>
          </CardContent>
        </Card>
        <Card className="border-client/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">✨</span>
            <p className="text-sm font-medium">"Non serve un refresh manuale"</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
