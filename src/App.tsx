import {BrowserRouter} from 'react-router-dom';

import './shared/forms/TraducoesYup';


import { AppRouter } from './routes';
import { MenuLateral } from './shared/components/menu-lateral/MenuLateral';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';


export const App = () => {
  return (

  <AppThemeProvider>

     <DrawerProvider>
         <BrowserRouter>
           <MenuLateral>
              <AppRouter />
           </MenuLateral>     
         </BrowserRouter>
     </DrawerProvider>
   
 </AppThemeProvider> 
     
  );
}

