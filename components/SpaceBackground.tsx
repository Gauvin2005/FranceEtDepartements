'use client';

import React, { useMemo, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

export const SpaceBackground: React.FC = () => {
  const [engineInitialized, setEngineInitialized] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
      setEngineInitialized(true);
    });
  }, []);

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 30,
      particles: {
        number: {
          value: 150,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ['#ffffff', '#00f7ff', '#3d3bff', '#ffffff'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.4, max: 1.0 },
          animation: {
            enable: true,
            speed: 1.5,
            sync: false,
            minimumValue: 0.3,
          },
        },
        size: {
          value: { min: 1.5, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'bounce',
          },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.08,
            opacity: 1,
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: false,
          },
          onClick: {
            enable: false,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!engineInitialized) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="space-particles"
        options={particlesOptions as any}
        className="w-full h-full"
      />
    </div>
  );
};

