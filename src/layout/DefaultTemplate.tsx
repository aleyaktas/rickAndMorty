import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { RecursivePartial } from "@tsparticles/engine";
import { InspectOptions } from "util";
import logo from "../assets/icons/Logo.svg";
import { particlesOptions } from "../helper/particlesOptions";
import { TemplateProps } from "../types/DefaultTemplate.interfaces";

const DefaultTemplate: React.FC<TemplateProps> = ({
  children,
  disableLogo,
}) => {
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
      <div className="absolute top-0 left-0 right-0 px-5 md:px-20 lg:px-40 py-5">
        {!disableLogo && (
          <div className="flex justify-center gap-4 pb-6">
            <img
              className="max-w-none w-60 md:w-80"
              src={logo}
              alt="Rick and Morty"
              height={200}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default DefaultTemplate;
