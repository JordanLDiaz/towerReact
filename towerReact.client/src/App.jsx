import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'


export function App() {

  return (
    <div className="App" id="app">
      <header>
        <Navbar />
      </header>

      <main className="container-fluid">
        <Outlet />
      </main>

      <footer className="bg-dark text-light text-center p-3 ">
        Made with 💖 by Jordan
      </footer>

    </div>
  )
}
