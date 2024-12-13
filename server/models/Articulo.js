import mongoose from "mongoose";

const articuloSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    storeUrl: { type: String, required: true },
    tipoCuchillo: { type: String, required: true },
    onOferta: { type: Boolean, default: false },
    descuento: { type: Number, default: 0 }
}, { timestamps: true });

const articuloModel = mongoose.model('Articulo', articuloSchema);
export { articuloModel as Articulo };
