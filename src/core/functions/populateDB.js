import axios from "axios";
import fileSaver from "file-saver";
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
                        if(fs.exists("/cards")){
                            this.deleteFolderRecursive("/cards");
                        } else {
                            fs.mkdirSync("/cards");
                        }

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
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'image/jpeg',
              },
        })
        .then(response => {
            // response.data is an empty object

            //response.data.pipe(fs.createWriteStream( image_path ))
            fs.writeFile(image_path, response.data, (err) => {
                console.log(err);
            });
            //writeFileSync(image_path, response.data);

            return { 'status' : true, 'error' : '' };
        })
        .catch(error => 
            ( { 'status' : false, 'error' : 'Error: ' + error.message }));
    }

    deleteFolderRecursive(path) {
        if (fs.existsSync(path)) {
          fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
            } else { // delete file
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(path);
        }
      };
}

export default populateDB;
