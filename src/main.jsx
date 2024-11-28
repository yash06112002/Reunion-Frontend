import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/Auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
