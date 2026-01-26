import { motion } from "framer-motion";
import { Globe, Server, Monitor, HardDrive } from "lucide-react";
import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  variant: 'client' | 'server';
  className?: string;
  isActive?: boolean;
  label?: string;
}

export function DiagramBox({ children, variant, className = "", isActive = false, label }: BoxProps) {
  const baseClasses = `
    relative p-6 rounded-xl border-2 transition-all duration-500
    ${variant === 'client' 
      ? 'border-client bg-client/5' 
      : 'border-server bg-server/5'
    }
    ${isActive ? (variant === 'client' ? 'glow-client' : 'glow-server') : ''}
  `;

  return (
    <motion.div 
      className={`${baseClasses} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {label && (
        <div className={`
          absolute -top-3 left-4 px-2 py-0.5 text-xs font-mono font-semibold rounded
          ${variant === 'client' ? 'bg-client text-primary-foreground' : 'bg-server text-secondary-foreground'}
        `}>
          {label}
        </div>
      )}
      {children}
    </motion.div>
  );
}

export function BrowserIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-16 h-16 rounded-xl bg-client/20 border border-client flex items-center justify-center mb-2">
        <Globe className="w-8 h-8 text-client" />
      </div>
      <span className="text-xs font-mono text-client">BROWSER</span>
    </div>
  );
}

export function ServerIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-16 h-16 rounded-xl bg-server/20 border border-server flex items-center justify-center mb-2">
        <Server className="w-8 h-8 text-server" />
      </div>
      <span className="text-xs font-mono text-server">SERVER</span>
    </div>
  );
}

interface DataPacketProps {
  direction: 'right' | 'left';
  label?: string;
  isAnimating?: boolean;
  type?: 'request' | 'response';
}

export function DataPacket({ direction, label, isAnimating = false, type = 'request' }: DataPacketProps) {
  const color = type === 'request' ? 'text-request bg-request/20 border-request' : 'text-response bg-response/20 border-response';
  
  return (
    <motion.div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono
        ${color}
        ${isAnimating ? 'data-packet' : ''}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {direction === 'right' ? '→' : '←'} {label || (type === 'request' ? 'REQUEST' : 'RESPONSE')}
    </motion.div>
  );
}

export function ConnectionLine({ isActive = false }: { isActive?: boolean }) {
  return (
    <svg className="w-full h-4 my-4" viewBox="0 0 200 20">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--client))" />
          <stop offset="100%" stopColor="hsl(var(--server))" />
        </linearGradient>
      </defs>
      <line
        x1="10"
        y1="10"
        x2="190"
        y2="10"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        className={isActive ? 'connection-line' : ''}
        strokeDasharray={isActive ? "8 4" : "0"}
      />
      <circle cx="10" cy="10" r="4" fill="hsl(var(--client))" />
      <circle cx="190" cy="10" r="4" fill="hsl(var(--server))" />
    </svg>
  );
}

export function CodeBlock({ children, title, language = "javascript" }: { children: string; title?: string; language?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {title && (
        <div className="px-4 py-2 bg-muted border-b border-border flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-highlight/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
          </div>
          <span className="text-xs font-mono text-muted-foreground ml-2">{title}</span>
        </div>
      )}
      <pre className="p-4 bg-card text-sm font-mono overflow-x-auto">
        <code className="text-foreground">{children}</code>
      </pre>
    </div>
  );
}

export function HighlightBox({ children, title, variant = 'info' }: { children: ReactNode; title?: string; variant?: 'info' | 'warning' | 'success' }) {
  const colors = {
    info: 'border-primary bg-primary/5 text-primary',
    warning: 'border-secondary bg-secondary/5 text-secondary',
    success: 'border-accent bg-accent/5 text-accent',
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[variant]}`}>
      {title && <p className="font-semibold text-sm mb-2">{title}</p>}
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

// Nuovi box esplicativi per migliorare l'apprendimento

interface ExplainerBoxProps {
  children: ReactNode;
  title?: string;
  type: 'analogy' | 'why' | 'remember' | 'tip' | 'warning';
}

export function ExplainerBox({ children, title, type }: ExplainerBoxProps) {
  const configs = {
    analogy: {
      icon: '🎭',
      label: 'Analogia',
      colors: 'border-purple-500/50 bg-purple-500/10',
      titleColor: 'text-purple-400',
    },
    why: {
      icon: '🤔',
      label: 'Perché?',
      colors: 'border-blue-500/50 bg-blue-500/10',
      titleColor: 'text-blue-400',
    },
    remember: {
      icon: '📌',
      label: 'Ricorda',
      colors: 'border-amber-500/50 bg-amber-500/10',
      titleColor: 'text-amber-400',
    },
    tip: {
      icon: '💡',
      label: 'Suggerimento',
      colors: 'border-emerald-500/50 bg-emerald-500/10',
      titleColor: 'text-emerald-400',
    },
    warning: {
      icon: '⚠️',
      label: 'Attenzione',
      colors: 'border-red-500/50 bg-red-500/10',
      titleColor: 'text-red-400',
    },
  };

  const config = configs[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border-2 ${config.colors}`}
    >
      <div className={`flex items-center gap-2 mb-2 ${config.titleColor}`}>
        <span className="text-lg">{config.icon}</span>
        <span className="font-semibold text-sm uppercase tracking-wide">
          {title || config.label}
        </span>
      </div>
      <div className="text-sm text-foreground leading-relaxed">{children}</div>
    </motion.div>
  );
}

interface FlowStepProps {
  number: number;
  title: string;
  description: string;
  isActive?: boolean;
  variant?: 'client' | 'server' | 'request' | 'response';
}

export function FlowStep({ number, title, description, isActive = false, variant = 'client' }: FlowStepProps) {
  const variantColors = {
    client: 'border-client bg-client/10 text-client',
    server: 'border-server bg-server/10 text-server',
    request: 'border-request bg-request/10 text-request',
    response: 'border-response bg-response/10 text-response',
  };

  return (
    <motion.div
      className={`relative p-4 rounded-lg border-2 transition-all ${
        isActive ? variantColors[variant] : 'border-border bg-card'
      }`}
      animate={{ scale: isActive ? 1.02 : 1 }}
    >
      <div className={`absolute -left-3 -top-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
        isActive ? variantColors[variant].split(' ')[0].replace('border-', 'bg-') + ' text-background' : 'bg-muted text-muted-foreground'
      }`}>
        {number}
      </div>
      <h4 className="font-semibold mb-1 ml-4">{title}</h4>
      <p className="text-sm text-muted-foreground ml-4">{description}</p>
    </motion.div>
  );
}

interface ComparisonBoxProps {
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
  leftVariant?: 'client' | 'server';
  rightVariant?: 'client' | 'server';
}

export function ComparisonBox({ 
  leftTitle, 
  rightTitle, 
  leftItems, 
  rightItems,
  leftVariant = 'client',
  rightVariant = 'server'
}: ComparisonBoxProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={`p-4 rounded-lg border-2 ${leftVariant === 'client' ? 'border-client bg-client/5' : 'border-server bg-server/5'}`}>
        <h4 className={`font-semibold mb-3 ${leftVariant === 'client' ? 'text-client' : 'text-server'}`}>
          {leftTitle}
        </h4>
        <ul className="space-y-2">
          {leftItems.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className={leftVariant === 'client' ? 'text-client' : 'text-server'}>•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={`p-4 rounded-lg border-2 ${rightVariant === 'client' ? 'border-client bg-client/5' : 'border-server bg-server/5'}`}>
        <h4 className={`font-semibold mb-3 ${rightVariant === 'client' ? 'text-client' : 'text-server'}`}>
          {rightTitle}
        </h4>
        <ul className="space-y-2">
          {rightItems.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className={rightVariant === 'client' ? 'text-client' : 'text-server'}>•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MemoryBlock({ data, label = "MEMORIA RAM" }: { data: string[]; label?: string }) {
  return (
    <div className="rounded-lg border border-server bg-server/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <HardDrive className="w-4 h-4 text-server" />
        <span className="text-xs font-mono text-server">{label}</span>
      </div>
      <div className="space-y-1">
        {data.length === 0 ? (
          <div className="text-xs font-mono text-muted-foreground italic">[ vuoto ]</div>
        ) : (
          data.map((item, i) => (
            <motion.div
              key={i}
              className="text-xs font-mono text-foreground bg-card px-2 py-1 rounded"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              [{i}] "{item}"
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
