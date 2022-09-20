import { Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system"
import { ReactNode } from "react"
import {useDrawerContext } from "../contexts";

interface ILayoutBasePagina{
    children: ReactNode;
    titulo: string;
    barraFerramenta?: ReactNode;
}


export const LayoutBasePagina: React.FC <ILayoutBasePagina> = (({children, titulo, barraFerramenta})=>{

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const { toggleDrawerOpen } = useDrawerContext();
    return(
         <Box height="100%" display="flex" flexDirection="column" gap={1}>
            {/** Gap={1} faz os espeçamento entre os componentes
             *  1 quer dizer o tamanho de espaçamento é 8. porque ele faz 8x1=8px
             */}
            <Box padding={1} display="flex" alignItems="center" height={theme.spacing( smDown ? 6 : mdDown ? 8 : 12)} gap={1}>
                { smDown && (
                   <IconButton onClick={toggleDrawerOpen}>
                      <Icon>menu</Icon>
                   </IconButton>
                )
                }
                

              <Typography variant={ smDown ? 'h5' : mdDown ? 'h4' : 'h3'} whiteSpace="nowrap"  overflow="hidden" textOverflow="ellipses">
                  {titulo}
               </Typography>
            </Box>

            { barraFerramenta  &&(
                   <Box>
                      {barraFerramenta}
                   </Box>
            )}

           <Box flex={1} overflow="auto">
             {children}
           </Box>
           
         </Box>
    )
})