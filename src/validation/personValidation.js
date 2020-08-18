const Joi = require('@hapi/joi');

const personValidation = Joi.object({
  tipo: Joi.string().valid('Pessoa física', 'Pessoa jurídica').required(),
  nome: Joi.string().min(3).required(),
  razaoSocial: Joi.alternatives()
    .conditional('tipo', { is: 'Pessoa jurídica', then: Joi.string() }),
  CPF: Joi.alternatives()
    .conditional('tipo', {
      is: 'Pessoa física',
      then: Joi.string()
        .pattern(new RegExp('^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$'))
        .messages({
          'string.pattern.base': 'CPF deve estar no formato 000.000.000-00',
        }),
    }),
  CNPJ: Joi.alternatives()
    .conditional('tipo', {
      is: 'Pessoa jurídica',
      then: Joi.string()
        .pattern(new RegExp('^[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}$'))
        .messages({
          'string.pattern.base': 'CNPJ deve estar no formato 00.000.000/0000-00',
        }),
    }),
  sexo: Joi.alternatives()
    .conditional('tipo', { is: 'Pessoa física', then: Joi.string().valid('Masculino', 'Femino', 'Outro') }),
  dataNascimento: Joi.alternatives()
    .conditional('tipo', {
      is: 'Pessoa física',
      then: Joi.string()
        .pattern(new RegExp('^[0-9]{2}/[0-9]{2}/[0-9]{4}$'))
        .messages({
          'string.pattern.base': 'A data de nescimento deve estar no formato 00/00/0000',
        })
        .required(),
    }),
  email: Joi.string().email({ minDomainSegments: 2 }),
  telefone: Joi.string()
    .pattern(new RegExp('^\\([0-9]{2}\\)\\s*[0-9]{4}-[0-9]{4}$'))
    .messages({
      'string.pattern.base': 'O telefone deve estar no formato (00) 0000-0000',
    }),
  celular: Joi.string()
    .pattern(new RegExp('^\\([0-9]{2}\\)\\s*[0-9]{5}-[0-9]{4}$'))
    .messages({
      'string.pattern.base': 'O telefone deve estar no formato (00) 00000-0000',
    }),
  foto: Joi.string().uri(),
  endereco: Joi.array().min(1).required().items(Joi.object({
    endereco: Joi.string().required(),
    numero: Joi.number().min(0).required(),
    complemento: Joi.string().allow(null, ''),
    bairro: Joi.string(),
    cidade: Joi.string().required(),
    estado: Joi.string().required(),
    cep: Joi.string()
      .pattern(new RegExp('^[0-9]{5}-[0-9]{3}$'))
      .messages({
        'string.pattern.base': 'O CEP deve estar no formato 00000-000',
      }),
  })),
});

// ● Foto (apenas URL)
module.exports = personValidation;
