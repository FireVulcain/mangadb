const QUERY_HOME = `
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

const QUERY_MANGA = `
query media($id:Int, $type:MediaType, $isAdult:Boolean) {
    Media(id: $id, type: $type, isAdult: $isAdult) {
        id title {
            userPreferred romaji english native
        }
        coverImage {
            extraLarge large
        }
        bannerImage startDate {
            year month day
        }
        endDate {
            year month day
        }
        description season seasonYear type format status episodes duration chapters volumes genres synonyms source(version:2)isAdult isLocked meanScore averageScore popularity favourites hashtag countryOfOrigin isLicensed isFavourite isRecommendationBlocked nextAiringEpisode {
            airingAt timeUntilAiring episode
        }
        relations {
            edges {
                id relationType(version: 2)node {
                    id title {
                        userPreferred
                    }
                    format type status bannerImage coverImage {
                        large
                    }
                }
            }
        }
        characterPreview:characters(perPage:6, sort:[ROLE, ID]) {
            edges {
                id role voiceActors(language: JAPANESE) {
                    id name {
                        full
                    }
                    language image {
                        large
                    }
                }
                node {
                    id name {
                        full
                    }
                    image {
                        large
                    }
                }
            }
        }
        staffPreview:staff(perPage:8) {
            edges {
                id role node {
                    id name {
                        full
                    }
                    language image {
                        large
                    }
                }
            }
        }
        studios {
            edges {
                isMain node {
                    id name
                }
            }
        }
        reviewPreview:reviews(perPage:2, sort:RATING_DESC) {
            pageInfo {
                total
            }
            nodes {
                id summary rating ratingAmount user {
                    id name avatar {
                        large
                    }
                }
            }
        }
        recommendations(perPage:7, sort:RATING_DESC) {
            pageInfo {
                total
            }
            nodes {
                id rating userRating mediaRecommendation {
                    id title {
                        userPreferred
                    }
                    format type status bannerImage coverImage {
                        large
                    }
                }
                user {
                    id name avatar {
                        large
                    }
                }
            }
        }
        externalLinks {
            site url
        }
        streamingEpisodes {
            site title thumbnail url
        }
        trailer {
            id site
        }
        rankings {
            id rank type format year season allTime context
        }
        tags {
            id name description rank isMediaSpoiler isGeneralSpoiler
        }
        mediaListEntry {
            id status score
        }
        stats {
            statusDistribution {
                status amount
            }
            scoreDistribution {
                score amount
            }
        }
    }
}
`;
export { QUERY_MANGA, QUERY_HOME };
