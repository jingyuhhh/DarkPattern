import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@arco-design/web-react/dist/css/arco.css";
import { Provider } from "react-redux";
import store from "./store";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    amazon: {
      main: "#ffd814", // 这里改成 Amazon 黄
      contrastText: "#000000", // 按钮文字颜色（黑色）
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
