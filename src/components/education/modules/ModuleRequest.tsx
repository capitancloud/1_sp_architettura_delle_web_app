import { motion } from "framer-motion";
import { ArrowRight, Send, FileText } from "lucide-react";
import { DiagramBox, CodeBlock, HighlightBox } from "../DiagramElements";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ModuleRequest() {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("Ciao mondo!");
  const [isAnimating, setIsAnimating] = useState(false);

  const simulateRequest = () => {
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

  const requestText = `POST /api/messaggi HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: ${JSON.stringify({ testo: inputValue }).length}

${JSON.stringify({ testo: inputValue }, null, 2)}`;

  return (
    <div className="space-y-8">
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
          La Request HTTP
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Quando clicchi "Invia", il browser costruisce un messaggio di testo 
          strutturato e lo invia al server.
        </p>
      </motion.div>

      {/* Interactive Demo */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
          {/* Client Side */}
          <DiagramBox variant="client" label="BROWSER" isActive={step <= 2}>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-3 py-2 rounded border border-border bg-card text-sm font-mono"
                  disabled={isAnimating}
                />
                <Button
                  onClick={simulateRequest}
                  disabled={isAnimating}
                  className="bg-client hover:bg-client/80"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Invia
                </Button>
              </div>

              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <p className="text-xs font-mono text-client">
                    📝 JavaScript costruisce la request...
                  </p>
                  <CodeBlock title="fetch()">
{`fetch('/api/messaggi', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    testo: "${inputValue}"
  })
});`}
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
                  className="h-full bg-gradient-to-r from-client to-server"
                  initial={{ width: '0%' }}
                  animate={{ width: step >= 3 ? '100%' : '50%' }}
                  transition={{ duration: 1 }}
                />
              )}
            </motion.div>
            
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  x: step === 2 ? [0, 20, 40] : 60
                }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                <div className="px-3 py-1.5 rounded-full bg-request/20 border border-request text-xs font-mono text-request flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  POST
                </div>
              </motion.div>
            )}
          </div>

          {/* Server Side */}
          <DiagramBox variant="server" label="SERVER" isActive={step >= 3}>
            <div className="space-y-4 min-h-[200px]">
              {step < 3 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  <div className="text-center">
                    <p className="font-mono mb-2">In attesa...</p>
                    <p className="text-xs">Il server ascolta sulla porta 3000</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <p className="text-xs font-mono text-server">
                    📥 Request ricevuta!
                  </p>
                  <CodeBlock title="server.js">
{`// Il server riceve:
const request = {
  method: 'POST',
  path: '/api/messaggi',
  body: { testo: "${inputValue}" }
};`}
                  </CodeBlock>
                </motion.div>
              )}
            </div>
          </DiagramBox>
        </div>

        {/* Step Progress */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                step >= i 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Request Anatomy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <h3 className="text-xl font-semibold mb-6 text-center">
          Anatomia di una HTTP Request
        </h3>

        <div className="grid grid-cols-2 gap-8">
          {/* Request Structure */}
          <div className="space-y-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="px-4 py-2 bg-request/10 border-b border-border">
                <span className="text-sm font-mono text-request">HTTP Request (testo puro)</span>
              </div>
              <pre className="p-4 bg-card text-sm font-mono whitespace-pre-wrap">
                <span className="text-highlight">POST</span> <span className="text-client">/api/messaggi</span> HTTP/1.1{'\n'}
                <span className="text-muted-foreground">Host:</span> localhost:3000{'\n'}
                <span className="text-muted-foreground">Content-Type:</span> application/json{'\n'}
                <span className="text-muted-foreground">Content-Length:</span> {JSON.stringify({ testo: inputValue }).length}{'\n'}
                {'\n'}
                <span className="text-accent">{JSON.stringify({ testo: inputValue }, null, 2)}</span>
              </pre>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-highlight" />
                <span className="font-semibold text-sm">Metodo HTTP</span>
              </div>
              <p className="text-sm text-muted-foreground">
                POST = "voglio inviare dati al server"<br/>
                GET = "voglio ricevere dati dal server"
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-client" />
                <span className="font-semibold text-sm">Path (URL)</span>
              </div>
              <p className="text-sm text-muted-foreground">
                L'indirizzo della risorsa sul server.<br/>
                Il server usa questo per capire cosa fare.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-accent" />
                <span className="font-semibold text-sm">Body</span>
              </div>
              <p className="text-sm text-muted-foreground">
                I dati veri e propri, in formato JSON.<br/>
                È come il "contenuto della busta".
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="warning" title="💡 Concetto chiave">
          Una HTTP Request è <strong>solo testo strutturato</strong>. 
          Non c'è magia: il browser costruisce una stringa di testo e la invia al server 
          attraverso la rete.
        </HighlightBox>
      </motion.div>
    </div>
  );
}
