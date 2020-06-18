import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Alimentos', image: 'alimentos.png', },
        { title: 'Roupas', image: 'roupas.png', },
        { title: 'Serviço Voluntário', image: 'servicos.png', },
        { title: 'Livros', image: 'livros.png', },
        { title: 'Moveis', image: 'moveis.png', },
        { title: 'Outras Doações', image: 'outros.png', },
    ]);
}
