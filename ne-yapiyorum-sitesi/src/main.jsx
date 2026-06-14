import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Eğer stil dosyanın adı farklıysa (örn: index.css değilse) burayı kendi dosya adına göre düzelt.

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
