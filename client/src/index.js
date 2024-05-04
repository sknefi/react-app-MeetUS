import { createRoot } from 'react-dom/client';


import './index.css';
import App from './App';
import ColorPalletProvider from './Technician/Providers/ColorPalletProvider';


const container = document.getElementById('result');
const root = createRoot(container);

root.render(
  <ColorPalletProvider>
    <App tab="home" />
  </ColorPalletProvider>
)