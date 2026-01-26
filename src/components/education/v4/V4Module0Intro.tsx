import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, X, Check, AlertTriangle } from "lucide-react";

interface V4Module0IntroProps {
  onNext: () => void;
}

// Confronto versioni precedenti vs questa
const previousVersions = [
  { label: "Stato in memoria", desc: "I dati spariscono al refresh" },
  { label: "Single user", desc: "Nessuna separazione tra utenti" },
  { label: "Niente login", desc: "Chiunque vede tutto" },
  { label: "Niente persistenza", desc: "Nessun database" },
  { label: "Solo localhost", desc: "Nessuno può accedere" },
];

const thisVersion = [
  { label: "Database PostgreSQL", desc: "I dati persistono per sempre" },
  { label: "Multi-utente", desc: "Ogni utente vede solo i suoi dati" },
  { label: "Autenticazione", desc: "Login, sessioni, identità" },
  { label: "Persistenza reale", desc: "Prisma ORM + migrazioni" },
  { label: "Deploy pubblico", desc: "URL accessibile a chiunque" },
];

export function V4Module0Intro({ onNext }: V4Module0IntroProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <span className="text-6xl">🚀</span>
        </motion.div>
        <motion.h1 
          className="text-4xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Versione 4: Da Demo a Prodotto Reale
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Questa non è più una demo. È un'applicazione che può andare online.
        </motion.p>
      </div>

      {/* Alert box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30"
      >
        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-600 dark:text-amber-400">Qui iniziano i problemi reali</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Le versioni precedenti ti hanno insegnato <strong>come funziona il web</strong>. 
            Questa versione ti insegna <strong>come si costruisce un prodotto vero</strong>.
          </p>
        </div>
      </motion.div>

      {/* Comparison cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Previous versions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Versioni 1-3</h3>
                  <p className="text-sm text-muted-foreground">Didattiche ma non reali</p>
                </div>
              </div>
              <ul className="space-y-3">
                {previousVersions.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <X className="w-4 h-4 text-destructive shrink-0 mt-1" />
                    <div>
                      <span className="font-medium text-sm">{item.label}</span>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* This version */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Versione 4</h3>
                  <p className="text-sm text-muted-foreground">Pronta per la produzione</p>
                </div>
              </div>
              <ul className="space-y-3">
                {thisVersion.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <div>
                      <span className="font-medium text-sm">{item.label}</span>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Technologies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center space-y-4"
      >
        <h3 className="text-lg font-semibold">Tecnologie che userai</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {["Next.js", "TypeScript", "Prisma", "PostgreSQL", "GitHub", "Vercel"].map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.1 }}
            >
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {tech}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-center p-6 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
      >
        <p className="text-lg font-medium text-foreground">
          "Qui servono nuove tecnologie perché i problemi sono nuovi"
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Non aggiungiamo complessità per sport: ogni tecnologia risolve un problema reale.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-center"
      >
        <Button size="lg" onClick={onNext} className="gap-2">
          Inizia il percorso
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}
