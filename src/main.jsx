import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import router from './Components/Routes/Routes.jsx';
import AuthProvider from './Components/Provider/AuthProvider.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)



// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';


// ReactDOM.render(
//   <React.StrictMode>
//     <DndProvider backend={HTML5Backend}>
//       <App />
//     </DndProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );