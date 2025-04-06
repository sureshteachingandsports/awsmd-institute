import { useAnimation, type AnimationControls, type TargetAndTransition } from 'framer-motion';

interface AnimationState {
  opacity?: number;
  scale?: number;
  rotate?: number | number[];
  y?: number;
}

interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number;
}

export const useAnimationControls = () => {
  const controls = useAnimation();

  const startAnimation = async (
    state: AnimationState,
    options: AnimationOptions = {}
  ) => {
    const animation: TargetAndTransition = {
      ...state,
      transition: {
        duration: options.duration ?? 0.5,
        delay: options.delay,
        ease: options.ease ?? 'easeInOut',
        repeat: options.repeat
      }
    };

    await controls.start(animation);
  };

  return {
    controls,
    startAnimation
  } as const;
};