import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react";
import { CodeBlock, HighlightBox, ExplainerBox } from "../DiagramElements";
import { useState } from "react";

export function V2ModuleComparison() {
  const [highlightMode, setHighlightMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'routing' | 'body' | 'response' | null>(null);

  const nodeCode = {
    routing: `// Node puro: routing MANUALE
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/messages') {
    // ... gestisci POST
  } else if (req.method === 'GET' && req.url === '/api/messages') {
    // ... gestisci GET
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});`,
    body: `// Node puro: body parsing MANUALE
let body = '';

req.on('data', chunk => {
  body += chunk.toString();
});

req.on('end', () => {
  const data = JSON.parse(body);
  // ... usa data.text
});`,
    response: `// Node puro: response MANUALE
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ messages }));`
  };

  const expressCode = {
    routing: `// Express: routing DICHIARATIVO
app.post('/api/messages', (req, res) => {
  // ... gestisci POST
});

app.get('/api/messages', (req, res) => {
  // ... gestisci GET
});

// 404 automatico per route non trovate`,
    body: `// Express: body parsing AUTOMATICO
app.use(express.json());

// Nel route handler:
app.post('/api/messages', (req, res) => {
  const data = req.body; // Già un oggetto!
  // ... usa data.text
});`,
    response: `// Express: response SEMPLIFICATA
res.json({ messages });

// Express fa automaticamente:
// - status 200
// - Content-Type: application/json
// - JSON.stringify()`
  };

  const sections = [
    { id: 'routing', label: '🛤️ Routing', description: 'Come si gestiscono diversi path e metodi' },
    { id: 'body', label: '📦 Body Parsing', description: 'Come si leggono i dati dalla request' },
    { id: 'response', label: '📤 Response', description: 'Come si invia la risposta' },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary mb-4">
          <span className="text-lg">⚖️</span>
          <span className="text-sm font-mono text-primary">CONFRONTO</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Node puro vs Express
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Questa è la sezione più importante. Vediamo <strong>cosa cambia davvero</strong> 
          e cosa resta identico.
        </p>
      </motion.div>

      {/* Learning Goals */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-xs text-muted-foreground mb-1">👁️ Cosa stai vedendo</p>
          <p className="text-sm">Confronto diretto del codice: stessa funzionalità, sintassi diversa</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
          <p className="text-xs text-primary mb-1">🎯 Cosa devi capire</p>
          <p className="text-sm">Express non aggiunge poteri: ti toglie lavoro ripetitivo</p>
        </div>
      </div>

      {/* Section Selector */}
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${
                selectedSection === section.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <p className="font-semibold mb-1">{section.label}</p>
              <p className="text-xs text-muted-foreground">{section.description}</p>
            </button>
          ))}
        </div>

        {/* Highlight Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setHighlightMode(!highlightMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              highlightMode
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            {highlightMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {highlightMode ? 'Evidenziazione attiva' : 'Evidenzia differenze'}
            </span>
          </button>
        </div>
      </div>

      {/* Comparison View */}
      <AnimatePresence mode="wait">
        {selectedSection && (
          <motion.div
            key={selectedSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Node puro */}
              <div className={`rounded-xl border-2 overflow-hidden ${highlightMode ? 'border-destructive' : 'border-border'}`}>
                <div className={`px-4 py-3 flex items-center justify-between ${highlightMode ? 'bg-destructive/10' : 'bg-muted'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    <span className="font-semibold">Node puro</span>
                    <span className="text-xs text-muted-foreground">(manuale)</span>
                  </div>
                  {highlightMode && (
                    <span className="px-2 py-1 rounded bg-destructive/20 text-destructive text-xs font-medium">
                      Più codice
                    </span>
                  )}
                </div>
                <div className={highlightMode ? 'ring-2 ring-inset ring-destructive/30' : ''}>
                  <CodeBlock>
                    {nodeCode[selectedSection]}
                  </CodeBlock>
                </div>
              </div>

              {/* Express */}
              <div className={`rounded-xl border-2 overflow-hidden ${highlightMode ? 'border-accent' : 'border-border'}`}>
                <div className={`px-4 py-3 flex items-center justify-between ${highlightMode ? 'bg-accent/10' : 'bg-muted'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="font-semibold">Express</span>
                    <span className="text-xs text-muted-foreground">(astrazione)</span>
                  </div>
                  {highlightMode && (
                    <span className="px-2 py-1 rounded bg-accent/20 text-accent text-xs font-medium">
                      Meno codice
                    </span>
                  )}
                </div>
                <div className={highlightMode ? 'ring-2 ring-inset ring-accent/30' : ''}>
                  <CodeBlock>
                    {expressCode[selectedSection]}
                  </CodeBlock>
                </div>
              </div>
            </div>

            {/* Section-specific explanation */}
            <div className="mt-6 grid grid-cols-2 gap-6">
              {selectedSection === 'routing' && (
                <>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                      <X className="w-4 h-4" /> Node puro
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• if/else su ogni metodo e path</li>
                      <li>• Gestione manuale del 404</li>
                      <li>• Codice annidato e difficile da leggere</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                      <Check className="w-4 h-4" /> Express
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Una riga per route</li>
                      <li>• 404 automatico</li>
                      <li>• Codice piatto e leggibile</li>
                    </ul>
                  </div>
                </>
              )}
              {selectedSection === 'body' && (
                <>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                      <X className="w-4 h-4" /> Node puro
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Ascolto eventi 'data' e 'end'</li>
                      <li>• Concatenazione manuale dei chunk</li>
                      <li>• JSON.parse() manuale</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                      <Check className="w-4 h-4" /> Express
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Una riga: express.json()</li>
                      <li>• req.body già pronto</li>
                      <li>• Nessun parsing manuale</li>
                    </ul>
                  </div>
                </>
              )}
              {selectedSection === 'response' && (
                <>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                      <X className="w-4 h-4" /> Node puro
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Impostare statusCode manualmente</li>
                      <li>• setHeader per Content-Type</li>
                      <li>• JSON.stringify + end()</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                      <Check className="w-4 h-4" /> Express
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Una riga: res.json()</li>
                      <li>• Headers automatici</li>
                      <li>• Status 200 di default</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedSection && (
        <div className="max-w-2xl mx-auto text-center p-8 rounded-xl bg-muted/30 border border-border">
          <p className="text-muted-foreground">
            👆 Seleziona una sezione sopra per vedere il confronto
          </p>
        </div>
      )}

      {/* Key Messages */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
        <ExplainerBox type="remember">
          <strong>Stesso comportamento, meno rumore.</strong>
          Il server fa le stesse identiche cose. Express ti fa scrivere meno codice boilerplate.
        </ExplainerBox>

        <ExplainerBox type="why" title="Perché usare Express?">
          Non per fare cose nuove, ma per <strong>fare le stesse cose più velocemente</strong> 
          e con codice più leggibile e mantenibile.
        </ExplainerBox>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="success" title="💡 Messaggio chiave">
          <strong>Express non aggiunge poteri: ti toglie lavoro ripetitivo.</strong>
          Il modello client-server, HTTP, e lo stato in memoria restano identici.
        </HighlightBox>
      </motion.div>
    </div>
  );
}
