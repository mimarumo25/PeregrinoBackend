import mongoose from "mongoose";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
        .then(db => console.info("DB conectada con exito"))
        .catch(error => console.err(error))

mongoose.connection.on("error", err => {
        console.log(err);
})