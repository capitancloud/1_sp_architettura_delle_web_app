import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Database, Key, Link2 } from "lucide-react";

interface V4Module3DataModelProps {
  onNext: () => void;
}

const userFields = [
  { name: "id", type: "String @id", desc: "Identificatore unico", isKey: true },
  { name: "email", type: "String @unique", desc: "Email per il login" },
  { name: "passwordHash", type: "String", desc: "Password criptata (mai in chiaro!)" },
  { name: "createdAt", type: "DateTime @default(now())", desc: "Quando si è registrato" },
  { name: "items", type: "Item[]", desc: "Relazione: tutti i suoi item", isRelation: true },
];

const itemFields = [
  { name: "id", type: "String @id", desc: "Identificatore unico", isKey: true },
  { name: "content", type: "String", desc: "Il contenuto dell'item" },
  { name: "userId", type: "String", desc: "A chi appartiene", isRelation: true },
  { name: "user", type: "User @relation", desc: "Relazione inversa", isRelation: true },
  { name: "createdAt", type: "DateTime @default(now())", desc: "Quando è stato creato" },
];

export function V4Module3DataModel({ onNext }: V4Module3DataModelProps) {
  const [highlightRelation, setHighlightRelation] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="outline" className="mb-2">Modulo 3</Badge>
        <h1 className="text-3xl font-bold">Modello Dati con Prisma</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Il database ha bisogno di una <strong>struttura</strong>. Prisma traduce TypeScript in tabelle SQL.
        </p>
      </div>

      {/* Prisma logo and intro */}
      <div className="flex items-center justify-center gap-4 p-4 rounded-lg bg-muted/50">
        <Database className="w-8 h-8 text-primary" />
        <div>
          <p className="font-semibold">Prisma ORM</p>
          <p className="text-sm text-muted-foreground">Scrivi modelli, Prisma crea le tabelle</p>
        </div>
      </div>

      {/* Schema visualization */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* User model */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-server/30 bg-server/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-server">
                <span className="text-xl">👤</span>
                model User
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {userFields.map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onMouseEnter={() => field.isRelation && setHighlightRelation(true)}
                  onMouseLeave={() => setHighlightRelation(false)}
                  className={`
                    flex items-start gap-3 p-2 rounded text-sm
                    ${field.isRelation && highlightRelation ? "bg-primary/20 ring-1 ring-primary" : ""}
                    ${field.isKey ? "bg-amber-500/10" : ""}
                  `}
                >
                  <div className="flex items-center gap-1 shrink-0">
                    {field.isKey && <Key className="w-3 h-3 text-amber-500" />}
                    {field.isRelation && <Link2 className="w-3 h-3 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <code className="font-mono text-xs">
                      <span className="text-foreground">{field.name}</span>
                      <span className="text-muted-foreground"> {field.type}</span>
                    </code>
                    <p className="text-xs text-muted-foreground mt-0.5">{field.desc}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Item model */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-client/30 bg-client/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-client">
                <span className="text-xl">📝</span>
                model Item
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {itemFields.map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onMouseEnter={() => field.isRelation && setHighlightRelation(true)}
                  onMouseLeave={() => setHighlightRelation(false)}
                  className={`
                    flex items-start gap-3 p-2 rounded text-sm
                    ${field.isRelation && highlightRelation ? "bg-primary/20 ring-1 ring-primary" : ""}
                    ${field.isKey ? "bg-amber-500/10" : ""}
                  `}
                >
                  <div className="flex items-center gap-1 shrink-0">
                    {field.isKey && <Key className="w-3 h-3 text-amber-500" />}
                    {field.isRelation && <Link2 className="w-3 h-3 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <code className="font-mono text-xs">
                      <span className="text-foreground">{field.name}</span>
                      <span className="text-muted-foreground"> {field.type}</span>
                    </code>
                    <p className="text-xs text-muted-foreground mt-0.5">{field.desc}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Relation explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative"
      >
        <div className="absolute left-1/2 -top-4 -translate-x-1/2">
          <ArrowDown className={`w-6 h-6 transition-colors ${highlightRelation ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <Card className={`transition-all ${highlightRelation ? "ring-2 ring-primary bg-primary/5" : ""}`}>
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">La Relazione User → Item</h3>
            <p className="text-sm text-muted-foreground">
              Ogni <code className="bg-muted px-1 rounded">Item</code> ha un campo <code className="bg-muted px-1 rounded">userId</code> 
              che punta a un <code className="bg-muted px-1 rounded">User</code>. 
              Questo garantisce che ogni item appartenga a uno e un solo utente.
            </p>
            <div className="mt-4 font-mono text-xs bg-muted rounded p-3 text-left">
              <span className="text-muted-foreground">// Trova tutti gli item di un utente</span><br />
              <span className="text-primary">const</span> items = <span className="text-primary">await</span> prisma.item.findMany({'{'}<br />
              &nbsp;&nbsp;where: {'{'} userId: user.id {'}'}<br />
              {'}'})
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Why this structure */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="p-4">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Sufficiente</h4>
            <p className="text-xs text-muted-foreground">
              Due modelli bastano per dimostrare autenticazione, relazioni e CRUD completo.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Realistica</h4>
            <p className="text-xs text-muted-foreground">
              Questa è la struttura di base di qualsiasi app: utenti che possiedono risorse.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/5 border-purple-500/20">
          <CardContent className="p-4">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Estendibile</h4>
            <p className="text-xs text-muted-foreground">
              Aggiungere campi o modelli è facile: basta modificare lo schema e migrare.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Migrations note */}
      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <h4 className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2 mb-2">
          <span>⚠️</span> Cosa sono le migrazioni?
        </h4>
        <p className="text-sm text-muted-foreground">
          Quando modifichi lo schema Prisma, devi creare una <strong>migrazione</strong>: un file SQL 
          che aggiorna la struttura del database. È come un "commit" per il database.
        </p>
        <code className="block mt-3 text-xs bg-background/50 rounded p-2 font-mono">
          npx prisma migrate dev --name "add_user_table"
        </code>
      </div>

      {/* Key message */}
      <div className="text-center p-6 rounded-xl bg-gradient-to-r from-server/10 via-primary/10 to-client/10 border">
        <p className="text-lg font-medium">
          "Il database non è solo storage, è struttura"
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Lo schema definisce cosa puoi salvare, come è organizzato e come i dati si collegano.
        </p>
      </div>
    </div>
  );
}
