
import { Vector3 } from './Vector3';
/**
 * Class used to store quaternion data
 * {@link https://en.wikipedia.org/wiki/Quaternion }
 * {@link http://doc.babylonjs.com/features/position,_rotation,_scaling }
 * @public
 */
export declare class Quaternion {
    /** defines the first component (0 by default) */
    x: number;
    /** defines the second component (0 by default) */
    y: number;
    /** defines the third component (0 by default) */
    z: number;
    /** defines the fourth component (1.0 by default) */
    w: number;
    /**
     * Creates a new Quaternion from the given floats
     * @param x - defines the first component (0 by default)
     * @param y - defines the second component (0 by default)
     * @param z - defines the third component (0 by default)
     * @param w - defines the fourth component (1.0 by default)
     */
    constructor(
    /** defines the first component (0 by default) */
    x?: number, 
    /** defines the second component (0 by default) */
    y?: number, 
    /** defines the third component (0 by default) */
    z?: number, 
    /** defines the fourth component (1.0 by default) */
    w?: number);
   
    /**
     * Returns the dot product (float) between the quaternions "left" and "right"
     * @param left - defines the left operand
     * @param right - defines the right operand
     * @returns the dot product
     */
    static Dot(left: Quaternion, right: Quaternion): number;
    /**
     * Checks if the two quaternions are close to each other
     * @param quat0 - defines the first quaternion to check
     * @param quat1 - defines the second quaternion to check
     * @returns true if the two quaternions are close to each other
     */
    static AreClose(quat0: Quaternion, quat1: Quaternion): boolean;
    /**
     * Creates an empty quaternion
     * @returns a new quaternion set to (0.0, 0.0, 0.0)
     */
    static Zero(): Quaternion;
    /**
     * Inverse a given quaternion
     * @param q - defines the source quaternion
     * @returns a new quaternion as the inverted current quaternion
     */
    static Inverse(q: Quaternion): Quaternion;
    /**
     * Gets a boolean indicating if the given quaternion is identity
     * @param quaternion - defines the quaternion to check
     * @returns true if the quaternion is identity
     */
    static IsIdentity(quaternion: Quaternion): boolean;
    /**
     * Creates a quaternion from a rotation around an axis
     * @param axis - defines the axis to use
     * @param angle - defines the angle to use (in Euler degrees)
     * @returns a new quaternion created from the given axis (Vector3) and angle in radians (float)
     */
    static RotationAxis(axis: Vector3, angle: number): Quaternion;
    /**
     * Creates a rotation around an axis and stores it into the given quaternion
     * @param axis - defines the axis to use
     * @param angle - defines the angle to use (in Euler degrees)
     * @param result - defines the target quaternion
     * @returns the target quaternion
     */
    static RotationAxisToRef(axis: Vector3, angle: number, result: Quaternion): Quaternion;
    /**
     * Creates a new quaternion from data stored into an array
     * @param array - defines the data source
     * @param offset - defines the offset in the source array where the data starts
     * @returns a new quaternion
     */
    static FromArray(array: ArrayLike<number>, offset?: number): Quaternion;
    /**
     * Creates a new quaternion from a set of euler angles and stores it in the target quaternion
     */
    static FromEulerAnglesRef(x: number, y: number, z: number, result: Quaternion): void;
    /**
     * Creates a new quaternion from the given Euler float angles (y, x, z)
     * @param yaw - defines the rotation around Y axis
     * @param pitch - defines the rotation around X axis
     * @param roll - defines the rotation around Z axis
     * @returns the new quaternion
     */
    static RotationYawPitchRoll(yaw: number, pitch: number, roll: number): Quaternion;
    /**
     * Creates a new rotation from the given Euler float angles (y, x, z) and stores it in the target quaternion
     * @param yaw - defines the rotation around Y axis
     * @param pitch - defines the rotation around X axis
     * @param roll - defines the rotation around Z axis
     * @param result - defines the target quaternion
     */
    static RotationYawPitchRollToRef(yaw: number, pitch: number, roll: number, result: Quaternion): void;
    /**
     * Creates a new quaternion from the given Euler float angles expressed in z-x-z orientation
     * @param alpha - defines the rotation around first axis
     * @param beta - defines the rotation around second axis
     * @param gamma - defines the rotation around third axis
     * @returns the new quaternion
     */
    static RotationAlphaBetaGamma(alpha: number, beta: number, gamma: number): Quaternion;
    /**
     * Creates a new quaternion from the given Euler float angles expressed in z-x-z orientation and stores it in the target quaternion
     * @param alpha - defines the rotation around first axis
     * @param beta - defines the rotation around second axis
     * @param gamma - defines the rotation around third axis
     * @param result - defines the target quaternion
     */
    static RotationAlphaBetaGammaToRef(alpha: number, beta: number, gamma: number, result: Quaternion): void;
    /**
     * Creates a new quaternion containing the rotation value to reach the target (axis1, axis2, axis3) orientation as a rotated XYZ system (axis1, axis2 and axis3 are normalized during this operation)
     * @param axis1 - defines the first axis
     * @param axis2 - defines the second axis
     * @param axis3 - defines the third axis
     * @returns the new quaternion
     */
    static RotationQuaternionFromAxis(axis1: Vector3, axis2: Vector3, axis3: Vector3): Quaternion;
    /**
     * Creates a rotation value to reach the target (axis1, axis2, axis3) orientation as a rotated XYZ system (axis1, axis2 and axis3 are normalized during this operation) and stores it in the target quaternion
     * @param axis1 - defines the first axis
     * @param axis2 - defines the second axis
     * @param axis3 - defines the third axis
     * @param ref - defines the target quaternion
     */
    static RotationQuaternionFromAxisToRef(axis1: Vector3, axis2: Vector3, axis3: Vector3, ref: Quaternion): void;
    /**
     * Interpolates between two quaternions
     * @param left - defines first quaternion
     * @param right - defines second quaternion
     * @param amount - defines the gradient to use
     * @returns the new interpolated quaternion
     */
    static Slerp(left: Quaternion, right: Quaternion, amount: number): Quaternion;
    /**
     * Interpolates between two quaternions and stores it into a target quaternion
     * @param left - defines first quaternion
     * @param right - defines second quaternion
     * @param amount - defines the gradient to use
     * @param result - defines the target quaternion
     */
    static SlerpToRef(left: Quaternion, right: Quaternion, amount: number, result: Quaternion): void;
    /**
     * Interpolate between two quaternions using Hermite interpolation
     * @param value1 - defines first quaternion
     * @param tangent1 - defines the incoming tangent
     * @param value2 - defines second quaternion
     * @param tangent2 - defines the outgoing tangent
     * @param amount - defines the target quaternion
     * @returns the new interpolated quaternion
     */
    static Hermite(value1: Quaternion, tangent1: Quaternion, value2: Quaternion, tangent2: Quaternion, amount: number): Quaternion;
    /**
     * Creates an identity quaternion
     * @returns - the identity quaternion
     */
    static readonly Identity: Quaternion;
    /**
     * Returns the angle in degrees between two rotations a and b.
     * @param quat1 - defines the first quaternion
     * @param quat2 - defines the second quaternion
     */
    static Angle(quat1: Quaternion, quat2: Quaternion): number;
    /**
     * Returns a rotation that rotates z degrees around the z axis, x degrees around the x axis, and y degrees around the y axis.
     * @param x - the rotation on the x axis in euler degrees
     * @param y - the rotation on the y axis in euler degrees
     * @param z - the rotation on the z axis in euler degrees
     */
    static Euler(x: number, y: number, z: number): Quaternion;
    /**
     * Creates a rotation with the specified forward and upwards directions.
     * @param forward - the direction to look in
     * @param up - the vector that defines in which direction up is
     */
    static LookRotation(forward: Vector3, up?: Vector3): Quaternion;
    /**
     * The from quaternion is rotated towards to by an angular step of maxDegreesDelta.
     * @param from - defines the first quaternion
     * @param to - defines the second quaternion
     * @param maxDegreesDelta - the interval step
     */
    static RotateTowards(from: Quaternion, to: Quaternion, maxDegreesDelta: number): Quaternion;
    /**
     * Creates a rotation which rotates from fromDirection to toDirection.
     * @param from - defines the first Vector
     * @param to - defines the second Vector
     */
    static FromToRotation(from: Vector3, to: Vector3): Quaternion;
    /**
     * @private
     */
    private static NormalizeAngles;
    /**
     * @private
     */
    private static NormalizeAngle;
    /**
     * Gets the euler angle representation of the rotation.
     */
    /**
    * Sets the euler angle representation of the rotation.
    */
    eulerAngles: Vector3;
    /**
     * Converts this quaternion to one with the same orientation but with a magnitude of 1.
     */
    readonly normalized: Quaternion;
    /**
     * Creates a rotation which rotates from fromDirection to toDirection.
     * @param from - defines the first Vector
     * @param to - defines the second Vector
     * @param up - defines the direction
     */
    setFromToRotation(from: Vector3, to: Vector3, up?: Vector3): void;
    /**
     * Gets a string representation for the current quaternion
     * @returns a string with the Quaternion coordinates
     */
    toString(): string;
    /**
     * Gets length of current quaternion
     * @returns the quaternion length (float)
     */
    readonly length: number;
    /**
     * Gets length of current quaternion
     * @returns the quaternion length (float)
     */
    readonly lengthSquared: number;
    /**
     * Gets the class name of the quaternion
     * @returns the string "Quaternion"
     */
    getClassName(): string;
    /**
     * Gets a hash code for this quaternion
     * @returns the quaternion hash code
     */
    getHashCode(): number;
    /**
     * Copy the quaternion to an array
     * @returns a new array populated with 4 elements from the quaternion coordinates
     */
    asArray(): number[];
    /**
     * Check if two quaternions are equals
     * @param otherQuaternion - defines the second operand
     * @returns true if the current quaternion and the given one coordinates are strictly equals
     */
    equals(otherQuaternion: Quaternion): boolean;
    /**
     * Clone the current quaternion
     * @returns a new quaternion copied from the current one
     */
    clone(): Quaternion;
    /**
     * Copy a quaternion to the current one
     * @param other - defines the other quaternion
     * @returns the updated current quaternion
     */
    copyFrom(other: Quaternion): Quaternion;
    /**
     * Updates the current quaternion with the given float coordinates
     * @param x - defines the x coordinate
     * @param y - defines the y coordinate
     * @param z - defines the z coordinate
     * @param w - defines the w coordinate
     * @returns the updated current quaternion
     */
    copyFromFloats(x: number, y: number, z: number, w: number): Quaternion;
    /**
     * Updates the current quaternion from the given float coordinates
     * @param x - defines the x coordinate
     * @param y - defines the y coordinate
     * @param z - defines the z coordinate
     * @param w - defines the w coordinate
     * @returns the updated current quaternion
     */
    set(x: number, y: number, z: number, w: number): Quaternion;
    /**
     * Updates the current quaternion from the given euler angles
     * @returns the updated current quaternion
     */
    setEuler(x: number, y: number, z: number): Quaternion;
    /**
     * Subtract two quaternions
     * @param other - defines the second operand
     * @returns a new quaternion as the subtraction result of the given one from the current one
     */
    subtract(other: Quaternion): Quaternion;
    /**
     * Multiplies the current quaternion by a scale factor
     * @param value - defines the scale factor
     * @returns a new quaternion set by multiplying the current quaternion coordinates by the float "scale"
     */
    scale(value: number): Quaternion;
    /**
     * Scale the current quaternion values by a factor and stores the result to a given quaternion
     * @param scale - defines the scale factor
     * @param result - defines the Quaternion object where to store the result
     * @returns the unmodified current quaternion
     */
    scaleToRef(scale: number, result: Quaternion): Quaternion;
    /**
     * Multiplies in place the current quaternion by a scale factor
     * @param value - defines the scale factor
     * @returns the current modified quaternion
     */
    scaleInPlace(value: number): Quaternion;
    /**
     * Scale the current quaternion values by a factor and add the result to a given quaternion
     * @param scale - defines the scale factor
     * @param result - defines the Quaternion object where to store the result
     * @returns the unmodified current quaternion
     */
    scaleAndAddToRef(scale: number, result: Quaternion): Quaternion;
    /**
     * Multiplies two quaternions
     * @param q1 - defines the second operand
     * @returns a new quaternion set as the multiplication result of the current one with the given one "q1"
     */
    multiply(q1: Quaternion): Quaternion;
    /**
     * Sets the given "result" as the the multiplication result of the current one with the given one "q1"
     * @param q1 - defines the second operand
     * @param result - defines the target quaternion
     * @returns the current quaternion
     */
    multiplyToRef(q1: Quaternion, result: Quaternion): Quaternion;
    /**
     * Updates the current quaternion with the multiplication of itself with the given one "q1"
     * @param q1 - defines the second operand
     * @returns the currentupdated quaternion
     */
    multiplyInPlace(q1: Quaternion): Quaternion;
    /**
     * Conjugates (1-q) the current quaternion and stores the result in the given quaternion
     * @param ref - defines the target quaternion
     * @returns the current quaternion
     */
    conjugateToRef(ref: Quaternion): Quaternion;
    /**
     * Conjugates in place (1-q) the current quaternion
     * @returns the current updated quaternion
     */
    conjugateInPlace(): Quaternion;
    /**
     * Conjugates in place (1-q) the current quaternion
     * @returns a new quaternion
     */
    conjugate(): Quaternion;
    /**
     * Normalize in place the current quaternion
     * @returns the current updated quaternion
     */
    normalize(): Quaternion;
    /**
     * Sets the given vector3 "result" with the Euler angles translated from the current quaternion
     * @param result - defines the vector which will be filled with the Euler angles
     * @param order - is a reserved parameter and is ignore for now
     * @returns the current unchanged quaternion
     */
    toEulerAnglesToRef(result: Vector3, order?: string): Quaternion;
    angleAxis(degress: number, axis: Vector3): Quaternion;
}
