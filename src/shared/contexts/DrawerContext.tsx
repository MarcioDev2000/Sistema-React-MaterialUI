import { createContext, useCallback, useContext, useState} from 'react';

interface IDrawerOptions{
    /** IDrawerOptions são as variaveis que vão fazer parte do meu menu */
    icon: string;
    path: string;
    label: string;
}


interface IDrawerContextData{
    IsDrawerOpen: boolean;
    drawerOptions: IDrawerOptions[];
    toggleDrawerOpen: () => void;
    setDrawerOptions: ( newDrawerOptions: IDrawerOptions[]) => void;
}


export const DrawerContext = createContext({} as IDrawerContextData);

interface IAppThemeProviderProps{
    children: React.ReactNode
}

export const DrawerProvider: React.FC<IAppThemeProviderProps> = ({children}) =>{
    const [IsDrawerOpen, setIsDrawerOpen] = useState(false);
    /** usestate(false) quer dizer quando eu acessar o sistema num tamanho de 600px, o menu lateral estará escondido */

    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

    const toggleDrawerOpen = useCallback(() =>{
        /** quando eu clicar no toggleDrawerOpen eu quero que meu menu se ele tiver aberto fecha, 
         * se tiver fechado abre.
        */
              setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);


    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[ ])=>{
               setDrawerOptions(newDrawerOptions);
    }, [])

    return(
           
        <DrawerContext.Provider value={ { IsDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions}}>
              {children}
        </DrawerContext.Provider>
    );
}

export const useDrawerContext = () => {
     return useContext(DrawerContext);
}