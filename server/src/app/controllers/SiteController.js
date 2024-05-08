class SiteController {
    home(req, res) {
        res.send('hello home!');
    }

    statistic(req, res) {
        res.send('statistic')
    }
}

module.exports = new SiteController;
