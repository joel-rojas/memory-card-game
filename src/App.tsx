import { RouterProvider } from "react-router";

import { routerInstance } from "@/pages";

function App() {
  return <RouterProvider router={routerInstance} />;
}

export default App;
