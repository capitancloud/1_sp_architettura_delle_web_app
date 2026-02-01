import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, KeyRound, Sparkles, AlertCircle } from "lucide-react";

const Login = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(code);
      if (!success) {
        setError("Codice di accesso non valido. Riprova.");
        setCode("");
      }
    } catch {
      setError("Si è verificato un errore. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-client/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-server/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-request/5 rounded-full blur-3xl"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Card className="border-2 border-border/50 backdrop-blur-sm bg-card/80 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-2">
            {/* Logo/Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-client via-primary to-server flex items-center justify-center shadow-lg"
            >
              <Lock className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>Area Riservata</span>
            </motion.div>

            <CardTitle className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-client via-primary to-server bg-clip-text text-transparent">
                Accesso al Percorso
              </span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Inserisci il codice di accesso per continuare
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-muted-foreground" />
                  Codice di Accesso
                </Label>
                <Input
                  id="code"
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Inserisci il codice..."
                  className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-client via-primary to-server hover:opacity-90 transition-opacity"
                disabled={isSubmitting || !code.trim()}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Lock className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Accedi
                  </>
                )}
              </Button>
            </form>

            {/* Footer info */}
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                🎓 Progetto Formativo
                <span className="mx-2">•</span>
                <span className="text-primary font-medium">Super Programmatore</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
