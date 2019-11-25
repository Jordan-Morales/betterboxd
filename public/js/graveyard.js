//
// movies.get('/:id/:omdbID', (req, res) => {
//   Movie.find({omdbID:req.params.id}, (error, foundMovie) => {
//     // console.log(req.params.id);
//     // console.log(foundMovie[0]);
//     if (foundMovie[0] === undefined) {
//       console.log('do nothing?');
//     }
//     else {
//       Movie.findOne({omdbID:req.params.id}, (error, likedStatus) => {
//         console.log('did i get here?');
//         console.log(likedStatus);
//       })
//     }
//   })
// })
//
// movies.get('/:id/comment', (req, res) => {  // to edit comment
//   Movie.find({omdbID:req.params.id}, (error, foundMovie) => {
//     console.log(req.params.id);
//     console.log(foundMovie[0]);
//   })
// })
//
