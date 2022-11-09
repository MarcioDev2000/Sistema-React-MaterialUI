import { Api } from "../axios-config";
import {Environment} from "../../../environment";
import { type } from "os";



export interface IListagemPessoas{
    id: number;
    email:string;
    cidadeId: number;
    nomeCompleto: string;
}

export  interface IDetalhePessoa{
    id: number;
    email:string;
    cidadeId: number;
    nomeCompleto: string;
}

 export type IpessoasComTotalCount = {
    data: IListagemPessoas[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''):  Promise<IpessoasComTotalCount | Error> =>{
    try{

        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

        const {data, headers} = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            };
        }

        return new Error(' Erro ao listar as pessoas.') 

    } catch (error){
           console.error(error);   
           return new Error((error as {message:string}).message||'Erro ao listar as pessoas.');
    }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> =>{

    try{
        const {data} = await Api.get(`/pessoas/${id}`);

        if(data){
            return data;
        }
        return new Error('Erro ao consultar o registo');
    }
        catch(error) {
          console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao consultar o regitro');
    }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> =>{

    try{
        const {data} = await Api.post<IDetalhePessoa>('/pessoas', dados);

        if(data){
            return data.id;
        }
        return new Error('Erro ao criar o registo');
    }
        catch(error) {
          console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao criar os regitro');
    }
};

const updateById = async (id : number, dados: IDetalhePessoa): Promise<void | Error> => {

    try{
       await Api.put<IDetalhePessoa>(`/pessoas/${id}`, dados);
    }
        catch(error) {
          console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao actualizar os regitro');
    }

};

const deleteById = async (id: number): Promise<void | Error> => {
    
    
    try{
        await Api.delete<IDetalhePessoa>(`/pessoas/${id}`);
     }
         catch(error) {
           console.error(error);
 
         return new Error((error as {message: string}).message || 'Erro ao apagar o regitro');
     }

};

export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};