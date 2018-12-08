import { Character } from "./lib/character";
import {
  CharacterManager,
  ICharacterJoinEvent,
  ICharacterPartEvent,
  ICharacterPositionEvent,
  ICharacterRotationEvent,
  ICharacterUsernameEvent,
} from "./lib/character-manager";
import { socketHost, socketPath } from "./lib/config";
import { isValidBoundedVector3Component, isValidUsername } from "./lib/formats";

@Component('fallInPosition')
export class FallInPosition {
  y: number
  progress: number
  settled: boolean
  constructor(){
    this.y = defaultTileY
    this.progress = 0
    this.settled = false
  }
}

const fallInObjects = engine.getComponentGroup(FallInPosition)

@Component('slideDoor')
export class SlideDoor {
  progress: number = 0
  closed: boolean = true
}

const doors = engine.getComponentGroup(SlideDoor)

@Component('tileColor')
export class TileColor {
 color: Material
}

const tiles = engine.getComponentGroup(TileColor)

////////////////////////////



/////////////////////////////


//
// the grid tiles on the ground are 5x5 of 2x2 tiles
//

const gridMin = 0;
const gridMax = 5;

// height at which objects appear before falling in

const defaultTileY = 10

// const ghostArc = 170;
// const ghostRadius = 0.6;
// const ghostScale = { x: 1, y: 0.5, z: 1 };
// const ghostColor = "#EFEFEF";


//
// use the same text for everything
//

const textFontFamily = "monospace";
const textColor = Color3.FromHexString("#FFFFFF")
const textInputColor = Color3.FromHexString("#000000")
const textOutlineColor = Color3.FromHexString("#000000")
const textOutlineWidth = 1;
const usernameValidBackground = Color3.FromHexString("#FFFFFF")
const usernameInvalidBackground = Color3.FromHexString("#FFCCCC")

// Materials

let signMaterial = new Material()
signMaterial.ambientColor = Color3.FromHexString("#000510")
signMaterial.hasAlpha = false

let wallMaterial = new Material()
signMaterial.ambientColor = Color3.FromHexString("#000510")
signMaterial.hasAlpha = true
signMaterial.alpha = 0.99
signMaterial.transparencyMode = 2

let doorMaterial = new Material()
doorMaterial.ambientColor = Color3.FromHexString("#000510")
doorMaterial.hasAlpha = true
doorMaterial.alpha = 0.6
doorMaterial.transparencyMode = 2









/**
 * Instantiate the tiles just above the board
 */
for (let a = gridMin; a < gridMax; a += 1) {
  for (let b = gridMin; b < gridMax; b += 1) {

    let tile = new Entity()
    tile.add(new PlaneShape())
    tile.add(new Transform())
    tile.get(Transform).position.set(a * 2 + 1, defaultTileY, b * 2 + 1)
    tile.get(Transform).scale.set(2,0.1,2)
    tile.set(new FallInPosition())
    tile.set(new TileColor())


    engine.addEntity(tile)
  }
}



//////////////////////
// Helper functions

/**
 * Pythagoras' theorem implementation
 *
 * Note: It uses {x,z} not {x,y}. The y-coordinate is how high up it is.
 */
function distance(pos1: Vector3, pos2: Vector3): number {
  const a = pos1.x - pos2.x;
  const b = pos1.z - pos2.z;
  return Math.sqrt(a * a + b * b);
}

/**
 * Returns true if the character is inside the configured bounds, 0 to 10
 *
 * See ./config.ts
 */
const charInBounds = (char: Character) =>
  isValidBoundedVector3Component(char.position) === true;

//
// CharacterManager holds information about the other characters
//
const characterManager = new CharacterManager();

// representing the viewer of this scene
let character = new Character();


/////////////////////////
// Scenery


let billboardBox = new Entity()
billboardBox.set(new Transform())
billboardBox.get(Transform).position.set(5, 4, 9)
billboardBox.get(Transform).scale.set(4, 1.5, 0.01)
billboardBox.get(Transform).rotation.eulerAngles = new Vector3(-50, 0, 0)
billboardBox.set(new PlaneShape())
billboardBox.set(signMaterial)
engine.addEntity(billboardBox)

let leftWall = new Entity()
leftWall.set(new Transform())
leftWall.get(Transform).position.set(2, 10, 0.5)
leftWall.set(new BoxShape())
leftWall.get(BoxShape).withCollisions = true
leftWall.set(new FallInPosition())
leftWall.set(wallMaterial)
engine.addEntity(leftWall)

let rightWall = new Entity()
rightWall.set(new Transform())
rightWall.get(Transform).position.set(8, 10, 0.5)
rightWall.set(new BoxShape())
rightWall.get(BoxShape).withCollisions = true
rightWall.set(new FallInPosition())
rightWall.set(wallMaterial)
engine.addEntity(rightWall)

let door = new Entity()
door.set(new Transform())
door.get(Transform).position.set(8, 10, 0.5)
door.set(new BoxShape())
door.get(BoxShape).withCollisions = true
door.set(new FallInPosition())
door.set(doorMaterial)
engine.addEntity(door)


//// Username editor

let background = new Entity()
background.set(new Transform)
background.get(Transform).position.set(5, 1, 9.5)
background.get(Transform).scale.set(1.5, 0.8, 0.01)
background.get(Transform).rotation.eulerAngles = new Vector3(30, 0 0)
background.set(signMaterial)
background.set(new FallInPosition())
background.get(BoxShape).withCollisions = true
engine.addEntity(background)

let message = new Entity()
message.setParent(background)
message.set(new Transform)
message.get(Transform).position.set(0, 0.3, 0)
message.set(new TextShape("Change your username"))
message.get(TextShape).fontFamily = textFontFamily
message.get(TextShape).color = textColor
message.get(TextShape).outlineColor = textOutlineColor
message.get(TextShape).outlineWidth = textOutlineWidth
message.get(TextShape).fontSize = 50
message.get(TextShape).width = 1.5
message.get(TextShape).height = 0.4
engine.addEntity(message)

let textBox = new Entity()
textBox.setParent(background)
textBox.set(new Transform)
textBox.get(Transform).position.set(0, 0.3, 0)
textBox.set(new TextShape())
textBox.get(TextShape).fontFamily = textFontFamily
textBox.get(TextShape).color = textColor
textBox.get(TextShape).outlineColor = textOutlineColor
textBox.get(TextShape).outlineWidth = textOutlineWidth
textBox.get(TextShape).fontSize = 50
textBox.get(TextShape).width = 1.5
textBox.get(TextShape).height = 0.4
engine.addEntity(textBox)