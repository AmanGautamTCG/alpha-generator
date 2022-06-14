import {Request, Response} from "express";
import {logger} from "../../../core/logging/logger";
export const index =  async (req: Request, res: Response) => {
    logger.info(`Index Access: ${req.statusCode}`);
    res.render('index', { title: 'BeBo' });
};
