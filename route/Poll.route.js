import express from 'express';
import { createPoll, getAllPolls, getOnePoll, voteOnPoll } from '../controller/Poll.controller.js';
import { upload } from '../utils/multerUtils.js';

const router = express.Router();

router.post('/create', upload.none(),createPoll);
router.get('/get-all', getAllPolls);
router.put('/get-one/:id/vote', voteOnPoll);
router.get('/get-one-poll/:id', getOnePoll);

export default router;
