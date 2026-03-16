import { BrowserRouter, Route, Routes } from "react-router"
import { Pessoas } from "../pages/Pessoas"
import { Categorias } from "../pages/Categorias"
import { Transactions } from "../pages/Transacoes"


export const AppRouter = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Transactions />} />
                    <Route path="/pessoas" element={<Pessoas />} />
                    <Route path="/categorias" element={<Categorias />} />
                </Routes>
            </BrowserRouter>
    )
}