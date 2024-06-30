// joyasModel.js
import format from 'pg-format';
import pool from "../../database/config.js";

// LIMIT AND HATEOAS
export const getAllDataWithLimitModel = async (limits = 10, page = 0, order_by = 'stock_ASC') => {
    let offset = 0;
    if (Number(page) > 0){
        offset = (page - 1) * limits;
    }
    const [orderField, orderDirection] = order_by.split('_');
    const countQuery = format('SELECT COUNT(ID) AS total from inventario WHERE id IN(SELECT id FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L)', orderField, orderDirection.toUpperCase(), limits, offset);
    const stockQuery = format('SELECT SUM(stock) AS total_stock from inventario WHERE id IN(SELECT id FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L)', orderField, orderDirection.toUpperCase(), limits, offset);
    const SQLquery = format('SELECT * FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L', orderField, orderDirection.toUpperCase(), limits, offset);
    try {
        const [allData, totalJoyas, totalStock] = await Promise.all([
            pool.query(SQLquery),
            pool.query(countQuery),
            pool.query(stockQuery)
        ]);

        return {
            joyas: allData.rows,
            totalJoyas: Number(totalJoyas.rows[0].total),
            stockTotal: Number(totalStock.rows[0].total_stock)
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// FILTERS MIN precio, MAX precio, categoria and metal
export const getAllDataWithFiltersModel = async (precio_min = 0, precio_max = 0, categoria = '', metal = '') => {
    let textQuery = 'SELECT * FROM inventario WHERE id = id ';
    let params = [];
    if (Number(precio_min) > 0){
        textQuery += 'AND precio >= %L ';
        params.push(precio_min);
    }
    if (Number(precio_max) > 0){
        textQuery += 'AND precio <= %L ';
        params.push(precio_max);
    }
    if (categoria != ''){
        textQuery += 'AND categoria = %L ';
        params.push(categoria.toLowerCase());
    }
    if (metal != ''){
        textQuery += 'AND metal = %L ';
        params.push(metal.toLowerCase());
    }
    const SQLquery = format(textQuery, ...params);
    try {
        const result = await pool.query(SQLquery);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};