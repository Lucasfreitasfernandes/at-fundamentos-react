import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./componentes/Pages/Home/Home";
import Detalhes from "./componentes/Pages/Detalhes/Detalhes";


const routes = createBrowserRouter([
    {element: <Home/>, path: "/"},
    {element: <Detalhes/> , path: "/Detalhes/:id"},
]);


export function Routes() {
    return <RouterProvider router={routes} />
}