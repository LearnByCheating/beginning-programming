const express = require('express');
const router = express.Router();
const { Article } = require('../models');
const createError = require('http-errors');
 
// Routes
router.get('/', list);
router.get('/create', createForm);
router.post('/create', create);
router.get('/:id', detail);
router.get('/:id/update', updateForm);
router.post('/:id/update', update);
router.get('/:id/delete', destroy);

// Controller Functions
// GET /articles
async function list(req, res, next) {
  const articles = await Article.findAll({ 
    attributes: ['id', 'title', 'createdAt'],
    order: [['createdAt', 'DESC']]
  })
  res.render('index', { title: 'Blog App', articles });
}

// GET /articles/:id
async function detail(req, res, next) { 
  const article = await Article.findByPk(req.params.id);
  if (!article) {
    return next(createError(404));
  }
  res.render('detail', { title: 'Article', article });    
}

// GET /articles/create
function createForm(req, res, next) {
  res.render('create', { title: 'Create Article' });
}

// POST /articles/create
async function create(req, res, next) {
  const article = await Article.create(req.body, {fields: ['title', 'content'] });
  res.redirect(`/${article.id}`);    
}

// GET /articles/:id/update
async function updateForm(req, res, next) { 
  const article = await Article.findByPk(req.params.id);
  res.render('update', { title: 'Update Article', article });    
}

// POST /articles/:id/update
async function update(req, res, next) {
  const id = req.params.id; 
  await Article.update(req.body, {where: {id: id}, fields: ['title', 'content'] });
  res.redirect(`/${id}`); 
} 

// GET /articles/:id/delete
async function destroy(req, res, next) {
  await Article.destroy({where: {id: req.params.id}});
  res.redirect('/');   
}

module.exports = router;