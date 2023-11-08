import yup from "yup";

export const voteSchema = yup.object({
  judge_id: yup.string("El código del juez no puede estar vacío").test('len', 'El código tiene que tener 24 caracteres', val => val.length === 24).required(),
  game_id: yup.string("El código del juego no puede estar vacío").test('len', 'El código tiene que tener 24 caracteres', val => val.length === 24).required(),
  gameplay: yup.number()
    .required()
    .positive("Debe ser un número positivo")
    .integer()
    .min(1, "Debe ser mayor a 1")
    .max(10, "Debe ser menor a 10")
    .required(),
  art: yup.number()
    .required()
    .positive("Debe ser un número positivo")
    .integer()
    .min(1, "Debe ser mayor a 1")
    .max(10, "Debe ser menor a 10")
    .required(),
  sound: yup.number()
    .required()
    .positive("Debe ser un número positivo")
    .integer()
    .min(1, "Debe ser mayor a 1")
    .max(10, "Debe ser menor a 10")
    .required(),
  theme: yup.number()
    .required()
    .positive("Debe ser un número positivo")
    .integer()
    .min(1, "Debe ser mayor a 1")
    .max(10, "Debe ser menor a 10")
    .required(),
});
