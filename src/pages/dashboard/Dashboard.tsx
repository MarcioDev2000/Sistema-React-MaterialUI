import { FerramentaDaListagem, FerramentaDeDetalhe} from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";


export const Dashboard = (()=>{
    return(
        <LayoutBasePagina 
        titulo="Página Inicial" 
        barraFerramenta=
        {<FerramentaDeDetalhe 
         mostrarBotaSalvarFechar
         mostrarBotaoNovo 
         mostrarBotaoSalvarFecharCarregamento 
         /> }>
            testando
        </LayoutBasePagina>
    );
})