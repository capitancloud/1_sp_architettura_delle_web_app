import { useState } from "react";
import { Navigate } from "react-router-dom";
import { VersionLayout } from "@/layouts/VersionLayout";
import { getVersionById } from "@/config/versions";

// Import dei moduli V3
import { V3ModuleIntro } from "@/components/education/v3/V3ModuleIntro";
import { V3ModuleMentalMap } from "@/components/education/v3/V3ModuleMentalMap";
import { V3ModuleInterface } from "@/components/education/v3/V3ModuleInterface";
import { V3ModuleClientComponents } from "@/components/education/v3/V3ModuleClientComponents";
import { V3ModuleServerComponents } from "@/components/education/v3/V3ModuleServerComponents";
import { V3ModuleDataFlow } from "@/components/education/v3/V3ModuleDataFlow";
import { V3ModuleSSR } from "@/components/education/v3/V3ModuleSSR";
import { V3ModuleTypeScript } from "@/components/education/v3/V3ModuleTypeScript";

const moduleComponents = [
  V3ModuleIntro,
  V3ModuleMentalMap,
  V3ModuleInterface,
  V3ModuleClientComponents,
  V3ModuleServerComponents,
  V3ModuleDataFlow,
  V3ModuleSSR,
  V3ModuleTypeScript,
];

export default function Version3() {
  const [currentModule, setCurrentModule] = useState(0);
  
  const version = getVersionById("v3");
  
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
