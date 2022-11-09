
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, LinearProgress, Pagination, IconButton, Icon } from "@mui/material";

import { useMemo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { FerramentaDaListagem } from "../../shared/components"
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePagina } from "../../shared/layouts"
import { PessoasService, IListagemPessoas} from "../../shared/services/api/pessoas/PessoasServices";

export const ListagemDePessoas: React.FC = () =>{

    const [searchParams, setSearchParams] = useSearchParams();
    const {debounce} = useDebounce();
    const navigate = useNavigate();
    const [rows, setRows] = useState<IListagemPessoas []>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoanding, setLoanding] = useState(true);

    const busca = useMemo(() =>{

      return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() =>{

      return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    const handleDelete = (id: number) =>{
       if (window.confirm('Realmente deseja apagar?')){
        PessoasService.deleteById(id)
        .then(result =>{
          if( result instanceof Error){
            alert(result.message);
          }
          else{
                 setRows(oldRows =>[
                    ...oldRows.filter(oldRow => oldRow.id !== id),
                 ]);
                 alert('Registro apagado com sucesso');
          }
        });
       }
    };


useEffect (() => {
  setLoanding(true);

  debounce(()=>{
    PessoasService.getAll(pagina, busca)
    .then((result)=>{
      setLoanding(false);

      if(result instanceof Error){
        alert(result.message);
      } else{
         console.log(result);

         setRows(result.data);

         setTotalCount(result.totalCount);
      } 
    });
  });

}, [busca, debounce, pagina])
    


    return(
         <LayoutBasePagina titulo="Listagem de Pessoas" 
         barraFerramenta={<FerramentaDaListagem 
         textoBotaoNovo="Nova" 
         mostrarInputBuscar
         textoDaBusca={busca}
         MudarTextoBuscar={texto => setSearchParams({busca: texto, pagina: '1'}, {replace: true})}
         />}
         >

          <TableContainer component={Paper} variant="outlined" sx={{m:1, width: 'auto'}}>
             <Table>
               <TableHead>

                 <TableRow>
                  <TableCell>Ações</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                 </TableRow>

               </TableHead>
                <TableBody>

                       {rows.map( row => (
                         
                         <TableRow key={row.id}>
                         <TableCell>
                           <IconButton onClick={() => handleDelete(row.id)}>
                             <Icon>delete</Icon>
                           </IconButton>
                           <IconButton onClick={ () => navigate(`/pessoas/detalhe/${row.id} `)}>
                             <Icon>edit</Icon>
                           </IconButton>
                         </TableCell>
                         <TableCell>{row.nomeCompleto}</TableCell>
                         <TableCell>{row.email}</TableCell>
                        </TableRow>

                       ))}
                </TableBody>


             {totalCount === 0 && !isLoanding && (
                       <caption>{Environment.LISTAGEM_VAZIA}</caption>
             )}

                <TableFooter>
                
                  {isLoanding &&(
                    <TableRow>
                      <TableCell colSpan={3}>
                          <LinearProgress variant="indeterminate"/>
                      </TableCell>
                   </TableRow>
                  )} 
                   {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) &&(
                    <TableRow>
                      <TableCell colSpan={3}>
                          <Pagination
                          page={pagina}
                          count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                          onChange= { (e, newPage) => setSearchParams({busca, pagina: newPage.toString()}, {replace: true})}
                          />
                      </TableCell>
                   </TableRow>
                  )}
                </TableFooter>
             </Table>
          </TableContainer>
         </LayoutBasePagina>
    )
}