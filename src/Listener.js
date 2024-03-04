const autoBind = require("auto-bind");

class Listener {
  constructor(PlaylistsService, mailSender) {
    this._playlistsService = PlaylistsService;
    this._mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    try {
      const { targetEmail, playlistId } = JSON.parse(
        message.content.toString()
      );
      const playlist = await this._playlistsService.getPlaylistsById(
        playlistId
      );
      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlist)
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = Listener;
