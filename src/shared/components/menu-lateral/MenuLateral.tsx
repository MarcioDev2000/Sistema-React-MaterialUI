
import {Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme} from '@mui/material';
import { Box} from '@mui/system';

import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import matsi  from './../../../assets/matsi.jpg'


interface IListItemLinkProps {
    label: string;
    to: string;
    icon: string;
    onClick: () => void | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({label, to, icon, onClick})=>{
 /** Visto que useCallback armaneza função, ela é usada quando 
  * queremos utiliza essa função em varios componentes, de modo que a página não seja reconstruido o tempo todo.
  */

    
   const resolvePath = useResolvedPath(to); 
   const math = useMatch({ path: resolvePath.pathname, end: false});/**
    * A função useMatch vai utilizar a função useResovedPath que quem como parametro "to" que é a rota do menu
     * de modo a selecionar o menu indicado.
     * E essa função vai saber se o menu está selecinado ou não
     * 
    */


 const navigate  = useNavigate();
  const hendleClick = ()=>{
         navigate(to);
         onClick?.();
          /**  onClick é uma função? se for undefined não faz nada, se não for undefined, executa
              *
              * a função */
  }

  return(
        <ListItemButton  selected={!!math} onClick={hendleClick}>
            <ListItemIcon>
             <Icon>{icon}</Icon>
             </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
  );
};


interface IMenuLateralData{
    children: React.ReactNode
}


export const MenuLateral: React.FC<IMenuLateralData> = ({children}) =>{
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    
    /** UseMediQuery permite que tornar a página responsiva.
     * sm é medida de dispositivo com 600px de tamanho.
     * o down('sm') ele tem condição se é verdade ou falso. Se o 'sm' for menor que a tela vai retornar verdadeiro
     * caso contario, será falso
     *  Quando a tela chegar em 600px a função smDown vai pegar o menu e vai colocar-lhe temporario
     * e Só vai funcinar quando open for true.
     * 
     */

  const { IsDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
  /** drawerOptions são todas opcões que tem o meu menu.
   */

  const {toggleTheme} = useAppThemeContext();

    return(
           <>
           <Drawer open={IsDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}> 
           
             <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                              <Avatar  sx={{height: theme.spacing(12), width: theme.spacing(12)}} src={matsi}/>
                          </Box>  

                          <Divider/>

                          <Box flex={1}>
                            <List component="nav">
                              {drawerOptions.map(drawerOption =>(
                                 <ListItemLink 
                                 key={drawerOption.path}
                                 icon={drawerOption.icon}
                                 label={drawerOption.label}
                                 to={drawerOption.path}
                                 onClick={toggleDrawerOpen}/>
                              ))}
                            </List>
                          </Box>

                          <Box>
                            <List component="nav">
                                   <ListItemButton onClick={toggleTheme}>
                                       <ListItemIcon>
                                          <Icon>dark_mode</Icon>
                                       </ListItemIcon>
                                       <ListItemText primary="Alterar Tema"/>
                                   </ListItemButton>
                            </List>
                          </Box>

             </Box>
            </Drawer>

            
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
           </>
    )
}