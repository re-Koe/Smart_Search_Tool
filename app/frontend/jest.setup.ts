import "@testing-library/jest-dom";

globalThis.importMetaEnv = {
  VITE_MAP_API_KEY: "AIzaSyAof6s8GTaYQepyrL8OsitmxaXRJ9eWx0Q",
};

Object.defineProperty(global, "importMeta", {
  value: { env: globalThis.importMetaEnv },
});

const originalConsoleError = console.error;

console.error = (message, ...args) => {
  if (typeof message === "string" && message.includes("validateDOMNesting")) {
    return;
  }
  originalConsoleError(message, ...args);
};
