import { Character } from "./lib/character";
import {
  CharacterManager,
  ICharacterJoinEvent,
  ICharacterPartEvent,
  ICharacterPositionEvent,
  ICharacterRotationEvent,
  ICharacterUsernameEvent,
} from "./lib/character-manager";
import { socketHost, socketPath, doorDist, pingInterval, updateInterval} from "./lib/config";
import { isValidBoundedVector3Component, isValidUsername } from "./lib/formats";

@Component('fallInPosition')
export class FallInPosition {
  finalY: number
  progress: number
  settled: boolean
  falling: boolean
  constructor(y: number){
    this.finalY = y
    this.progress = 0
    this.settled = false
    this.falling = false
  }
}

const fallingObjects = engine.getComponentGroup(FallInPosition)

@Component('slideDoor')
export class SlideDoor {
  progress: number = 0
  closed: boolean = true
  openPos: number = 4
  closedPos: number = 1.5
}

const doors = engine.getComponentGroup(SlideDoor)

@Component('tileColor')
export class TileColor {
 shadeNumber: number = 0
}

const tiles = engine.getComponentGroup(TileColor)

////////////////////////////

export class FallIntoPlace implements ISystem {
 
  update(dt: number) {
    let objects = fallingObjects.entities
    for (let i = 0; i < objects.length; i ++) {
      let state = objects[i].get(FallInPosition)
      if (state.falling == false){
        // check if the first object is not falling already
        if (!objects[0].get(FallInPosition).falling){
          objects[0].get(FallInPosition).falling = true
        }
        break
      }
      else {
        if (!state.settled){
          let transform = objects[i].get(Transform)
          state.progress += dt
          transform.position.y = Scalar.Lerp(defaultTileY, state.finalY, state.progress)
          if (state.progress > 0.1 && i != objects.length - 1){
            objects[i+1].get(FallInPosition).falling = true
          }
          if (state.progress > 1){
            state.settled = true
          }
        }
      }  
    }
  }
}

// Add system to engine
engine.addSystem(new FallIntoPlace())

export class OpenDoor implements ISystem {
 
  update(dt: number) {
    for (let door of doors.entities) {
      let state = door.get(SlideDoor)
      let transform = door.get(Transform)
      if (distance(transform.position, camera.position) < 2 ){
        state.closed = false
      } else {
        state.closed = true
      }
      //log("prog: " + state.progress + " & closed: " + state.closed)
      if (state.closed == false && state.progress < 1) {
        transform.position.y = Scalar.Lerp(state.closedPos, state.openPos, state.progress)
        state.progress += dt/2
      } else if (state.closed == true && state.progress > 0) {
        transform.position.y = Scalar.Lerp(state.closedPos, state.openPos, state.progress)
        state.progress -= dt/2
      }
    }
  }
}

// Add system to engine
engine.addSystem(new OpenDoor())

export class TileColors implements ISystem {
  update(dt: number) {
    for (let tile of tiles.entities) {
      let transform = tile.get(Transform)
      let tileData = tile.get(TileColor)
      tileData.shadeNumber = 0
      // for each character {
      let dist = distance(transform.position, camera.position)
      dist = (dist * -1) + 8
      if(dist < 0){dist = 0}
      tileData.shadeNumber += dist
      // }
      if (tileData.shadeNumber > tileMaterials.length-1){tileData.shadeNumber = tileMaterials.length-1}
      let index = Math.floor(tileData.shadeNumber)
      //log(index)
      tile.set(tileMaterials[index])
    }
  }
}

// Add system to engine
engine.addSystem(new TileColors())


// send data to server



export class PingServer implements ISystem {
  update(dt: number) {
    toNextPing -= dt
    if (toNextPing<0){
      toNextPing = pingInterval
      sendMsg("character-ping")
    }
  }
}

// Add system to engine
engine.addSystem(new PingServer())


export class SendUserData implements ISystem {
  update(dt: number) {
    toNextUpdate -= dt
    if (toNextPing<0){
      sendPos()
      toNextUpdate = updateInterval
    }
  }
}

// Add system to engine
engine.addSystem(new SendUserData())


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

let toNextPing = pingInterval
let toNextUpdate = updateInterval


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

let tileColors = ["#FCFDFD","#F2F3F4", "#E5E7E9", "#D7DBDD", "#CACFD2" ,"#A6ACAF" ,"#797D7F", "#626567"]

let tileMaterials = []

