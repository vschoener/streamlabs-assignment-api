const axios = require('axios');

module.exports = (apiKey) => {
    const googleBaseURL = 'https://www.googleapis.com/youtube/v3';

    return {
        fetchLiveTopVideos: () => {
            return axios.get(`${googleBaseURL}/search`, {
                params: {
                    key: apiKey,
                    part: 'snippet',
                    eventType: 'live',
                    type: 'video',
                    order: 'viewCount'
                }
            }).then((response) => {
                let result = [];

                response.data.items.forEach((element) => {
                    result.push({
                        videoId: element.id.videoId,
                        channelId: element.snippet.channelId,
                        title: element.snippet.title,
                        description: element.snippet.description,
                        publishedAt: element.snippet.publishedAt,
                    });
                });
                return result;
            });
        },
        fetchLiveVideoAnalytic: (videoId) => {
            return axios.get(`${googleBaseURL}/videos`, {
                params: {
                    key: apiKey,
                    id:  videoId,
                    part: 'liveStreamingDetails,statistics'
                }
            }).then(response => {
                const videoInfo = response.data.items[0];
                if (videoInfo === undefined) {
                    throw new Error('No video detail available');
                }

                return {
                    statistics: videoInfo.statistics,
                    liveStreamingDetails: videoInfo.liveStreamingDetails
                };
            });
        },
        fetchLiveChatMessages: (liveChatId) => {
            return axios.get(`${googleBaseURL}/liveChat/messages`, {
                params: {
                    key: apiKey,
                    liveChatId,
                    part: 'snippet,authorDetails'
                }
            }).then(response => {
                let messages = [];

                response.data.items.forEach(item => {
                    messages.push({
                        author: item.authorDetails.displayName,
                        channelUrl: item.authorDetails.channelUrl,
                        publishedAt: item.snippet.publishedAt,
                        displayMessage: item.snippet.displayMessage
                    });
                });

                return {
                    messages,
                    nextCallIn: response.data.pollingIntervalMillis,
                    nextPageToken: response.data.nextPageToken
                };
            });
        }
    };
};
