import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React, { useEffect, useMemo, useState } from "react";
import logo from "../assets/images/Logo.svg";
import { particlesOptions } from "../helper/particlesOptions";
import type { RecursivePartial } from "@tsparticles/engine";
import { InspectOptions } from "util";

interface TemplateProps {
  children: React.ReactNode;
}

const DefaultTemplate: React.FC<TemplateProps> = ({ children }) => {
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const memoizedParticles = useMemo(() => {
    return init ? (
      <Particles
        id="tsparticles"
        options={particlesOptions as RecursivePartial<InspectOptions>}
      />
    ) : null;
  }, [init, particlesOptions]);

  return (
    <div className="relative h-screen w-screen">
      {memoizedParticles}
      <div className="absolute top-0 left-0 right-0 px-40 py-5">
        <div className="flex gap-4 py-2 justify-center">
          <img src={logo} alt="logo" height={200} width={250} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DefaultTemplate;
