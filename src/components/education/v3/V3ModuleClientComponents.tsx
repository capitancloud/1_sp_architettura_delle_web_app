import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Globe, MousePointer, Keyboard, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";
interface V3ModuleClientComponentsProps {
  onNext?: () => void;
}

export function V3ModuleClientComponents({ onNext }: V3ModuleClientComponentsProps) {
  const [inputValue, setInputValue] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [step, setStep] = useState(0);
  const [lastEvent, setLastEvent] = useState<string | null>(null);

  const steps = [
    {
      title: "Cos'è un Client Component?",
      description: "Un componente React che gira nel BROWSER, non sul server",
      code: `"use client"  // ← Questa riga dice a Next.js: "esegui nel browser"

export function Form() {
  const [value, setValue] = useState("")
  
  return (
    <input 
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}`,
    },
    {
      title: "Perché servono?",
      description: "Gestiscono eventi che esistono solo nel browser",
      highlights: ["onClick", "onChange", "onSubmit", "useState", "useEffect"],
    },
    {
      title: "Quando usarli?",
      description: "Solo quando serve interattività. Non per tutto!",
      rules: [
        { text: "Form con input", needs: true },
        { text: "Bottoni con click handler", needs: true },
        { text: "Animazioni basate su stato", needs: true },
        { text: "Lista statica di dati", needs: false },
        { text: "Pagina di testo", needs: false },
        { text: "Layout senza interazione", needs: false },
      ],
    },
  ];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setLastEvent("onChange");
    setTimeout(() => setLastEvent(null), 1500);
  };

  const handleClick = () => {
    setClickCount(c => c + 1);
    setLastEvent("onClick");
    setTimeout(() => setLastEvent(null), 1500);
  };

  const currentStep = steps[step];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-2 bg-client/20 text-client border-client/30">
          Modulo 2
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          🌐 Client Components
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cosa sono e perché servono per l'interazione
        </p>
      </div>

      {/* Explainer Boxes */}
      <div className="grid md:grid-cols-2 gap-4">
        <ExplainerBox type="why" title="Perché esistono?">
          Il server non ha mouse, tastiera, né schermo. Gli eventi come <code>onClick</code> e <code>onChange</code> 
          possono avvenire <strong>solo nel browser</strong>, dove c'è un utente che interagisce.
        </ExplainerBox>
        
        <ExplainerBox type="analogy" title="Come un telecomando">
          I Client Components sono come il <strong>telecomando della TV</strong>: i pulsanti (eventi) funzionano 
          solo se li premi tu. La TV (server) non può premere i pulsanti da sola!
        </ExplainerBox>
      </div>

      <ExplainerBox type="warning" title="Attenzione!">
        Aggiungere <code>"use client"</code> a un componente significa che <strong>tutto il suo JavaScript</strong> 
        verrà inviato al browser. Usalo solo quando serve davvero interattività!
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
                          line.includes('"use client"') 
                            ? "bg-client/20 -mx-4 px-4 text-client font-bold" 
                            : ""
                        }`}
                      >
                        {line}
                      </div>
                    ))}
                  </code>
                </pre>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-client/20 text-client border-client/30 text-xs">
                    Browser
                  </Badge>
                </div>
              </div>
            )}

            {/* Step 1: Highlights */}
            {step === 1 && currentStep.highlights && (
              <div className="flex flex-wrap gap-2">
                {currentStep.highlights.map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-2 rounded-lg bg-client/10 border border-client/30"
                  >
                    <code className="text-client font-mono text-sm">{item}</code>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Step 2: Rules */}
            {step === 2 && currentStep.rules && (
              <div className="space-y-2">
                {currentStep.rules.map((rule, i) => (
                  <motion.div
                    key={rule.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`
                      p-3 rounded-lg border flex items-center gap-3
                      ${rule.needs 
                        ? "bg-client/5 border-client/30" 
                        : "bg-muted/20 border-border/30"
                      }
                    `}
                  >
                    <span className={rule.needs ? "text-client" : "text-muted-foreground"}>
                      {rule.needs ? "✓" : "✗"}
                    </span>
                    <span className={rule.needs ? "text-foreground" : "text-muted-foreground"}>
                      {rule.text}
                    </span>
                    {rule.needs && (
                      <Badge className="ml-auto bg-client/20 text-client border-client/30 text-xs">
                        Client
                      </Badge>
                    )}
                  </motion.div>
                ))}
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
                      i === step ? "w-6 bg-client" : "w-2 bg-muted-foreground/30"
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

        {/* Interactive Demo */}
        <Card className="border-client/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-client" />
              Prova tu stesso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Interagisci e osserva gli eventi che si attivano:
            </p>

            {/* Input Demo */}
            <div className={`
              p-4 rounded-lg border-2 transition-all
              ${lastEvent === "onChange" ? "border-client bg-client/10" : "border-border/30"}
            `}>
              <div className="flex items-center gap-2 mb-2">
                <Keyboard className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Input con onChange</span>
              </div>
              <Input
                value={inputValue}
                onChange={handleInput}
                placeholder="Digita qualcosa..."
              />
              <AnimatePresence>
                {lastEvent === "onChange" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 p-2 rounded bg-client/20 text-xs font-mono"
                  >
                    <span className="text-client">onChange</span> fired → 
                    <span className="text-muted-foreground"> setValue("{inputValue}")</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Button Demo */}
            <div className={`
              p-4 rounded-lg border-2 transition-all
              ${lastEvent === "onClick" ? "border-client bg-client/10" : "border-border/30"}
            `}>
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Bottone con onClick</span>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={handleClick}>
                  Cliccami
                </Button>
                <span className="text-sm text-muted-foreground">
                  Click: <span className="font-bold text-foreground">{clickCount}</span>
                </span>
              </div>
              <AnimatePresence>
                {lastEvent === "onClick" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 p-2 rounded bg-client/20 text-xs font-mono"
                  >
                    <span className="text-client">onClick</span> fired → 
                    <span className="text-muted-foreground"> setCount({clickCount})</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reset */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setInputValue("");
                setClickCount(0);
              }}
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>

            {/* Key Message */}
            <div className="p-4 rounded-lg bg-client/10 border border-client/30">
              <p className="text-sm font-medium text-client">
                ⚡ Questi eventi esistono solo nel browser
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Il server non ha mouse, tastiera, né schermo. Per gestire interazioni serve un Client Component.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Messages */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-client/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">🌐</span>
            <p className="text-sm font-medium">"I Client Components esistono per l'interazione"</p>
          </CardContent>
        </Card>
        <Card className="border-client/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">⚖️</span>
            <p className="text-sm font-medium">"Non serve che tutto sia client-side"</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
