import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { versions } from "@/config/versions";
import { Lock, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase tracking-wide">
              Architetture delle Web Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Integrazione al Progetto Formativo
              <br />
              <span className="text-primary font-semibold">Super Programmatore</span>
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl font-semibold mb-4">Scegli il tuo percorso</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ogni versione aggiunge nuovi concetti. Inizia dalla Versione 1 per costruire 
            le fondamenta, poi prosegui per approfondire.
          </p>
        </motion.div>

        {/* Version Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {versions.map((version, index) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              {version.isAvailable ? (
                <Link to={version.path} className="block group">
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
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm">
            <span>🎓</span>
            <span>Progetto didattico • Node.js puro • Vanilla JavaScript</span>
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

  return (
    <div
      className={`
        relative p-6 rounded-2xl border-2 transition-all duration-300 h-full flex flex-col
        ${locked 
          ? 'border-border bg-card opacity-60 cursor-not-allowed' 
          : colorClasses[version.color] + ' cursor-pointer group-hover:scale-[1.02]'
        }
      `}
    >
      {/* Locked Overlay */}
      {locked && (
        <div className="absolute top-4 right-4">
          <div className="p-2 rounded-full bg-muted">
            <Lock className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
          locked ? 'bg-muted' : iconColorClasses[version.color]
        }`}>
          {version.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{version.title}</h3>
          <p className={`text-sm font-medium ${locked ? 'text-muted-foreground' : `text-${version.color}`}`}>
            {version.subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 flex-grow">
        {version.description}
      </p>

      {/* Modules Preview */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[60px]">
        {version.modules.slice(0, 4).map((module) => (
          <span
            key={module.id}
            className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground h-fit"
          >
            {module.icon} {module.title}
          </span>
        ))}
        {version.modules.length > 4 && (
          <span className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground h-fit">
            +{version.modules.length - 4} altri
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-auto">
        {!locked && (
          <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:gap-3 transition-all">
            <span>Inizia</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}

        {locked && (
          <div className="text-sm text-muted-foreground">
            Prossimamente disponibile
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
