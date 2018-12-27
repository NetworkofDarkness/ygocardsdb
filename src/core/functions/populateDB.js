import axios from "axios";
import fs from "fs";
import Database from "../../db/connect";
import cardSchema from "../../db/schemas/card";
const dbName = require('../../../config/db_config.json').dbName;

const database = new Database();

class populateDB {

    run(){
        return Promise.all([
            new Promise((resolve) =>  setTimeout(resolve, 50)),
            database.connect(),
            axios.get("https://db.ygoprodeck.com/api/v2/cardinfo.php"),
        ])
        .then( async ([ delay, conn, response]) => {
            try {
                const Card = conn.model('card', cardSchema, 'cards');
                await conn.db.listCollections({name: 'cards'}).next()
                    .then((collInfo) => {
                        if(collInfo) {
                            conn.dropCollection(collInfo.name); // 'cards' Collection exists
                        }
                        const cards = response.data[0];

                        Card.insertMany(cards); //Add cards to 'cards' Collection
                        console.log('Cards Info Added Succesfully');

                        return cards;
                    })
                    .then((cards) => {
                        const id = cards.map(card => {
                            this.downloadImage("https://ygoprodeck.com/pics/" + card.id + ".jpg", 'cards/card_' + card.id + ".jpg");
                        });
                    })
            } catch (error) {
                console.log(error);
            }
        })
        .catch((reason) => console.log(reason))
    }

    downloadImage(url, image_path){
        axios.get(url, {
            responseType: 'blob'
        })
        .then(response => {
            fs.writeFile(image_path, response.data, (err) => {
                if(err) console.log(err)
            });
            //response.data.pipe(fs.createWriteStream( image_path ));
            return { 'status' : true, 'error' : '' };
        })
        .catch(error => 
            ( { 'status' : false, 'error' : 'Error: ' + error.message }));
    }
}

export default populateDB;
