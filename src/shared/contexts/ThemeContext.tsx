import { ThemeProvider} from '@mui/material';
import { createContext, useCallback, useContext, useMemo, useState} from 'react';
import {LightTheme, DarkTheme } from './../themes';
import { Box } from '@mui/system'
interface IThemeContextData{
    ThemeName: 'light' | 'dark';
    toggleTheme: () => void;
}


export const ThemeContext = createContext({} as IThemeContextData);

interface IAppThemeProviderProps{
    children: React.ReactNode
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({children}) =>{
    const [ThemeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() =>{
        /** Vai armazanar essa função de modo a fazer a troca de cor  */
              setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);

    const theme = useMemo( ()=>{
/** essa função vai mostrar qual será o tema actual
 * ** UseMemo vai depender do UseCallback
 */
        if(ThemeName === 'light'){
            return LightTheme;
        } 
      else{
         return DarkTheme;
      }

    }, [ThemeName])
    

    return(
           
        <ThemeContext.Provider value={ {ThemeName, toggleTheme}}>
         <ThemeProvider theme={theme}>
         <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
              {children}
         </Box>
         </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useAppThemeContext = () => {
     return useContext(ThemeContext);
}