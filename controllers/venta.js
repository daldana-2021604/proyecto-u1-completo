const { response, request } = require('express');

const Venta = require('../models/venta');

const factura = async(req = request, res= response) =>{
    const data = { usuario: req.usuario._id };

    const listaVentas = await Promise.all([
        Venta.countDocuments(data),
        Venta.find(data)
            .populate('usuario', 'nombre')
            .populate('producto', 'nombre')
            .populate('producto', 'precio')
    ]);

    res.json({
        msg: 'FACTURA',
        listaVentas
    });
}

const postCarritoCompras = async(req = request, res= response) =>{
    const {usuario, estado, ...body} = req.body;

    const data = {
        ...body,
        usuario: req.usuario._id
    }

    const venta = new Venta(data);

    await venta.save();

    res.status(201).json({
        msg: 'Post carrito',
        venta
    });
}

const putCarritoCompras = async(req = request, res= response) =>{
    const { id } = req.params;
    const { _id, estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id; //hacemos referencia al usuario que hizo el put por medio del token

    //Edición de producto               // new: true Sirve para enviar el nuevo documento actualizado     
    const venta = await Venta.findByIdAndUpdate(id, data, { new: true });

    res.json({
        msg: 'Put carrito',
        venta
    });

}

const deleteCarritoCompras = async(req = request, res= response) =>{
    const {id} = req.params;

    const venta = await Venta.findByIdAndDelete(id, { estado: false }, { new: true });

    res.status(201).json({
        msg: 'Delete carrito',
         venta
    })
}

module.exports = {
    factura,
    postCarritoCompras,
    putCarritoCompras,
    deleteCarritoCompras
}