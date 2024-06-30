// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { BrowserRouter as Router } from 'react-router-dom'
// import store from './store/store.jsx'
// import { Provider } from 'react-redux';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>  
//     <Provider store={store}>
//       <Router>
//         <App /> 
//       </Router>   
//     </Provider> 
//   </React.StrictMode>
// )
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store.jsx';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <App />
        </Router>
      </DndProvider>
    </Provider>
  </React.StrictMode>
);
