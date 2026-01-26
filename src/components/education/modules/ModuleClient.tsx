import { motion, AnimatePresence } from "framer-motion";
import { Globe, MousePointer, Code, Eye, Sparkles } from "lucide-react";
import { DiagramBox, CodeBlock, HighlightBox } from "../DiagramElements";
import { useState } from "react";

export function ModuleClient() {
  const [activeTab, setActiveTab] = useState<'html' | 'js'>('html');
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showClickEffect, setShowClickEffect] = useState(false);
  const [clickStep, setClickStep] = useState(0);

  const handleSendClick = () => {
    if (!inputValue.trim()) {
      setInputValue("Ciao mondo!");
    }
    setShowClickEffect(true);
    setClickStep(1);
    setActiveTab('js');
    
    setTimeout(() => setClickStep(2), 800);
    setTimeout(() => setClickStep(3), 1600);
    setTimeout(() => {
      setClickStep(0);
      setShowClickEffect(false);
    }, 4000);
  };
  const htmlCode = `<!DOCTYPE html>
<html>
<head>
  <title>La mia App</title>
</head>
<body>
  <h1>Messaggi</h1>
  
  <input type="text" id="input" />
  <button id="btn">Invia</button>
  
  <ul id="lista">
    <!-- I messaggi appariranno qui -->
  </ul>

  <script src="app.js"></script>
</body>
</html>`;

  const jsCode = `// Il browser esegue questo codice
const input = document.getElementById('input');
const btn = document.getElementById('btn');
const lista = document.getElementById('lista');

btn.addEventListener('click', async () => {
  const messaggio = input.value;
  
  // Costruisco la REQUEST
  const response = await fetch('/api/messaggi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ testo: messaggio })
  });
  
  // Ricevo la RESPONSE
  const dati = await response.json();
  
  // Aggiorno la UI
  aggiornaLista(dati);
});`;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-client/10 border border-client mb-4">
          <Globe className="w-5 h-5 text-client" />
          <span className="text-sm font-mono text-client">CLIENT / FRONTEND</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Il Browser
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Il frontend è il codice che gira nel browser dell'utente.
          È ciò che l'utente vede e con cui interagisce.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Browser Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DiagramBox variant="client" label="BROWSER (Chrome, Firefox...)" isActive>
            {/* Browser Chrome */}
            <div className="rounded-lg overflow-hidden border border-border bg-card">
              {/* Browser Header */}
              <div className="px-4 py-2 bg-muted border-b border-border flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-highlight/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                </div>
                <div className="flex-1 px-4 py-1 rounded bg-background text-xs font-mono text-muted-foreground">
                  http://localhost:3000
                </div>
              </div>

              {/* Browser Content */}
              <div className="p-6 bg-background min-h-[300px]">
                <h2 
                  className={`text-xl font-bold mb-4 transition-all ${highlightedElement === 'h1' ? 'ring-2 ring-client rounded p-1' : ''}`}
                  onMouseEnter={() => setHighlightedElement('h1')}
                  onMouseLeave={() => setHighlightedElement(null)}
                >
                  Messaggi
                </h2>

                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className={`flex-1 px-3 py-2 rounded border bg-card text-sm transition-all ${
                      highlightedElement === 'input' ? 'ring-2 ring-client' : 'border-border'
                    }`}
                    onMouseEnter={() => setHighlightedElement('input')}
                    onMouseLeave={() => setHighlightedElement(null)}
                  />
                  <motion.button
                    onClick={handleSendClick}
                    disabled={showClickEffect}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded bg-client text-primary-foreground text-sm font-medium transition-all ${
                      highlightedElement === 'button' ? 'ring-2 ring-highlight ring-offset-2 ring-offset-background' : ''
                    } ${showClickEffect ? 'animate-pulse' : ''}`}
                    onMouseEnter={() => setHighlightedElement('button')}
                    onMouseLeave={() => setHighlightedElement(null)}
                  >
                    Invia
                  </motion.button>
                </div>

                {/* Click Effect Explanation */}
                <AnimatePresence>
                  {showClickEffect && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-3 rounded-lg bg-client/20 border border-client"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-client" />
                        <span className="text-sm font-semibold text-client">Cosa sta succedendo:</span>
                      </div>
                      <ol className="text-xs space-y-1">
                        <li className={`transition-all ${clickStep >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {clickStep >= 1 ? '✓' : '○'} 1. Evento "click" catturato dal JavaScript
                        </li>
                        <li className={`transition-all ${clickStep >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {clickStep >= 2 ? '✓' : '○'} 2. Lettura valore input: "{inputValue || 'Ciao mondo!'}"
                        </li>
                        <li className={`transition-all ${clickStep >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {clickStep >= 3 ? '✓' : '○'} 3. Preparazione HTTP Request... → vai al modulo successivo!
                        </li>
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>

                <ul 
                  className={`space-y-2 p-3 rounded border min-h-[100px] transition-all ${
                    highlightedElement === 'lista' ? 'ring-2 ring-client border-client' : 'border-border bg-muted/30'
                  }`}
                  onMouseEnter={() => setHighlightedElement('lista')}
                  onMouseLeave={() => setHighlightedElement(null)}
                >
                  <li className="text-sm text-muted-foreground italic">
                    I messaggi appariranno qui...
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <MousePointer className="w-4 h-4" />
              <span>Passa il mouse sugli elementi per evidenziarli</span>
            </div>
          </DiagramBox>
        </motion.div>

        {/* Code View */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'html' 
                  ? 'bg-client text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'js' 
                  ? 'bg-client text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              app.js
            </button>
          </div>

          {/* Code Block */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CodeBlock title={activeTab === 'html' ? 'index.html' : 'app.js'}>
              {activeTab === 'html' ? htmlCode : jsCode}
            </CodeBlock>
          </motion.div>

          {/* Explanation */}
          {activeTab === 'js' && (
            <HighlightBox variant="info" title="🔑 Cosa fa il JavaScript?">
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Ascolta il click sul pulsante</li>
                <li>Legge il valore dell'input</li>
                <li>Costruisce una <strong>HTTP Request</strong></li>
                <li>Aspetta la <strong>Response</strong> dal server</li>
                <li>Aggiorna la lista sullo schermo</li>
              </ol>
            </HighlightBox>
          )}
        </motion.div>
      </div>

      {/* Key Points */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
        <motion.div
          className="p-5 rounded-xl bg-card border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-client/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-client" />
            </div>
            <h4 className="font-semibold">Cosa può fare il Browser</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>✓ Mostrare HTML, CSS, immagini</li>
            <li>✓ Eseguire JavaScript</li>
            <li>✓ Gestire interazioni utente</li>
            <li>✓ Inviare HTTP Request</li>
          </ul>
        </motion.div>

        <motion.div
          className="p-5 rounded-xl bg-card border border-destructive/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-destructive" />
            </div>
            <h4 className="font-semibold">Cosa NON può fare</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>✗ Accedere alla memoria del server</li>
            <li>✗ Leggere/scrivere file sul server</li>
            <li>✗ Accedere a database</li>
            <li>✗ Eseguire codice "sicuro"</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="warning" title="⚠️ Concetto chiave">
          Il browser è un ambiente <strong>isolato</strong>. Non ha accesso diretto ai dati del server.
          Per comunicare con il server, deve inviare una <strong>HTTP Request</strong>.
        </HighlightBox>
      </motion.div>
    </div>
  );
}
