'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const LossLandscape = dynamic(() => import('@/components/LossLandscape'), {
  ssr: false,
});

type DeferredLossLandscapeProps = {
  className?: string;
};

type IdleWindow = Window & {
  cancelIdleCallback?: (handle: number) => void;
  requestIdleCallback?: (callback: IdleRequestCallback) => number;
};

export default function DeferredLossLandscape({ className }: DeferredLossLandscapeProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(() => {
        setShouldLoad(true);
      });

      return () => {
        idleWindow.cancelIdleCallback?.(handle);
      };
    }

    const timeout = window.setTimeout(() => {
      setShouldLoad(true);
    }, 1);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <LossLandscape className={className} />;
}
