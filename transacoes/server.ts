import { config } from "dotenv"; 
import app from './app'

config({path:__dirname+'/./../../.env'});

app.listen(process.env.PORT)
