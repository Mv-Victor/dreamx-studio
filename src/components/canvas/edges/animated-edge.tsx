'use client';

import { EdgeProps, getBezierPath } from '@xyflow/react';

export function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <defs>
        <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--drama-red)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--drama-red-active)" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      
      {/* Base path */}
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1.5}
        fill="none"
      />
      
      {/* Animated particle */}
      <path
        d={edgePath}
        stroke="url(#edge-gradient)"
        strokeWidth={1.5}
        fill="none"
        strokeDasharray="5,5"
        className="animate-flow"
      />
    </>
  );
}
