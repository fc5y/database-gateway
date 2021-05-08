import { Request, Response, NextFunction } from 'express';
import { RequestBodySchema } from '../schemas';
import knex from '../../db';

const createContest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const value = req.body as RequestBodySchema;
        await knex('Contests').insert(value);

        res.json({
            error: 0
        });
    } catch (err) {
        next(err);
    }
}


const readContest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { offset, limit } = req.body as RequestBodySchema;
        const where = req.body?.where || {};
        const items = await knex('Contests')
            .select('*')
            .where(where)
            .offset(offset)
            .limit(limit);
        const total = await knex("Contests").count("*");
        res.json({
            error: 0,
            data: {
                total: total[0]["count(*)"],
                items
            }
        });
    } catch (err) {
        next(err);
    }
};

const updateContest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { where, values } = req.body as RequestBodySchema;
        const query = knex('Contests').where(where);
        if (Array.isArray(values)) {
            for (const value of values) {
                query.update(value);
            }
        }
        await query;

        res.json({
            error: 0
        });
    } catch (err) {
        next(err);
    }
};

const deleteContest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { where } = req.body as RequestBodySchema;
        await knex('Contest').where(where).del();

        res.json({
            error: 0
        });
    } catch (err) {
        next(err);
    }
};

export default {
    createContest,
    readContest,
    updateContest,
    deleteContest
}