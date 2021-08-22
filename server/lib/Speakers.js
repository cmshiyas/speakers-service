const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

class SpeakersService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getNames() {
    try {
      const data = await this.getData();
      return data.map((speaker) => ({
        name: speaker.name,
        shortname: speaker.shortname,
      }));
    } catch (error) {
      return error;
    }
  }

  async getListShort() {
    try {
      const data = await this.getData();
      return data.map((speaker) => ({
        name: speaker.name,
        shortname: speaker.shortname,
        title: speaker.title,
      }));
    } catch (error) {
      return error;
    }
  }

  async getList() {
    try {
      const data = await this.getData();
      return data.map((speaker) => ({
        name: speaker.name,
        shortname: speaker.shortname,
        title: speaker.title,
        summary: speaker.summary,
      }));
    } catch (error) {
      return error;
    }
  }

  async getAllArtwork() {
    try {
      const data = await this.getData();
      const artwork = data.reduce((acc, elm) => {
        if (elm.artwork) {
          // eslint-disable-next-line no-param-reassign
          acc = [...acc, ...elm.artwork];
        }
        return acc;
      }, []);
      return artwork;
    } catch (error) {
      return error;
    }
  }

  async getSpeaker(shortname) {
    try {
      const data = await this.getData();
      const speaker = data.find((current) => current.shortname === shortname);
      if (!speaker) return null;
      return {
        title: speaker.title,
        name: speaker.name,
        shortname: speaker.shortname,
        description: speaker.description,
      };
    } catch (error) {
      return error;
    }
  }

  async getArtworkForSpeaker(shortname) {
    try {
      const data = await this.getData();
      const speaker = data.find((current) => current.shortname === shortname);
      if (!speaker || !speaker.artwork) return null;
      return speaker.artwork;
    } catch (error) {
      return error;
    }
  }

  async getData() {
    try {
      const data = await readFile(this.datafile, "utf8");
      if (!data) return [];
      return JSON.parse(data).speakers;
    } catch (error) {
      return error;
    }
  }
}

module.exports = SpeakersService;
