import { boundsMax, boundsMin } from "./config";

const validIdPattern = /^character-\d{5,20}$/;
const validUsernamePattern = /^[0-9a-zA-Z\-\_\.\ ]{3,20}$/;
import { Vector3 } from "decentraland-ecs"

/**
 * Generate a random id for the character
 * @returns {string}
 */
export const randomId = (): string => {
  const randPart: string = Math.random()
    .toString()
    .substring(2, 8);
  return `character-${randPart}`;
};

/**
 * True if valid id
 */
export const isValidId = (id: string): boolean =>
  validIdPattern.test(id) === true;

/**
 * Check if the user input is a valid username
 */
export const isValidUsername = (username: string): boolean =>
  validUsernamePattern.test(username) === true;

/**
 * An actual JS number excluding NaN and Intinity
 */
export const isValidNumber = (num: number) =>
  // numeric
  isNaN(num) === false &&
  // not infinity, not NaN
  isFinite(num) === true;

/**
 * True when the value is a number within our configured bounds
 */
export const isValidBoundedNumber = (num: number): boolean =>
  isValidNumber(num) === true &&
  // and it's within our square
  num >= boundsMin &&
  num <= boundsMax;

/**
 * Returns true if the Vector3Component has valid coordinates
 */
export const isValidVector3Component = (v3: Vector3): boolean =>
  isValidNumber(v3.x) === true &&
  isValidNumber(v3.y) === true &&
  isValidNumber(v3.z) === true;

/**
 * Validates a Vector3Component as being in bounds
 */
export const isValidBoundedVector3Component = (v3: Vector3): boolean =>
  isValidBoundedNumber(v3.x) === true &&
  isValidBoundedNumber(v3.y) === true &&
  isValidBoundedNumber(v3.z) === true;

/**
 * Clamp a number to the configured bounds
 */
export function clampNumber(num: number){
  if(num < boundsMin){ return 0}
  if (num > boundsMax){return 10}
  return num
}

/**
 * Limit the {x,y,z} of a Vector3Component object to the configured bounds
 */
export const clampVector3 = (v3: Vector3): Vector3 => new Vector3(
  clampNumber(v3.x),
  clampNumber(v3.y),
  clampNumber(v3.z)
  )



