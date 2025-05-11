import './styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProvider} from '@/context/AppProvider';
import Notifications from '@/components/Notifications';
config.autoAddCss = false; // Desativa a adição automática de CSS

export default function RootLayout({ children }) {
    return (
      <html lang="pt-br">
        <head>
          <link rel="shortcut icon" href="../../assets/xbase_logo.sgv" type="image/x-icon" />
          <title>XBASE</title>
        </head>
        <body>
          <AppProvider>
            <Notifications/>
            {children}
          </AppProvider>
        </body>
      </html>
    );
  }