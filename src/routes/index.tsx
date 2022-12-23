import {Route, Routes, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDePessoas, DetalhePessoas, ListagemDeCidades, DetalheCidades} from '../pages';



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
            },
            {
                icon: 'location_city',
                label: 'Cidade',
                path: '/cidades'
            },
        ]);
    }, [])
    return(
        <Routes>
            <Route  path='/pagina-inicial' element={<Dashboard></Dashboard>}/>

            <Route  path='/pessoas' element={<ListagemDePessoas/>}/>
            <Route path='/pessoas/detalhe/:id' element={<DetalhePessoas/>}/>

            <Route  path='/cidades' element={<ListagemDeCidades/>}/>
            <Route path='/cidades/detalhe/:id' element={<DetalheCidades/>}/>
        
            <Route path='*' element={ <Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}