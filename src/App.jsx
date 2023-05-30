import { QueryClient, QueryClientProvider } from "react-query";
import PageRoutes from "./router/PageRoutes";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { SesionContextProvider } from "./utils/sesion-context";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ThemeProvider>
      <SesionContextProvider>
        <QueryClientProvider client={queryClient}>
          <PageRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SesionContextProvider>
    </ThemeProvider>
  );
}

export default App;
