import { useCallback, useMemo, useState } from 'react';

export function useMultiStep(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => new Set());

  const markCompleted = useCallback((step: number) => {
    setCompletedSteps((previous) => {
      const next = new Set(previous);
      next.add(step);
      return next;
    });
  }, []);

  const invalidateFrom = useCallback((step: number) => {
    setCompletedSteps((previous) => new Set([...previous].filter((completedStep) => completedStep < step)));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentStep((previous) => Math.min(previous + 1, totalSteps));
  }, [totalSteps]);

  const goToPrev = useCallback(() => {
    setCurrentStep((previous) => Math.max(previous - 1, 1));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) setCurrentStep(step);
    },
    [totalSteps],
  );

  const progress = useMemo(
    () => Math.round(((currentStep - 1) / Math.max(totalSteps - 1, 1)) * 100),
    [currentStep, totalSteps],
  );

  return {
    currentStep,
    completedSteps,
    markCompleted,
    invalidateFrom,
    goToNext,
    goToPrev,
    goToStep,
    isFirst: currentStep === 1,
    isLast: currentStep === totalSteps,
    progress,
  };
}
