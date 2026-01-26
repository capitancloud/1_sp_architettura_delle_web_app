import { motion } from "framer-motion";
import { Globe, Server, ArrowRight, ArrowLeft, Info } from "lucide-react";
import { DiagramBox, HighlightBox, ExplainerBox, ComparisonBox } from "../DiagramElements";
import { useState, useEffect } from "react";

export function V2ModuleMentalMap() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary mb-4">
          <span className="text-lg">🗺️</span>
          <span className="text-sm font-mono text-primary">MAPPA MENTALE</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Chi gira dove?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Prima di parlare di Express, ricordiamo la regola fondamentale:
          <strong className="text-foreground"> Client e Server sono due mondi separati</strong>.
        </p>
      </motion.div>

      {/* Learning Goals */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-xs text-muted-foreground mb-1">👁️ Cosa stai vedendo</p>
          <p className="text-sm">I due ambienti di una web app: Browser e Server</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
          <p className="text-xs text-primary mb-1">🎯 Cosa devi capire</p>
          <p className="text-sm">Express gira sul Server, non cambia nulla nel Browser</p>
        </div>
      </div>

      {/* Main Diagram */}
      <div className="relative grid grid-cols-2 gap-20 max-w-4xl mx-auto">
        {/* Client Side */}
        <DiagramBox 
          variant="client" 
          label="CLIENT (Browser)"
          isActive={step === 0 || step === 3}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`
              w-20 h-20 rounded-2xl flex items-center justify-center mb-4
              bg-client/20 border-2 border-client
              ${step === 0 || step === 3 ? 'pulse-client' : ''}
            `}>
              <Globe className="w-10 h-10 text-client" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Browser dell'utente</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Gira sul TUO computer
            </p>
            
            <div className="w-full p-3 rounded-lg bg-card border border-border text-left">
              <p className="text-xs font-mono text-client mb-2">Contiene sempre:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• HTML, CSS</li>
                <li>• JavaScript <span className="text-client">(vanilla)</span></li>
                <li>• Nessuna libreria</li>
              </ul>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-client/10 border border-client/30 w-full">
              <p className="text-xs font-semibold text-client">
                ⚡ Express non esiste qui!
              </p>
            </div>
          </div>
        </DiagramBox>

        {/* Server Side */}
        <DiagramBox 
          variant="server" 
          label="SERVER (Node.js)"
          isActive={step === 1 || step === 2}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`
              w-20 h-20 rounded-2xl flex items-center justify-center mb-4
              bg-server/20 border-2 border-server
              ${step === 1 || step === 2 ? 'pulse-server' : ''}
            `}>
              <Server className="w-10 h-10 text-server" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Server remoto</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Gira su UNA macchina lontana
            </p>
            
            <div className="w-full p-3 rounded-lg bg-card border border-border text-left">
              <p className="text-xs font-mono text-server mb-2">Può contenere:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Node.js puro <span className="text-muted-foreground">(manuale)</span></li>
                <li>• Node.js + <span className="text-server font-semibold">Express</span></li>
                <li>• Stato in memoria (RAM)</li>
              </ul>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-server/10 border border-server/30 w-full">
              <p className="text-xs font-semibold text-server">
                ⚡ Express vive QUI!
              </p>
            </div>
          </div>
        </DiagramBox>

        {/* Connection Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 flex flex-col items-center">
            <motion.div
              className="flex items-center gap-2 mb-4"
              animate={{
                opacity: step === 1 ? 1 : 0.3,
                scale: step === 1 ? 1.1 : 1,
              }}
            >
              <span className="text-xs font-mono text-request">REQUEST</span>
              <ArrowRight className="w-6 h-6 text-request" />
            </motion.div>

            <div className="w-full h-1 bg-gradient-to-r from-client to-server rounded" />
            <span className="text-xs font-mono text-muted-foreground my-2">HTTP</span>
            <div className="w-full h-1 bg-gradient-to-l from-client to-server rounded" />

            <motion.div
              className="flex items-center gap-2 mt-4"
              animate={{
                opacity: step === 2 ? 1 : 0.3,
                scale: step === 2 ? 1.1 : 1,
              }}
            >
              <ArrowLeft className="w-6 h-6 text-response" />
              <span className="text-xs font-mono text-response">RESPONSE</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Step Controls */}
      <div className="flex justify-center gap-2 mt-8">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => { setStep(i); setAutoPlay(false); }}
            className={`h-2 rounded-full transition-all ${
              step === i ? 'w-8 bg-primary' : 'w-2 bg-muted hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>

      {/* Key Messages */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
        <ExplainerBox type="warning" title="Il browser non può...">
          <p>
            ...entrare nella memoria del server. Non può leggere l'array dei messaggi direttamente.
            Deve <strong>chiedere</strong> tramite HTTP.
          </p>
        </ExplainerBox>

        <ExplainerBox type="remember">
          <p>
            Il server non disegna la UI: risponde solo a richieste.
            <strong> Express non cambia questo</strong>: cambia solo come scrivi il codice server.
          </p>
        </ExplainerBox>
      </div>

      {/* Final Highlight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="info" title="💡 Concetto chiave di questa versione">
          <strong>Express non cambia COSA fa una web app</strong>.
          Cambia solo <strong>COME</strong> scrivi il backend.
          Il modello Client-Server resta identico.
        </HighlightBox>
      </motion.div>
    </div>
  );
}
