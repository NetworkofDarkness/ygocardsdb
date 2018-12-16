//Create new Card
import mongoose from "mongoose"
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: { 
        type: String,
        required: true 
    },
    desc: { 
        type: String, 
        default: null 
    },
    atk: { 
        type: String, 
        default: null 
    },
    def: { 
        type: String, 
        default: null 
    },
    type: { 
        type: String, 
        default: null 
    },
    level: { 
        type: String, 
        default: null 
    },
    race: { 
        type: String, 
        default: null 
    },
    attribute: { 
        type: String, 
        default: null 
    },
    scale: { 
        type: String, 
        default: null 
    },
    linkval: { 
        type: String, 
        default: null 
    },
    linkmarkers: [{ 
        type: String, 
        default: null 
    }],
    archetype: { 
        type: String, 
        default: null 
    },
    setcode: { 
        type: String, 
        default: null 
    },
    ban_tcg: { 
        type: String, 
        default: null 
    },
    ban_ocg: { 
        type: String, 
        default: null 
    },
    ban_goat: { 
        type: String, 
        default: null 
    }
});

export default cardSchema;