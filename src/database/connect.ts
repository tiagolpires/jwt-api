import { createConnection } from 'typeorm'
    
createConnection()
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))