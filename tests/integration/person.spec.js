const request = require('supertest');
const app = require('../../src/app');
const personData = require('./personData');
const Person = require('../../src/models/PersonSchema');

describe('Person', () => {
  afterAll(async () => {
    await Person.remove({});
  });

  it('should be able to create a Pessoa Fisica', async () => {
    const response = await request(app.callback())
      .post('/person')
      .send(personData.pessoaFisica);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.endereco.length).toBe(1);
  });

  it('should be able to create a Pessoa Juridica', async () => {
    const response = await request(app.callback())
      .post('/person')
      .send(personData.pessoaJurica);

    expect(response.body).toHaveProperty('_id');
  });

  it('should be able to create a Pessoa Fisica with multiple Enderecos', async () => {
    const response = await request(app.callback())
      .post('/person')
      .send(personData.pessoaFisicaMultiploEndereco);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.endereco.length).toBe(2);
  });

  it('should not be able to create a Pessoa Fisica with invalid CPF', async () => {
    const response = await request(app.callback())
      .post('/person')
      .send(personData.pessoaFisicaErroCPF);

    expect(response.body[0]).toHaveProperty('message', 'CPF deve estar no formato 000.000.000-00');
  });

  it('should not be able to create a Pessoa Juridica with invalid CNPJ', async () => {
    const response = await request(app.callback())
      .post('/person')
      .send(personData.pessoaJuricaErroCNPJ);

    expect(response.body[0]).toHaveProperty('message', 'CNPJ deve estar no formato 00.000.000/0000-00');
  });

  it('should not be able to create a Pessoa Juridica with Pessoa Fisica fields', async () => {
    const response = await request(app.callback())
      .post('/person')
      .send(personData.pessoaJuricaComCamposPessoaFisica);

    expect(response.body[0]).toHaveProperty('message', '"CPF" does not match any of the allowed types');
  });

  it('should be able to return all Person from list', async () => {
    const response = await request(app.callback())
      .get('/person');

    expect(response.body.docs.length).toBe(3);
    expect(response.body.total).toBe(3);
  });

  it('should be able to delete a Person from the list', async () => {
    let response = await request(app.callback())
      .post('/person')
      .send(personData.pessoaFisica);

    expect(response.body).toHaveProperty('_id');

    const { _id } = response.body;

    response = await request(app.callback())
      .get('/person');

    expect(response.body.docs.length).toBe(4);
    expect(response.body.total).toBe(4);

    response = await request(app.callback())
      .delete(`/person/${_id}`);

    expect(response.body).toStrictEqual({ message: 'Person deleted sucessfuly!' });

    response = await request(app.callback())
      .get('/person');

    expect(response.body.docs.length).toBe(3);
    expect(response.body.total).toBe(3);
    
  });

  it('should no be able to delete a Person without a valid id from the list', async () => {
    let response = await request(app.callback())
      .get('/person');

    expect(response.body.docs.length).toBe(3);
    expect(response.body.total).toBe(3);

    response = await request(app.callback())
      .delete('/person/a');

    expect(response.body).toStrictEqual({ error: 'Invalid ID' });

    response = await request(app.callback())
      .get('/person');

    expect(response.body.docs.length).toBe(3);
    expect(response.body.total).toBe(3);
  });

  it('should be able to update a Person', async () => {
    const { pessoaFisica } = personData;

    let response = await request(app.callback())
      .post('/person')
      .send(pessoaFisica);

    expect(response.body).toHaveProperty('_id');

    const { _id } = response.body;

    pessoaFisica.nome = 'Novo Nome';

    response = await request(app.callback())
      .post(`/person/${_id}`)
      .send(pessoaFisica);

    expect(response.body.nome).toStrictEqual('Novo Nome');
  });

  it('should not be able to update a Person', async () => {
    const { pessoaFisica } = personData;

    let response = await request(app.callback())
      .post('/person')
      .send(pessoaFisica);

    expect(response.body).toHaveProperty('_id');

    const { _id } = response.body;

    pessoaFisica.tipo = 'Pessoa jurídica';
    pessoaFisica.nome = 'Novo Nome';

    response = await request(app.callback())
      .post(`/person/${_id}`)
      .send(pessoaFisica);

    expect(response.body[0]).toHaveProperty('message', '"CPF" does not match any of the allowed types');
  });
});
