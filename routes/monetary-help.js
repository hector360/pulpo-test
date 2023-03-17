import express from "express";
import { getMonetaryHelp } from '../controllers/monetaryHelpController.js';

const router = express.Router();

router.get('/', getMonetaryHelp);


export { router as monetaryHelpRouter };