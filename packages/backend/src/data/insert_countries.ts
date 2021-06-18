import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import Country from '../models/Country';
 
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
        }).save(function(err: Error) {});
        next();
    })
    .pipe(process.stdout)
    .on('end', () => {
        process.exit()
    });
    console.log("Inserted Countries");
}

export default insertCountries;