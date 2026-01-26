import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Server, 
  Globe, 
  ArrowRight, 
  Folder,
  BookOpen,
  Trophy,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";

export function V3ModuleSummary() {
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const concepts = [
    {
      id: "project-structure",
      title: "Un Progetto, Due Ambienti",
      icon: "📁",
      summary: "Next.js unifica frontend e backend in un unico codebase",
      details: [
        "Il codice vive nella stessa cartella",
        "L'esecuzione resta divisa: Server (Node.js) e Browser",
        "Next.js decide dove eseguire ogni pezzo",
      ],
      color: "purple"
    },
    {
      id: "server-components",
      title: "Server Components",
      icon: "🖥️",
      summary: "Componenti che girano SOLO sul server",
      details: [
        "Default in Next.js App Router (nessuna direttiva)",
        "Possono accedere a database, file, secrets",
        "Il loro JavaScript NON viene inviato al browser",
        "Riducono il bundle size",
      ],
      color: "server"
    },
    {
      id: "client-components",
      title: "Client Components",
      icon: "🌐",
      summary: "Componenti per l'interattività nel browser",
      details: [
        "Richiedono la direttiva \"use client\"",
        "Gestiscono eventi: onClick, onChange, onSubmit",
        "Possono usare useState, useEffect",
        "Il loro JavaScript viene inviato al browser",
      ],
      color: "client"
    },
    {
      id: "server-actions",
      title: "Server Actions",
      icon: "🔄",
      summary: "Funzioni server chiamabili dal client",
      details: [
        "Usano la direttiva \"use server\"",
        "Permettono di mutare dati sul server",
        "Sostituiscono le API routes per operazioni semplici",
        "Gestiscono automaticamente la comunicazione HTTP",
      ],
      color: "request"
    },
    {
      id: "ssr",
      title: "Server-Side Rendering",
      icon: "📄",
      summary: "HTML generato sul server, pronto all'uso",
      details: [
        "Il browser riceve HTML già renderizzato",
        "L'utente vede il contenuto subito",
        "Hydration aggiunge interattività ai Client Components",
        "Migliora SEO e performance percepite",
      ],
      color: "purple"
    },
    {
      id: "typescript",
      title: "TypeScript come Contratto",
      icon: "📝",
      summary: "I tipi garantiscono coerenza tra server e client",
      details: [
        "Definisci la forma dei dati una volta",
        "Usali ovunque: Server Components, Client Components, Actions",
        "Errori trovati in compile-time, non a runtime",
      ],
      color: "blue"
    },
  ];

  const quizQuestions = [
    {
      question: "Un componente con useState deve essere...",
      options: ["Server Component", "Client Component"],
      correct: "Client Component",
      explanation: "useState è un hook che gestisce stato locale nel browser, quindi serve \"use client\""
    },
    {
      question: "Una query al database dovrebbe stare in un...",
      options: ["Server Component", "Client Component"],
      correct: "Server Component",
      explanation: "I Server Components possono accedere direttamente al database in modo sicuro"
    },
    {
      question: "Il codice di un Server Component viene inviato al browser?",
      options: ["Sì, sempre", "No, mai"],
      correct: "No, mai",
      explanation: "Solo l'HTML risultante viene inviato, non il codice JavaScript"
    },
    {
      question: "Per gestire un onClick serve...",
      options: ["\"use server\"", "\"use client\""],
      correct: "\"use client\"",
      explanation: "Gli eventi del DOM esistono solo nel browser, quindi serve un Client Component"
    },
  ];

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const getQuizScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) correct++;
    });
    return correct;
  };

  const allAnswered = Object.keys(quizAnswers).length === quizQuestions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-2 bg-green-500/20 text-green-400 border-green-500/30">
          Riepilogo Finale
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          🏆 Cosa Hai Imparato
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Rivediamo tutti i concetti chiave di Next.js e del modello Server/Client
        </p>
      </div>

      {/* Success Message */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400">Complimenti!</h3>
              <p className="text-muted-foreground">
                Ora sai distinguere cosa gira sul Server, cosa nel Browser, e cosa non arriva mai al client.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mental Model Recap */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Folder className="w-5 h-5 text-purple-400" />
            Il Modello Mentale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative p-6 rounded-xl border-2 border-purple-500/30 bg-purple-500/5">
            <div className="text-center mb-6">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                my-nextjs-app/
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Un progetto, due ambienti di esecuzione</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Server */}
              <div className="p-4 rounded-lg border-2 border-server bg-server/5">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-5 h-5 text-server" />
                  <span className="font-bold text-server">Server (Node.js)</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-server" />
                    Server Components (default)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-server" />
                    Server Actions ("use server")
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-server" />
                    Database, secrets, file system
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-server" />
                    Rendering HTML
                  </li>
                </ul>
              </div>

              {/* Browser */}
              <div className="p-4 rounded-lg border-2 border-client bg-client/5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-client" />
                  <span className="font-bold text-client">Browser (JavaScript)</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-client" />
                    Client Components ("use client")
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-client" />
                    Eventi (onClick, onChange)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-client" />
                    useState, useEffect
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-client" />
                    Animazioni, interazioni
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-request/10 border border-request/30 text-center">
              <span className="text-client">Browser</span>
              <ArrowRight className="w-4 h-4 inline mx-2 text-request" />
              <span className="text-request font-bold">HTTP</span>
              <ArrowRight className="w-4 h-4 inline mx-2 text-request" />
              <span className="text-server">Server</span>
              <p className="text-xs text-muted-foreground mt-1">
                La comunicazione è sempre HTTP, anche se Next.js la nasconde
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Concepts Accordion */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Concetti Chiave (clicca per espandere)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {concepts.map((concept) => (
            <motion.div
              key={concept.id}
              className={`
                rounded-lg border-2 overflow-hidden transition-all
                ${expandedConcept === concept.id 
                  ? `border-${concept.color} bg-${concept.color}/5` 
                  : "border-border/50 hover:border-border"
                }
              `}
            >
              <button
                onClick={() => setExpandedConcept(
                  expandedConcept === concept.id ? null : concept.id
                )}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <span className="text-2xl">{concept.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{concept.title}</p>
                  <p className="text-sm text-muted-foreground">{concept.summary}</p>
                </div>
                {expandedConcept === concept.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedConcept === concept.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4"
                  >
                    <ul className="space-y-2 ml-10">
                      {concept.details.map((detail, i) => (
                        <motion.li
                          key={detail}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-sm flex items-start gap-2"
                        >
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 text-${concept.color}`} />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Quiz */}
      <Card className="border-purple-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              Quiz Veloce
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowQuiz(!showQuiz);
                if (showQuiz) setQuizAnswers({});
              }}
            >
              {showQuiz ? "Nascondi" : "Mostra Quiz"}
            </Button>
          </CardTitle>
        </CardHeader>
        
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CardContent className="space-y-4">
                {quizQuestions.map((q, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="font-medium mb-3">{i + 1}. {q.question}</p>
                    <div className="flex gap-2 flex-wrap">
                      {q.options.map((option) => (
                        <Button
                          key={option}
                          variant={quizAnswers[i] === option ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleQuizAnswer(i, option)}
                          className={`
                            ${quizAnswers[i] === option 
                              ? quizAnswers[i] === q.correct 
                                ? "bg-green-500 hover:bg-green-600" 
                                : "bg-destructive hover:bg-destructive/90"
                              : ""
                            }
                          `}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    {quizAnswers[i] && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-sm mt-2 ${
                          quizAnswers[i] === q.correct ? "text-green-400" : "text-destructive"
                        }`}
                      >
                        {quizAnswers[i] === q.correct ? "✓ Corretto! " : "✗ Sbagliato. "}
                        {q.explanation}
                      </motion.p>
                    )}
                  </div>
                ))}

                {allAnswered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-lg text-center ${
                      getQuizScore() === quizQuestions.length 
                        ? "bg-green-500/20 border border-green-500/30" 
                        : "bg-muted/30 border border-border/50"
                    }`}
                  >
                    <p className="text-lg font-bold">
                      Punteggio: {getQuizScore()}/{quizQuestions.length}
                    </p>
                    {getQuizScore() === quizQuestions.length && (
                      <p className="text-green-400 text-sm mt-1">🎉 Perfetto! Hai capito tutto!</p>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Key Takeaways */}
      <div className="grid md:grid-cols-3 gap-4">
        <ExplainerBox type="remember" title="Ricorda">
          <strong>Il modello è sempre Client-Server</strong>. Next.js lo rende più ergonomico, ma la comunicazione HTTP resta.
        </ExplainerBox>
        
        <ExplainerBox type="tip" title="Best Practice">
          <strong>Parti sempre da Server Components</strong>. Aggiungi "use client" solo quando serve interattività.
        </ExplainerBox>
        
        <ExplainerBox type="why" title="Perché importa">
          Capire dove gira il codice ti aiuta a <strong>scrivere app più sicure, veloci e manutenibili</strong>.
        </ExplainerBox>
      </div>

      {/* Final Message */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-green-400 mb-2">🎓 Hai Completato la Versione 3!</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ora sai come Next.js organizza il codice tra server e browser. 
            Il prossimo passo? Costruire un'app completa con CRUD, API REST e deploy!
          </p>
          <div className="mt-4">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Prossimamente: Versione 4 - App Completa
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
