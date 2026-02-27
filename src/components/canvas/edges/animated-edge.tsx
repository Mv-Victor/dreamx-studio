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
      {/* Base path */}
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={2}
        fill="none"
      />
      {/* Animated particle */}
      <path
        d={edgePath}
        stroke="url(#gradient)"
        strokeWidth={2}
        fill="none"
        strokeDasharray="5,5"
        className="animate-flow"
      />
    </>
  );
}
