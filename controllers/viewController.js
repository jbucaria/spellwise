exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.addWord =
  ('/add',
  (req, res) => {
    res.status(200).render('add-word');
  });

exports.submitWord =
  ('/submit',
  (req, res) => {
    res.status(200).render('submit');
  });
exports.account =
  ('/account',
  (req, res) => {
    res.status(200).render('account');
  });
exports.home =
  ('/home',
  (req, res) => {
    res.status(200).render('home');
  });
exports.signUp =
  ('/signin',
  (req, res) => {
    res.status(200).render('sign-up', {
      title: 'Create account',
    });
  });
