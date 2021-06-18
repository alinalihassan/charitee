import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import Country from '../../../backend/src/models/Country';
import { ICountry } from '../../../backend/src/models/Interfaces';
import { CallbackError } from 'mongoose';
 
interface CountryCsvRow {
    Name: string;
    Code: string;
}

async function insertCountries() {
    fs.createReadStream(path.resolve(__dirname, '../../data/', 'countries.csv'))
    .pipe(csv.parse({ headers: true }))
    .pipe(
        csv.format<CountryCsvRow, CountryCsvRow>({ headers: true }),
    )
    // Using the transform function from the formatting stream
    .transform((row, next): void => {
        new Country({
            name: row.Name,
            countryCode: row.Code
        }).save((err: CallbackError, doc: ICountry) => {});
        next();
    })
    .pipe(process.stdout)
    .on('end', () => {
        process.exit()
    });
}

export default insertCountries;