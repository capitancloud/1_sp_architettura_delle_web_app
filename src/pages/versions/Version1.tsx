import { useState } from "react";
import { Navigate } from "react-router-dom";
import { VersionLayout } from "@/layouts/VersionLayout";
import { getVersionById } from "@/config/versions";

// Import dei moduli V1
import { ModuleOverview } from "@/components/education/v1/ModuleOverview";
import { ModuleClient } from "@/components/education/v1/ModuleClient";
import { ModuleRequest } from "@/components/education/v1/ModuleRequest";
import { ModuleServer } from "@/components/education/v1/ModuleServer";
import { ModuleResponse } from "@/components/education/v1/ModuleResponse";
import { ModuleUIUpdate } from "@/components/education/v1/ModuleUIUpdate";

const moduleComponents = [
  ModuleOverview,
  ModuleClient,
  ModuleRequest,
  ModuleServer,
  ModuleResponse,
  ModuleUIUpdate,
];

export default function Version1() {
  const [currentModule, setCurrentModule] = useState(0);
  
  const version = getVersionById("v1");
  
  if (!version) {
    return <Navigate to="/" replace />;
  }

  const CurrentModuleComponent = moduleComponents[currentModule];

  return (
    <VersionLayout
      version={version}
      currentModuleIndex={currentModule}
      onModuleChange={setCurrentModule}
    >
      <CurrentModuleComponent />
    </VersionLayout>
  );
}
