exports.getLogin =
  ('/login',
  (req, res) => {
    res.status(200).render('login', {
      word: 'This is My Word',
      def: ' This is the definition',
    });
  });

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
exports.signIn =
  ('/signin',
  (req, res) => {
    res.status(200).render('sign-up');
  });
