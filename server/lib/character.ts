
import { randomId } from "./formats";
import { Vector3 } from "decentraland-ecs"

/**
 * Representing a user in the scene. It is used both for
 * the user viewing as well as all the network users.
 */
export class Character {
  public id: string = randomId();
  public username: string = "";

  public position: Vector3 = new Vector3(0, 0, 0)

  public rotation: Vector3 = new Vector3(0, 0, 0)

  constructor() {
    this.username = this.id;
  }
}
