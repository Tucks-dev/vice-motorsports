 import React from 'react'
 import { BrowserRouter, Routes, Route } from 'react-router-dom'
 import { AuthProvider } from './auth'
 import RequireAuth from './RequireAuth'


 import Navbar from './components/Navbar'
 import Footer from './components/Footer'
 import Home from './pages/Home'
 import Catalog from './pages/Catalog'
 import Login from './pages/Login'
 import Dashboard from './pages/Dashboard'
 import Inventory from './pages/Inventory'
 import Valuation from './pages/Valuation'
 import Sales from './pages/Sales'
 import Commission from './pages/Commission'
 import ManageEmployees from './pages/ManageEmployees'

 function App() {
   return (
     <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>
               {/* public */}
               <Route path="/" element={<Home />} />
               <Route path="/catalog" element={<Catalog />} />
               <Route path="/login" element={<Login />} />

              {/* employee-only */}
               <Route
                 path="/dashboard"
                 element={
                   <RequireAuth>
                     <Dashboard />
                   </RequireAuth>
                 }
               />
               <Route
                 path="/inventory"
                 element={
                   <RequireAuth>
                     <Inventory />
                   </RequireAuth>
                 }
               />
               <Route
                 path="/valuation"
                 element={
                   <RequireAuth>
                     <Valuation />
                   </RequireAuth>
                 }
               />
               <Route
                 path="/sales"
                 element={
                   <RequireAuth>
                     <Sales />
                   </RequireAuth>
                 }
               />
               <Route
                 path="/commission"
                 element={
                   <RequireAuth>
                     <Commission />
                   </RequireAuth>
                 }
               />
              {/* manager-only */}
               <Route
                 path="/manage-employees"
                 element={
                   <RequireAuth>
                     <ManageEmployees />
                   </RequireAuth>
                 }
               />

               {/* fallback */}
               <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
     </AuthProvider>
   )
 }

 export default App
