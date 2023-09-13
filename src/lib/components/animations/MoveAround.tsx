import type { ReactNode } from 'react';

import {
  motion,
  stagger,
  useAnimate,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { MouseEvent, useEffect, useState } from 'react';

type MoveAroundProps = {
  children: ReactNode;
};

const SVG_WIDTH = 938;
const ORIGSPEEDX = 10;
const ORIGSPEEDY = 10;

const MoveAround = ({ children }: MoveAroundProps) => {
  const [x, setX] = useState(0);
  const [speedX, setSpeedX] = useState(ORIGSPEEDX);
  const [y, setY] = useState(0);
  const [speedY, setSpeedY] = useState(ORIGSPEEDY);
  return (
    <motion.div
    animate={{ x: x, y: y }}
    transition={{
      ease: "linear",
      // duration: 2,
      // repeat: Infinity
    }}
    onAnimationComplete={() => {
      setX(x + speedX);
      setY(y + speedY);

      if (x >= 600) {
        setSpeedX(-ORIGSPEEDX);
      }
      if (x <= -window.innerWidth + SVG_WIDTH) {
        setSpeedX(ORIGSPEEDX);
      }

      if (y >= window.innerHeight /2) {
        setSpeedY(-ORIGSPEEDY);
      }

      if (y <= (-window.innerHeight /2) + 300) {
        setSpeedY(ORIGSPEEDY);
      }
    }}
    className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
    aria-hidden="true"
    >
      {children}
    </motion.div>
  );
};

export default MoveAround;
