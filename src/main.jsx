import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import App from './App.jsx';
import './index.css';

const basePath = import.meta.env.BASE_URL;

const client = new ApolloClient({
  link: new HttpLink({ uri: `${basePath}graphql` }),
  cache: new InMemoryCache(),
});

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  await worker.start({
    serviceWorker: {
      url: `${basePath}mockServiceWorker.js`,
    },
    onUnhandledRequest: 'bypass',
  });
}

const root = createRoot(document.getElementById('root'));

enableMocking()
  .then(() => {
    root.render(
      <StrictMode>
        <ApolloProvider client={client}>
          <BrowserRouter basename={basePath}>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </StrictMode>
    );
  })
  .catch((err) => {
    root.render(
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#991b1b' }}>
        <h2>No se pudo iniciar el servicio de datos simulados</h2>
        <p>Por favor, recarga la página o verifica que tu navegador soporte Service Workers.</p>
        <small>Detalle técnico: {err.message}</small>
      </div>
    );
  });