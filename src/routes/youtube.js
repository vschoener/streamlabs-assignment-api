module.exports = (apiKey) => {
    const router = require('express').Router();
    const youtube = require('../youtube/youtube')(apiKey);

    router.get('/live/topVideos', (req, res, next) => {
        youtube.fetchLiveTopVideos()
            .then((topVideo) => {
                res.json(topVideo);
            }).catch(error => next(error));
    });

    router.get('/video/:id', (req, res, next) => {
        youtube.fetchLiveVideoAnalytic(req.params.id)
            .then((topVideo) => {
                res.json(topVideo);
            }).catch(error => next(error));
    });

    router.get('/chat/:id', (req, res) => {
        return youtube.fetchLiveChatMessages(req.params.id)
            .then((chatInfo) => {
                res.json(chatInfo);
            });
    });

    return router;
};
