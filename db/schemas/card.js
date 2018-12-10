//Create new Card
import mongoose from "mongoose"
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String },
    atk: { type: String },
    def: { type: String },
    type: { type: String },
    level: { type: String },
    race: { type: String },
    attribute: { type: String },
    scale: { type: String },
    linkval: { type: String },
    linkmarkers: [{ type: String }],
    archetype: { type: String },
    setcode: { type: String },
    ban_tcg: { type: String },
    ban_ocg: { type: String },
    ban_goat: { type: String }
});

export default cardSchema;