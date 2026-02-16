'use client'

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

export interface TreeNode {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Optional icon */
  icon?: React.ReactNode
  /** Child nodes */
  children?: TreeNode[]
  /** Whether the node is disabled */
  disabled?: boolean
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tree data structure */
  nodes: TreeNode[]
  /** Expanded node IDs (controlled) */
  expanded?: string[]
  /** Default expanded node IDs (uncontrolled) */
  defaultExpanded?: string[]
  /** Called when expanded state changes */
  onExpandChange?: (expanded: string[]) => void
  /** Currently selected node ID */
  selected?: string
  /** Called when selection changes */
  onSelectChange?: (nodeId: string) => void
}

const treeNodeVariants = cva(
  "flex items-center gap-2 py-1 px-2 rounded-md text-sm cursor-pointer select-none transition-colors",
  {
    variants: {
      state: {
        idle: "text-foreground hover:bg-muted",
        selected: "text-foreground bg-primary/10 font-medium",
        disabled: "text-foreground-secondary cursor-not-allowed opacity-60",
      },
    },
    defaultVariants: {
      state: "idle",
    },
  }
)

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn(
      "shrink-0 transition-transform",
      expanded ? "rotate-90" : "rotate-0"
    )}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

interface TreeViewContextValue {
  expanded: Set<string>
  selected: string | null
  toggleExpand: (nodeId: string) => void
  selectNode: (nodeId: string) => void
}

const TreeViewContext = React.createContext<TreeViewContextValue>({
  expanded: new Set(),
  selected: null,
  toggleExpand: () => {},
  selectNode: () => {},
})

function TreeView({
  className,
  nodes,
  expanded: controlledExpanded,
  defaultExpanded = [],
  onExpandChange,
  selected: controlledSelected,
  onSelectChange,
  ...props
}: TreeViewProps) {
  const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
    new Set(defaultExpanded)
  )
  const [internalSelected, setInternalSelected] = React.useState<string | null>(null)

  const isControlled = controlledExpanded !== undefined
  const expanded = isControlled ? new Set(controlledExpanded) : internalExpanded
  const selected = controlledSelected ?? internalSelected

  const toggleExpand = React.useCallback(
    (nodeId: string) => {
      const newExpanded = new Set(expanded)
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId)
      } else {
        newExpanded.add(nodeId)
      }

      if (!isControlled) {
        setInternalExpanded(newExpanded)
      }
      onExpandChange?.(Array.from(newExpanded))
    },
    [expanded, isControlled, onExpandChange]
  )

  const selectNode = React.useCallback(
    (nodeId: string) => {
      if (controlledSelected === undefined) {
        setInternalSelected(nodeId)
      }
      onSelectChange?.(nodeId)
    },
    [controlledSelected, onSelectChange]
  )

  return (
    <TreeViewContext.Provider value={{ expanded, selected, toggleExpand, selectNode }}>
      <div
        data-slot="tree-view"
        role="tree"
        className={cn("space-y-0.5", className)}
        {...props}
      >
        {nodes.map((node) => (
          <TreeViewNodeComponent key={node.id} node={node} level={1} />
        ))}
      </div>
    </TreeViewContext.Provider>
  )
}

interface TreeViewNodeComponentProps {
  node: TreeNode
  level: number
}

function TreeViewNodeComponent({ node, level }: TreeViewNodeComponentProps) {
  const { expanded, selected, toggleExpand, selectNode } = React.useContext(TreeViewContext)

  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expanded.has(node.id)
  const isSelected = selected === node.id

  const state = node.disabled ? "disabled" : isSelected ? "selected" : "idle"

  const handleClick = () => {
    if (node.disabled) return
    selectNode(node.id)
    if (hasChildren) {
      toggleExpand(node.id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (node.disabled) return

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault()
        handleClick()
        break
      case "ArrowRight":
        if (hasChildren && !isExpanded) {
          e.preventDefault()
          toggleExpand(node.id)
        }
        break
      case "ArrowLeft":
        if (hasChildren && isExpanded) {
          e.preventDefault()
          toggleExpand(node.id)
        }
        break
    }
  }

  return (
    <div data-slot="tree-view-node" role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-level={level} aria-selected={isSelected}>
      <div
        className={cn(treeNodeVariants({ state }))}
        style={{ paddingLeft: `${(level - 1) * 20 + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={node.disabled ? -1 : 0}
      >
        {hasChildren ? (
          <ChevronIcon expanded={isExpanded} />
        ) : (
          <span className="w-3.5 shrink-0" aria-hidden="true" />
        )}
        {node.icon && (
          <span className="shrink-0 text-foreground-secondary" aria-hidden="true">
            {node.icon}
          </span>
        )}
        <span className="truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeViewNodeComponent key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export { TreeView, treeNodeVariants }
