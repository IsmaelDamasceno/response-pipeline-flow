import {
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { ReactFlowManager } from "../../components/react-flow-manager";

function App() {
  return (
    <ReactFlowProvider>
      <ReactFlowManager />
    </ReactFlowProvider>
  );
}

export default App;
