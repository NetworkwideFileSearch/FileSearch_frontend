import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import theme from "./shared/theme";
import Home from "./pages/Home";

function App() {
  return (
    <NextUIProvider theme={theme}>
      <Home />
    </NextUIProvider>
  );
}

export default App;
