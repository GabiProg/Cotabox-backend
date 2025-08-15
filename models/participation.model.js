import mongoose from "mongoose";

const participationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Por favor, informe o primeiro nome."],
    },
    lastName: {
      type: String,
      required: [true, "Por favor, informe o sobrenome."],
    },
    participationPorcentage: {
      type: Number,
      required: [true, "Por favor, informe a porcentagem de participação."],
      min: [0, "A porcentagem de participação não pode ser negativa."],
      max: [100, "A porcentagem de participação não pode ser maior que 100."],
    },
  },
  { timestamps: true }
);
const Participation = mongoose.model("Participation", participationSchema);

export default Participation;