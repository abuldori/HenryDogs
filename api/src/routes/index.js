const { Router } = require('express');
const Temperament = require('./RouterTemp');
const Dog  = require('./RouterDogs');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', Dog);
router.use('/temperaments', Temperament);



module.exports = router;
