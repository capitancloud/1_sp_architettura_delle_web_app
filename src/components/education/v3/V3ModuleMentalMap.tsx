import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Folder, Server, Globe, ArrowRight } from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";
interface V3ModuleMentalMapProps {
  onNext?: () => void;
}

export function V3ModuleMentalMap({ onNext }: V3ModuleMentalMapProps) {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { 
      title: "Un Unico Progetto", 
      description: "In Next.js, frontend e backend vivono nella stessa cartella",
      highlight: "project"
    },
    { 
      title: "Due Ambienti di Esecuzione", 
      description: "Ma il codice gira in posti diversi: Server e Browser",
      highlight: "environments"
    },
    { 
      title: "Server = Node.js", 
      description: "Il server esegue codice che può accedere a database, file, segreti",
      highlight: "server"
    },
    { 
      title: "Browser = JavaScript", 
      description: "Il browser esegue codice che gestisce click, input, animazioni",
      highlight: "browser"
    },
    { 
      title: "Comunicazione HTTP", 
      description: "I due ambienti si parlano sempre tramite HTTP, come prima!",
      highlight: "communication"
    },
  ];

  const runAnimation = () => {
    setIsAnimating(true);
    setStep(0);
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsAnimating(false);
      } else {
        setStep(currentStep);
      }
    }, 2500);
  };

  const currentStep = steps[step];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
          Modulo 0
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          🗺️ Dove siamo? Cosa significa "un solo progetto"?
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Next.js unifica frontend e backend in un unico progetto, ma l'esecuzione resta divisa
        </p>
      </div>

      {/* Explainer Boxes */}
      <div className="grid md:grid-cols-2 gap-4">
        <ExplainerBox type="why" title="Perché un solo progetto?">
          Prima di Next.js, dovevi creare due progetti separati: uno per il frontend (React) e uno per il backend (Node.js/Express). 
          Next.js li unifica, ma <strong>l'esecuzione resta divisa</strong>: alcune cose girano sul server, altre nel browser.
        </ExplainerBox>
        
        <ExplainerBox type="analogy" title="Pensa a un ristorante">
          Il <strong>progetto Next.js</strong> è come un ristorante. La <strong>cucina</strong> (server) prepara i piatti, 
          la <strong>sala</strong> (browser) li serve ai clienti. Stesso locale, ruoli diversi!
        </ExplainerBox>
      </div>

      <ExplainerBox type="remember">
        Non tutto il codice React gira nel browser. <strong>Next.js decide cosa eseguire dove</strong> in base a come scrivi i componenti.
      </ExplainerBox>

      {/* Main Visualization */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Architettura Next.js</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={runAnimation}
              disabled={isAnimating}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {isAnimating ? "Animando..." : "Anima"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Project Container */}
            <motion.div
              className={`
                border-2 rounded-xl p-6 transition-all duration-500
                ${currentStep.highlight === "project" 
                  ? "border-purple-500 bg-purple-500/10" 
                  : "border-border/50 bg-background/50"
                }
              `}
            >
              {/* Project Header */}
              <div className="flex items-center gap-3 mb-6">
                <Folder className="w-6 h-6 text-purple-400" />
                <span className="font-mono font-bold text-lg">my-nextjs-app/</span>
                <Badge variant="outline" className="ml-auto">
                  Un unico progetto
                </Badge>
              </div>

              {/* Two Environments */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Server Environment */}
                <motion.div
                  className={`
                    border-2 rounded-lg p-5 transition-all duration-500
                    ${currentStep.highlight === "server" || currentStep.highlight === "environments"
                      ? "border-server bg-server/10" 
                      : "border-border/30 bg-muted/20"
                    }
                  `}
                  animate={{
                    scale: currentStep.highlight === "server" ? 1.02 : 1,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Server className="w-5 h-5 text-server" />
                    <span className="font-bold text-server">Server (Node.js)</span>
                  </div>
                  
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-2 rounded bg-muted/50">
                      📁 app/page.tsx <Badge variant="secondary" className="ml-2 text-[10px]">Server Component</Badge>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      📁 app/api/route.ts <Badge variant="secondary" className="ml-2 text-[10px]">API Route</Badge>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      💾 Database, Secrets, File System
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded bg-server/20 text-sm">
                    <p className="text-server font-medium">✓ Può accedere a:</p>
                    <ul className="text-muted-foreground text-xs mt-1 space-y-1">
                      <li>• Database e file</li>
                      <li>• Variabili d'ambiente segrete</li>
                      <li>• API esterne con chiavi private</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Browser Environment */}
                <motion.div
                  className={`
                    border-2 rounded-lg p-5 transition-all duration-500
                    ${currentStep.highlight === "browser" || currentStep.highlight === "environments"
                      ? "border-client bg-client/10" 
                      : "border-border/30 bg-muted/20"
                    }
                  `}
                  animate={{
                    scale: currentStep.highlight === "browser" ? 1.02 : 1,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-client" />
                    <span className="font-bold text-client">Browser (JavaScript)</span>
                  </div>
                  
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-2 rounded bg-muted/50">
                      📁 components/Form.tsx <Badge variant="secondary" className="ml-2 text-[10px]">"use client"</Badge>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      📁 components/Button.tsx <Badge variant="secondary" className="ml-2 text-[10px]">"use client"</Badge>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      🖱️ Eventi, Stato locale, Animazioni
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded bg-client/20 text-sm">
                    <p className="text-client font-medium">✓ Può gestire:</p>
                    <ul className="text-muted-foreground text-xs mt-1 space-y-1">
                      <li>• Click, input, scroll</li>
                      <li>• useState, useEffect</li>
                      <li>• Animazioni e transizioni</li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* HTTP Communication Arrow */}
              <AnimatePresence>
                {currentStep.highlight === "communication" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 flex items-center justify-center gap-4"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-request/20 border border-request/30">
                      <span className="text-client">Browser</span>
                      <ArrowRight className="w-4 h-4 text-request" />
                      <span className="text-request font-bold">HTTP</span>
                      <ArrowRight className="w-4 h-4 text-request" />
                      <span className="text-server">Server</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Step Indicator */}
            <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{step + 1}/{steps.length}</Badge>
                <span className="font-medium">{currentStep.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              
              {/* Step Navigation */}
              <div className="flex gap-2 mt-4">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === step ? "w-8 bg-purple-500" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Messages */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">📁</span>
            <p className="text-sm font-medium">"Un unico progetto, due ambienti di esecuzione"</p>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">🚫</span>
            <p className="text-sm font-medium">"Non tutto il codice React gira nel browser"</p>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">🔗</span>
            <p className="text-sm font-medium">"Si parlano sempre tramite HTTP"</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
