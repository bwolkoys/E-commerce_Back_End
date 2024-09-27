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
  }) 
  //it's a promise and sends data as a json response from the categoryData
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  //used await to pause the function until after the Category.findByPk promise is returned. I added "async" to code line above so the await would work
  // findByPk from Module 14: Activity 09-Ins_Handlebars-FE-Logic

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      return res.status(404).json({message: 'No ID found in this Category'});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  //routes for this page in Module 13 Activity 11-Ins_RESTful-Routes (api, userRoutes.js)
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
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
  // Module 13: Activity 07-Ins_Update-Delete
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
