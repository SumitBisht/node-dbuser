
exports.about = function(req, res){
  res.render('about', { title: 'About', message: 'This page contains information that is generally present in help pages.' });
};
exports.contact = function(req, res){
  res.render('contact', { title: 'Contact Us', name: 'Laitkor Infosolutions', address: 'STPI, Uptron Building, Lucknow', phone: '0522-2826326' });
};