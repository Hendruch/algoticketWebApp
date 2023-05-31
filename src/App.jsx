import { QueryClient, QueryClientProvider } from "react-query";
import PageRoutes from "./router/PageRoutes";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { SesionContextProvider } from "./utils/sesion-context";
import { ThemeProvider } from "@material-tailwind/react";
import React, {  createContext , useState } from "react";

export const CarritoContext = createContext();

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const [carrito, Setcarrito] = useState([]);

  return (
    <ThemeProvider>
      <SesionContextProvider>
        <QueryClientProvider client={queryClient}>
          <CarritoContext.Provider value={{ carrito, Setcarrito }}>
            <PageRoutes />
            <ReactQueryDevtools initialIsOpen={false} />
            </CarritoContext.Provider>
        </QueryClientProvider>
      </SesionContextProvider>
    </ThemeProvider>
  );
}

export default App;
