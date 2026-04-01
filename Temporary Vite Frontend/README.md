# *Notable boiler plate:
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).


## *How to run this service: 
First cd into Frontend, then do npm run dev, finally open a browser page with http://localhost:5173/.


## *File structure to note and synopsis:
Frontend <--Root folder
|   
├─ src
│  ├─ assets (folder used for images)
│  │   
│  │
│  ├─ App.css (primary source of styling for our frontend)   
│  │      
│  │
│  ├─ App.jsx (effectively all design and functionality is implemented in this file)        
│  │    
│  │         
│  ├─ index.css (used globally from the entry point at main.jsx)            
│  │          
│  │   
│  ├─ main.jsx (this is where any pages are started, technically initilized from within a script tag in index.html)   
│  │
│  │
│  ├─ index.html (no need to change anything on this file ever)
