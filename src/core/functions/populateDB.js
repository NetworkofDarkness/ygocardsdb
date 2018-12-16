import axios from "axios";
import Database from "../../db/connect";
import cardSchema from "../../db/schemas/card";

const database = new Database();

class populateDB {
    run(){
        axios.get("https://db.ygoprodeck.com/api/v2/cardinfo.php").then((response) => {
            
            database.connect().then((conn) => {
                const Card = conn.model('card', cardSchema);
                Card.insertMany(response.data[0])
                .then(() => console.log("Insert Response Succesfully to " + Card.collection.collectionName))
                .catch((error) => console.log(error))
            })
            .then((result) => console.log("Create cards succesfully"))
            .catch((err) => 
console.log("Error: ", err))
        })
    }
    
}

export default populateDB;
