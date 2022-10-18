
const asyncHandler = require('express-async-handler')
const { Router } = require('express');
//IMPORTAMOS PRODUCTOS DE LA CARPETA CONTROLLER
const { ProductsController } = require('../controller/productos');

const router = Router();

// TODOS LOS PRODUCTOS

//(EN EL msg TRAEMOS LOS INPUTS DE LA CONTROLLER/ PRODUCTOS.JS)

router.get('/', (req, res) => {
	res.json({
		msg: ProductsController.getAll()
	})
})

router.get('/:id', (req, res) => {
	const id = req.params.id;

	const product = ProductsController.getById(id)
	res.json({
		msg: product
	})
})


router.post('/', async (req, res, next) => {
	const { body }  = req

	try{
		const data = await ProductsController.save(body);
		res.json({
			msg: data
		})
	} catch (err) {
		next(err);
	}
})


const funcionAsync = async (req, res) => {
	const id = req.params.id;
	const { body }  = req

	const data = await ProductsController.findByIdAndUpdate(id, body);
	res.json({
		msg: data
	})
}

router.put('/:id', asyncHandler(funcionAsync));

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	res.json({
		msg: ProductsController.findByIdAndDelete(id)
	})
})

module.exports = router;
