/*
    Functions for working with my parrot drone

 * Commands are easily found by reading the xml specification
 * https://github.com/Parrot-Developers/arsdk-xml/blob/master/xml/
 */

import { DroneConnection, CommandParser, DroneCommand } from "minidrone-js";
import { Logger } from "@bitblit/ratchet/dist/common/logger";
import { PromiseRatchet } from "@bitblit/ratchet/dist/common/promise-ratchet";

export class SimpleTest {
  private parser: CommandParser = new CommandParser();
  private drone: DroneConnection = new DroneConnection();

  private takeoff: DroneCommand = this.parser.getCommand(
    "minidrone",
    "Piloting",
    "TakeOff"
  );
  private landing: DroneCommand = this.parser.getCommand(
    "minidrone",
    "Piloting",
    "Landing"
  );
  private backFlip: DroneCommand = this.parser.getCommand(
    "minidrone",
    "Animations",
    "Flip",
    {
      direction: "back",
    }
  );
  private leftFlip: DroneCommand = this.parser.getCommand(
    "minidrone",
    "Animations",
    "Flip",
    {
      direction: "left",
    }
  );

  //private rotateAxis = this.parser.getCommand('minidrone', 'Animations', 'horizontal_panorama', {direction: 'left'});

  public run(): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      Logger.info("Running...");
      this.drone.on("connected", async () => {
        Logger.info("Connected");
        await this.runRoutine();
        Logger.info("Done, stopping");
        res(true);
      });
      // TODO: Does this event actually happen?
      this.drone.on("error", (err) => rej(err));
    });
  }

  public async runRoutine(): Promise<void> {
    await this.runCommand(this.takeoff, 2000);
    await this.runCommand(this.backFlip, 4000);
    await this.runCommand(this.leftFlip, 4000);
    await this.runCommand(this.landing, 5000);
  }

  public async runCommand(
    cmd: DroneCommand,
    delay: number = 1000
  ): Promise<void> {
    Logger.info("Running %j", cmd);
    await this.drone.runCommand(cmd);
    await PromiseRatchet.wait(delay);
  }
}
