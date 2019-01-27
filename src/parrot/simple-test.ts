/*
    Functions for working with my parrot dront

 * Commands are easily found by reading the xml specification
 * https://github.com/Parrot-Developers/arsdk-xml/blob/master/xml/
 */

import {DroneConnection, CommandParser} from 'minidrone-js';
import {Logger} from '@bitblit/ratchet/dist/common/logger';
import {PromiseRatchet} from '@bitblit/ratchet/dist/common/promise-ratchet';


export class SimpleTest {
    private parser:CommandParser = new CommandParser();
    private drone:DroneConnection = new DroneConnection();

    private takeoff = this.parser.getCommand('minidrone', 'Piloting', 'TakeOff');
    private landing = this.parser.getCommand('minidrone', 'Piloting', 'Landing');
    private backFlip = this.parser.getCommand('minidrone', 'Animations', 'Flip', {direction: 'back'});

    constructor(){}

    public async run(): Promise<void> {
        this.drone.on('connected',  async () => {
            await this.runCommand(this.takeoff, 2000);
            await this.runCommand(this.backFlip, 4000);
            await this.runCommand(this.landing, 5000);
            process.exit;
        });
    }

    public async runCommand(cmd: any, delay:number=1000): Promise<void>{
        Logger.info('Running %j', cmd);
        this.drone.runCommand(cmd);
        await PromiseRatchet.createTimeoutPromise('Wait',delay, true, false);
    }


}
