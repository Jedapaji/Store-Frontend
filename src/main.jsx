import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Toaster richColors />
            <App />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
