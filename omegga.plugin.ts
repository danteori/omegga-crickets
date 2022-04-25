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
    let tickrate:number = 4000;
    // Write your plugin!
    this.omegga.on('cmd:crickets', async (speaker: string) => {
      if(Omegga.findPlayerByName(speaker).isHost()){
        if(crickets){
          crickets = false;
          Omegga.whisper(speaker, "Cricket listener has been disabled.");
        } else {
          crickets = true;
          cricketTick();
          Omegga.whisper(speaker, "Cricket listener has been enabled.");
        }
      }
    });

    const cricketTick = async () => {
      if(crickets){
        let time = await getTime();
        if(time >= 18.00 || time <= 6.00){
          Omegga.loadEnvironmentData({data:{groups:{Ambience:{selectedAmbienceTypeInt:4}}}})
        } else {
          Omegga.loadEnvironmentData({data:{groups:{Ambience:{selectedAmbienceTypeInt:0}}}})
        }
        setTimeout(async () => {await cricketTick();}, tickrate); 
      }
      
      
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
