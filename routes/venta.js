const { Router } = require('express');
const { check } = require('express-validator');
const { factura, postCarritoCompras, putCarritoCompras, deleteCarritoCompras } = require('../controllers/venta');
const { existeProductoPorId, existeVentaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/factura',[
    validarJWT,
    validarCampos
], factura);

router.post('/agregar',[
    check('producto').custom(existeProductoPorId),
    validarJWT,
    validarCampos
], postCarritoCompras);

router.put('/editar/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('producto').custom(existeProductoPorId),
    check('id').custom(existeVentaPorId),
    check('cantidad', 'se necesita una cantidad para la compra').not().isEmpty(),
    validarJWT,
    validarCampos
], putCarritoCompras);

router.delete('/eliminar/:id',[
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeVentaPorId),
    validarJWT,
    validarCampos
], deleteCarritoCompras);

module.exports = router;