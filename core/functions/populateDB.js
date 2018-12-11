
import Database from "../../db/connect";
import cardSchema from "../../db/schemas/card";
const database = new Database();

class populateDB {
    run(){
        database.connect().then((conn) => {
            const Card = conn.model('card', cardSchema);
            const sample = new Card({name: 'Dark Magician'});
            sample.save().then((result) => console.log(result));
        }).catch((err) => 
            console.log("Error: ", err))
    }
    
}

export default populateDB;
