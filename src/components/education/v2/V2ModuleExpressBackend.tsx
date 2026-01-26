import { motion, AnimatePresence } from "framer-motion";
import { Server, Zap, ArrowRight, Package, Route, FileJson, ChevronLeft, ChevronRight, Play, RotateCcw } from "lucide-react";
import { DiagramBox, CodeBlock, HighlightBox, ExplainerBox, MemoryBlock } from "../DiagramElements";
import { useState } from "react";

export function V2ModuleExpressBackend() {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const totalSteps = 5;

  const simulateFlow = () => {
    setStep(0);
    setIsAutoPlaying(true);
    
    const steps = [1, 2, 3, 4, 5];
    steps.forEach((s, i) => {
      setTimeout(() => {
        setStep(s);
        if (s === 4) {
          setMessages(prev => [...prev, "Nuovo messaggio"]);
        }
        if (s === 5) {
          setIsAutoPlaying(false);
        }
      }, (i + 1) * 2000);
    });
  };

  const goToStep = (newStep: number) => {
    if (isAutoPlaying) return;
    if (newStep >= 0 && newStep <= totalSteps) {
      if (newStep === 4 && step < 4) {
        setMessages(prev => [...prev, "Nuovo messaggio"]);
      }
      setStep(newStep);
    }
  };

  const expressCode = `// server.js - Node.js + EXPRESS
const express = require('express');
const app = express();

// ⚡ Express fa il body parsing per te!
app.use(express.json());

// 💾 Lo stato vive SEMPRE in RAM
let messages = [];

// 📬 Route POST - Express indirizza automaticamente
app.post('/api/messages', (req, res) => {
  // req.body è GIÀ un oggetto JavaScript!
  const { text } = req.body;
  
  // Salvo in memoria
  messages.push(text);
  
  // ⚡ res.json() invece di writeHead + end
  res.json({ messages });
});

// 📖 Route GET
app.get('/api/messages', (req, res) => {
  res.json({ messages });
});

app.listen(3000);`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-server/10 border border-server mb-4">
          <Zap className="w-5 h-5 text-server" />
          <span className="text-sm font-mono text-server">EXPRESS.JS</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Il Backend con Express
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Express ti semplifica tre cose: <strong className="text-server">routing</strong>, 
          <strong className="text-server"> body parsing</strong>, e 
          <strong className="text-server"> response</strong>. Il resto resta uguale.
        </p>
      </motion.div>

      {/* Learning Goals */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-xs text-muted-foreground mb-1">👁️ Cosa stai vedendo</p>
          <p className="text-sm">Il server Express come una "scatola" con route come "porte"</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
          <p className="text-xs text-primary mb-1">🎯 Cosa devi capire</p>
          <p className="text-sm">Express semplifica il COME, non cambia il COSA</p>
        </div>
      </div>

      {/* Server Visualization */}
      <div className="max-w-5xl mx-auto">
        <DiagramBox variant="server" label="SERVER EXPRESS" isActive>
          <div className="space-y-6">
            {/* Routes as "doors" */}
            <div className="grid grid-cols-3 gap-4">
              {/* Incoming Request */}
              <motion.div
                className={`p-4 rounded-lg border-2 transition-all ${
                  step === 1 ? 'border-request bg-request/10' : 'border-border bg-card'
                }`}
                animate={{ scale: step === 1 ? 1.02 : 1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ArrowRight className="w-5 h-5 text-request" />
                  <span className="font-mono text-sm font-semibold">Request in arrivo</span>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <p><span className="text-request">POST</span> /api/messages</p>
                  <p>Body: {"{"} "text": "..." {"}"}</p>
                </div>
              </motion.div>

              {/* Route Matching */}
              <motion.div
                className={`p-4 rounded-lg border-2 transition-all ${
                  step === 2 ? 'border-server bg-server/10' : 'border-border bg-card'
                }`}
                animate={{ scale: step === 2 ? 1.02 : 1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Route className="w-5 h-5 text-server" />
                  <span className="font-mono text-sm font-semibold">Routing automatico</span>
                </div>
                <div className="space-y-2">
                  <div className={`p-2 rounded text-xs font-mono ${step === 2 ? 'bg-server/20 text-server' : 'bg-muted text-muted-foreground'}`}>
                    app.post('/api/messages') ✓
                  </div>
                  <div className="p-2 rounded bg-muted text-xs font-mono text-muted-foreground opacity-50">
                    app.get('/api/messages')
                  </div>
                </div>
              </motion.div>

              {/* Body Parsing */}
              <motion.div
                className={`p-4 rounded-lg border-2 transition-all ${
                  step === 3 ? 'border-server bg-server/10' : 'border-border bg-card'
                }`}
                animate={{ scale: step === 3 ? 1.02 : 1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-server" />
                  <span className="font-mono text-sm font-semibold">Body parsing</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="text-muted-foreground">Express fa automaticamente:</p>
                  <code className="block p-2 rounded bg-server/20 text-server">
                    req.body = {"{"} text: "..." {"}"}
                  </code>
                </div>
              </motion.div>
            </div>

            {/* Memory & Response */}
            <div className="grid grid-cols-2 gap-4">
              {/* Memory */}
              <motion.div
                className={`p-4 rounded-lg border-2 transition-all ${
                  step === 4 ? 'border-accent bg-accent/10' : 'border-border bg-card'
                }`}
                animate={{ scale: step === 4 ? 1.02 : 1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">💾</span>
                  <span className="font-mono text-sm font-semibold">Stato in memoria (RAM)</span>
                </div>
                <MemoryBlock data={messages} label="" />
                <p className="text-xs text-muted-foreground mt-2">
                  ⚠️ Questo NON cambia con Express!
                </p>
              </motion.div>

              {/* Response */}
              <motion.div
                className={`p-4 rounded-lg border-2 transition-all ${
                  step === 5 ? 'border-response bg-response/10' : 'border-border bg-card'
                }`}
                animate={{ scale: step === 5 ? 1.02 : 1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FileJson className="w-5 h-5 text-response" />
                  <span className="font-mono text-sm font-semibold">Response semplificata</span>
                </div>
                <div className="text-xs space-y-2">
                  <p className="text-muted-foreground">Una sola riga:</p>
                  <code className="block p-2 rounded bg-response/20 text-response">
                    res.json({"{"} messages {"}"})
                  </code>
                  <p className="text-muted-foreground">
                    Express aggiunge headers e status automaticamente
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4">
              {/* Step indicators */}
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    onClick={() => goToStep(i)}
                    disabled={isAutoPlaying}
                    className={`w-3 h-3 rounded-full transition-all ${
                      step === i ? 'w-8 bg-server' : step > i ? 'bg-server/50' : 'bg-muted'
                    } ${isAutoPlaying ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => goToStep(step - 1)}
                  disabled={step === 0 || isAutoPlaying}
                  className="p-2 rounded-lg bg-muted disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={simulateFlow}
                  disabled={isAutoPlaying}
                  className="px-5 py-2 rounded-lg bg-server text-secondary-foreground font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  {isAutoPlaying ? 'In corso...' : 'Auto'}
                </button>

                <button
                  onClick={() => goToStep(step + 1)}
                  disabled={step === totalSteps || isAutoPlaying}
                  className="p-2 rounded-lg bg-muted disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => { setStep(0); setMessages([]); }}
                  disabled={isAutoPlaying}
                  className="p-2 rounded-lg bg-muted disabled:opacity-30 ml-2"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </DiagramBox>
      </div>

      {/* Step Explanation */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {step === 0 && (
          <HighlightBox variant="info" title="🎧 Server in attesa">
            Il server Express ascolta sulla porta 3000, pronto a ricevere request.
          </HighlightBox>
        )}
        {step === 1 && (
          <HighlightBox variant="warning" title="📥 Request in arrivo!">
            Una POST request arriva a /api/messages. Express la intercetta.
          </HighlightBox>
        )}
        {step === 2 && (
          <HighlightBox variant="warning" title="🛤️ Routing automatico">
            Express <strong>indirizza automaticamente</strong> la request alla route giusta. 
            Niente più if/else manuali!
          </HighlightBox>
        )}
        {step === 3 && (
          <HighlightBox variant="warning" title="📦 Body già pronto">
            <code>express.json()</code> ha già parsato il body. 
            <strong> req.body è un oggetto JavaScript</strong>, non devi fare JSON.parse()!
          </HighlightBox>
        )}
        {step === 4 && (
          <HighlightBox variant="success" title="💾 Salvataggio in memoria">
            Il messaggio viene salvato nell'array. <strong>Questo è identico a Node puro!</strong>
            Lo stato resta in RAM.
          </HighlightBox>
        )}
        {step === 5 && (
          <HighlightBox variant="success" title="📤 Response con res.json()">
            Una sola riga! Express imposta Content-Type e status code automaticamente.
          </HighlightBox>
        )}
      </motion.div>

      {/* Code Example */}
      <div className="max-w-4xl mx-auto">
        <CodeBlock title="server.js (Express)">
          {expressCode}
        </CodeBlock>
      </div>

      {/* Key simplifications */}
      <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="p-4 rounded-xl bg-server/10 border-2 border-server">
          <h4 className="font-semibold text-server mb-2 flex items-center gap-2">
            <Route className="w-4 h-4" />
            Routing leggibile
          </h4>
          <p className="text-sm text-muted-foreground">
            <code>app.post('/path')</code> invece di if/else sul metodo e url
          </p>
        </div>

        <div className="p-4 rounded-xl bg-server/10 border-2 border-server">
          <h4 className="font-semibold text-server mb-2 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Body parsing
          </h4>
          <p className="text-sm text-muted-foreground">
            <code>req.body</code> già pronto, niente chunk + JSON.parse()
          </p>
        </div>

        <div className="p-4 rounded-xl bg-server/10 border-2 border-server">
          <h4 className="font-semibold text-server mb-2 flex items-center gap-2">
            <FileJson className="w-4 h-4" />
            Response semplice
          </h4>
          <p className="text-sm text-muted-foreground">
            <code>res.json()</code> invece di writeHead + setHeader + end
          </p>
        </div>
      </div>

      {/* Final message */}
      <div className="max-w-2xl mx-auto">
        <ExplainerBox type="remember">
          <strong>Lo stato resta un array in RAM: non cambia con Express!</strong>
          Express semplifica come scrivi il codice, non dove vivono i dati.
        </ExplainerBox>
      </div>
    </div>
  );
}
