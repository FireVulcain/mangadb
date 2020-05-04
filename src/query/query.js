const QUERY = `
query {
    trending:Page(page: 1, perPage: 6) {
        media(sort: TRENDING_DESC, type: MANGA, isAdult: false) {
            ...media
        }
    }
    popular:Page(page:1, perPage:6) {
        media(sort: POPULARITY_DESC, type: MANGA, isAdult: false) {
            ...media
        }
    }
    manhwa:Page(page:1, perPage:6) {
        media(sort: POPULARITY_DESC, type: MANGA, countryOfOrigin: "KR", isAdult: false) {
            ...media
        }
    }
    top:Page(page:1, perPage:10) {
        media(sort: SCORE_DESC, type: MANGA, isAdult: false) {
            ...media
        }
    }
}

fragment media on Media {
    id title {
        userPreferred
    }
    coverImage {
        extraLarge large color
    }
    startDate {
        year month day
    }
    endDate {
        year month day
    }
    bannerImage season description type format status episodes duration chapters volumes genres isAdult averageScore popularity mediaListEntry {
        id status
    }
}

`;

export default QUERY;
