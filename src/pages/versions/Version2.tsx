import { useState } from "react";
import { Navigate } from "react-router-dom";
import { VersionLayout } from "@/layouts/VersionLayout";
import { getVersionById } from "@/config/versions";

// Import dei moduli V2
import { V2ModuleMentalMap } from "@/components/education/v2/V2ModuleMentalMap";
import { V2ModuleFrontendSame } from "@/components/education/v2/V2ModuleFrontendSame";
import { V2ModuleRequestSame } from "@/components/education/v2/V2ModuleRequestSame";
import { V2ModuleExpressBackend } from "@/components/education/v2/V2ModuleExpressBackend";
import { V2ModuleComparison } from "@/components/education/v2/V2ModuleComparison";
import { V2ModuleStateRAM } from "@/components/education/v2/V2ModuleStateRAM";
import { V2ModuleCompleteFlow } from "@/components/education/v2/V2ModuleCompleteFlow";

const moduleComponents = [
  V2ModuleMentalMap,
  V2ModuleFrontendSame,
  V2ModuleRequestSame,
  V2ModuleExpressBackend,
  V2ModuleComparison,
  V2ModuleStateRAM,
  V2ModuleCompleteFlow,
];

export default function Version2() {
  const [currentModule, setCurrentModule] = useState(0);
  
  const version = getVersionById("v2");
  
  if (!version || !version.isAvailable) {
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
