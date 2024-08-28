import main from 'dotenv'

main.config();

export const  CONN_STRX = process.env.CONN_STRX || "mongodb+srv://katamansokirk:WtuUySmSk9XDMklM@cluster0.4pi6n18.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
export const  DEV_CONN_STRX = process.env.DEV_CONN_STRX ||"mongodb://localhost:27017/task-tribe"
export const  PORT = process.env.PORT
export const  JWT_SECRET = process.env.JWT_SECRET

export const ENV_TYPE = "Development"
export const PAGESIZE = 50