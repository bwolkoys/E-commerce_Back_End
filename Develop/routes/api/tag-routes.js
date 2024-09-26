const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  //all the records in the tags table is being taken  in the findAll method
  Tag.findAll({
    //specifies what to include in the results from the findAll
    include: [
      {
        model: Product,
        //I believe this states that it's many-to-many because there are multiple tags and multiple products so productTag combines them 
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })
  //shows its successful
  .then(TagData => res.json(TagData))
  //shows if there is an error in the process. if there is, it will state it saying 500 "internal server error"
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  //finds a single tag thats in the database
  Tag.findOne({
    //where to find the tag
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  }) 
  //npw retreiving the data
  .then (TagData => {
    //if the tag isnt found it will message "no id found"
    if (!TagData) {
      return res.status(404).json({ message: 'No id found' });
    }
    res.json(TagData);
  })
  //catches any errors during the process
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  //sends post request. this will create a new tag in the tags table
  Tag.create(
    {
    tag_name: req.body.tag_name
    }
  )
  .then(TagData => res.json(TagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name //taken from xpert lerning "Set the new tag name from the request body"
    },
    {
      where: {
        id: req.params.id
      }
    }
  ) .then (TagData => {
    if (!TagData) {
        return res.status(404).json({ message: 'No id found' });
    }
    res.json(TagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  // used the destroy method to delete the tag
  //deletes by id
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }) .then (TagData => {
    if (TagData) {
      return res.status(404).json({message: 'No id found'});
    }
    res.json({TagData})
  }) .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
