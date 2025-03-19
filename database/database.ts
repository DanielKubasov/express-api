import pg from 'pg';

import {config} from '../config/config';

console.log(config.DATABASE_CONNECTION);

const Pool = new pg.Pool({connectionString: config.DATABASE_CONNECTION});

export default Pool;
