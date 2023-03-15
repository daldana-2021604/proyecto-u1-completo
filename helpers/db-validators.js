const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Role = require('../models/role');
const Producto = require('../models/producto');
const Venta = require('../models/venta');

//Validamos en contro de la db si ese correo ya existe
const emailExiste = async( correo = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeUsuario = await Usuario.findOne( { correo } );
    if ( existeEmailDeUsuario) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const productoExiste = async( nombre = '' ) => {
    const existeProducto = await Producto.findOne( { nombre } );
    if ( existeProducto) {
        throw new Error(`El producto ${ nombre }, ya esta registrado en la DB `);
    }
}

const esRoleValido = async( rol = '') => {
    //Verificar si el rol es valido y existe en la DB
    const existeRolDB = await Role.findOne( { rol } );
    if ( !existeRolDB ) {
        throw new Error(`El rol ${ rol }, no existe en la DB `);
    }
}


const existeUsuarioPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfUser = await Usuario.findById( id );
    if ( !existIdOfUser ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeCategoriaPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfCategory = await Categoria.findById( id );
    if ( !existIdOfCategory ) {
        throw new Error(`La categoria con el id: ${id} no existe en la DB`);
    }

}

const existeProductoPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfProduct = await Producto.findById( id );
    if ( !existIdOfProduct ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeVentaPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfSale = await Venta.findById( id );
    if ( !existIdOfSale ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}


module.exports = {
    emailExiste,
    productoExiste,
    esRoleValido,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeVentaPorId
}