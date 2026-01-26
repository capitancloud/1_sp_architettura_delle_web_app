import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  Component, 
  ArrowRight,
  Puzzle,
  RefreshCw,
  Box
} from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";

interface V3ModuleReactProps {
  onNext?: () => void;
}

export function V3ModuleReact({ onNext }: V3ModuleReactProps) {
  const [activeTab, setActiveTab] = useState("jsx");

  const coreConceptsData = [
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Componenti",
      description: "Funzioni che restituiscono UI",
      borderClass: "border-client/30",
      bgClass: "bg-client/20",
      textClass: "text-client"
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: "Props",
      description: "Dati passati dall'esterno",
      borderClass: "border-server/30",
      bgClass: "bg-server/20",
      textClass: "text-server"
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "State",
      description: "Dati che cambiano nel tempo",
      borderClass: "border-request/30",
      bgClass: "bg-request/20",
      textClass: "text-request"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge className="mb-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
          React Fondamenti
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          ⚛️ React: Componenti e UI Dichiarativa
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          React è la libreria che usiamo per costruire interfacce. Capiamo i concetti chiave.
        </p>
      </motion.div>

      {/* What is React */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Component className="w-5 h-5 text-blue-400" />
              Cos'è React?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              React è una <strong>libreria JavaScript</strong> per costruire interfacce utente. 
              Il suo superpotere? <strong>UI dichiarativa</strong>: descrivi cosa vuoi vedere, 
              React si occupa di aggiornare il DOM.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 rounded-lg border border-red-500/30 bg-red-500/5"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm font-medium text-red-400 mb-2">❌ Imperativo (Vanilla JS)</p>
                <pre className="text-xs font-mono bg-muted/50 p-3 rounded overflow-x-auto">
{`const btn = document.createElement('button');
btn.textContent = 'Clicca';
btn.onclick = () => alert('Ciao!');
container.appendChild(btn);`}
                </pre>
              </motion.div>
              <motion.div 
                className="p-4 rounded-lg border border-green-500/30 bg-green-500/5"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm font-medium text-green-400 mb-2">✅ Dichiarativo (React)</p>
                <pre className="text-xs font-mono bg-muted/50 p-3 rounded overflow-x-auto">
{`function MyButton() {
  return (
    <button onClick={() => alert('Ciao!')}>
      Clicca
    </button>
  );
}`}
                </pre>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Core Concepts */}
      <motion.div 
        className="grid md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {coreConceptsData.map((concept) => (
          <motion.div
            key={concept.title}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className={`${concept.borderClass} h-full hover:shadow-lg transition-shadow`}>
              <CardContent className="pt-6">
                <div className={`w-12 h-12 rounded-lg ${concept.bgClass} flex items-center justify-center mb-3 ${concept.textClass}`}>
                  {concept.icon}
                </div>
                <h3 className="font-bold mb-1">{concept.title}</h3>
                <p className="text-sm text-muted-foreground">{concept.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabbed Examples */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Esempi Pratici</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="jsx">JSX</TabsTrigger>
              <TabsTrigger value="props">Props</TabsTrigger>
              <TabsTrigger value="state">State</TabsTrigger>
            </TabsList>

            <TabsContent value="jsx" className="mt-4">
              <ExplainerBox type="tip" title="JSX = JavaScript + XML">
                JSX ti permette di scrivere markup simile a HTML dentro JavaScript.
                React lo trasforma in chiamate a funzioni.
              </ExplainerBox>
              <pre className="text-sm font-mono bg-muted/50 p-4 rounded-lg mt-4 overflow-x-auto">
{`// Questo JSX...
const element = <h1 className="title">Ciao, mondo!</h1>;

// ...diventa questo JavaScript
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Ciao, mondo!'
);`}
              </pre>
            </TabsContent>

            <TabsContent value="props" className="mt-4">
              <ExplainerBox type="tip" title="Props = Parametri dei Componenti">
                Le props sono dati passati da un componente padre a uno figlio. 
                Sono <strong>read-only</strong>: il figlio non può modificarle.
              </ExplainerBox>
              <pre className="text-sm font-mono bg-muted/50 p-4 rounded-lg mt-4 overflow-x-auto">
{`// Componente che riceve props
function Greeting({ name, emoji }) {
  return <p>{emoji} Ciao, {name}!</p>;
}

// Uso del componente
<Greeting name="Mario" emoji="👋" />
// Renderizza: 👋 Ciao, Mario!`}
              </pre>
            </TabsContent>

            <TabsContent value="state" className="mt-4">
              <ExplainerBox type="tip" title="State = Dati che Cambiano">
                Lo state è memoria locale del componente. Quando cambia, 
                React ri-renderizza automaticamente il componente.
              </ExplainerBox>
              <pre className="text-sm font-mono bg-muted/50 p-4 rounded-lg mt-4 overflow-x-auto">
{`function Counter() {
  // useState ritorna [valore, funzionePerModificarlo]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Conteggio: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}`}
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* React in Next.js Context */}
      <ExplainerBox type="why" title="React in Next.js">
        In Next.js, React funziona sia sul <strong>server</strong> che nel <strong>browser</strong>:
        <ul className="mt-2 space-y-1">
          <li>• <strong>Server Components</strong>: React renderizza sul server, invia HTML</li>
          <li>• <strong>Client Components</strong>: React "idrata" l'HTML nel browser per interattività</li>
        </ul>
        La sintassi è la stessa, cambia dove viene eseguito il codice!
      </ExplainerBox>

      {/* Key Takeaways */}
      <Card className="border-blue-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">🎯 Punti Chiave</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">✓</span>
              <span><strong>Componenti</strong>: Funzioni che ritornano JSX (UI)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">✓</span>
              <span><strong>Props</strong>: Dati passati dall'esterno (read-only)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">✓</span>
              <span><strong>State</strong>: Dati interni che causano re-render quando cambiano</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">✓</span>
              <span><strong>JSX</strong>: Sintassi che mescola JavaScript e markup HTML-like</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Next Button */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="gap-2 bg-blue-500 hover:bg-blue-600"
          onClick={onNext}
        >
          Prossimo: Tailwind CSS
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
