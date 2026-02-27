'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useProjectStore } from '@/stores/project-store';
import { ChatPanel } from '@/components/canvas/chat-panel';
import { DetailPanel } from '@/components/canvas/detail-panel';
import { CanvasToolbar } from '@/components/canvas/canvas-toolbar';
import { CheckPointNode } from '@/components/canvas/nodes/checkpoint-node';
import { StoryBibleNode } from '@/components/canvas/nodes/storybible-node';
import { CharacterPackNode } from '@/components/canvas/nodes/characterpack-node';
import { PlanningCenterNode } from '@/components/canvas/nodes/planningcenter-node';
import { ScriptNode } from '@/components/canvas/nodes/script-node';
import { SceneDesignNode } from '@/components/canvas/nodes/scenedesign-node';
import { SegmentDesignNode } from '@/components/canvas/nodes/segmentdesign-node';
import { ComposeNode } from '@/components/canvas/nodes/compose-node';
import { EntryNode } from '@/components/canvas/nodes/entry-node';
import { getCanvasLayout } from '@/lib/canvas-layout';

const nodeTypes = {
  entry: EntryNode,
  checkpoint: CheckPointNode,
  storybible: StoryBibleNode,
  characterpack: CharacterPackNode,
  planningcenter: PlanningCenterNode,
  script: ScriptNode,
  scenedesign: SceneDesignNode,
  segmentdesign: SegmentDesignNode,
  compose: ComposeNode,
};

export default function CanvasPage() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}

function CanvasInner() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const { projects, selectProject, currentProject, loadProjects } = useProjectStore();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(true);

  useEffect(() => {
    if (projects.length === 0) loadProjects();
  }, [projects.length, loadProjects]);

  useEffect(() => {
    if (projectId && projects.length > 0) {
      selectProject(projectId);
    }
  }, [projectId, projects.length, selectProject]);

  const projectType = currentProject?.project_type || 'single_episode';
  const { initialNodes, initialEdges } = useMemo(() => getCanvasLayout(projectType), [projectType]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  if (!currentProject) {
    return (
      <div className="h-screen flex items-center justify-center text-muted-foreground">
        加载中...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Toolbar */}
      <CanvasToolbar
        project={currentProject}
        chatOpen={chatOpen}
        onToggleChat={() => setChatOpen(!chatOpen)}
        onBack={() => router.push('/projects')}
      />

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chat Panel */}
        {chatOpen && <ChatPanel />}

        {/* Center: Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            minZoom={0.3}
            maxZoom={2}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--border)" />
            <Controls position="bottom-right" />
            <MiniMap
              position="bottom-left"
              nodeColor={() => 'var(--primary)'}
              maskColor="rgba(0,0,0,0.7)"
            />
          </ReactFlow>
        </div>

        {/* Right: Detail Panel */}
        {selectedNode && (
          <DetailPanel
            node={selectedNode}
            onClose={() => setSelectedNodeId(null)}
          />
        )}
      </div>
    </div>
  );
}
