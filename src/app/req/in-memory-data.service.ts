import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const featured = {
            title: "featured",
            list: [
                {id: 11, name: 'Blade Runner 2049', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_Bladerunner.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_Bladerunner.jpg'},
                {id: 12, name: 'Murder on the Orient Express', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_MurderOrientExpress.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_MurderOrientExpress.jpg'},
                {id: 13, name: 'Wonder Woman', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_WonderWoman.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_WonderWoman.jpg'},
                {id: 14, name: 'Dunkirk', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_Dunkirk.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_Dunkirk.jpg'},
                {id: 15, name: 'Jumanji', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_Jumanji.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_Jumanji.jpg'}
            ]
        };
        const topTen = {
            title: "top ten",
            list: [
                {id: 21, name: 'The 15:17 to Paris', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_1517Paris.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_1517Paris.jpg'},
                {id: 22, name: 'Black Panther', year: '2018', genre: 'action', director: 'James Gunn', coverImage: 'Thumb_BlackPanther.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_BlackPanther.jpg'},
                {id: 23, name: 'Thor', year: '2016', genre: 'adventure', director: 'James Gunn', coverImage: 'Thumb_Thor.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_Thor.jpg'},
                {id: 24, name: 'Insidious', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_Insidious.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_Insidious.jpg'},
                {id: 25, name: 'Wonder Woman', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_WonderWoman.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_WonderWoman.jpg'},
                {id: 26, name: 'Murder on the Orient Express', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_MurderOrientExpress.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_MurderOrientExpress.jpg'},
                {id: 27, name: 'Dunkirk', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_Dunkirk.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_Dunkirk.jpg'},
                {id: 28, name: 'Blade Runner 2049', year: '2017', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_Bladerunner.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_Bladerunner.jpg'}
            ]
        };
        const mkt = {
            title: "marketing",
            list: [
                {id: 31, name: 'Pitch Perfect', year: '2012', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_PitchPerfect.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_PitchPerfect.jpg'},
                {id: 32, name: 'Winchester', year: '2012', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_Winchester.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_Winchester.jpg'},
                {id: 33, name: 'Star Wars', year: '2012', genre: 'comedy', director: 'James Gunn', coverImage: 'Thumb_StarWars.jpg', headerImage: '', pageImage: '', backgroundImage: 'Bckg_StarWars.jpg'}
            ]
        };
        const content = [];
        content.push(featured);
        content.push(topTen);
        content.push(mkt);

        return {content};
    }
}
