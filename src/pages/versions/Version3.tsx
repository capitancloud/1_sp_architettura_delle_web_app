import { Navigate } from "react-router-dom";
import { getVersionById } from "@/config/versions";

export default function Version3() {
  const version = getVersionById("v3");
  
  if (!version?.isAvailable) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <span className="text-6xl mb-4 block">{version.icon}</span>
        <h1 className="text-2xl font-bold mb-2">{version.title}</h1>
        <p className="text-muted-foreground">{version.subtitle}</p>
        <p className="text-sm text-muted-foreground mt-4">In costruzione...</p>
      </div>
    </div>
  );
}
