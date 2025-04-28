import {
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { ReactFlowManager } from "../../components/react-flow-manager";
import Dialog from "../../components/layout/dialog";

function App() {
  return (
    <ReactFlowProvider>
      <Dialog>
        <p>AOSF JASOFOA</p>
      </Dialog>
      <ReactFlowManager />
    </ReactFlowProvider>
  );
}

export default App;
