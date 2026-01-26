import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { DiagramBox, CodeBlock, HighlightBox, ExplainerBox } from "../DiagramElements";
import { useState } from "react";

export function V2ModuleRequestSame() {
  const [showDetails, setShowDetails] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("Ciao dal browser!");

  const simulateRequest = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1000);
    setTimeout(() => setStep(3), 2000);
    setTimeout(() => setStep(0), 4000);
  };

  const rawRequest = `POST /api/messages HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: ${JSON.stringify({ text: inputValue }).length}
Connection: keep-alive
Accept: application/json

${JSON.stringify({ text: inputValue }, null, 2)}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-request/10 border border-request mb-4">
          <ArrowRight className="w-5 h-5 text-request" />
          <span className="text-sm font-mono text-request">HTTP REQUEST</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          La Request HTTP (uguale a prima)
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          La request che parte dal browser è <strong className="text-request">sempre la stessa</strong>.
          Express non la modifica: cambia solo come il server la gestisce.
        </p>
      </motion.div>

      {/* Learning Goals */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-xs text-muted-foreground mb-1">👁️ Cosa stai vedendo</p>
          <p className="text-sm">La struttura di una HTTP Request: metodo, path, headers, body</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
          <p className="text-xs text-primary mb-1">🎯 Cosa devi capire</p>
          <p className="text-sm">Express non cambia la request - cambia come la ricevi e gestisci sul server</p>
        </div>
      </div>

      {/* Request Builder */}
      <div className="max-w-4xl mx-auto">
        <DiagramBox variant="client" label="BROWSER costruisce la REQUEST">
          <div className="space-y-4">
            {/* Input */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Messaggio da inviare:</label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-border bg-card text-sm font-mono"
                />
              </div>
              <button
                onClick={simulateRequest}
                disabled={step > 0}
                className="px-6 py-2 rounded-lg bg-request text-primary-foreground font-medium disabled:opacity-50"
              >
                Invia Request
              </button>
            </div>

            {/* Request Preview */}
            <div className="grid grid-cols-4 gap-3">
              <motion.div
                className={`p-3 rounded-lg border text-center ${
                  step >= 1 ? 'border-request bg-request/10' : 'border-border bg-card'
                }`}
                animate={{ scale: step === 1 ? 1.05 : 1 }}
              >
                <p className="text-xs text-muted-foreground mb-1">Metodo</p>
                <p className="font-mono font-bold text-request">POST</p>
              </motion.div>

              <motion.div
                className={`p-3 rounded-lg border text-center ${
                  step >= 1 ? 'border-request bg-request/10' : 'border-border bg-card'
                }`}
                animate={{ scale: step === 1 ? 1.05 : 1 }}
              >
                <p className="text-xs text-muted-foreground mb-1">Path</p>
                <p className="font-mono font-bold text-client">/api/messages</p>
              </motion.div>

              <motion.div
                className={`p-3 rounded-lg border text-center ${
                  step >= 2 ? 'border-request bg-request/10' : 'border-border bg-card'
                }`}
                animate={{ scale: step === 2 ? 1.05 : 1 }}
              >
                <p className="text-xs text-muted-foreground mb-1">Content-Type</p>
                <p className="font-mono text-sm text-muted-foreground">application/json</p>
              </motion.div>

              <motion.div
                className={`p-3 rounded-lg border text-center ${
                  step >= 3 ? 'border-request bg-request/10' : 'border-border bg-card'
                }`}
                animate={{ scale: step === 3 ? 1.05 : 1 }}
              >
                <p className="text-xs text-muted-foreground mb-1">Body</p>
                <p className="font-mono text-sm text-accent truncate">{"{"}"text": "..."{"}"}</p>
              </motion.div>
            </div>

            {/* Animated Progress */}
            <AnimatePresence>
              {step > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-lg bg-request/20 border border-request"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-request"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    />
                    <span className="text-sm text-request">
                      {step === 1 && "Costruzione request..."}
                      {step === 2 && "Aggiunta headers..."}
                      {step === 3 && "Invio al server... →"}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DiagramBox>
      </div>

      {/* Expandable Details */}
      <div className="max-w-4xl mx-auto space-y-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors"
        >
          <span className="flex items-center gap-2 font-medium">
            <Eye className="w-4 h-4" />
            Mostra dettagli della Request
          </span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-request/20 flex items-center justify-center text-xs text-request">1</span>
                    Metodo HTTP
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <code className="text-request">POST</code> = "voglio INVIARE dati al server"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Altri: GET (leggi), PUT (aggiorna), DELETE (elimina)
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-client/20 flex items-center justify-center text-xs text-client">2</span>
                    Path (URL)
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <code className="text-client">/api/messages</code> = l'indirizzo della risorsa
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Il server usa questo per capire cosa fare
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">3</span>
                    Headers
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Metadati: tipo contenuto, autenticazione, ecc.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Content-Type: application/json
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-xs text-accent">4</span>
                    Body
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    I dati veri e propri in formato JSON
                  </p>
                  <code className="text-xs text-accent">
                    {JSON.stringify({ text: inputValue })}
                  </code>
                </div>
              </div>

              {/* Raw Request Toggle */}
              <button
                onClick={() => setShowRaw(!showRaw)}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <FileText className="w-4 h-4" />
                {showRaw ? "Nascondi" : "Mostra"} com'è fatta DAVVERO la request (testo puro)
              </button>

              {showRaw && (
                <div className="rounded-lg border border-request overflow-hidden">
                  <div className="px-4 py-2 bg-request/10 border-b border-request">
                    <span className="text-sm font-mono text-request">HTTP Request (testo grezzo)</span>
                  </div>
                  <pre className="p-4 bg-card text-sm font-mono overflow-x-auto whitespace-pre">
                    {rawRequest}
                  </pre>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Explainers */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        <ExplainerBox type="analogy">
          La request è come una <strong>lettera</strong>: ha mittente, destinatario, oggetto e contenuto.
          Express non cambia la lettera - cambia come l'ufficio postale la smista!
        </ExplainerBox>

        <ExplainerBox type="remember">
          <strong>POST /api/messages</strong> con body JSON.
          Questa è la request. Identica con Node puro o Express.
          <strong> La differenza è SOLO lato server.</strong>
        </ExplainerBox>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="warning" title="💡 Messaggio chiave">
          Express non cambia la request: cambia <strong>come la ricevi e gestisci sul server</strong>.
          Nel prossimo modulo vedremo esattamente cosa Express semplifica.
        </HighlightBox>
      </motion.div>
    </div>
  );
}
