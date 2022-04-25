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
    // Write your plugin!
    this.omegga.on('cmd:crickets', async (speaker: string) => {
      if(Omegga.findPlayerByName(speaker).isHost()){
        Omegga.middlePrint(speaker, (await cricketTick()).toString());
      }
    });

    const cricketTick = async () => {
      let data = await Omegga.getEnvironmentData()
      return data.data.groups.Ambience.selectedAmbienceTypeInt;
    }

    return { registeredCommands: ['test'] };
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
