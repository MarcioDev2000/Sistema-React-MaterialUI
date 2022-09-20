import {Route, Routes, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages/dashboard/Dashboard';



export const AppRouter = ()=>{
    const {setDrawerOptions} = useDrawerContext();

    useEffect(()=>{
        /** essa função vai permitir que o useEffect seja usado apenas uma unica vez
         * useEffect vai mostrar os dados do meu menu que estão dentro do SetDrawerOptions
         */
        setDrawerOptions([
            {
                icon: 'home',
                label: 'Página inicial',
                path: '/pagina-inicial'
            }
        ]);
    }, [])
    return(
        <Routes>
            <Route  path='/pagina-inicial' element={<Dashboard></Dashboard>}/>
            <Route path='*' element={ <Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}