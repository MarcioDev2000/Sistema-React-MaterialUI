import {setLocale } from 'yup';

setLocale({
    mixed:{
      default: 'Campo não é válido',
      required: 'O campo é obrigatório',
    },
    string:{
        email:() => 'O campo precisa conter um email válido',
        max: ({max}) => `O campo pode ter no máximo ${max} caracteres`,
        min: ({min}) => `O campo pode ter pelo menos ${min} caracteres`,
        length: ({length}) => `O campo precisa ter exatamente ${length} caracteres`,
    },
    date :{
        max:({max}) => `A date deve ser menor ${max}`,
        min:({min}) => `A date deve ser maior que ${min}`,
    },
    number:{
        integer: () => 'O campo precisa de valor inteiro',
        negative: () => ' O campo precisa de valor negativo',
        positive: () => 'O campo precisa de um valor positivo',
        moreThan: ({more}) => `O campo precisa de ter um valor maior que ${more}`,
        lessThan: ({less}) => `O campo precisa de ter um valor menor que ${less}`,
        min: ({min}) => `O campo precisa ter um valor com mais de ${min} de caracteres`,
        max:({max}) => `O campo precisa ter um valor com mais de ${max} de caracteres`,
    },
    boolean: {},
    object: {},
    array: {},

});