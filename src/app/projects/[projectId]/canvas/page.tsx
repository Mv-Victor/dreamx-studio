'use client';

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
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
  useReactFlow,
  Connection,
  Edge,
  Viewport,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useProjectStore } from '@/stores/project-store';
import { ChatPanel } from '@/components/canvas/chat-panel';
import { DetailPanel } from '@/components/canvas/detail-panel';
import { CanvasToolbar } from '@/components/canvas/canvas-toolbar';
import { ContextMenu } from '@/components/canvas/context-menu';
import { CheckPointNode } from '@/components/canvas/nodes/checkpoint-node';
import { StoryBibleNode } from '@/components/canvas/nodes/storybible-node';
import { CharacterPackNode } from '@/components/canvas/nodes/characterpack-node';
import { PlanningCenterNode } from '@/components/canvas/nodes/planningcenter-node';
import { ScriptNode } from '@/components/canvas/nodes/script-node';
import { SceneDesignNode } from '@/components/canvas/nodes/scenedesign-node';
import { SegmentDesignNode } from '@/components/canvas/nodes/segmentdesign-node';
import { ComposeNode } from '@/components/canvas/nodes/compose-node';
import { EntryNode } from '@/components/canvas/nodes/entry-node';
import { GenerationTaskList } from '@/components/canvas/generation-task-list';
import { getCanvasLayout } from '@/lib/canvas-layout';
import { STORAGE_KEYS } from '@/lib/storage-keys';
import type { WorkflowNodeData } from '@/types/canvas';

// Pro options for ReactFlow (hide attribution)
const PRO_OPTIONS = Object.freeze({ hideAttribution: true });

// Node types mapping (frozen to prevent accidental modification)
const nodeTypes = Object.freeze({
  entry: EntryNode,
  checkpoint: CheckPointNode,
  storybible: StoryBibleNode,
  characterpack: CharacterPackNode,
  planningcenter: PlanningCenterNode,
  script: ScriptNode,
  scenedesign: SceneDesignNode,
  segmentdesign: SegmentDesignNode,
  compose: ComposeNode,
});

export default function CanvasPage() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}

