import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Participation from "./models/participation.model.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/participation", async (req, res) => {
  try {
    const participations = await Participation.find({});
    res.status(200).json(participations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/participation", async (req, res) => {
  const { firstName, lastName, participationPorcentage } = req.body;

  if (!firstName || !lastName || participationPorcentage == null) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const participation = await Participation.create(req.body);
    res.status(201).json(participation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/participation/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const participation = await Participation.findById(id);
    if (!participation) {
      return res.status(404).json({ message: "Participação não encontrada." });
    }
    await Participation.findByIdAndDelete(id);
    res.status(200).json({ message: "Participação removida com sucesso." });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conected to the Database");
  })
  .catch(() => {
    console.log("Conection with the Dtabase failed");
  });
