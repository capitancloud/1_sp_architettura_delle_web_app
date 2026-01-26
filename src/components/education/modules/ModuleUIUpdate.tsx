import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCircle, Globe, Server, ArrowRight, ArrowLeft } from "lucide-react";
import { DiagramBox, HighlightBox } from "../DiagramElements";
import { useState } from "react";

export function ModuleUIUpdate() {
  const [messages, setMessages] = useState<string[]>(["Messaggio iniziale"]);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const simulateFullCycle = () => {
    if (!inputValue.trim() || isAnimating) return;
    
    setIsAnimating(true);
    setStep(1);

    // Step 2: Request viaggia
    setTimeout(() => setStep(2), 1000);
    
    // Step 3: Server elabora
    setTimeout(() => setStep(3), 2000);
    
    // Step 4: Response viaggia
    setTimeout(() => setStep(4), 3000);
    
    // Step 5: UI si aggiorna
    setTimeout(() => {
      setStep(5);
      setMessages(prev => [...prev, inputValue]);
      setInputValue("");
    }, 4000);

    // Reset
    setTimeout(() => {
      setStep(0);
      setIsAnimating(false);
    }, 6000);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent mb-4">
          <RefreshCw className="w-5 h-5 text-accent" />
          <span className="text-sm font-mono text-accent">CICLO COMPLETO</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Il Ciclo Completo: Request → Response → UI
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Vediamo tutto insieme: dall'azione dell'utente all'aggiornamento della UI.
        </p>
      </motion.div>

      {/* Full Cycle Visualization */}
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {/* Steps */}
          <div className="grid grid-cols-2 gap-8">
            {/* Step 1: User Action */}
            <motion.div
              className={`p-6 rounded-xl border-2 transition-all ${
                step === 1 ? 'border-client bg-client/5 glow-client' : 'border-border bg-card'
              }`}
              animate={{ scale: step === 1 ? 1.02 : 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-client text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  1
                </div>
                <h4 className="font-semibold">L'utente clicca "Invia"</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Il JavaScript ascolta l'evento click e prepara la request HTTP.
              </p>
            </motion.div>

            <div /> {/* Empty space */}

            <div /> {/* Empty space */}

            {/* Step 2: Request travels */}
            <motion.div
              className={`p-6 rounded-xl border-2 transition-all ${
                step === 2 ? 'border-request bg-request/5' : 'border-border bg-card'
              }`}
              animate={{ scale: step === 2 ? 1.02 : 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-request text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <h4 className="font-semibold">La Request viaggia</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                fetch() invia una POST request con il messaggio in JSON.
              </p>
            </motion.div>

            {/* Step 3: Server processes */}
            <motion.div
              className={`p-6 rounded-xl border-2 transition-all ${
                step === 3 ? 'border-server bg-server/5 glow-server' : 'border-border bg-card'
              }`}
              animate={{ scale: step === 3 ? 1.02 : 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-server text-secondary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  3
                </div>
                <h4 className="font-semibold">Il Server elabora</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Node.js riceve la request, salva il messaggio in memoria, prepara la response.
              </p>
            </motion.div>

            <div /> {/* Empty space */}

            <div /> {/* Empty space */}

            {/* Step 4: Response travels */}
            <motion.div
              className={`p-6 rounded-xl border-2 transition-all ${
                step === 4 ? 'border-response bg-response/5' : 'border-border bg-card'
              }`}
              animate={{ scale: step === 4 ? 1.02 : 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 4 ? 'bg-response text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  4
                </div>
                <h4 className="font-semibold">La Response torna</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Il server risponde con status 200 e l'array aggiornato in JSON.
              </p>
            </motion.div>

            {/* Step 5: UI Updates */}
            <motion.div
              className={`p-6 rounded-xl border-2 transition-all ${
                step === 5 ? 'border-accent bg-accent/5 glow-accent' : 'border-border bg-card'
              }`}
              animate={{ scale: step === 5 ? 1.02 : 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 5 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  5
                </div>
                <h4 className="font-semibold">La UI si aggiorna</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                JavaScript legge il JSON e aggiorna il DOM. L'utente vede il nuovo messaggio.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <h3 className="text-xl font-semibold mb-6 text-center">
          Prova il ciclo completo
        </h3>

        <div className="grid grid-cols-[1fr_100px_1fr] gap-4 items-start">
          {/* Client */}
          <DiagramBox variant="client" label="BROWSER" isActive={step === 1 || step === 5}>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 px-3 py-2 rounded border border-border bg-card text-sm"
                  disabled={isAnimating}
                  onKeyDown={(e) => e.key === 'Enter' && simulateFullCycle()}
                />
                <button
                  onClick={simulateFullCycle}
                  disabled={isAnimating || !inputValue.trim()}
                  className="px-4 py-2 rounded bg-client text-primary-foreground text-sm font-medium disabled:opacity-50"
                >
                  Invia
                </button>
              </div>

              <div className="p-3 rounded-lg bg-card border border-border min-h-[120px]">
                <p className="text-xs text-muted-foreground mb-2">Lista messaggi:</p>
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="py-1 px-2 text-sm bg-muted rounded mb-1"
                    >
                      • {msg}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </DiagramBox>

          {/* Connection */}
          <div className="flex flex-col items-center justify-center h-full pt-16">
            <motion.div
              animate={{ 
                opacity: step === 2 ? 1 : 0.3,
                y: step === 2 ? [0, 5, 0] : 0
              }}
              transition={{ repeat: step === 2 ? Infinity : 0, duration: 0.5 }}
            >
              <ArrowRight className="w-8 h-8 text-request" />
            </motion.div>
            <div className="text-xs font-mono text-muted-foreground my-2">HTTP</div>
            <motion.div
              animate={{ 
                opacity: step === 4 ? 1 : 0.3,
                y: step === 4 ? [0, 5, 0] : 0
              }}
              transition={{ repeat: step === 4 ? Infinity : 0, duration: 0.5 }}
            >
              <ArrowLeft className="w-8 h-8 text-response" />
            </motion.div>
          </div>

          {/* Server */}
          <DiagramBox variant="server" label="SERVER" isActive={step === 3}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Server className="w-4 h-4 text-server" />
                <span className="font-mono">Node.js</span>
              </div>

              <div className="p-3 rounded-lg bg-card border border-border min-h-[120px]">
                <p className="text-xs text-muted-foreground mb-2">Memoria RAM:</p>
                <div className="font-mono text-xs">
                  <span className="text-muted-foreground">let messaggi = </span>
                  <span className="text-server">[</span>
                  {messages.map((msg, i) => (
                    <span key={i}>
                      <br />  "{msg}"{i < messages.length - 1 ? ',' : ''}
                    </span>
                  ))}
                  <br />
                  <span className="text-server">]</span>
                </div>
              </div>
            </div>
          </DiagramBox>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto mt-12"
      >
        <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-muted border border-border">
          <h3 className="text-2xl font-bold text-center mb-8">
            🎓 Cosa hai imparato
          </h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Cos'è un Client</p>
                <p className="text-sm text-muted-foreground">
                  Il browser che esegue HTML, CSS, JavaScript sul computer dell'utente.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Cos'è un Server</p>
                <p className="text-sm text-muted-foreground">
                  Un programma Node.js che gira su una macchina remota, sempre attivo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold mb-1">HTTP Request</p>
                <p className="text-sm text-muted-foreground">
                  Un messaggio di testo strutturato inviato dal client al server.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold mb-1">HTTP Response</p>
                <p className="text-sm text-muted-foreground">
                  La risposta del server, con status code e dati JSON.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Dove vive lo stato</p>
                <p className="text-sm text-muted-foreground">
                  I dati "veri" vivono sul server, nella sua memoria RAM.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Full Stack</p>
                <p className="text-sm text-muted-foreground">
                  Significa lavorare su entrambi i lati: frontend E backend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="success" title="🚀 Ora sai cosa succede davvero!">
          Non c'è magia. Solo due programmi che parlano tra loro usando testo strutturato (HTTP).
          Tutto il resto (React, Express, database) sono <strong>astrazioni</strong> costruite sopra questi concetti fondamentali.
        </HighlightBox>
      </motion.div>
    </div>
  );
}
