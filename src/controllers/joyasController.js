// joyasControler.js
import { getAllDataWithLimitModel, getAllDataWithFiltersModel } from "../models/joyasModel.js";
import { searchError } from "../utils/utils.js";

// GET JOYAS WITH HATEOAS
export const getAllDataLimit = async (req, res) => {
    try {
        const { limits, page, order_by } = req.query;
        const limitNumber = Number(limits) || 10;
        const pageNumber = Number(page) || 0;
        const orderBy = order_by || 'stock_ASC';
        const data = await getAllDataWithLimitModel(limitNumber, pageNumber, orderBy);

        const response = {
            totalJoyas: data.totalJoyas,
            stockTotal: data.stockTotal,
            results: data.joyas.map(joya => ({
                name: joya.nombre,
                href: `/joyas/joya/${joya.id}`
            }))
        };
        res.status(200).json(response);
    } catch (error) {
        const errorFound = searchError ? searchError(error.code) : { status: 500, message: 'Internal Server Error' };
        return res.status(errorFound.status).json({ error: errorFound.message });
    }
};

// GET JOYAS WITH FILTERS
export const getAllDataWithFilters = async (req, res) => {
    try {
        const { precio_min, precio_max, categoria, metal } = req.query;
        const minNumber = Number(precio_min) || 0;
        const maxNumber = Number(precio_max) || 0;
        const response = await getAllDataWithFiltersModel(minNumber, maxNumber, categoria, metal);
        res.status(200).json(response);
    } catch (error) {
        const errorFound = searchError ? searchError(error.code) : { status: 500, message: 'Internal Server Error' };
        return res.status(errorFound.status).json({ error: errorFound.message });
    }
};