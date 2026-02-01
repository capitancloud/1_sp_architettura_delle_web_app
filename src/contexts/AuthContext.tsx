import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Hash SHA-256 del codice di accesso: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
const VALID_CODE_HASH = "a8b5c3d2e1f0987654321abcdef0123456789abcdef0123456789abcdef012345";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Funzione per generare hash SHA-256
async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

// Pre-calcola l'hash del codice valido (eseguito una volta all'avvio)
let validHashCache: string | null = null;
const VALID_CODE = "gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E";

async function getValidHash(): Promise<string> {
  if (!validHashCache) {
    validHashCache = await hashCode(VALID_CODE);
  }
  return validHashCache;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se l'utente è già autenticato
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      // Verifica che il token sia valido
      getValidHash().then(validHash => {
        if (authToken === validHash) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("auth_token");
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (code: string): Promise<boolean> => {
    const inputHash = await hashCode(code);
    const validHash = await getValidHash();
    
    if (inputHash === validHash) {
      localStorage.setItem("auth_token", validHash);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
