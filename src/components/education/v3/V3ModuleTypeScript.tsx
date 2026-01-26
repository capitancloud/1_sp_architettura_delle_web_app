import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCode, Server, Globe, Eye, EyeOff, ChevronLeft, ChevronRight, Check, X } from "lucide-react";

export function V3ModuleTypeScript() {
  const [step, setStep] = useState(0);
  const [showContract, setShowContract] = useState(false);
  const [highlightUsage, setHighlightUsage] = useState(false);

  const steps = [
    {
      title: "Cos'è un Type in TypeScript?",
      description: "Una descrizione della forma dei dati. Dice quali proprietà esistono e di che tipo sono.",
    },
    {
      title: "Perché servono?",
      description: "Aiutano a capire cosa passa tra i pezzi del codice. Se sbagli, TypeScript ti avvisa PRIMA di eseguire.",
    },
    {
      title: "Dove si usano in Next.js?",
      description: "Ovunque! Client Components, Server Components, Server Actions. Lo stesso tipo garantisce coerenza.",
    },
  ];

  const messageType = `interface Message {
  id: string
  text: string
  createdAt: Date
  author?: string  // ? = opzionale
}`;

  const codeExamples = [
    {
      label: "Type Definition",
      file: "types/message.ts",
      env: "shared",
      code: `// Definizione condivisa
export interface Message {
  id: string
  text: string
  createdAt: Date
}`,
      highlight: "definition",
    },
    {
      label: "Server Component",
      file: "app/messages/page.tsx",
      env: "server",
      code: `// Server Component
import { Message } from "@/types/message"

async function getMessages(): Promise<Message[]> {
  return serverState.messages  // Tipo garantito
}

export default async function Page() {
  const messages: Message[] = await getMessages()
  return <MessageList messages={messages} />
}`,
      highlight: "usage",
    },
    {
      label: "Client Component",
      file: "components/MessageForm.tsx",
      env: "client",
      code: `"use client"
import { Message } from "@/types/message"

interface Props {
  onSubmit: (msg: Omit<Message, "id">) => void
}

export function MessageForm({ onSubmit }: Props) {
  // TypeScript sa esattamente cosa aspettarsi
  const handleSubmit = (text: string) => {
    onSubmit({ text, createdAt: new Date() })
  }
  // ...
}`,
      highlight: "usage",
    },
  ];

  const currentStep = steps[step];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
          Modulo 6
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          📝 TypeScript: Tipi come Contratti
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Come i tipi aiutano a capire cosa passa tra le parti dell'app
        </p>
      </div>

      {/* Explainer Box */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <FileCode className="w-6 h-6 text-blue-400" />
            <div>
              <p className="font-medium text-blue-400">Cosa devi capire</p>
              <p className="text-sm text-muted-foreground">
                I tipi TypeScript sono come contratti: definiscono la forma dei dati 
                e garantiscono che tutti i pezzi dell'app parlino la stessa lingua.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Explanation */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>{currentStep.title}</span>
            <Badge variant="outline">{step + 1}/{steps.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{currentStep.description}</p>

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
                    i === step ? "w-6 bg-blue-500" : "w-2 bg-muted-foreground/30"
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

      {/* Contract Toggle */}
      <div className="flex justify-center gap-4">
        <Button
          variant={showContract ? "default" : "outline"}
          onClick={() => setShowContract(!showContract)}
          className="gap-2"
        >
          {showContract ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showContract ? "Nascondi" : "Mostra"} contratto dati
        </Button>
        <Button
          variant={highlightUsage ? "default" : "outline"}
          onClick={() => setHighlightUsage(!highlightUsage)}
          className="gap-2"
        >
          {highlightUsage ? "Nascondi" : "Evidenzia"} dove viene usato
        </Button>
      </div>

      {/* Contract Panel */}
      <AnimatePresence>
        {showContract && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-blue-400" />
                  Contratto Dati: Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-lg bg-muted/50 border border-border/50 text-sm overflow-x-auto">
                  <code className="text-foreground">{messageType}</code>
                </pre>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span><code className="text-blue-400">id</code>: stringa, obbligatorio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span><code className="text-blue-400">text</code>: stringa, obbligatorio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span><code className="text-blue-400">createdAt</code>: data, obbligatorio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">?</span>
                    <span><code className="text-blue-400">author</code>: stringa, opzionale</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Code Examples */}
      <div className="grid md:grid-cols-3 gap-4">
        {codeExamples.map((example) => (
          <Card 
            key={example.label}
            className={`
              border-2 transition-all
              ${highlightUsage && example.highlight === "usage"
                ? "border-blue-500 ring-2 ring-blue-500/20"
                : highlightUsage && example.highlight === "definition"
                  ? "border-green-500 ring-2 ring-green-500/20"
                  : "border-border/50"
              }
            `}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {example.env === "server" && <Server className="w-4 h-4 text-server" />}
                  {example.env === "client" && <Globe className="w-4 h-4 text-client" />}
                  {example.env === "shared" && <FileCode className="w-4 h-4 text-blue-400" />}
                  {example.label}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    example.env === "server" ? "text-server" :
                    example.env === "client" ? "text-client" : "text-blue-400"
                  }`}
                >
                  {example.env === "server" ? "Server" : 
                   example.env === "client" ? "Browser" : "Condiviso"}
                </Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground font-mono">{example.file}</p>
            </CardHeader>
            <CardContent>
              <pre className="p-3 rounded bg-muted/50 border border-border/30 text-xs overflow-x-auto max-h-48">
                <code>
                  {example.code.split('\n').map((line, i) => (
                    <div 
                      key={i}
                      className={`${
                        highlightUsage && line.includes("Message")
                          ? "bg-blue-500/20 -mx-3 px-3"
                          : ""
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </code>
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compile-time Error Example */}
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <X className="w-5 h-5 text-destructive" />
            Errore in Compile-time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Se provi a usare un tipo sbagliato, TypeScript ti avvisa PRIMA di eseguire il codice:
          </p>
          <pre className="p-4 rounded-lg bg-muted/50 border border-destructive/30 text-sm overflow-x-auto">
            <code>{`// ❌ Errore TypeScript
const msg: Message = {
  id: "1",
  text: "Ciao"
  // Manca 'createdAt'!
}

// TypeScript dice:
// Property 'createdAt' is missing in type '{ id: string; text: string; }'`}</code>
          </pre>
          <p className="text-xs text-muted-foreground">
            ✓ L'errore viene trovato mentre scrivi, non quando l'utente usa l'app
          </p>
        </CardContent>
      </Card>

      {/* Key Messages */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">📋</span>
            <p className="text-sm font-medium">"I tipi aiutano a capire cosa passa tra i pezzi"</p>
          </CardContent>
        </Card>
        <Card className="border-blue-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-2xl mb-2 block">⚠️</span>
            <p className="text-sm font-medium">"Compile-time: errori presi prima di eseguire"</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
