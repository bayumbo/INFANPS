module.exports = {
    getIndex: (req, res) => {
      // Aquí puedes agregar lógica adicional si es necesario
      res.render('index', { title: 'Mi Aplicación' });
    }
  };