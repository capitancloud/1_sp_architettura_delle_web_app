import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Server, 
  Globe, 
  Folder,
  Target,
  BookOpen,
  Lightbulb
} from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";

export function V3ModuleIntro() {
  const [expandedSection, setExpandedSection] = useState<string | null>("starting");

  const learningPath = [
    {
      version: "V1",
      title: "Le Basi",
      points: ["Client e Server sono separati", "Comunicano via HTTP", "Request → Response"],
      color: "client",
      icon: "🌱"
    },
    {
      version: "V2", 
      title: "Express.js",
      points: ["Express semplifica il routing", "Il modello resta Client-Server", "Stato in RAM sul server"],
      color: "server",
      icon: "⚡"
    },
    {
      version: "V3",
      title: "Next.js",
      points: ["Un solo progetto", "Due ambienti di esecuzione", "Server Components + Client Components"],
      color: "request",
      icon: "⚛️",
      current: true
    },
  ];

  const objectives = [
    {
      icon: "🎯",
      title: "Cosa gira sul Server",
      description: "Saprai identificare quale codice viene eseguito sul server (Node.js)"
    },
    {
      icon: "🌐",
      title: "Cosa gira nel Browser",
      description: "Capirai quali componenti richiedono JavaScript nel browser"
    },
    {
      icon: "🚫",
      title: "Cosa NON arriva al client",
      description: "Vedrai come il codice dei Server Components resta sul server"
    },
    {
      icon: "🔄",
      title: "Come comunicano",
      description: "Scoprirai le Server Actions, il modo moderno di far parlare client e server"
    },
  ];

  const bigQuestion = [
    { before: "Due progetti separati", after: "Un solo progetto", icon: "📁" },
    { before: "API esplicite (fetch)", after: "Server Actions", icon: "🔄" },
    { before: "Tutto React = Browser", after: "React anche sul Server", icon: "⚛️" },
    { before: "Bundle JS grande", after: "Solo JS necessario", icon: "📦" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
          Introduzione
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          🎯 Obiettivi della Versione 3
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Da dove partiamo, dove vogliamo arrivare, e perché Next.js cambia le regole del gioco
        </p>
      </div>

      {/* The Big Question */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-400" />
            La Grande Domanda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium text-center mb-6">
            "Se il modello è sempre <span className="text-client">Client</span> → <span className="text-muted-foreground">HTTP</span> → <span className="text-server">Server</span>,<br/>
            <span className="text-purple-400">perché Next.js mette tutto nello stesso progetto?</span>"
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {bigQuestion.map((item, i) => (
              <motion.div
                key={item.before}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground line-through">{item.before}</span>
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                      <span className="text-foreground font-medium">{item.after}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Il Tuo Percorso di Apprendimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 overflow-x-auto pb-4">
            {learningPath.map((step, i) => (
              <motion.div
                key={step.version}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                className={`
                  flex-shrink-0 w-64 p-4 rounded-xl border-2 transition-all
                  ${step.current 
                    ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/20" 
                    : "border-border/50 bg-muted/20"
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{step.icon}</span>
                  <div>
                    <Badge 
                      variant={step.current ? "default" : "outline"}
                      className={step.current ? "bg-purple-500" : ""}
                    >
                      {step.version}
                    </Badge>
                    <p className="text-sm font-medium mt-1">{step.title}</p>
                  </div>
                  {!step.current && (
                    <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                  )}
                  {step.current && (
                    <Badge className="ml-auto bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                      Ora
                    </Badge>
                  )}
                </div>
                <ul className="space-y-1">
                  {step.points.map((point) => (
                    <li key={point} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className={`text-${step.color}`}>•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Explainer Boxes */}
      <div className="grid md:grid-cols-2 gap-4">
        <ExplainerBox type="remember" title="Cosa già sai (V1 + V2)">
          <ul className="space-y-1 mt-2">
            <li>✓ Client e Server sono <strong>due entità separate</strong></li>
            <li>✓ Comunicano <strong>sempre via HTTP</strong></li>
            <li>✓ Il server mantiene lo <strong>stato in RAM</strong></li>
            <li>✓ Express semplifica, ma <strong>il modello non cambia</strong></li>
          </ul>
        </ExplainerBox>
        
        <ExplainerBox type="why" title="Cosa cambia con Next.js?">
          <ul className="space-y-1 mt-2">
            <li>→ <strong>Un progetto</strong>, ma due ambienti di esecuzione</li>
            <li>→ <strong>React sul server</strong> (Server Components)</li>
            <li>→ <strong>Meno JavaScript</strong> inviato al browser</li>
            <li>→ <strong>Server Actions</strong> invece di API manuali</li>
          </ul>
        </ExplainerBox>
      </div>

      {/* Learning Objectives */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Alla fine di questa versione saprai...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {objectives.map((obj, i) => (
              <motion.div
                key={obj.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{obj.icon}</span>
                  <div>
                    <p className="font-medium">{obj.title}</p>
                    <p className="text-sm text-muted-foreground">{obj.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* The Key Insight */}
      <ExplainerBox type="tip" title="L'Insight Chiave">
        Next.js <strong>non cambia il modello Client-Server</strong>. Lo rende più ergonomico: 
        invece di gestire due progetti separati con API esplicite, hai un unico codebase dove 
        Next.js decide automaticamente cosa eseguire sul server e cosa nel browser.
        <br/><br/>
        <strong>Il risultato?</strong> Stesso modello mentale, meno boilerplate, migliori performance.
      </ExplainerBox>

      {/* Architecture Preview */}
      <Card className="border-purple-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Anteprima: L'Architettura Next.js</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative p-6 rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-500/5">
            <div className="absolute -top-3 left-4 px-2 py-0.5 text-xs font-mono font-semibold rounded bg-purple-500 text-white">
              my-nextjs-app/
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Server */}
              <div className="p-4 rounded-lg border-2 border-server/50 bg-server/5">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-5 h-5 text-server" />
                  <span className="font-bold text-server">Esegue sul Server</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 rounded bg-muted/50 font-mono text-xs">
                    • Server Components
                  </div>
                  <div className="p-2 rounded bg-muted/50 font-mono text-xs">
                    • Server Actions ("use server")
                  </div>
                  <div className="p-2 rounded bg-muted/50 font-mono text-xs">
                    • Database, API keys, secrets
                  </div>
                </div>
              </div>

              {/* Browser */}
              <div className="p-4 rounded-lg border-2 border-client/50 bg-client/5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-client" />
                  <span className="font-bold text-client">Esegue nel Browser</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 rounded bg-muted/50 font-mono text-xs">
                    • Client Components ("use client")
                  </div>
                  <div className="p-2 rounded bg-muted/50 font-mono text-xs">
                    • Eventi (onClick, onChange)
                  </div>
                  <div className="p-2 rounded bg-muted/50 font-mono text-xs">
                    • useState, useEffect
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-request/10 border border-request/30 text-center">
              <p className="text-sm">
                <span className="text-client">Browser</span>
                <span className="mx-2">↔</span>
                <span className="text-request font-bold">HTTP (sempre!)</span>
                <span className="mx-2">↔</span>
                <span className="text-server">Server</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Pronto a capire come funziona Next.js? Vai al prossimo modulo!
        </p>
        <Button size="lg" className="gap-2 bg-purple-500 hover:bg-purple-600">
          Inizia il Percorso
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
