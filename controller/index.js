/**
 * Created by anthony on 2015-11-23.
 */

//home page
exports.home = function(req, res, next){
  res.render('index',{
      title: 'Incident Management'
  });
};