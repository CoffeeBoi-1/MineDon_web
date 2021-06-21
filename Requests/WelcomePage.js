module.exports = {
  name: '',

/**
 * @param {import("express").Response} res
*/

  async execute(args, res) {
    res.sendFile("Webpages/html/welcome_page.html", {root: "./" })
  }
};