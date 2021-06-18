import got from 'got';
import Theme from '../../../backend/src/models/Theme'
import { IThemeDocument } from '../../../backend/src/models/Documents'

const insertThemes = async () => {
    var { body } = await got.get(`https://api.globalgiving.org/api/public/projectservice/themes?api_key=${process.env.GLOBALGIVING_KEY}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    var themes: Array<IThemeDocument> = JSON.parse(body)["themes"]["theme"];
    
    Theme.bulkWrite(
        themes.map((theme: IThemeDocument) => ({
            updateOne: {
                filter: { id: theme.id},
                update: { $set: theme },
                upsert: true
            }
        }))
    );
}

export default insertThemes;