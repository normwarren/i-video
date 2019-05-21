module.exports = {
  getVideos: (req, res) => {
    const db = req.app.get("db");
    db.getVideoProducts().then(data => {
      res.status(200).send(data);
    });
  }
};
