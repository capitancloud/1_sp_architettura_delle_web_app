import { motion, AnimatePresence } from "framer-motion";
import { Globe, MousePointer, Sparkles, Equal } from "lucide-react";
import { DiagramBox, CodeBlock, HighlightBox, ExplainerBox } from "../DiagramElements";
import { useState } from "react";

export function V2ModuleFrontendSame() {
  const [showRequest, setShowRequest] = useState(false);
  const [inputValue, setInputValue] = useState("Ciao Express!");
  const [messages, setMessages] = useState<string[]>(["Messaggio di esempio"]);
  const [highlightLine, setHighlightLine] = useState<number | null>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setShowRequest(true);
    setHighlightLine(1);
    
    setTimeout(() => setHighlightLine(2), 800);
    setTimeout(() => setHighlightLine(3), 1600);
    setTimeout(() => {
      setMessages(prev => [...prev, inputValue]);
      setInputValue("");
      setHighlightLine(null);
      setShowRequest(false);
    }, 2500);
  };

  const frontendCode = `// app.js - JavaScript VANILLA (nessun framework!)
const btn = document.getElementById('btn');
const input = document.getElementById('input');

btn.addEventListener('click', async () => {
  // 1️⃣ Leggo il valore dall'input
  const testo = input.value;
  
  // 2️⃣ Invio la REQUEST (identica con o senza Express!)
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: testo })
  });
  
  // 3️⃣ Ricevo la RESPONSE e aggiorno la UI
  const data = await response.json();
  aggiornaLista(data.messages);
});`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-client/10 border border-client mb-4">
          <Globe className="w-5 h-5 text-client" />
          <span className="text-sm font-mono text-client">FRONTEND</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Il Frontend non cambia
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Che tu usi Node puro o Express, il codice nel browser 
          <strong className="text-client"> resta identico</strong>.
        </p>
      </motion.div>

      {/* Learning Goals */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-xs text-muted-foreground mb-1">👁️ Cosa stai vedendo</p>
          <p className="text-sm">Una UI con input, bottone e lista - e il suo codice JavaScript</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
          <p className="text-xs text-primary mb-1">🎯 Cosa devi capire</p>
          <p className="text-sm">Il browser manda la stessa identica request, sia con Node puro che Express</p>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Browser Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <DiagramBox variant="client" label="BROWSER" isActive>
            <div className="rounded-lg overflow-hidden border border-border bg-card">
              {/* Browser Chrome */}
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
              <div className="p-6 bg-background">
                <h2 className="text-xl font-bold mb-4">Messaggi</h2>

                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 px-3 py-2 rounded border border-border bg-card text-sm"
                    disabled={showRequest}
                  />
                  <button
                    onClick={handleSend}
                    disabled={showRequest}
                    className="px-4 py-2 rounded bg-client text-primary-foreground text-sm font-medium disabled:opacity-50"
                  >
                    Invia
                  </button>
                </div>

                {/* Request Animation */}
                <AnimatePresence>
                  {showRequest && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-4 p-3 rounded-lg bg-request/20 border border-request"
                    >
                      <div className="flex items-center gap-2 text-request text-sm">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        <span>Invio HTTP Request a /api/messages...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Messages List */}
                <div className="p-3 rounded border border-border bg-muted/30 min-h-[100px]">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="py-1 text-sm"
                    >
                      • {msg}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </DiagramBox>
        </motion.div>

        {/* Code View */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold">Codice Frontend</span>
            <span className="px-2 py-0.5 rounded bg-client/20 text-client text-xs font-mono">
              vanilla JS
            </span>
          </div>

          <CodeBlock title="app.js">
            {frontendCode}
          </CodeBlock>

          {/* Highlight indicator */}
          <AnimatePresence>
            {highlightLine && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-lg bg-client/10 border border-client"
              >
                <p className="text-sm text-client">
                  {highlightLine === 1 && "📝 Leggo il valore dall'input..."}
                  {highlightLine === 2 && "📤 Invio la request HTTP con fetch()..."}
                  {highlightLine === 3 && "📥 Ricevo la response e aggiorno la UI!"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Key Point */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex items-center justify-center gap-4 p-6 rounded-xl bg-card border-2 border-primary">
          <div className="text-4xl">🌐</div>
          <Equal className="w-8 h-8 text-primary" />
          <div className="text-center">
            <p className="text-lg font-semibold">Frontend con Node puro</p>
            <p className="text-sm text-muted-foreground">fetch('/api/messages', ...)</p>
          </div>
          <Equal className="w-8 h-8 text-primary" />
          <div className="text-center">
            <p className="text-lg font-semibold">Frontend con Express</p>
            <p className="text-sm text-muted-foreground">fetch('/api/messages', ...)</p>
          </div>
        </div>
      </div>

      {/* Explainers */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
        <ExplainerBox type="remember">
          Il browser non sa e non gli interessa se dietro c'è Node puro o Express.
          Lui manda la <strong>stessa identica HTTP Request</strong>.
        </ExplainerBox>

        <ExplainerBox type="why" title="Perché è importante?">
          Perché significa che <strong>Express non è magia</strong>: è solo un modo più comodo 
          per il server di gestire le richieste che già riceveva.
        </ExplainerBox>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="success" title="💡 Messaggio chiave">
          Il browser manda la stessa identica request, anche se dietro usi Express.
          <strong> Cambia solo come il server la riceve e risponde.</strong>
        </HighlightBox>
      </motion.div>
    </div>
  );
}
