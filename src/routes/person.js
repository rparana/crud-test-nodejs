const Router = require('koa-router');
const { ObjectId } = require('mongoose').Types;

const Person = require('../models/PersonSchema');
const PersonValidator = require('../validation/personValidation');

// Creating router
const router = new Router({
  prefix: '/person',
});

// Routes
// List all person route
router.get('/', async (ctx, next) => {
  let { page } = ctx.query;

  if (page === undefined) {
    page = 1;
  }

  const totalDocuments = await Person.estimatedDocumentCount({});

  const currentPage = (page - 1) * 5;

  const person = await Person.find({}).limit(5).skip(currentPage);

  ctx.body = {
    docs: person,
    page,
    total: totalDocuments,
  };
  next();
});

// Create a new person route
router.post('/', async (ctx, next) => {
  const person = ctx.request.body;

  // Validate if the request parameter matches the required fields
  try {
    await PersonValidator.validateAsync(person);
  } catch (err) {
    ctx.body = err.details;
    ctx.response.status = 400;
    return;
  }

  const newPerson = new Person(person);
  const savedPerson = await newPerson.save();

  ctx.body = savedPerson;
  ctx.response.status = 201;
  next();
});

// Delete a person by id route
router.delete('/:personId', async (ctx, next) => {
  const { personId } = ctx.params;

  // Verify if the passed id is valid
  try {
    ObjectId(personId);
  } catch {
    ctx.body = { error: 'Invalid ID' };
    ctx.response.status = 400;
    return;
  }

  const deletedPerson = await Person.deleteOne({ _id: new ObjectId(personId) });

  // Check if deleted the person, if nothing was deleted return error
  if (deletedPerson.deletedCount === 0) {
    ctx.body = { error: 'Not found Person with given id' };
    ctx.response.status = 404;
  } else {
    ctx.body = { message: 'Person deleted sucessfuly!' };
  }
  next();
});

// Update person by id route
router.post('/:personId', async (ctx, next) => {
  const { personId } = ctx.params;
  const { body } = ctx.request;

  // Validate if the request parameter matches the required fields
  try {
    await PersonValidator.validateAsync(body);
  } catch (err) {
    ctx.body = err.details;
    ctx.response.status = 400;
    return;
  }

  // Verify if the passed id is valid
  try {
    ObjectId(personId);
  } catch {
    ctx.body = { error: 'Invalid ID' };
    ctx.response.status = 400;
    return;
  }

  const person = await Person.findByIdAndUpdate(personId, body, { new: true, overwrite: true });

  if (person === null) {
    ctx.body = { error: 'Not found Person with given id' };
    ctx.response.status = 404;
    return;
  }

  ctx.body = person;
  next();
});

// Get only one person by its id
router.get('/:personId', async (ctx, next) => {
  const { personId } = ctx.params;

  // Verify if the passed id is valid
  try {
    ObjectId(personId);
  } catch {
    ctx.body = { error: 'Invalid ID' };
    ctx.response.status = 400;
    return;
  }

  const person = await Person.findById(personId);

  if (person === null) {
    ctx.body = { error: 'Not found Person with given id' };
    ctx.response.status = 404;
    return;
  }

  ctx.body = person;
  next();
});

module.exports = router;
