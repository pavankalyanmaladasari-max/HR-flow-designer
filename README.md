# HR Flow Designer

A production-quality visual workflow engine built for HR professionals to design, validate, and simulate complex onboarding and lifecycle processes.

HR Workflow Designer built with React, TypeScript, and React Flow. Supports drag-and-drop workflow creation, dynamic node configuration, validation, and simulation with mock API integration.

## Architecture Decisions

### 1. State Management: Zustand
We chose Zustand for its simplicity and performance with complex nested structures like React Flow's graph. It provides a flat, immutable state that allows for seamless integration with React Flow's native change handlers while maintaining a single source of truth for node-specific data.

### 2. Form Handling: React Hook Form + Zod
Dynamic node configurations are handled via a centralized `PropertyPanel`. Using `react-hook-form` allows for high performance by avoiding re-renders on every keystroke, and `zod` ensures that the data structure of each node type remains valid before it's saved back to the store.

### 3. Visuals: React Flow + Tailwind CSS
React Flow was selected as the industry standard for graph-based UIs in React. We implemented custom nodes with Tailwind 4 utility classes to achieve a high-density, professional "Technical Dashboard" feel.

### 4. Simulation Engine: BFS/DFS Traversal
The simulation isn't just a mock; it performs actual structural validation (Start/End existence, disconnection check) and traverses the adjacency list of the graph to generate sequential execution logs.

## Future Improvements
- **Execution Engine**: Connect the workflow to a real backend (e.g., Temporal or Camunda).
- **Conditional Branching**: Add logic nodes (IF/ELSE) to support complex decision trees.
- **Undo/Redo**: Implement a history buffer in the Zustand store.
- **Auto-layout**: Integrate `dagre` or `elkjs` for automated graph positioning.

## How to Run
1. Ensure all dependencies are installed: `npm install`
2. Start the development server: `npm run dev`
3. Build for production: `npm run build`
