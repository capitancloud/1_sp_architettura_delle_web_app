import { motion, AnimatePresence } from "framer-motion";
import { HardDrive, RotateCcw, Plus, Trash2, AlertTriangle } from "lucide-react";
import { DiagramBox, HighlightBox, ExplainerBox, MemoryBlock } from "../DiagramElements";
import { useState } from "react";

export function V2ModuleStateRAM() {
  const [messages, setMessages] = useState<string[]>(["Messaggio 1", "Messaggio 2"]);
  const [inputValue, setInputValue] = useState("");
  const [showRestart, setShowRestart] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const addMessage = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, inputValue]);
    setInputValue("");
  };

  const restartServer = () => {
    setShowRestart(true);
    setIsRestarting(true);
    
    setTimeout(() => {
      setMessages([]);
      setIsRestarting(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-server/10 border border-server mb-4">
          <HardDrive className="w-5 h-5 text-server" />
          <span className="text-sm font-mono text-server">STATO IN MEMORIA</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Dove vivono i dati
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Con Node puro o Express, lo stato vive <strong className="text-server">sempre nella RAM del server</strong>.
          Questo non cambia.
        </p>
      </motion.div>

      {/* Learning Goals */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-xs text-muted-foreground mb-1">👁️ Cosa stai vedendo</p>
          <p className="text-sm">La RAM del server che si riempie e si svuota</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
          <p className="text-xs text-primary mb-1">🎯 Cosa devi capire</p>
          <p className="text-sm">Senza database, i dati si perdono al riavvio del server</p>
        </div>
      </div>

      {/* Interactive RAM Visualization */}
      <div className="max-w-4xl mx-auto">
        <DiagramBox variant="server" label="SERVER (Node.js + Express)" isActive>
          <div className="grid grid-cols-2 gap-6">
            {/* RAM Visualization */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-server" />
                  Memoria RAM
                </h3>
                <span className="text-xs text-muted-foreground">
                  {messages.length} elementi
                </span>
              </div>

              <motion.div
                className={`p-4 rounded-xl border-2 transition-all min-h-[200px] ${
                  isRestarting ? 'border-destructive bg-destructive/10' : 'border-server bg-server/5'
                }`}
                animate={{ 
                  scale: isRestarting ? [1, 1.02, 1] : 1,
                }}
              >
                {isRestarting ? (
                  <div className="h-full flex flex-col items-center justify-center text-destructive">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <RotateCcw className="w-12 h-12 mb-4" />
                    </motion.div>
                    <p className="font-semibold">Server in riavvio...</p>
                    <p className="text-sm">RAM in cancellazione</p>
                  </div>
                ) : (
                  <>
                    <div className="font-mono text-sm mb-2 text-server">
                      let messages = [
                    </div>
                    <AnimatePresence>
                      {messages.length === 0 ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-muted-foreground text-sm italic ml-4"
                        >
                          // Array vuoto
                        </motion.p>
                      ) : (
                        messages.map((msg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="ml-4 py-1 text-sm font-mono"
                          >
                            <span className="text-muted-foreground">[{i}]</span>{" "}
                            <span className="text-accent">"{msg}"</span>
                            {i < messages.length - 1 && <span className="text-muted-foreground">,</span>}
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                    <div className="font-mono text-sm text-server">
                      ];
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4">Simula operazioni</h3>

                {/* Add message */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Nuovo messaggio..."
                      className="flex-1 px-3 py-2 rounded border border-border bg-card text-sm"
                      disabled={isRestarting}
                      onKeyDown={(e) => e.key === 'Enter' && addMessage()}
                    />
                    <button
                      onClick={addMessage}
                      disabled={!inputValue.trim() || isRestarting}
                      className="px-4 py-2 rounded bg-accent text-accent-foreground disabled:opacity-50 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      POST
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Simula una POST /api/messages
                  </p>
                </div>
              </div>

              {/* Restart Server */}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={restartServer}
                  disabled={isRestarting}
                  className="w-full px-4 py-3 rounded-lg bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Riavvia Server
                </button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  ⚠️ Questo cancellerà tutti i dati!
                </p>
              </div>

              {/* Restart warning */}
              <AnimatePresence>
                {showRestart && !isRestarting && messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-destructive/10 border border-destructive"
                  >
                    <div className="flex items-center gap-2 text-destructive mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-semibold">Dati persi!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Il server si è riavviato. Tutti i messaggi sono scomparsi 
                      perché erano solo in RAM.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </DiagramBox>
      </div>

      {/* Key Points */}
      <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <div className="text-3xl mb-2">🌐</div>
          <h4 className="font-semibold text-sm mb-1">Lo stato NON vive nel browser</h4>
          <p className="text-xs text-muted-foreground">
            Il browser vede solo una copia temporanea
          </p>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <div className="text-3xl mb-2">💾</div>
          <h4 className="font-semibold text-sm mb-1">Lo stato vive sul server</h4>
          <p className="text-xs text-muted-foreground">
            Nella RAM, finché il processo è attivo
          </p>
        </div>

        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-center">
          <div className="text-3xl mb-2">⚠️</div>
          <h4 className="font-semibold text-sm mb-1">Se riavvii, perdi tutto</h4>
          <p className="text-xs text-muted-foreground">
            Senza database non c'è persistenza
          </p>
        </div>
      </div>

      {/* Explainers */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        <ExplainerBox type="analogy">
          La RAM è come una <strong>lavagna</strong>: puoi scrivere e cancellare velocemente,
          ma se spegni le luci (riavvii il server), tutto scompare.
          Il database sarebbe come un <strong>quaderno</strong>.
        </ExplainerBox>

        <ExplainerBox type="why" title="Perché non usiamo un database qui?">
          Per scopo didattico! Vogliamo che tu capisca <strong>dove vive lo stato</strong>
          prima di aggiungere complessità. Nella realtà, useresti PostgreSQL, MongoDB, ecc.
        </ExplainerBox>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="warning" title="💡 Messaggio chiave">
          <strong>Senza database questa è una demo didattica, non un'app reale.</strong>
          Ma il concetto è lo stesso: lo stato vive sul server, non nel browser.
          Express non cambia questo.
        </HighlightBox>
      </motion.div>
    </div>
  );
}
