import mongoose from "mongoose";

const Schema = mongoose.Schema;

const informSchema = new Schema(
  {
    PlayerId: {
      type: Schema.Types.ObjectId,
      ref: "PlayersModel",
      required: true,
    },

    SkillsPrincipales: [
      {
        ControlDelBalón: { type: Number, required: true },
        Disparo: { type: Number, required: true },
        Cabeza: { type: Number, required: true },
        Asociación: { type: Number, required: true },
        PieDerecho: { type: Number },
        PieIzquierdo: { type: Number },
        PasesLargos: { type: Number, required: true },
        Dribling: { type: Number, required: true },
        Reflejos: { type: Number, required: true },
        Centros: { type: Number, required: true },
      },
    ],
    SkillsTacticas: [
      {
        Anticipación: { type: Number, required: true },
        Colocación: { type: Number, required: true },
        Concentración: { type: Number, required: true },
        Contundencia: { type: Number, required: true },
        Desdoble: { type: Number, required: true },
        Desmarque: { type: Number, required: true },
        Posicionamientos: { type: Number, required: true },
        VisiónDeJuego: { type: Number, required: true },
        MediaInforme: { type: Number },
      },
    ],
    SkillsFísicas: [
      {
        Agilidad: { type: Number, required: true },
        Flexibilidad: { type: Number, required: true },
        Fuerza: { type: Number, required: true },
        Potencia: { type: Number, required: true },
        Resistencia: { type: Number, required: true },
        Salto: { type: Number, required: true },
        Velocidad: { type: Number, required: true }
      }
    ],

    Texto: { type: String, required: true },
    MediaInforme: { type: Number },
    Created_At: { type: Date, default: Date.now },
  },
  { collection: "informs", versionKey: false }
);

informSchema.pre("validate", function (next) {
  //SkillsPrincipales
  const SkillsPrincipales = this.SkillsPrincipales[0]; // Accede a la primera habilidad del array SkillsPrincipales
  if (
    typeof SkillsPrincipales.ControlDelBalón !== "number" ||
    typeof SkillsPrincipales.Asociación !== "number" ||
    typeof SkillsPrincipales.Disparo !== "number" ||
    typeof SkillsPrincipales.PieDerecho !== "number" ||
    typeof SkillsPrincipales.PasesLargos !== "number" ||
    typeof SkillsPrincipales.Dribling !== "number" ||
    typeof SkillsPrincipales.Centros !== "number" ||
    typeof SkillsPrincipales.Reflejos !== "number" ||
    typeof SkillsPrincipales.Cabeza !== "number" ||
    typeof SkillsPrincipales.PieIzquierdo !== "number"
  ) {
    return next(new Error("Los valores de SkillsPrincipales deben ser numéricos"));
  }

  //SkillsTacticas
  const SkillsTacticas = this.SkillsTacticas[0]; // Accede a la primera habilidad del array SkillsTacticas
  if (
    typeof SkillsTacticas.Anticipación !== "number" ||
    typeof SkillsTacticas.Desmarque !== "number" ||
    typeof SkillsTacticas.Colocación !== "number" ||
    typeof SkillsTacticas.Posicionamientos !== "number" ||
    typeof SkillsTacticas.Concentración !== "number" ||
    typeof SkillsTacticas.VisiónDeJuego !== "number" ||
    typeof SkillsTacticas.Contundencia !== "number" ||
    typeof SkillsTacticas.Desdoble !== "number"
  ) {
    return next(new Error("Los valores de SkillsTacticas deben ser numéricos"));
  }

  //SkillsFísicas
  const SkillsFísicas = this.SkillsFísicas[0]; // Accede a la primera habilidad del array SkillsPrincipales
  if (
    typeof SkillsFísicas.Agilidad !== "number" ||
    typeof SkillsFísicas.Flexibilidad !== "number" ||
    typeof SkillsFísicas.Fuerza !== "number" ||
    typeof SkillsFísicas.Potencia !== "number" ||
    typeof SkillsFísicas.Resistencia !== "number" ||
    typeof SkillsFísicas.Salto !== "number" ||
    typeof SkillsFísicas.Velocidad !== "number"
  ) {
    return next(new Error("Los valores de SkillsPrincipales deben ser numéricos"));
  }
  next();
});

informSchema.pre("save", function (next) {
  const SkillsPrincipales = this.SkillsPrincipales[0]; // Accede a la primera habilidad del array SkillsPrincipales
  const sumaSkillsPrincipales =
    SkillsPrincipales.ControlDelBalón +
    SkillsPrincipales.Disparo +
    SkillsPrincipales.Cabeza +
    SkillsPrincipales.Asociación +
    SkillsPrincipales.PieDerecho +
    SkillsPrincipales.PieIzquierdo +
    SkillsPrincipales.PasesLargos +
    SkillsPrincipales.Dribling +
    SkillsPrincipales.Reflejos +
    SkillsPrincipales.Centros;
  this.MediaInforme = sumaSkillsPrincipales / 10;

  const SkillsTacticas = this.SkillsTacticas[0]; // Accede a la primera habilidad del array SkillsTacticas
  const sumaSkillsTacticas =
    SkillsTacticas.ControlDelBalón +
    SkillsTacticas.Disparo +
    SkillsTacticas.Cabeza +
    SkillsTacticas.Asociación +
    SkillsTacticas.PieDerecho +
    SkillsTacticas.PieIzquierdo +
    SkillsTacticas.PasesLargos +
    SkillsTacticas.Dribling +
    SkillsTacticas.Reflejos +
    SkillsTacticas.Centros;
  this.MediaInforme = sumaSkillsTacticas / 8;

  const SkillsFísicas = this.SkillsFísicas[0]; // Accede a la primera habilidad del array SkillsTacticas
  const sumaSkillsFísicas =
    SkillsFísicas.Agilidad +
    SkillsFísicas.Flexibilidad +
    SkillsFísicas.Fuerza +
    SkillsFísicas.Potencia +
    SkillsFísicas.Resistencia +
    SkillsFísicas.Salto +
    SkillsFísicas.Velocidad;
    this.MediaInforme = sumaSkillsFísicas / 7;
  next();
});

export default mongoose.model("InformModel", informSchema)
