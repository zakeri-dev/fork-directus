import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'express-pino-logger';

import { errorHandler, ErrorCode } from './error';

import initLoaders from './middleware/init-loaders';
import extractToken from './middleware/extract-token';
import authenticate from './middleware/authenticate';

import activityRouter from './routes/activity';
import authRouter from './routes/auth';
import collectionPresetsRouter from './routes/collection-presets';
import extensionsRouter from './routes/extensions';
import filesRouter from './routes/files';
import foldersRouter from './routes/folders';
import itemsRouter from './routes/items';
import permissionsRouter from './routes/permissions';
import relationsRouter from './routes/relations';
import revisionsRouter from './routes/revisions';
import rolesRouter from './routes/roles';
import serverRouter from './routes/server';
import settingsRouter from './routes/settings';
import usersRouter from './routes/users';
import webhooksRouter from './routes/webhooks';

import notFoundHandler from './routes/not-found';

// import sendMail from './mail';

// sendMail({
// 	to: 'rijkvanzanten@me.com',
// 	subject: 'Test Email',
// 	text: 'Hi there!',
// 	html: '<h1>Hi there!</h1>',
// });

const app = express()
	.disable('x-powered-by')
	.use(logger())
	.use(bodyParser.json())
	.use(initLoaders)
	.use(extractToken)
	.use(authenticate)
	.use('/activity', activityRouter)
	.use('/auth', authRouter)
	.use('/collection_presets', collectionPresetsRouter)
	.use('/extensions', extensionsRouter)
	.use('/files', filesRouter)
	.use('/folders', foldersRouter)
	.use('/items', itemsRouter)
	.use('/permissions', permissionsRouter)
	.use('/relations', relationsRouter)
	.use('/revisions', revisionsRouter)
	.use('/roles', rolesRouter)
	.use('/server/', serverRouter)
	.use('/settings', settingsRouter)
	.use('/users', usersRouter)
	.use('/webhooks', webhooksRouter)
	.use(notFoundHandler)
	.use(errorHandler);

export default app;
