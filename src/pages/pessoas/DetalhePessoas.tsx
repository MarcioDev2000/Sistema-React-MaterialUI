import { useNavigate, useParams } from "react-router-dom"
import { FerramentaDeDetalhe } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";

export const DetalhePessoas: React.FC = ()=>{
    const {id = 'nova'} = useParams<'id'>();
    const navigate = useNavigate();
    return(

        <LayoutBasePagina 
        titulo="Detalhe De Pessoa"
        barraFerramenta={
            <FerramentaDeDetalhe
              textoBotaoNovo="Nova"
              mostrarBotaSalvarFechar
              mostrarBotaoNovo = {id !== 'nova'}
              mostrarBotaoApagar = {id !== 'nova'}
              mostrarBotaoVoltar

              clicarBotaoNovo = {() => navigate('/pessoas/detalhe/nova')}
              clicarBotaoApagar = {() => {}}
              clicarBotaoSalvar = {() => {}}
              clicarBotaoSalvarFechar = {() => {}}
              clicarBotaoVoltar = {() => navigate('/pessoas')}
            />
        }
        >
    


          <p>Detalhes Pessoas {id}</p>
        </LayoutBasePagina>
   
    )
}