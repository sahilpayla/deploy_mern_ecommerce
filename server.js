import express from "express";
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from "morgan";
import { connect } from "./config/db.js";
import cors from 'cors';
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoute.js';
import path from "path";
import { fileURLToPath } from "url";


// configure dotenv 
dotenv.config();

// database config
connect();

// ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const port = process.env.PORT || 4001 ;


// middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "./client/build")));


// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)



app.get('/', (req, res) => {
   res.send( "<h1> Hello World </h1>" );
})

app.listen(port, () => {
   console.log(`Server is running at ${port}`.bgBlue)
})