for( let i = 0; i < tileColors.length ; i++){
  let material = new Material()
  material.albedoColor = Color3.FromHexString(tileColors[i])
  tileMaterials.push(material)
}







/**
 * Instantiate the tiles just above the board
 */
for (let a = gridMin; a < gridMax; a += 1) {
  for (let b = gridMin; b < gridMax; b += 1) {

    let tile = new Entity()
    tile.add(new PlaneShape())
    tile.add(new Transform())
    tile.get(Transform).position.set(a * 2 + 1, defaultTileY, b * 2 + 1)
    tile.get(Transform).rotation.eulerAngles = new Vector3(90, 0, 0)
    tile.get(Transform).scale.set(2,2,2)
    tile.set(new FallInPosition(0.25))
    tile.set(new TileColor())

    engine.addEntity(tile)
  }
}



//////////////////////
// Helper functions

// Track user position and rotation
const camera = Camera.instance


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

///////////////////////
// Character manager set up

// Create a random ID for the user

const id = Math.floor( Math.random()*1000)

/**
 * Returns true if the character is inside the configured bounds, 0 to 10
 *
 * See ./config.ts
 */
const charInBounds = (char: Character) =>
  isValidBoundedVector3Component(char.position) === true;


//CharacterManager holds information about the other characters

const characterManager = new CharacterManager();

// representing the viewer of this scene
let character = new Character();


/////////////////////////
// Scenery


let billboardBox = new Entity()
billboardBox.set(new Transform())
billboardBox.get(Transform).position.set(5, defaultTileY, 9)
billboardBox.get(Transform).scale.set(4, 1.5, 0.01)
billboardBox.get(Transform).rotation.eulerAngles = new Vector3(-50, 0, 0)
billboardBox.set(new PlaneShape())
billboardBox.set(new FallInPosition(4))
billboardBox.set(signMaterial)
engine.addEntity(billboardBox)

let leftWall = new Entity()
leftWall.set(new Transform())
leftWall.get(Transform).position.set(2, defaultTileY, 0.5)
leftWall.get(Transform).scale.set(4, 3, 0.03)
leftWall.set(new BoxShape())
leftWall.get(BoxShape).withCollisions = true
leftWall.set(new FallInPosition(1))
leftWall.set(wallMaterial)
engine.addEntity(leftWall)

let rightWall = new Entity()
rightWall.set(new Transform())
rightWall.get(Transform).position.set(8, defaultTileY, 0.5)
rightWall.get(Transform).scale.set(4, 3, 0.03)
rightWall.set(new BoxShape())
rightWall.get(BoxShape).withCollisions = true
rightWall.set(new FallInPosition(1))
rightWall.set(wallMaterial)
engine.addEntity(rightWall)

let door = new Entity()
door.set(new Transform())
door.get(Transform).position.set(5, defaultTileY, 0.5)
door.get(Transform).scale.set(2, 3, 0.01)
door.set(new BoxShape())
door.get(BoxShape).withCollisions = true
door.set(new FallInPosition(1.5))
door.set(new SlideDoor())
door.set(doorMaterial)
engine.addEntity(door)


//// Username editor

let background = new Entity()
background.set(new Transform())
background.get(Transform).position.set(5, defaultTileY, 9.5)
background.get(Transform).scale.set(1.5, 0.8, 0.01)
background.get(Transform).rotation.eulerAngles = new Vector3(30, 0, 0)
background.set(signMaterial)
background.set(new PlaneShape())
background.set(new FallInPosition(1))
background.get(PlaneShape).withCollisions = true
engine.addEntity(background)

let message = new Entity()
message.setParent(background)
message.set(new Transform())
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
textBox.set(new Transform())
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



//////////////////////////////

//Websockets


// socketHost defined in config file
var socket = new WebSocket(socketHost)

socket.onmessage = function(event) {
  log("WebSocket message received:", event)
}

sendMsg("character-join")

function sendMsg(message:string) {
  // Construct a msg object containing the data the server needs to process the message from the chat client.
  var msg = {
    message: message,
    id: id,
    date: Date.now()
  };

  // Send the msg object as a JSON-formatted string.
  socket.send(JSON.stringify(msg));
}

function sendPos() {
  // Construct a msg object containing the data the server needs to process the message from the chat client.
  var msg = {
    message: "character-pos",
    id: id,
    pos: camera.position,
    rot: camera.rotation,
    date: Date.now()
  };

  // Send the msg object as a JSON-formatted string.
  socket.send(JSON.stringify(msg));
}