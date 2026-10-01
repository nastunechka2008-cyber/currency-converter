import { Router } from "express";
 import { getRates } from "../controllers/ratesController";

 const router = Router();

 router.get('/rates', getRates);

 export default router;