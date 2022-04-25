import OmeggaPlugin, { OL, PS, PC } from 'omegga';

type Config = { foo: string };
type Storage = { bar: string };

export default class Plugin implements OmeggaPlugin<Config, Storage> {
  omegga: OL;
  config: PC<Config>;
  store: PS<Storage>;

  constructor(omegga: OL, config: PC<Config>, store: PS<Storage>) {
    this.omegga = omegga;
    this.config = config;
    this.store = store;
  }

  async init() {

    let crickets:boolean = false;
    // Write your plugin!
    this.omegga.on('cmd:crickets', async (speaker: string) => {
      if(Omegga.findPlayerByName(speaker).isHost()){
        Omegga.whisper(speaker, (await cricketTick()).toString());
        Omegga.whisper(speaker, (await getTime()).toString());
      }
    });

    const cricketTick = async () => {
      let data = await Omegga.getEnvironmentData()
      return data.data.groups.Ambience.selectedAmbienceTypeInt;
    }

    const getTime = async () => {
      let data = await Omegga.getEnvironmentData()
      return data.data.groups.Sky.timeOfDay;
    }

    return { registeredCommands: ['crickets'] }; //crickets is 4
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
