import asyncHandler from "express-async-handler";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdata1 = require("./json-data-01.json");
import slugify from "slugify";

const combinedMcqs = {
  ...pdata1,
};

export const GetController = asyncHandler(async (req, res) => {
  try {
    return res.json(combinedMcqs);
  } catch (error) {
    return res.json({
      status: 401,
      success: false,
      error: "API Not Successfully Fetch.",
      error,
    });
  }
});

export const GetOneController = asyncHandler(async (req, res) => {
  // const questionId = parseInt(req.params.id);
  const combinedMcqsArray = Object.values(combinedMcqs);

  const questionSlug = req.params.question; // Using req.params.question as per your route definition
  const slugifiedQuestion = slugify(questionSlug, { lower: true });

  const foundQuestion = combinedMcqsArray.find(
    (q) => slugify(q.question, { lower: true }) === slugifiedQuestion
  );
  console.log(foundQuestion);
  if (!foundQuestion) {
    res.status(404).json({ error: "Question not found" });
  } else {
    res.json(foundQuestion);
  }
});

export const GetBookController = asyncHandler(async (req, res) => {
  const { book } = req.params;
  const normalizedBookName = book
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");

  const combinedMcqsArray = Object.values(combinedMcqs);

  // Filter questions by the normalized book name
  const question = combinedMcqsArray.filter((q) => {
    // Normalize the book name in each question and compare it with the normalized search term
    const normalizedQuestionBookName = q.book
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");
 
    return normalizedQuestionBookName === normalizedBookName;
  });

  if (!question) {
    res.status(404).json({ error: "Question not found" });
  } else {
    res.json(question);
  }
});

export const GetHeading1Controller = asyncHandler(async (req, res) => {
  const { heading1 } = req.params;
  const normalizedBookName = heading1
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");

  const combinedMcqsArray = Object.values(combinedMcqs);

  // Filter questions by the normalized book name
  const question = combinedMcqsArray.filter((q) => {
    // Normalize the book name in each question and compare it with the normalized search term
    const normalizedQuestionBookName = q.heading1
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");
    return normalizedQuestionBookName === normalizedBookName;
  });

  if (!question) {
    res.status(404).json({ error: "Question not found" });
  } else {
    res.json(question);
  }
});

export const GetHeading2Controller = asyncHandler(async (req, res) => {
  const { heading2 } = req.params;
  const normalizedBookName = heading2
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");

  const combinedMcqsArray = Object.values(combinedMcqs);

  // Filter questions by the normalized book name
  const question = combinedMcqsArray.filter((q) => {
    // Normalize the book name in each question and compare it with the normalized search term
    const normalizedQuestionBookName = q.heading2
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");
    return normalizedQuestionBookName === normalizedBookName;
  });

  if (!question) {
    res.status(404).json({ error: "Question not found" });
  } else {
    res.json(question);
  }
});

export const GetTagController = asyncHandler(async (req, res) => {
  // Use req.query to retrieve multiple tags from the URL
  const { tags } = req.query;

  // Check if tags parameter is provided
  if (!tags) {
    return res.status(400).json({ error: "Tags parameter is required" });
  }

  // Split the tags string into an array of individual tags
  const tagArray = tags.split(",");

  // Normalize each tag
  const normalizedTags = tagArray.map((tag) =>
    tag
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
  );

  const combinedMcqsArray = Object.values(combinedMcqs);

  // Filter questions by the normalized tags
  const questions = combinedMcqsArray.filter((question) =>
    normalizedTags.some((tag) => question.tags.includes(tag))
  );

  if (questions.length === 0) {
    res
      .status(404)
      .json({ error: "Questions not found for the specified tags" });
  } else {
    res.json(questions);
  }
});
