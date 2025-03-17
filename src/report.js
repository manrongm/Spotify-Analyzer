// report.js
import fs from 'fs';
import { parse } from 'csv-parse';
import { mostStreamed, getSongsByKey, artistCounts } from './spotify.js';
import { RootElement, RectangleElement, TextElement } from './drawing.js';

const generateArtistHistogram = (topArtists, filename) => {
    if (topArtists.length === 0) {return;}
    const width = 600;
    const barWidth = 140;
    const maxHeight = 300;
    const maxCount = topArtists[0][1];
    const colors = ["orange", "blue", "green"];
    const svg = new RootElement();
    svg.addAttrs({ width, height: maxHeight + 80 });
    topArtists.reduce((_, [artist, count], index) => {
        const barHeight = (count / maxCount) * maxHeight;
        const x = index * (barWidth + 40) + 50;
        const y = maxHeight - barHeight + 20;
        const bar = new RectangleElement(x, y, barWidth, barHeight, colors[index]);
        const label = new TextElement(x + barWidth / 2, maxHeight + 50, 18, "black", `${artist}, ${count}`);
        label.addAttr("text-anchor", "middle");
        svg.addChild(bar);
        svg.addChild(label);
        return null;
    }, null);
    svg.write(filename, () => {});
};

const filePath = process.argv[2];
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {return;}
    parse(data, { trim: true }, (err, parsedData) => {
        if (err) {return;}
        let records = parsedData.slice(1).map(row => {
            const headers = parsedData[0];
            return headers.reduce((obj, header, index) => {
                obj[header] = row[index];
                return obj;
            }, {});
        });
        records = records.map(song => ({...song,'artist(s)_name': song['artist(s)_name'].split(',').map(artist => artist.trim())
        })).map(record => ({...record, streams: Number(record.streams) || 0, artist_count: record.artist_count || 0,
            bpm: record.bpm || 0
        }));
        console.log(mostStreamed(records));
        console.log(getSongsByKey(records, 'D#'));
        const artistFrequency = artistCounts(records);
        const topArtists = Object.entries(artistFrequency).sort((a, b) => b[1] - a[1]).slice(0, 3);
        console.log(Object.fromEntries(topArtists));
        generateArtistHistogram(topArtists, 'artists.svg');
    });
});
