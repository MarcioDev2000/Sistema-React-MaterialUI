import { Box, Button,  Icon,  Paper, TextField, useTheme } from "@mui/material"
import { Environment } from "../../environment";



interface IFerramentaDeListagem{
    textoDaBusca?: string;
    mostrarInputBuscar?: boolean;
    MudarTextoBuscar?: (novoTexto: string)=> void;

    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    ClicarEmNovo?: ()=> void;
}

export const FerramentaDaListagem: React.FC<IFerramentaDeListagem> = ({
    textoDaBusca = '', 
    mostrarInputBuscar = false,
    MudarTextoBuscar,
    textoBotaoNovo ='Novo',
    mostrarBotaoNovo = true,
    ClicarEmNovo,
}) =>{
    const theme = useTheme();
    return(
         <Box 
         gap={1} 
         marginX={1} 
         padding={1} 
         paddingX={2} 
         display="flex"
         alignItems="center" 
         height={theme.spacing(5)} 
         component={Paper}
         justifyContent="space-between"
         >
            { mostrarInputBuscar &&(
                 <TextField size="small"
                  value={textoDaBusca}
                  onChange={(e) => MudarTextoBuscar?.(e.target.value) } 
                  placeholder={Environment.INPUT_DE_BUSCA} />
            )}

             {mostrarBotaoNovo &&(
                <Button 
                color="primary" 
                variant="contained" 
                disableElevation 
                onClick={ClicarEmNovo}
                endIcon={<Icon>add</Icon>}>{textoBotaoNovo}</Button>
             )}
         </Box>
    );

};