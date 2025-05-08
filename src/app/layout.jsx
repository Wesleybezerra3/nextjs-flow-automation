import './styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ModalProvider } from '@/context/AppProvider';
config.autoAddCss = false; // Desativa a adição automática de CSS

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <title>Minha Aplicação</title>
        </head>
        <body>
          <ModalProvider>
            {children}
          </ModalProvider>
        </body>
      </html>
    );
  }