import React from 'react';
import NavBar from './components/navbar/NavBar';
import Home2 from './components/Home2';
import About2 from './components/About2';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import ProductReviews from './components/Home2';


const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<About2/>
    },
    {
      path:'/home',
      element: <Home2/>
    },
    {
      path:'/about',
      element:<About2/>
    },
   
  
  ])

  return (
    <>
    <NavBar/>
    
    <RouterProvider router={router}/>
    </>
    
  )
}

export default App