import { body } from 'express-validator';
import { isArrayOfObjects, validationMiddleware } from './common';

const createContest = [
    body('values').isArray(),
    validationMiddleware
]

const readContest = [
    body('offset').isInt({ min: 0 }),
    body('limit').isInt({ min: 0 }),
    body('where').isObject().optional(),
    validationMiddleware
]

const updateContest = [
    body('where').isObject(),
    body('values').custom(isArrayOfObjects),
    validationMiddleware
];

const deleteContest = [body('where').isObject(), validationMiddleware];

export default {
    createContest, readContest, updateContest, deleteContest
}