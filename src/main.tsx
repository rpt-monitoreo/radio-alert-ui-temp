import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <ConfigProvider
            getTargetContainer={() => {
              return (
                document.getElementById('test-pro-layout') ?? document.body
              );
            }}
            locale={esES}
          >
            <App />
          </ConfigProvider>
        </HashRouter>
      </QueryClientProvider>
    </div>
  </React.StrictMode>,
);
