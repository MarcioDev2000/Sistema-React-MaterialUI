import { Box, Button, Divider, Icon, Paper, Skeleton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

interface IFerramentaDeDetalhe{
  
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoApagar?:boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaSalvarFechar?: boolean;
    mostrarBotaoVoltar?: boolean;

    mostrarBotaoNovoCarregamento?: boolean;
    mostrarBotaoApagarCarregamento?: boolean;
    mostrarBotaoSalvarCarregamento?: boolean;
    mostrarBotaoSalvarFecharCarregamento?: boolean;
    mostrarBotaoVoltarCarregamento?: boolean;

    clicarBotaoNovo?: () => void;
    clicarBotaoApagar?: () => void;
    clicarBotaoSalvar?: () => void;
    clicarBotaoSalvarFechar?: () => void;
    clicarBotaoVoltar?: () => void;
}

export const FerramentaDeDetalhe: React.FC<IFerramentaDeDetalhe> = ({
    textoBotaoNovo = 'Novo',
    mostrarBotaSalvarFechar= false,
    mostrarBotaoApagar= true,
    mostrarBotaoNovo = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoVoltar = true,

    mostrarBotaoNovoCarregamento = false,
    mostrarBotaoApagarCarregamento = false,
    mostrarBotaoSalvarCarregamento = false,
    mostrarBotaoSalvarFecharCarregamento = false,
    mostrarBotaoVoltarCarregamento = false,


    clicarBotaoNovo,
    clicarBotaoApagar,
    clicarBotaoSalvar,
    clicarBotaoSalvarFechar,
    clicarBotaoVoltar
}) =>{
   const theme = useTheme();
   const smDown = useMediaQuery(theme.breakpoints.down('sm'))
   const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    return(    
        <Box 
        gap={1}
        marginX={1} 
        padding={1}
        paddingX={2}
        display="flex" 
        alignItems="center"
        component={Paper}
        height={theme.spacing(5)} 
        >   
        {(mostrarBotaoSalvar  && !mostrarBotaoSalvarCarregamento) && (
            <Button
             disableElevation 
             variant="contained" 
             color="primary"
             onClick={clicarBotaoSalvar}
              endIcon={ <Icon>save</Icon>}>

                <Typography variant="button" whiteSpace="nowrap"  textOverflow="ellipsis" overflow="hidden">
                   Salvar
                </Typography>
                
                
                </Button> 
            )
        }

      { mostrarBotaoSalvarCarregamento && (
        <Skeleton width={110} height={60} />  
      )}
        
        {(mostrarBotaSalvarFechar  && !mostrarBotaoSalvarFecharCarregamento && !smDown && !mdDown)  &&(
              
        <Button 
          disableElevation 
          variant="outlined"
          color="primary" 
          onClick={clicarBotaoSalvarFechar}
          endIcon={ <Icon>save</Icon>}>
             <Typography variant="button" whiteSpace="nowrap"  textOverflow="ellipsis" overflow="hidden">
               Salvar e Voltar
            </Typography>
            </Button>
        )}

        { (mostrarBotaoSalvarFecharCarregamento && !smDown && !mdDown ) &&(
              <Skeleton width={110} height={60} />
        )}

       { (mostrarBotaoNovo  && !mostrarBotaoNovoCarregamento  && !smDown && !mdDown) &&(
        <Button 
            disableElevation 
            variant="outlined"
            color="primary"
            onClick={clicarBotaoNovo}
            endIcon={ <Icon>add</Icon>}>
            <Typography variant="button" whiteSpace="nowrap"  textOverflow="ellipsis" overflow="hidden">
              Novo
            </Typography>    
        </Button>
       )}

       {(mostrarBotaoNovoCarregamento && !smDown) &&(
            <Skeleton width={110} height={60} />
       )}




{(mostrarBotaoApagar  && !mostrarBotaoApagarCarregamento)  &&(

<Button
 disableElevation 
 variant="outlined" 
 color="primary"
 onClick={clicarBotaoApagar}
  endIcon={ <Icon>delete</Icon>}>

<Typography variant="button" whiteSpace="nowrap"  textOverflow="ellipsis" overflow="hidden">
    Apagar
</Typography> 
    
</Button>
)}

{ mostrarBotaoApagarCarregamento && (
    <Skeleton width={110} height={60} />
)}

    {  mostrarBotaoVoltar  && (
        ( mostrarBotaoApagar || mostrarBotaSalvarFechar || mostrarBotaoNovo || mostrarBotaoSalvar)
    ) && (
        <Divider  variant="middle" orientation="vertical"/>
    )

    }
        
       

   

        { (mostrarBotaoVoltar  && !mostrarBotaoVoltarCarregamento)  &&(
            <Button 
            disableElevation 
            variant="outlined" 
            color="primary" 
            onClick={clicarBotaoVoltar}
            endIcon={ <Icon>arrow_back</Icon>}>
                
         <Typography variant="button" whiteSpace="nowrap"  textOverflow="ellipsis" overflow="hidden">
                Voltar
         </Typography> 
            
        </Button>
        )}

        {mostrarBotaoVoltarCarregamento &&(
           <Skeleton width={110} height={60} />
        ) }

        

        </Box>
    );
};