// spotify.js
const mostStreamed = (records) => {
    const validRecords = records.filter(record => record.streams && !isNaN(Number(record.streams)));
    const topSong = validRecords.reduce((max, song) => 
        Number(song.streams) > Number(max.streams) ? song : max, validRecords[0]
    );
    return { ...topSong, streams: Number(topSong.streams) };
};

const getSongsByKey = (records, key) => {
    return records.filter(record => record.key && record.key.toUpperCase() === key.toUpperCase())
    .map(record => `${record.track_name.toUpperCase()} (${record.key.toUpperCase()})`);
};

const artistCounts = (records) => {
    return records.filter(record => record['artist(s)_name']).flatMap(record => record['artist(s)_name'])
    .reduce((counts, artist) => {
        counts[artist] = (counts[artist] || 0) + 1;
        return counts;
    }, {});
};

export { mostStreamed, getSongsByKey, artistCounts };

