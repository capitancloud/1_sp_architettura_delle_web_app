import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertCircle, FileJson } from "lucide-react";
import { DiagramBox, CodeBlock, HighlightBox } from "../DiagramElements";
import { useState } from "react";

export function ModuleResponse() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const simulateResponse = () => {
    setStep(0);
    setIsAnimating(true);
    
    const steps = [1, 2, 3, 4];
    steps.forEach((s, i) => {
      setTimeout(() => {
        setStep(s);
        if (s === 4) {
          setTimeout(() => setIsAnimating(false), 1000);
        }
      }, (i + 1) * 1500);
    });
  };

  const responseExample = {
    messaggi: ["Ciao mondo!", "Secondo messaggio", "Terzo messaggio"]
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-response/10 border border-response mb-4">
          <ArrowLeft className="w-5 h-5 text-response" />
          <span className="text-sm font-mono text-response">HTTP RESPONSE</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          La Response HTTP
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Dopo aver elaborato la request, il server costruisce una response
          e la invia indietro al browser.
        </p>
      </motion.div>

      {/* Interactive Demo */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
          {/* Server Side */}
          <DiagramBox variant="server" label="SERVER" isActive={step <= 2}>
            <div className="space-y-4 min-h-[200px]">
              {step === 0 && (
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-4">Il server ha elaborato i dati</p>
                  <button
                    onClick={simulateResponse}
                    className="px-4 py-2 rounded-lg bg-server text-secondary-foreground text-sm font-medium"
                  >
                    ▶ Invia Response
                  </button>
                </div>
              )}

              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <p className="text-xs font-mono text-server">
                    📤 Costruisco la response...
                  </p>
                  <CodeBlock title="server.js">
{`// Costruisco la response
res.writeHead(200, {
  'Content-Type': 'application/json'
});

res.end(JSON.stringify({
  messaggi: ["Ciao mondo!", ...]
}));`}
                  </CodeBlock>
                </motion.div>
              )}
            </div>
          </DiagramBox>

          {/* Connection */}
          <div className="flex flex-col items-center px-4">
            <motion.div
              className="w-32 h-2 bg-muted rounded-full overflow-hidden"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: step >= 2 ? 1 : 0.5 }}
            >
              {step >= 2 && (
                <motion.div
                  className="h-full bg-gradient-to-l from-server to-client"
                  initial={{ width: '0%', marginLeft: 'auto' }}
                  animate={{ width: step >= 3 ? '100%' : '50%' }}
                  transition={{ duration: 1 }}
                  style={{ marginLeft: 'auto' }}
                />
              )}
            </motion.div>
            
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ 
                  opacity: 1, 
                  x: step === 2 ? [40, 20, 0] : -20
                }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                <div className="px-3 py-1.5 rounded-full bg-response/20 border border-response text-xs font-mono text-response flex items-center gap-2">
                  <FileJson className="w-3 h-3" />
                  200 OK
                </div>
              </motion.div>
            )}
          </div>

          {/* Client Side */}
          <DiagramBox variant="client" label="BROWSER" isActive={step >= 3}>
            <div className="space-y-4 min-h-[200px]">
              {step < 3 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-sm text-muted-foreground">
                    <div className="animate-pulse mb-2">⏳</div>
                    <p>In attesa della response...</p>
                    <p className="text-xs mt-1">(await fetch(...))</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <p className="text-xs font-mono text-client">
                    📥 Response ricevuta!
                  </p>
                  <CodeBlock title="app.js">
{`// La Promise si risolve!
const response = await fetch(...);

// Leggo il JSON
const dati = await response.json();

console.log(dati.messaggi);
// ["Ciao mondo!", ...]`}
                  </CodeBlock>
                </motion.div>
              )}
            </div>
          </DiagramBox>
        </div>
      </div>

      {/* Response Anatomy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <h3 className="text-xl font-semibold mb-6 text-center">
          Anatomia di una HTTP Response
        </h3>

        <div className="grid grid-cols-2 gap-8">
          {/* Response Structure */}
          <div className="space-y-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="px-4 py-2 bg-response/10 border-b border-border">
                <span className="text-sm font-mono text-response">HTTP Response (testo puro)</span>
              </div>
              <pre className="p-4 bg-card text-sm font-mono whitespace-pre-wrap">
                HTTP/1.1 <span className="text-accent">200 OK</span>{'\n'}
                <span className="text-muted-foreground">Content-Type:</span> application/json{'\n'}
                <span className="text-muted-foreground">Date:</span> Mon, 27 Jan 2025 10:00:00 GMT{'\n'}
                {'\n'}
                <span className="text-response">{JSON.stringify(responseExample, null, 2)}</span>
              </pre>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="font-semibold text-sm">Status Code 200</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "Tutto OK, la richiesta è andata a buon fine"<br/>
                Altri codici: 404 (non trovato), 500 (errore server)
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <FileJson className="w-4 h-4 text-response" />
                <span className="font-semibold text-sm">Content-Type: JSON</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Dice al browser: "il body contiene JSON".<br/>
                Così il browser sa come interpretarlo.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-response" />
                <span className="font-semibold text-sm">Body (i dati)</span>
              </div>
              <p className="text-sm text-muted-foreground">
                L'array dei messaggi in formato JSON.<br/>
                Il frontend lo userà per aggiornare la UI.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status Codes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <h4 className="text-lg font-semibold mb-4">I principali Status Code</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-accent/10 border border-accent text-center">
            <div className="text-2xl font-bold text-accent mb-1">200</div>
            <div className="text-xs text-muted-foreground">OK</div>
          </div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary text-center">
            <div className="text-2xl font-bold text-primary mb-1">201</div>
            <div className="text-xs text-muted-foreground">Created</div>
          </div>
          <div className="p-4 rounded-lg bg-highlight/10 border border-highlight text-center">
            <div className="text-2xl font-bold text-highlight mb-1">404</div>
            <div className="text-xs text-muted-foreground">Not Found</div>
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive text-center">
            <div className="text-2xl font-bold text-destructive mb-1">500</div>
            <div className="text-xs text-muted-foreground">Server Error</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="success" title="💡 Concetto chiave">
          La response è <strong>solo testo strutturato</strong>, proprio come la request.
          Il browser riceve una stringa e usa <code>JSON.parse()</code> per trasformarla in un oggetto usabile.
        </HighlightBox>
      </motion.div>
    </div>
  );
}
