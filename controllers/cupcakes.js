const Cupcake = require('../models/cupcake')

exports.postAddCupcake = ('/add-cupcake', (req, res, next) => {
  const cupcake = new Cupcake({
    title: req.body.title
  });
  cupcake.save()
    .then(result => {
      console.log('Created Product');
      res.redirect('/about');
    })
    .catch(err => {
      console.log(err);
    });
})

//post
exports.postDeleteCupcake = (req, res, next) => {
  const cupcakeId = req.body.id;
  Cupcake.findByIdAndDelete(cupcakeId).then(() => {
      console.log("CUPCAKE DELETED")
      res.redirect('/about');
  }).catch(err => console.log(err));
}

//get
exports.getEditCupcake = (req, res) => {
  const cupcakeId = req.query.id;
  console.log(req.query)
  Cupcake.findById(cupcakeId)
      .then(cupcakes => {
          if (!cupcakes) {
              console.log("CUPCAKE NOT FOUND")
              return res.redirect('/system')
          }
          res.render('edit-cupcake', {
              cupcakes: cupcakes,
              pageTitle: 'Edit Cupcakes'
          })
      })
      .catch(err => {
          console.log(err);
          res.redirect('/system')
      })
}

exports.postEditCupcake = (req, res) => {
  const cupcakeId = req.body.id;
  const newTitle = req.body.newTitle;

  Cupcake.findById(cupcakeId)
      .then(cupcake => {
        cupcake.title = newTitle;
        return cupcake.save();
      })
      .then(result => {
          console.log("CUPCAKE UPDATED");
          res.redirect("/about")
      })
      .catch(err => {
          console.log(err);
          res.redirect('/system')
      })
}