import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { versions } from "@/config/versions";
import { Lock, ArrowRight, Sparkles } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

const Home = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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

      {/* Header */}
      <header className="relative border-b border-border/50 backdrop-blur-sm">
        {/* Logout Button */}
        <div className="absolute top-4 right-4 z-10">
          <LogoutButton className="text-muted-foreground hover:text-foreground hover:bg-muted/50" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Percorso Interattivo</span>
            </motion.div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">
              <span className="bg-gradient-to-r from-client via-primary to-server bg-clip-text text-transparent">
                Architetture delle
              </span>
              <br />
              <span className="text-foreground">Web Application</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Integrazione al Progetto Formativo
              <br />
              <span className="text-primary font-bold text-xl md:text-2xl">Super Programmatore</span>
            </motion.p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Scegli il tuo percorso
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Ogni versione aggiunge nuovi concetti. Inizia dalla Versione 1 per costruire 
            le fondamenta, poi prosegui per approfondire.
          </p>
        </motion.div>

        {/* Version Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {versions.map((version, index) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * (index + 1), duration: 0.5 }}
            >
              {version.isAvailable ? (
                <Link to={version.path} className="block group h-full">
                  <VersionCard version={version} />
                </Link>
              ) : (
                <VersionCard version={version} locked />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 text-muted-foreground text-sm">
            <span className="text-lg">🎓</span>
            <span>Progetto didattico</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>Node.js</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>Next.js</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>Full Stack</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

interface VersionCardProps {
  version: typeof versions[0];
  locked?: boolean;
}

function VersionCard({ version, locked = false }: VersionCardProps) {
  const colorClasses: Record<string, string> = {
    client: "border-client bg-client/5 hover:bg-client/10",
    server: "border-server bg-server/5 hover:bg-server/10",
    request: "border-request bg-request/5 hover:bg-request/10",
    accent: "border-accent bg-accent/5 hover:bg-accent/10",
  };

  const iconColorClasses: Record<string, string> = {
    client: "bg-client/20 text-client",
    server: "bg-server/20 text-server",
    request: "bg-request/20 text-request",
    accent: "bg-accent/20 text-accent",
  };

  const glowClasses: Record<string, string> = {
    client: "group-hover:shadow-[0_0_40px_-10px_hsl(var(--client))]",
    server: "group-hover:shadow-[0_0_40px_-10px_hsl(var(--server))]",
    request: "group-hover:shadow-[0_0_40px_-10px_hsl(var(--request))]",
    accent: "group-hover:shadow-[0_0_40px_-10px_hsl(var(--accent))]",
  };

  return (
    <div
      className={`
        relative p-6 rounded-2xl border-2 transition-all duration-500 h-full flex flex-col overflow-hidden
        ${locked 
          ? 'border-border bg-card/50 opacity-60 cursor-not-allowed' 
          : `${colorClasses[version.color]} cursor-pointer group-hover:scale-[1.02] ${glowClasses[version.color]}`
        }
      `}
    >
      {/* Gradient Overlay on Hover */}
      {!locked && (
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent via-transparent to-${version.color}/10 pointer-events-none`} />
      )}

      {/* Locked Overlay */}
      {locked && (
        <div className="absolute top-4 right-4">
          <div className="p-2 rounded-full bg-muted/80 backdrop-blur-sm">
            <Lock className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative flex items-start gap-4 mb-4">
        <motion.div 
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
            locked ? 'bg-muted' : iconColorClasses[version.color]
          }`}
          whileHover={!locked ? { scale: 1.1, rotate: 5 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {version.icon}
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">{version.title}</h3>
          <p className={`text-sm font-semibold ${locked ? 'text-muted-foreground' : `text-${version.color}`}`}>
            {version.subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-5 flex-grow leading-relaxed">
        {version.description}
      </p>

      {/* Modules Preview */}
      <div className="flex flex-wrap gap-2 mb-5 min-h-[60px]">
        {version.modules.slice(0, 4).map((module) => (
          <span
            key={module.id}
            className="px-3 py-1.5 rounded-lg bg-muted/80 text-xs text-muted-foreground h-fit backdrop-blur-sm border border-border/50"
          >
            {module.icon} {module.title}
          </span>
        ))}
        {version.modules.length > 4 && (
          <span className="px-3 py-1.5 rounded-lg bg-muted/80 text-xs text-muted-foreground h-fit backdrop-blur-sm border border-border/50">
            +{version.modules.length - 4} altri
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-auto relative">
        {!locked && (
          <div className={`flex items-center gap-2 text-sm font-semibold text-${version.color} group-hover:gap-4 transition-all duration-300`}>
            <span>Esplora il percorso</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}

        {locked && (
          <div className="text-sm text-muted-foreground italic">
            Prossimamente disponibile
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
