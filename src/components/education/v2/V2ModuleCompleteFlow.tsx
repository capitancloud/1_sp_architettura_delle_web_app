import { motion } from "framer-motion";
import { RefreshCw, CheckCircle, MousePointer, ArrowRight, Server, HardDrive, ArrowLeft, Globe } from "lucide-react";
import { HighlightBox, ExplainerBox, CodeBlock } from "../DiagramElements";
import { useState } from "react";

export function V2ModuleCompleteFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Click utente",
      icon: MousePointer,
      color: "client",
      description: "L'utente clicca 'Invia' nel browser",
      code: `btn.addEventListener('click', async () => {
  const text = input.value;
  // ...
});`,
      detail: "Il JavaScript ascolta l'evento click"
    },
    {
      id: 2,
      title: "Request HTTP",
      icon: ArrowRight,
      color: "request",
      description: "Il browser costruisce e invia la request",
      code: `await fetch('/api/messages', {
  method: 'POST',
  body: JSON.stringify({ text })
});`,
      detail: "POST /api/messages con body JSON"
    },
    {
      id: 3,
      title: "Express Route",
      icon: Server,
      color: "server",
      description: "Express riceve e indirizza la request",
      code: `app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  // ...
});`,
      detail: "Routing automatico + body parsing"
    },
    {
      id: 4,
      title: "Stato in memoria",
      icon: HardDrive,
      color: "accent",
      description: "Il server salva il messaggio in RAM",
      code: `messages.push(text);`,
      detail: "Array in RAM (identico a Node puro)"
    },
    {
      id: 5,
      title: "Response + UI",
      icon: ArrowLeft,
      color: "response",
      description: "Il server risponde, il browser aggiorna",
      code: `res.json({ messages });

// Nel browser:
const data = await response.json();
updateList(data.messages);`,
      detail: "res.json() + aggiornamento DOM"
    },
  ];

  const playTimeline = () => {
    setIsPlaying(true);
    setCurrentStep(0);

    steps.forEach((_, i) => {
      setTimeout(() => {
        setCurrentStep(i + 1);
        if (i === steps.length - 1) {
          setTimeout(() => setIsPlaying(false), 2000);
        }
      }, (i + 1) * 2000);
    });
  };

  const colorClasses: Record<string, string> = {
    client: "bg-client text-primary-foreground border-client",
    request: "bg-request text-primary-foreground border-request",
    server: "bg-server text-secondary-foreground border-server",
    accent: "bg-accent text-accent-foreground border-accent",
    response: "bg-response text-primary-foreground border-response",
  };

  const bgColorClasses: Record<string, string> = {
    client: "bg-client/10 border-client",
    request: "bg-request/10 border-request",
    server: "bg-server/10 border-server",
    accent: "bg-accent/10 border-accent",
    response: "bg-response/10 border-response",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent mb-4">
          <RefreshCw className="w-5 h-5 text-accent" />
          <span className="text-sm font-mono text-accent">FLUSSO COMPLETO</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Il ciclo completo con Express
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          5 step: dal click dell'utente all'aggiornamento della UI.
          <strong className="text-accent"> Clicca ogni step</strong> per vedere il codice coinvolto.
        </p>
      </motion.div>

      {/* Learning Goals */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-xs text-muted-foreground mb-1">👁️ Cosa stai vedendo</p>
          <p className="text-sm">Una timeline interattiva del ciclo request-response</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
          <p className="text-xs text-primary mb-1">🎯 Cosa devi capire</p>
          <p className="text-sm">Il flusso è lo stesso di Node puro, Express cambia solo il "come"</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto">
        {/* Play Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={playTimeline}
            disabled={isPlaying}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} />
            {isPlaying ? 'Animazione in corso...' : 'Avvia animazione completa'}
          </button>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-muted rounded" />
          <motion.div
            className="absolute top-12 left-0 h-1 bg-gradient-to-r from-client via-server to-response rounded"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />

          {/* Steps */}
          <div className="relative grid grid-cols-5 gap-4">
            {steps.map((step, i) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;
              const Icon = step.icon;

              return (
                <motion.button
                  key={step.id}
                  onClick={() => !isPlaying && setCurrentStep(step.id)}
                  disabled={isPlaying}
                  className="flex flex-col items-center text-center"
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                >
                  {/* Icon Circle */}
                  <div
                    className={`
                      w-24 h-24 rounded-2xl flex items-center justify-center mb-4 border-2 transition-all
                      ${isActive || isPast ? colorClasses[step.color] : 'bg-muted border-border text-muted-foreground'}
                      ${!isPlaying ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
                    `}
                  >
                    <Icon className="w-10 h-10" />
                  </div>

                  {/* Step Number */}
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-2
                    ${isActive || isPast ? colorClasses[step.color] : 'bg-muted text-muted-foreground'}
                  `}>
                    {isPast ? '✓' : step.id}
                  </div>

                  {/* Title */}
                  <p className={`font-semibold text-sm ${isActive ? '' : 'text-muted-foreground'}`}>
                    {step.title}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Step Detail */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          {currentStep === 0 ? (
            <div className="p-8 rounded-xl bg-muted/30 border border-border text-center">
              <p className="text-muted-foreground">
                👆 Clicca su uno step o premi "Avvia animazione"
              </p>
            </div>
          ) : (
            <div className={`p-6 rounded-xl border-2 ${bgColorClasses[steps[currentStep - 1].color]}`}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Step {currentStep}: {steps[currentStep - 1].title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {steps[currentStep - 1].description}
                  </p>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <p className="text-sm font-medium">{steps[currentStep - 1].detail}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Codice coinvolto:</p>
                  <CodeBlock>
                    {steps[currentStep - 1].code}
                  </CodeBlock>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-muted border border-border">
          <h3 className="text-2xl font-bold text-center mb-8">
            🎓 Cosa hai imparato in questa versione
          </h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-server flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Cosa Express semplifica
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-server">✓</span>
                  <span><strong>Routing</strong>: app.get/post invece di if/else</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-server">✓</span>
                  <span><strong>Body parsing</strong>: req.body già pronto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-server">✓</span>
                  <span><strong>Response</strong>: res.json() in una riga</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-primary flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Cosa NON cambia mai
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Il modello <strong>Client-Server</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Le <strong>HTTP Request/Response</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Lo <strong>stato sul server</strong> (in RAM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Il <strong>frontend vanilla</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final Messages */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        <ExplainerBox type="remember">
          <strong>Express è un'astrazione</strong>, non magia. Sotto il cofano, 
          usa sempre Node.js e rispetta lo stesso modello HTTP che hai visto nella Versione 1.
        </ExplainerBox>

        <ExplainerBox type="warning" title="Senza database...">
          Questa resta una <strong>demo didattica</strong>. In produzione useresti 
          un database per persistere i dati. Ma il flusso Client-Server resterebbe lo stesso!
        </ExplainerBox>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <HighlightBox variant="success" title="🚀 Complimenti!">
          Ora capisci <strong>perché esiste Express</strong>: non per fare cose nuove, 
          ma per scrivere meno codice ripetitivo. Il modello Client-Server che hai imparato 
          nella Versione 1 resta identico!
        </HighlightBox>
      </motion.div>
    </div>
  );
}
