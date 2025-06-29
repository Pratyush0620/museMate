import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './screens/Home.jsx'
import AboutUs from './screens/AboutUs.jsx'
import ContactUs from './screens/ContactUs.jsx'
import FilterPage from './screens/FilterPage.jsx'
import ChatBot from './screens/ChatBot.jsx'
import IndianMuseum from "./museums/indianmuseum/IndianMuseum.jsx";
import Booking from "./screens/Booking.jsx";
import ChatbotPython from './screens/ChatbotPython.jsx'



const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:"/home",
                element:<Home/>
            },
            {
                path:"about",
                element:<AboutUs/>
            },
            {
                path:"/home/museum",
                element:<FilterPage/>
            },
            {
                path:"/museums/32",
                element:<IndianMuseum/>
            },
            {
                path:"contact",
                element: <ContactUs/>
            },
            {
                path:"/chatbotpython",
                element: <ChatbotPython/>
            },{
                path:"/museums/32/booking",
                element: <Booking/>
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)