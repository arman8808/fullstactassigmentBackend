import Poll from "../model/Poll.model.js";

const createPoll = async (req, res) => {
  try {
    const { question } = req.body;
    const options = req.body?.options ? JSON.parse(req.body?.options) : [];
    console.log(question, options);

    const poll = new Poll({
      question,
      options: options.map((option) => ({ option, votes: 0 })),
    });
    await poll.save();
    res.status(201).json({ message: "Poll Create Sucessfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Failed to create poll" });
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch polls" });
  }
};

const voteOnPoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { option } = req.body;

    const poll = await Poll.findById(id);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const selectedOption = poll.options.find((opt) => opt.option === option);
    if (!selectedOption) {
      return res.status(400).json({ error: "Invalid option" });
    }

    selectedOption.votes += 1;
    await poll.save();
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: "Failed to vote on poll" });
  }
};
const getOnePoll = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await Poll.findById(id);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.status(200).json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get poll" });
  }
};

export { createPoll, getAllPolls, voteOnPoll,getOnePoll };
