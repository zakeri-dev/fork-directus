import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import database from '../database';
import APIError, { ErrorCode } from '../error';

const collectionExists: RequestHandler = asyncHandler(async (req, res, next) => {
	if (!req.params.collection) return next();

	const exists = await database.schema.hasTable(req.params.collection);

	if (exists) {
		res.locals.collection = req.params.collection;
		return next();
	}

	throw new APIError(ErrorCode.NOT_FOUND, `Collection "${req.params.collection}" doesn't exist.`);
});

export default collectionExists;
