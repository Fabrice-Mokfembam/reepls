import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './Context/ThemeContext/ThemeProvider'
import { SidebarProvider } from './Context/SidebarContext/SidebarProvider'
import './i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
  import { UserProvider } from './Context/UserContext/UserProvider';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      retry: 3,
    },
  },
});
  
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <App />
          </UserProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>,
)
