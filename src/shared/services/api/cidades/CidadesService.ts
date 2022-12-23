import { Api } from "../axios-config";
import {Environment} from "../../../environment";




export interface IListagemCidades{
    id: number;
    nome:string;
}

export  interface IDetalheCidade{
    id: number;
    nome:string;
}

 export type IcidadesComTotalCount = {
    data: IListagemCidades[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''):  Promise<IcidadesComTotalCount | Error> =>{
    try{

        const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;

        const {data, headers} = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            };
        }

        return new Error(' Erro ao listar as cidades.') 

    } catch (error){
           console.error(error);   
           return new Error((error as {message:string}).message||'Erro ao listar as cidades.');
    }
};

const getById = async (id: number): Promise<IDetalheCidade | Error> =>{

    try{
        const {data} = await Api.get(`/cidades/${id}`);

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

const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> =>{

    try{
        const {data} = await Api.post<IDetalheCidade>('/cidades', dados);

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

const updateById = async (id : number, dados: IDetalheCidade): Promise<void | Error> => {

    try{
       await Api.put<IDetalheCidade>(`/cidades/${id}`, dados);
    }
        catch(error) {
          console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao actualizar os regitro');
    }

};

const deleteById = async (id: number): Promise<void | Error> => {
    
    
    try{
        await Api.delete<IDetalheCidade>(`/cidades/${id}`);
     }
         catch(error) {
           console.error(error);
 
         return new Error((error as {message: string}).message || 'Erro ao apagar o regitro');
     }

};

export const CidadesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};