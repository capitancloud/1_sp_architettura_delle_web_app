import { motion } from "framer-motion";
import { Globe, Server, ArrowRight, ArrowLeft } from "lucide-react";
import { DiagramBox, ConnectionLine, HighlightBox, ExplainerBox, ComparisonBox } from "../DiagramElements";
import { useState, useEffect } from "react";

export function ModuleOverview() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Chi fa cosa?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Una web application è composta da due parti che comunicano tra loro:
          il <span className="text-client font-semibold">Client</span> e il{" "}
          <span className="text-server font-semibold">Server</span>.
        </p>
      </motion.div>

      {/* Main Diagram */}
      <div className="relative grid grid-cols-2 gap-16 max-w-4xl mx-auto">
        {/* Client Side */}
        <DiagramBox 
          variant="client" 
          label="CLIENT (Frontend)"
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
            <h3 className="font-semibold text-foreground mb-2">Browser</h3>
            <p className="text-sm text-muted-foreground">
              Gira sul computer dell'utente
            </p>
            
            <div className="mt-4 w-full">
              <div className="p-3 rounded-lg bg-card border border-border">
                <p className="text-xs font-mono text-client mb-2">Contiene:</p>
                <ul className="text-xs text-muted-foreground space-y-1 text-left">
                  <li>• HTML (struttura)</li>
                  <li>• CSS (stile)</li>
                  <li>• JavaScript (logica)</li>
                </ul>
              </div>
            </div>
          </div>
        </DiagramBox>

        {/* Server Side */}
        <DiagramBox 
          variant="server" 
          label="SERVER (Backend)"
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
            <h3 className="font-semibold text-foreground mb-2">Node.js</h3>
            <p className="text-sm text-muted-foreground">
              Gira su una macchina remota
            </p>
            
            <div className="mt-4 w-full">
              <div className="p-3 rounded-lg bg-card border border-border">
                <p className="text-xs font-mono text-server mb-2">Contiene:</p>
                <ul className="text-xs text-muted-foreground space-y-1 text-left">
                  <li>• Logica applicativa</li>
                  <li>• Dati (in memoria)</li>
                  <li>• Gestione HTTP</li>
                </ul>
              </div>
            </div>
          </div>
        </DiagramBox>

        {/* Connection Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 flex flex-col items-center">
            {/* Request Arrow */}
            <motion.div
              className="flex items-center gap-2 mb-4"
              animate={{
                opacity: step === 1 ? 1 : 0.3,
                scale: step === 1 ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-mono text-request">REQUEST</span>
              <ArrowRight className="w-6 h-6 text-request" />
            </motion.div>

            {/* HTTP Line */}
            <div className="w-full h-px bg-gradient-to-r from-client to-server" />
            <span className="text-xs font-mono text-muted-foreground my-2">HTTP</span>
            <div className="w-full h-px bg-gradient-to-l from-client to-server" />

            {/* Response Arrow */}
            <motion.div
              className="flex items-center gap-2 mt-4"
              animate={{
                opacity: step === 2 ? 1 : 0.3,
                scale: step === 2 ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <ArrowLeft className="w-6 h-6 text-response" />
              <span className="text-xs font-mono text-response">RESPONSE</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => {
              setStep(i);
              setAutoPlay(false);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              step === i ? 'bg-primary w-8' : 'bg-muted hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>

      {/* Step Explanation */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {step === 0 && (
          <HighlightBox variant="info" title="👤 L'utente interagisce con il Browser">
            L'utente vede la pagina web e può interagire con essa (cliccare pulsanti, 
            scrivere testo). Il browser esegue il codice JavaScript.
          </HighlightBox>
        )}
        {step === 1 && (
          <HighlightBox variant="warning" title="📤 Il Browser invia una Request">
            Quando l'utente compie un'azione (es. invia un form), il JavaScript 
            costruisce una <strong>HTTP Request</strong> e la invia al server.
          </HighlightBox>
        )}
        {step === 2 && (
          <HighlightBox variant="warning" title="📥 Il Server elabora e risponde">
            Il server riceve la request, esegue la logica (es. salva dati), 
            e costruisce una <strong>HTTP Response</strong>.
          </HighlightBox>
        )}
        {step === 3 && (
          <HighlightBox variant="success" title="🔄 Il Browser aggiorna la UI">
            Il browser riceve la response, legge i dati (JSON), 
            e aggiorna ciò che l'utente vede sullo schermo.
          </HighlightBox>
        )}
      </motion.div>

      {/* Explainer Boxes */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
        <ExplainerBox type="analogy">
          Immagina un <strong>ristorante</strong>: il cliente (browser) è seduto al tavolo, 
          il cameriere porta l'ordine (request) in cucina (server), lo chef prepara il piatto 
          e il cameriere lo riporta (response) al tavolo.
        </ExplainerBox>

        <ExplainerBox type="why" title="Perché sono separati?">
          Il <strong>browser non può accedere direttamente ai dati</strong>. 
          Se potesse, chiunque potrebbe vedere i dati di tutti gli utenti! 
          Il server fa da "guardiano" dei dati.
        </ExplainerBox>
      </div>

      {/* Comparison Box */}
      <div className="max-w-4xl mx-auto mt-8">
        <ComparisonBox
          leftTitle="🌐 Nel Browser (Client)"
          rightTitle="🖥️ Sul Server"
          leftItems={[
            "Il codice è visibile a tutti",
            "Gira sul PC dell'utente",
            "Non può accedere a database",
            "Ogni utente ha la sua copia"
          ]}
          rightItems={[
            "Il codice è privato",
            "Gira su una macchina remota",
            "Accede a database e API",
            "Condiviso tra tutti gli utenti"
          ]}
          leftVariant="client"
          rightVariant="server"
        />
      </div>

      {/* Key Concepts */}
      <div className="grid grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        <motion.div
          className="p-4 rounded-lg bg-card border border-border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-2xl mb-2">🌐</div>
          <h4 className="font-semibold text-sm mb-1">Ambienti Separati</h4>
          <p className="text-xs text-muted-foreground">
            Client e server sono due programmi diversi, su macchine diverse
          </p>
        </motion.div>

        <motion.div
          className="p-4 rounded-lg bg-card border border-border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-2xl mb-2">📨</div>
          <h4 className="font-semibold text-sm mb-1">Comunicazione HTTP</h4>
          <p className="text-xs text-muted-foreground">
            Parlano tra loro usando il protocollo HTTP (testo strutturato)
          </p>
        </motion.div>

        <motion.div
          className="p-4 rounded-lg bg-card border border-border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-2xl mb-2">💾</div>
          <h4 className="font-semibold text-sm mb-1">Stato sul Server</h4>
          <p className="text-xs text-muted-foreground">
            I dati "veri" vivono sul server, non nel browser
          </p>
        </motion.div>
      </div>

      {/* Final Remember Box */}
      <div className="max-w-2xl mx-auto mt-8">
        <ExplainerBox type="remember">
          Ogni volta che interagisci con un sito web (like su Instagram, messaggio su WhatsApp Web, 
          acquisto su Amazon), il tuo browser sta inviando <strong>HTTP Request</strong> a un server 
          che risponde con <strong>HTTP Response</strong>.
        </ExplainerBox>
      </div>
    </div>
  );
}
