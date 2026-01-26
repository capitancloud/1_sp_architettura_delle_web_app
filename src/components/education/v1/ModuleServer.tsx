import { motion } from "framer-motion";
import { Server, HardDrive, Code, Cpu, ChevronLeft, ChevronRight, Play, RotateCcw } from "lucide-react";
import { DiagramBox, CodeBlock, HighlightBox, MemoryBlock, ExplainerBox } from "../DiagramElements";
import { useState, useEffect } from "react";

export function ModuleServer() {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const totalSteps = 5;

  const simulateServerProcess = () => {
    setStep(0);
    setIsProcessing(true);
    setIsAutoPlaying(true);
    
    const steps = [1, 2, 3, 4, 5];
    steps.forEach((s, i) => {
      setTimeout(() => {
        setStep(s);
        if (s === 4) {
          setMessages(prev => [...prev, "Nuovo messaggio"]);
        }
        if (s === 5) {
          setIsProcessing(false);
          setIsAutoPlaying(false);
        }
      }, (i + 1) * 2500);
    });
  };

  const goToStep = (newStep: number) => {
    if (isAutoPlaying) return;
    if (newStep >= 0 && newStep <= totalSteps) {
      // Se andiamo allo step 4 e non c'eravamo già, aggiungiamo un messaggio
      if (newStep === 4 && step < 4) {
        setMessages(prev => [...prev, "Nuovo messaggio"]);
      }
      setStep(newStep);
    }
  };

  const nextStep = () => goToStep(step + 1);
  const prevStep = () => goToStep(step - 1);

  const serverCode = `// server.js - Node.js PURO (senza Express!)
const http = require('http');

// 💾 LO STATO VIVE QUI - in memoria RAM
let messaggi = [];

const server = http.createServer((req, res) => {
  // 1️⃣ Distinguo GET da POST
  if (req.method === 'POST' && req.url === '/api/messaggi') {
    
    // 2️⃣ Leggo il body manualmente
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      // 3️⃣ Parso il JSON
      const dati = JSON.parse(body);
      
      // 4️⃣ Salvo in memoria
      messaggi.push(dati.testo);
      
      // 5️⃣ Costruisco la response
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({ messaggi }));
    });
    
  } else if (req.method === 'GET') {
    // ... gestisco GET
  }
});

// 🎧 Ascolto sulla porta 3000
server.listen(3000, () => {
  console.log('Server attivo su porta 3000');
});`;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-server/10 border border-server mb-4">
          <Server className="w-5 h-5 text-server" />
          <span className="text-sm font-mono text-server">SERVER / BACKEND</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Il Server Node.js
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Il backend è un programma che gira su una macchina remota.
          Riceve request, elabora dati, e invia response.
        </p>
      </motion.div>

      {/* Server Visualization */}
      <div className="max-w-5xl mx-auto">
        <DiagramBox variant="server" label="SERVER NODE.JS" isActive>
          <div className="grid grid-cols-3 gap-6">
            {/* Port Listener */}
            <motion.div
              className={`p-4 rounded-lg border transition-all ${
                step === 1 ? 'border-highlight bg-highlight/10' : 'border-border bg-card'
              }`}
              animate={{ scale: step === 1 ? 1.02 : 1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-server" />
                <span className="font-mono text-sm">Porta 3000</span>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {step >= 1 ? "📥 Request in arrivo!" : "🎧 In ascolto..."}
              </div>
              <div className={`w-full h-1 rounded-full overflow-hidden bg-muted`}>
                <motion.div
                  className="h-full bg-server"
                  animate={{ width: step >= 1 ? '100%' : '0%' }}
                />
              </div>
            </motion.div>

            {/* Request Parser */}
            <motion.div
              className={`p-4 rounded-lg border transition-all ${
                step === 2 || step === 3 ? 'border-highlight bg-highlight/10' : 'border-border bg-card'
              }`}
              animate={{ scale: step === 2 || step === 3 ? 1.02 : 1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5 text-server" />
                <span className="font-mono text-sm">Elaborazione</span>
              </div>
              <div className="text-xs space-y-1">
                <div className={step >= 2 ? 'text-accent' : 'text-muted-foreground'}>
                  {step >= 2 ? '✓' : '○'} Leggo il body
                </div>
                <div className={step >= 3 ? 'text-accent' : 'text-muted-foreground'}>
                  {step >= 3 ? '✓' : '○'} Parso il JSON
                </div>
              </div>
            </motion.div>

            {/* Memory Storage */}
            <motion.div
              className={`p-4 rounded-lg border transition-all ${
                step === 4 ? 'border-highlight bg-highlight/10' : 'border-border bg-card'
              }`}
              animate={{ scale: step === 4 ? 1.02 : 1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <HardDrive className="w-5 h-5 text-server" />
                <span className="font-mono text-sm">Memoria RAM</span>
              </div>
              <MemoryBlock data={messages} label="" />
            </motion.div>
          </div>

          {/* Control Buttons */}
          <div className="mt-6 flex flex-col items-center gap-4">
            {/* Step indicators */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  disabled={isAutoPlaying}
                  className={`w-3 h-3 rounded-full transition-all ${
                    step === i 
                      ? 'w-8 bg-server' 
                      : step > i 
                        ? 'bg-server/50' 
                        : 'bg-muted hover:bg-muted-foreground'
                  } ${isAutoPlaying ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevStep}
                disabled={step === 0 || isAutoPlaying}
                className="p-2 rounded-lg bg-muted text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted/80 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={simulateServerProcess}
                disabled={isProcessing}
                className="px-5 py-2 rounded-lg bg-server text-secondary-foreground font-medium disabled:opacity-50 transition-all hover:bg-server/80 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                {isProcessing ? 'In corso...' : 'Auto'}
              </button>

              <button
                onClick={nextStep}
                disabled={step === totalSteps || isAutoPlaying}
                className="p-2 rounded-lg bg-muted text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted/80 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => { setStep(0); setMessages([]); }}
                disabled={isAutoPlaying}
                className="p-2 rounded-lg bg-muted text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted/80 transition-all ml-2"
                title="Ricomincia"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Usa le frecce per navigare manualmente o premi "Auto" per la simulazione automatica
            </p>
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
          <HighlightBox variant="info" title="🎧 Il server è in ascolto">
            Il server Node.js rimane attivo 24/7, in attesa di request sulla porta 3000.
          </HighlightBox>
        )}
        {step === 1 && (
          <HighlightBox variant="warning" title="📥 Request ricevuta!">
            Una HTTP Request è arrivata. Il server la intercetta e inizia l'elaborazione.
          </HighlightBox>
        )}
        {step === 2 && (
          <HighlightBox variant="warning" title="📖 Lettura del body">
            Il server legge il body della request byte per byte. Non c'è magia: è tutto manuale!
          </HighlightBox>
        )}
        {step === 3 && (
          <HighlightBox variant="warning" title="🔄 Parsing JSON">
            Il body è una stringa. Il server usa JSON.parse() per trasformarla in un oggetto JavaScript.
          </HighlightBox>
        )}
        {step === 4 && (
          <HighlightBox variant="success" title="💾 Salvataggio in memoria">
            Il dato viene salvato nell'array "messaggi". <strong>Questo array vive nella RAM del server!</strong>
          </HighlightBox>
        )}
        {step === 5 && (
          <HighlightBox variant="success" title="✅ Pronto per la response">
            I dati sono salvati. Ora il server può costruire la response e inviarla al client.
          </HighlightBox>
        )}
      </motion.div>

      {/* Code Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <h3 className="text-xl font-semibold mb-4">Il codice del server (Node.js puro)</h3>
        <CodeBlock title="server.js">
          {serverCode}
        </CodeBlock>
      </motion.div>

      {/* Key Concepts */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
        <motion.div
          className="p-5 rounded-xl border-2 border-server bg-server/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="font-semibold text-server mb-3 flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Lo stato vive QUI
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            L'array <code className="text-server">messaggi</code> è nella memoria RAM del server.
            Quando il server si riavvia, i dati si perdono (a meno di usare un database).
          </p>
          <div className="text-xs font-mono p-2 rounded bg-card border border-border">
            let messaggi = []; // 👈 Qui vivono i dati
          </div>
        </motion.div>

        <motion.div
          className="p-5 rounded-xl bg-card border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="font-semibold mb-3">Nessun framework</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Questo codice usa solo <code>http</code>, un modulo built-in di Node.js.
            Niente Express, niente Fastify. Solo JavaScript puro.
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Leggiamo il body manualmente</li>
            <li>• Distinguiamo GET/POST manualmente</li>
            <li>• Costruiamo la response manualmente</li>
          </ul>
        </motion.div>
      </div>

      {/* Explainer Boxes */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
        <ExplainerBox type="analogy">
          Il server è come un <strong>cuoco in cucina</strong>: sta sempre in attesa di ordini (request),
          li prepara usando gli ingredienti in dispensa (RAM), e rispedisce i piatti (response) al cliente.
        </ExplainerBox>

        <ExplainerBox type="warning" title="Attenzione: Dati in RAM">
          Se il server si spegne o riavvia, <strong>tutti i dati vanno persi</strong>!
          Per questo nella realtà si usano i <strong>database</strong> (PostgreSQL, MongoDB...) 
          che salvano i dati su disco.
        </ExplainerBox>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-4">
        <ExplainerBox type="why" title="Perché Node.js?">
          Node.js permette di usare <strong>JavaScript anche lato server</strong>. 
          Così puoi usare lo stesso linguaggio sia per frontend che backend!
          Ma il server potrebbe essere scritto in Python, Go, Java, PHP...
        </ExplainerBox>

        <ExplainerBox type="remember">
          Il server <strong>non sa nulla del browser</strong>. Riceve solo testo (la request),
          lo elabora, e risponde con altro testo (la response). Non vede l'HTML, non vede i colori,
          non vede i pulsanti.
        </ExplainerBox>
      </div>
    </div>
  );
}
