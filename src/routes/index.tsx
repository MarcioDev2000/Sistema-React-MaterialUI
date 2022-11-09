import {Route, Routes, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDePessoas, DetalhePessoas} from '../pages';



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
            },
            {
                icon: 'people',
                label: 'Pessoas',
                path: '/pessoas'
            }
        ]);
    }, [])
    return(
        <Routes>
            <Route  path='/pagina-inicial' element={<Dashboard></Dashboard>}/>

            <Route  path='/pessoas' element={<ListagemDePessoas/>}/>
            <Route path='/pessoas/detalhe/:id' element={<DetalhePessoas/>}/>

            <Route path='*' element={ <Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}