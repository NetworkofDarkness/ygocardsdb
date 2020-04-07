import axios from "axios";
import fs from "fs-extra";
import Database from "../../db/connect";
import cardSchema from "../../db/schemas/card";
const dbName = require('../../../config/db_config.json').dbName;

const database = new Database();

class populateDB {

    run(){
        return Promise.all([
            this.delay(1000),
            database.connect(),
            axios.get("https://db.ygoprodeck.com/api/v2/cardinfo.php"),
        ])
        .then( async ([ delay, conn, response]) => {
            try {
                const Card = conn.model('card', cardSchema, 'cards');
                const collInfo = await conn.db.listCollections({name: 'cards'}).next();
                if(collInfo) {
                    await conn.dropCollection(collInfo.name); // 'cards' Collection exists
                }
                const cards = response.data[0];
                await Card.insertMany(cards); //Add cards to 'cards' Collection
                console.log('Cards Info Added Succesfully');

                if(fs.exists("cards")){
                    await fs.remove("cards");
                }

                await fs.mkdir("cards");

                const ImageRequests = 
                cards.filter((card, i) => i < 100).map((card) => 
                    this.downloadRequest("https://ygoprodeck.com/pics/" + card.id + ".jpg", 'cards/card_' + card.id + ".jpg"))

                ImageRequests.reduce((promiseChain, currentPromise) => {
                    return promiseChain.then(chainResults => 
                        currentPromise.then(currentResult => 
                            [ ...chainResults, currentResult ])
                    )
                }, Promise.resolve([])).then(arrayOfResults => {
                    console.log(arrayOfResults);
                })

                //await Promise.all(ImageRequests)
                //.then(() => console.log("Finish"))
                //.catch((err) => console.log(err));

                //console.log(ImageRequests);

            } catch (error) {
                console.log(error);
            }
        })
        .catch((reason) => console.log(reason))
    }

    async downloadRequest(url, image_path){

        return axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'image/jpeg',
            },
        })
        .catch((err) => console.log("Request Error:", err))
        .then((response) => {
            console.log(url);
            this.save(response, image_path)
        })
        .then(async () => await this.delay(5000))
        .catch((err) => console.log("Save Error: ", err))
    }

    save(response, image_path){
        return fs.writeFileSync(image_path, response.data);
    }

    async delay(ms) {
        return await new Promise(resolve => setTimeout((x) => resolve(x), ms));
      }
}

export default populateDB;
