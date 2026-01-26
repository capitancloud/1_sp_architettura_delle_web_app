import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  Paintbrush, 
  Smartphone,
  Moon,
  Zap
} from "lucide-react";
import { ExplainerBox } from "@/components/education/DiagramElements";

interface V3ModuleTailwindProps {
  onNext?: () => void;
}

export function V3ModuleTailwind({ onNext }: V3ModuleTailwindProps) {
  const [activeExample, setActiveExample] = useState("basic");
  const [isDarkPreview, setIsDarkPreview] = useState(false);

  const utilityExamples = [
    { class: "p-4", description: "Padding di 1rem (16px)" },
    { class: "mx-auto", description: "Margine orizzontale auto (centra)" },
    { class: "text-lg", description: "Font size large" },
    { class: "font-bold", description: "Font weight bold" },
    { class: "bg-blue-500", description: "Background blu" },
    { class: "rounded-lg", description: "Border radius grande" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14
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
        <Badge className="mb-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
          Tailwind CSS
        </Badge>
        <h1 className="text-3xl font-bold mb-2">
          🎨 Tailwind: Utility-First CSS
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tailwind è un framework CSS che usa classi utility per stilizzare direttamente nell'HTML.
        </p>
      </motion.div>

      {/* What is Tailwind */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Paintbrush className="w-5 h-5 text-cyan-400" />
              Cos'è Tailwind CSS?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Invece di scrivere CSS in file separati, applichi <strong>classi utility</strong> 
              direttamente sugli elementi. Ogni classe fa una cosa sola.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 rounded-lg border border-muted bg-muted/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm font-medium mb-2">📝 CSS Tradizionale</p>
                <pre className="text-xs font-mono bg-muted/50 p-3 rounded overflow-x-auto">
{`/* styles.css */
.card {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* HTML */
<div class="card">...</div>`}
                </pre>
              </motion.div>
              <motion.div 
                className="p-4 rounded-lg border border-cyan-500/30 bg-cyan-500/5"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm font-medium text-cyan-400 mb-2">⚡ Tailwind CSS</p>
                <pre className="text-xs font-mono bg-muted/50 p-3 rounded overflow-x-auto">
{`<!-- Nessun file CSS separato! -->

<div class="p-4 bg-white rounded-lg shadow">
  ...
</div>

<!-- Tutto inline, leggibile e prevedibile -->`}
                </pre>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Utility Classes Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Classi Utility Comuni</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {utilityExamples.map((item) => (
                <motion.div 
                  key={item.class}
                  className="p-3 rounded-lg border border-border/50 bg-muted/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-colors cursor-default"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <code className="text-sm font-mono text-cyan-400">{item.class}</code>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactive Examples */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Esempi Interattivi</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeExample} onValueChange={setActiveExample}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="basic">Base</TabsTrigger>
              <TabsTrigger value="responsive">Responsive</TabsTrigger>
              <TabsTrigger value="states">Stati</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Codice:</p>
                  <pre className="text-xs font-mono bg-muted/50 p-4 rounded-lg overflow-x-auto">
{`<button className="
  px-4 py-2
  bg-blue-500
  text-white
  rounded-lg
  font-medium
">
  Clicca qui
</button>`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Risultato:</p>
                  <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">
                      Clicca qui
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="responsive" className="mt-4">
              <ExplainerBox type="tip" title="Prefissi Responsive">
                <code>sm:</code>, <code>md:</code>, <code>lg:</code>, <code>xl:</code> applicano stili a breakpoint specifici.
              </ExplainerBox>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium mb-2">Codice:</p>
                  <pre className="text-xs font-mono bg-muted/50 p-4 rounded-lg overflow-x-auto">
{`<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4
">
  {/* 1 colonna su mobile */}
  {/* 2 colonne da 768px */}
  {/* 3 colonne da 1024px */}
</div>`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Comportamento:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile: 1 colonna</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">md:</span>
                      <span>Tablet: 2 colonne</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">lg:</span>
                      <span>Desktop: 3 colonne</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="states" className="mt-4">
              <ExplainerBox type="tip" title="Prefissi di Stato">
                <code>hover:</code>, <code>focus:</code>, <code>active:</code>, <code>dark:</code> applicano stili condizionali.
              </ExplainerBox>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium mb-2">Codice:</p>
                  <pre className="text-xs font-mono bg-muted/50 p-4 rounded-lg overflow-x-auto">
{`<button className="
  bg-green-500
  hover:bg-green-600
  active:bg-green-700
  transition-colors
">
  Hover me!
</button>`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Risultato (prova hover e click):</p>
                  <div className="p-4 bg-muted/30 rounded-lg flex flex-col items-center justify-center gap-4">
                    <motion.button 
                      className="px-6 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Hover me!
                    </motion.button>
                    <p className="text-xs text-muted-foreground">
                      👆 Passa il mouse sopra e clicca per vedere gli stati
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dark Mode */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Dark Mode con Tailwind
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Il prefisso <code>dark:</code> applica stili quando il tema scuro è attivo.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <pre className="text-xs font-mono bg-muted/50 p-4 rounded-lg overflow-x-auto">
{`<div className="
  bg-white
  dark:bg-gray-900
  text-gray-900
  dark:text-white
">
  Contenuto adattivo
</div>`}
            </pre>
            <div className="space-y-3">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsDarkPreview(!isDarkPreview)}
                  className="gap-2"
                >
                  <Moon className="w-4 h-4" />
                  Toggle Preview: {isDarkPreview ? "Dark" : "Light"}
                </Button>
              </motion.div>
              <motion.div 
                className={`p-4 rounded-lg transition-all duration-300 ${
                isDarkPreview 
                  ? "bg-gray-900 text-white" 
                  : "bg-white text-gray-900 border"
                }`}
                animate={{ 
                  backgroundColor: isDarkPreview ? "#111827" : "#ffffff",
                  color: isDarkPreview ? "#ffffff" : "#111827"
                }}
                transition={{ duration: 0.3 }}
              >
                Contenuto adattivo
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Tailwind */}
      <ExplainerBox type="why" title="Perché Tailwind in Next.js?">
        <ul className="mt-2 space-y-1">
          <li>• <strong>Zero context switching</strong>: stili direttamente nel componente</li>
          <li>• <strong>Bundle ottimizzato</strong>: Tailwind rimuove le classi non usate</li>
          <li>• <strong>Design system integrato</strong>: spacing, colori, tipografia consistenti</li>
          <li>• <strong>Responsive design</strong> facile con i prefissi breakpoint</li>
        </ul>
      </ExplainerBox>

      {/* Key Takeaways */}
      <Card className="border-cyan-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">🎯 Punti Chiave</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">✓</span>
              <span><strong>Utility-first</strong>: classi piccole e componibili</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">✓</span>
              <span><strong>Responsive</strong>: prefissi <code>sm:</code>, <code>md:</code>, <code>lg:</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">✓</span>
              <span><strong>Stati</strong>: prefissi <code>hover:</code>, <code>focus:</code>, <code>dark:</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">✓</span>
              <span><strong>Nessun CSS separato</strong>: tutto nel markup</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Next Button */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="gap-2 bg-cyan-500 hover:bg-cyan-600"
          onClick={onNext}
        >
          Prossimo: Client Components
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