const CanvasInner = React.memo(function CanvasInner() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const { projects, selectProject, currentProject, loadProjects, selectedNodeId, setSelectedNodeId } = useProjectStore();
  const [chatOpen, setChatOpen] = useState(true);
  const { updateNodeData, getNodes, setViewport, addNodes } = useReactFlow();
  const initialLoadRef = useRef(true);
  const viewportSaveRef = useRef<NodeJS.Timeout | null>(null);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Connection feedback state
  const [connectionStatus, setConnectionStatus] = useState<'valid' | 'invalid' | null>(null);

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

  // 只在首次加载时使用 initialNodes，后续通过 updateNodeData 更新
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 只在首次加载时设置节点，避免重置用户进度
  useEffect(() => {
    if (initialLoadRef.current) {
      // 尝试从 localStorage 恢复节点位置
      try {
        const savedPositions = localStorage.getItem(STORAGE_KEYS.nodes(projectId));
        if (savedPositions) {
          const positions = JSON.parse(savedPositions);
          const nodesWithPositions = initialNodes.map((node) => ({
            ...node,
            position: positions[node.id] || node.position,
          }));
          setNodes(nodesWithPositions);
        } else {
          setNodes(initialNodes);
        }
      } catch (error) {
        console.error('[Canvas] Failed to restore node positions:', error);
        setNodes(initialNodes);
      }

      // 尝试从 localStorage 恢复视口
      try {
        const savedViewport = localStorage.getItem(STORAGE_KEYS.viewport(projectId));
        if (savedViewport) {
          const viewport: Viewport = JSON.parse(savedViewport);
          setViewport(viewport);
        }
      } catch (error) {
        console.error('[Canvas] Failed to restore viewport:', error);
      }

      initialLoadRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]); // initialLoadRef is a ref, changes don't trigger re-render

  // 当 projectType 变化时，只更新节点状态，不重置整个 nodes 数组
  useEffect(() => {
    // Skip during initial load (handled by the initialization effect above)
    if (initialLoadRef.current) return;
    if (initialNodes.length === 0) return;
    
    // 使用函数形式更新节点，保留用户进度
    setNodes((prev) =>
      prev.map((node) => {
        const newNode = initialNodes.find((n) => n.id === node.id);
        if (newNode) {
          return { ...node, data: { ...node.data, ...newNode.data } };
        }
        return node;
      })
    );
    setEdges(initialEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNodes, initialEdges]); // setNodes uses functional update, no need to include

  // 保存节点位置到 localStorage
  useEffect(() => {
    if (!initialLoadRef.current && nodes.length > 0) {
      if (viewportSaveRef.current) clearTimeout(viewportSaveRef.current);
      viewportSaveRef.current = setTimeout(() => {
        try {
          const positions: Record<string, { x: number; y: number }> = {};
          nodes.forEach((node) => {
            positions[node.id] = { x: node.position.x, y: node.position.y };
          });
          localStorage.setItem(STORAGE_KEYS.nodes(projectId), JSON.stringify(positions));
        } catch (error) {
          console.error('[Canvas] Failed to save node positions:', error);
        }
      }, 500);
    }
  }, [nodes, projectId]);

  // 保存视口状态到 localStorage
  const onViewportChange = useCallback(
    (viewport: Viewport) => {
      if (viewportSaveRef.current) clearTimeout(viewportSaveRef.current);
      viewportSaveRef.current = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEYS.viewport(projectId), JSON.stringify(viewport));
        } catch (error) {
          console.error('[Canvas] Failed to save viewport:', error);
        }
      }, 500);
    },
    [projectId]
  );

  // 连接验证：只允许从上到下顺序连接
  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      const { source, target } = connection;
      if (!source || !target) return false;
      if (source === target) return false; // 防止自连接

      const sourceIdx = parseInt(source.split('-')[1] || '-1', 10);
      const targetIdx = parseInt(target.split('-')[1] || '-1', 10);

      // 只允许顺序连接（下一个节点）
      const valid = targetIdx === sourceIdx + 1;
      setConnectionStatus(valid ? 'valid' : 'invalid');
      return valid;
    },
    []
  );

  const onConnectStart = useCallback(() => {
    setConnectionStatus(null);
  }, []);

  const onConnectEnd = useCallback(() => {
    // Connection end handled by isValidConnection + onConnect
    setConnectionStatus(null);
  }, []);

  const connectionLineStyle = useMemo(
    () => ({
      stroke: connectionStatus === 'valid' ? '#22c55e' : connectionStatus === 'invalid' ? '#ef4444' : 'rgba(255,255,255,0.5)',
      strokeWidth: 2,
    }),
    [connectionStatus]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const data = node.data as WorkflowNodeData;
      // Don't open detail for locked nodes or entry
      if ('locked' in data && data.locked) {
        setSelectedNodeId(null);
        return;
      }
      if (node.type === 'entry') {
        setSelectedNodeId(null);
        return;
      }
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const { screenToFlowPosition } = useReactFlow();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPaneContextMenu = useCallback((event: any) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const handleAddNode = useCallback(
    (type: string) => {
      if (!contextMenu) return;

      const position = screenToFlowPosition({ x: contextMenu.x, y: contextMenu.y });

      const newNode = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          status: 'pending' as const,
          locked: false,
        },
      };

      addNodes([newNode]);
      setContextMenu(null);
    },
    [contextMenu, addNodes, screenToFlowPosition]
  );

  // 节点状态变更处理（用于解锁下一个节点）
  const handleNodeComplete = useCallback(
    (nodeId: string) => {
      const currentNodes = getNodes();
      const currentNodeIdx = currentNodes.findIndex((n) => n.id === nodeId);
      if (currentNodeIdx >= 0 && currentNodeIdx < currentNodes.length - 1) {
        const nextNodeId = currentNodes[currentNodeIdx + 1].id;
        updateNodeData(nextNodeId, { status: 'active', locked: false });
        updateNodeData(nodeId, { status: 'completed' });
      }
    },
    [getNodes, updateNodeData]
  );

  if (!currentProject) {
    return (
      <div className="h-screen flex items-center justify-center text-white/40">
        加载中...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black">
      <CanvasToolbar
        project={currentProject}
        chatOpen={chatOpen}
        onToggleChat={() => setChatOpen(!chatOpen)}
        onBack={() => router.push('/projects')}
      />

      <div className="flex-1 flex overflow-hidden">
        {chatOpen && <ChatPanel />}

        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onPaneContextMenu={onPaneContextMenu}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onViewportChange={onViewportChange}
            nodeTypes={nodeTypes}
            isValidConnection={isValidConnection}
            connectionLineStyle={connectionLineStyle}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            minZoom={0.3}
            maxZoom={2}
            proOptions={PRO_OPTIONS}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(255,255,255,0.05)" />
            <Controls position="bottom-right" />
            <MiniMap
              position="bottom-left"
              nodeColor={() => '#C0031C'}
              maskColor="rgba(0,0,0,0.7)"
            />
          </ReactFlow>
        </div>

        <DetailPanel
          selectedNodeId={selectedNodeId}
          onClose={() => setSelectedNodeId(null)}
          onNodeComplete={handleNodeComplete}
        />
      </div>

      {/* Generation Task List */}
      <GenerationTaskList />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onSelect={handleAddNode}
        />
      )}
    </div>
  );
});

CanvasInner.displayName = 'CanvasInner';
