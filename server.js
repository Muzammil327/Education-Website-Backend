import app from "./app.js";
import colors from "colors";
import PakStudyRoutes from './pakstudy/route.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./db.json");

const pdata1 = require("./physics/pdata1.json");
const pdata2 = require("./physics/pdata2.json");
const pdata3 = require("./physics/pdata3.json");
const bdata1 = require("./biology/bdata1.json");
const bdata2 = require("./biology/bdata2.json");
const bdata3 = require("./biology/bdata3.json");


// Combine MCQs from different files
const combinedMcqs = {
  physics: [...pdata1, ...pdata2, ...pdata3],
  biology: [...bdata1, ...bdata2, ...bdata3],
};

// api Routes -----------------------------   MCQS's  -----------------------------
app.get("/api/mcqs", (req, res) => {
  res.json(combinedMcqs);
});

// api Routes -----------------------------  physics MCQS's  -----------------------------

app.get("/api/mcqs/physics", (req, res) => {
  res.json(combinedMcqs.physics);
});

app.get("/api/mcqs/physics/:id", (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = combinedMcqs.physics.find(
    (q) => q.question_id === questionId
  );
  if (!question) {
    res.status(404).json({ error: "Question not found" });
  } else {
    res.json(question);
  }
});

// api Routes -----------------------------  biology MCQS's  -----------------------------

app.get("/api/mcqs/biology", (req, res) => {
  res.json(combinedMcqs.physics);
});

app.get("/api/mcqs/biology/:id", (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = combinedMcqs.biology.find(
    (q) => q.question_id === questionId
  );
  if (!question) {
    res.status(404).json({ error: "Question not found" });
  } else {
    res.json(question);
  }
});

// use 
app.use("/api", PakStudyRoutes);


// port
const PORT = 8000;

app.listen(PORT, () => {
  console.log(
    `Server ${process.env.DEV_MODE} running on port ${PORT}`.bgCyan
      .white
  );
});
