import { useState } from "react";
import { Navigate } from "react-router-dom";
import { VersionLayout } from "@/layouts/VersionLayout";
import { getVersionById } from "@/config/versions";

// Import dei moduli V4
import { V4Module0Intro } from "@/components/education/v4/V4Module0Intro";
import { V4Module1Architecture } from "@/components/education/v4/V4Module1Architecture";
import { V4Module2MultiUser } from "@/components/education/v4/V4Module2MultiUser";
import { V4Module3DataModel } from "@/components/education/v4/V4Module3DataModel";
import { V4Module4Auth } from "@/components/education/v4/V4Module4Auth";
import { V4Module5Backend } from "@/components/education/v4/V4Module5Backend";
import { V4Module6Deploy } from "@/components/education/v4/V4Module6Deploy";
import { V4Module7Summary } from "@/components/education/v4/V4Module7Summary";

const moduleComponents = [
  V4Module0Intro,
  V4Module1Architecture,
  V4Module2MultiUser,
  V4Module3DataModel,
  V4Module4Auth,
  V4Module5Backend,
  V4Module6Deploy,
  V4Module7Summary,
];

export default function Version4() {
  const [currentModule, setCurrentModule] = useState(0);
  
  const version = getVersionById("v4");
  
  if (!version || !version.isAvailable) {
    return <Navigate to="/" replace />;
  }

  const CurrentModuleComponent = moduleComponents[currentModule];

  const goToNextModule = () => {
    if (currentModule < moduleComponents.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  return (
    <VersionLayout
      version={version}
      currentModuleIndex={currentModule}
      onModuleChange={setCurrentModule}
    >
      <CurrentModuleComponent onNext={goToNextModule} />
    </VersionLayout>
  );
}
