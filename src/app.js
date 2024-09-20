import { Field } from "./field/field";

const fieldElement = document.querySelector(".grid");
const field = new Field(fieldElement);
field.startGame();
