const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll ({
    include: [
      {
        // be sure to include its associated Products
        model: Product
      }
    ]
  }) .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({message: 'No ID found in this Category'});
      return;
    }
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }) .then((category) => {
    res.status(200).json(category);
  }) .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const categoryData = Category.destroy ({
    where: {
      id: req.params.id,
    },
  }) .then (categoryData => res.status(200).json(categoryData))
  .catch((err) => {
  res.status(500).json(err)
  })
});

module.exports = router;
