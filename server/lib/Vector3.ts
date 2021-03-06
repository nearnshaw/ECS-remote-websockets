
import { Quaternion } from './Quaternion';
export declare type ReadOnlyVector3 = {
    readonly y: number;
    readonly x: number;
    readonly z: number;
};
/**
 * Classed used to store (x,y,z) vector representation
 * A Vector3 is the main object used in 3D geometry
 * It can represent etiher the coordinates of a point the space, either a direction
 * Reminder: Babylon.js uses a left handed forward facing system
 * @public
 */
export declare class Vector3 {
    /**
     * Defines the first coordinates (on X axis)
     */
    x: number;
    /**
     * Defines the second coordinates (on Y axis)
     */
    y: number;
    /**
     * Defines the third coordinates (on Z axis)
     */
    z: number;
    /**
     * Gets a boolean indicating that the vector is non uniform meaning x, y or z are not all the same
     */
    readonly isNonUniform: boolean;
    /**
     * Creates a new Vector3 object from the given x, y, z (floats) coordinates.
     * @param x - defines the first coordinates (on X axis)
     * @param y - defines the second coordinates (on Y axis)
     * @param z - defines the third coordinates (on Z axis)
     */
    constructor(
    /**
     * Defines the first coordinates (on X axis)
     */
    x?: number, 
    /**
     * Defines the second coordinates (on Y axis)
     */
    y?: number, 
    /**
     * Defines the third coordinates (on Z axis)
     */
    z?: number);
    /**
     * Returns a new Vector3 as the result of the addition of the two given vectors.
     * @param vector1 - the first vector
     * @param vector2 - the second vector
     * @returns the resulting vector
     */
    static Add(vector1: ReadOnlyVector3, vector2: ReadOnlyVector3): Vector3;
    /**
     * Get the clip factor between two vectors
     * @param vector0 - defines the first operand
     * @param vector1 - defines the second operand
     * @param axis - defines the axis to use
     * @param size - defines the size along the axis
     * @returns the clip factor
     */
    static GetClipFactor(vector0: ReadOnlyVector3, vector1: ReadOnlyVector3, axis: ReadOnlyVector3, size: number): number;
    /**
     * Get angle between two vectors
     * @param vector0 - angle between vector0 and vector1
     * @param vector1 - angle between vector0 and vector1
     * @param normal - direction of the normal
     * @returns the angle between vector0 and vector1
     */
    static GetAngleBetweenVectors(vector0: Vector3, vector1: Vector3, normal: ReadOnlyVector3): number;
    /**
     * Returns a new Vector3 set from the index "offset" of the given array
     * @param array - defines the source array
     * @param offset - defines the offset in the source array
     * @returns the new Vector3
     */
    static FromArray(array: ArrayLike<number>, offset?: number): Vector3;

    /**
     * Sets the given vector "result" with the element values from the index "offset" of the given array
     * @param array - defines the source array
     * @param offset - defines the offset in the source array
     * @param result - defines the Vector3 where to store the result
     */
    static FromArrayToRef(array: ArrayLike<number>, offset: number, result: Vector3): void;

    /**
     * Sets the given vector "result" with the given floats.
     * @param x - defines the x coordinate of the source
     * @param y - defines the y coordinate of the source
     * @param z - defines the z coordinate of the source
     * @param result - defines the Vector3 where to store the result
     */
    static FromFloatsToRef(x: number, y: number, z: number, result: Vector3): void;
    /**
     * Returns a new Vector3 set to (0.0, 0.0, 0.0)
     * @returns a new empty Vector3
     */
    static Zero(): Vector3;
    /**
     * Returns a new Vector3 set to (1.0, 1.0, 1.0)
     * @returns a new unit Vector3
     */
    static One(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, 1.0, 0.0)
     * @returns a new up Vector3
     */
    static Up(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, -1.0, 0.0)
     * @returns a new down Vector3
     */
    static Down(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, 0.0, 1.0)
     * @returns a new forward Vector3
     */
    static Forward(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, 0.0, -1.0)
     * @returns a new forward Vector3
     */
    static Backward(): Vector3;
    /**
     * Returns a new Vector3 set to (1.0, 0.0, 0.0)
     * @returns a new right Vector3
     */
    static Right(): Vector3;
    /**
     * Returns a new Vector3 set to (-1.0, 0.0, 0.0)
     * @returns a new left Vector3
     */
    static Left(): Vector3;
    /**
     * Returns a new Vector3 located for "amount" on the CatmullRom interpolation spline defined by the vectors "value1", "value2", "value3", "value4"
     * @param value1 - defines the first control point
     * @param value2 - defines the second control point
     * @param value3 - defines the third control point
     * @param value4 - defines the fourth control point
     * @param amount - defines the amount on the spline to use
     * @returns the new Vector3
     */
    static CatmullRom(value1: ReadOnlyVector3, value2: ReadOnlyVector3, value3: ReadOnlyVector3, value4: ReadOnlyVector3, amount: number): Vector3;
    /**
     * Returns a new Vector3 set with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
     * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
     * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
     * @param value - defines the current value
     * @param min - defines the lower range value
     * @param max - defines the upper range value
     * @returns the new Vector3
     */
    static Clamp(value: ReadOnlyVector3, min: ReadOnlyVector3, max: ReadOnlyVector3): Vector3;
    /**
     * Sets the given vector "result" with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
     * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
     * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
     * @param value - defines the current value
     * @param min - defines the lower range value
     * @param max - defines the upper range value
     * @param result - defines the Vector3 where to store the result
     */
    static ClampToRef(value: ReadOnlyVector3, min: ReadOnlyVector3, max: ReadOnlyVector3, result: Vector3): void;
    /**
     * Returns a new Vector3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
     * @param value1 - defines the first control point
     * @param tangent1 - defines the first tangent vector
     * @param value2 - defines the second control point
     * @param tangent2 - defines the second tangent vector
     * @param amount - defines the amount on the interpolation spline (between 0 and 1)
     * @returns the new Vector3
     */
    static Hermite(value1: ReadOnlyVector3, tangent1: ReadOnlyVector3, value2: ReadOnlyVector3, tangent2: ReadOnlyVector3, amount: number): Vector3;
    /**
     * Returns a new Vector3 located for "amount" (float) on the linear interpolation between the vectors "start" and "end"
     * @param start - defines the start value
     * @param end - defines the end value
     * @param amount - max defines amount between both (between 0 and 1)
     * @returns the new Vector3
     */
    static Lerp(start: ReadOnlyVector3, end: ReadOnlyVector3, amount: number): Vector3;
    /**
     * Sets the given vector "result" with the result of the linear interpolation from the vector "start" for "amount" to the vector "end"
     * @param start - defines the start value
     * @param end - defines the end value
     * @param amount - max defines amount between both (between 0 and 1)
     * @param result - defines the Vector3 where to store the result
     */
    static LerpToRef(start: ReadOnlyVector3, end: ReadOnlyVector3, amount: number, result: Vector3): void;
    /**
     * Returns the dot product (float) between the vectors "left" and "right"
     * @param left - defines the left operand
     * @param right - defines the right operand
     * @returns the dot product
     */
    static Dot(left: ReadOnlyVector3, right: ReadOnlyVector3): number;
    /**
     * Returns a new Vector3 as the cross product of the vectors "left" and "right"
     * The cross product is then orthogonal to both "left" and "right"
     * @param left - defines the left operand
     * @param right - defines the right operand
     * @returns the cross product
     */
    static Cross(left: ReadOnlyVector3, right: ReadOnlyVector3): Vector3;
    /**
     * Sets the given vector "result" with the cross product of "left" and "right"
     * The cross product is then orthogonal to both "left" and "right"
     * @param left - defines the left operand
     * @param right - defines the right operand
     * @param result - defines the Vector3 where to store the result
     */
    static CrossToRef(left: ReadOnlyVector3, right: ReadOnlyVector3, result: Vector3): void;
    /**
     * Returns a new Vector3 as the normalization of the given vector
     * @param vector - defines the Vector3 to normalize
     * @returns the new Vector3
     */
    static Normalize(vector: Vector3): Vector3;
    /**
     * Sets the given vector "result" with the normalization of the given first vector
     * @param vector - defines the Vector3 to normalize
     * @param result - defines the Vector3 where to store the result
     */
    static NormalizeToRef(vector: Vector3, result: Vector3): void;
    /**
     * Gets the minimal coordinate values between two Vector3
     * @param left - defines the first operand
     * @param right - defines the second operand
     * @returns the new Vector3
     */
    static Minimize(left: ReadOnlyVector3, right: ReadOnlyVector3): Vector3;
    /**
     * Gets the maximal coordinate values between two Vector3
     * @param left - defines the first operand
     * @param right - defines the second operand
     * @returns the new Vector3
     */
    static Maximize(left: Vector3, right: Vector3): Vector3;
    /**
     * Returns the distance between the vectors "value1" and "value2"
     * @param value1 - defines the first operand
     * @param value2 - defines the second operand
     * @returns the distance
     */
    static Distance(value1: ReadOnlyVector3, value2: ReadOnlyVector3): number;
    /**
     * Returns the squared distance between the vectors "value1" and "value2"
     * @param value1 - defines the first operand
     * @param value2 - defines the second operand
     * @returns the squared distance
     */
    static DistanceSquared(value1: ReadOnlyVector3, value2: ReadOnlyVector3): number;
    /**
     * Returns a new Vector3 located at the center between "value1" and "value2"
     * @param value1 - defines the first operand
     * @param value2 - defines the second operand
     * @returns the new Vector3
     */
    static Center(value1: ReadOnlyVector3, value2: ReadOnlyVector3): Vector3;
    /**
     * Given three orthogonal normalized left-handed oriented Vector3 axis in space (target system),
     * RotationFromAxis() returns the rotation Euler angles (ex : rotation.x, rotation.y, rotation.z) to apply
     * to something in order to rotate it from its local system to the given target system
     * Note: axis1, axis2 and axis3 are normalized during this operation
     * @param axis1 - defines the first axis
     * @param axis2 - defines the second axis
     * @param axis3 - defines the third axis
     * @returns a new Vector3
     */
    static RotationFromAxis(axis1: Vector3, axis2: Vector3, axis3: Vector3): Vector3;
    /**
     * The same than RotationFromAxis but updates the given ref Vector3 parameter instead of returning a new Vector3
     * @param axis1 - defines the first axis
     * @param axis2 - defines the second axis
     * @param axis3 - defines the third axis
     * @param ref - defines the Vector3 where to store the result
     */
    static RotationFromAxisToRef(axis1: Vector3, axis2: Vector3, axis3: Vector3, ref: Vector3): void;
    /**
     * Creates a string representation of the Vector3
     * @returns a string with the Vector3 coordinates.
     */
    toString(): string;
    /**
     * Gets the class name
     * @returns the string "Vector3"
     */
    getClassName(): string;
    /**
     * Creates the Vector3 hash code
     * @returns a number which tends to be unique between Vector3 instances
     */
    getHashCode(): number;
    /**
     * Creates an array containing three elements : the coordinates of the Vector3
     * @returns a new array of numbers
     */
    asArray(): number[];

    /**
     * Converts the current Vector3 into a quaternion (considering that the Vector3 contains Euler angles representation of a rotation)
     * @returns a new Quaternion object, computed from the Vector3 coordinates
     */
    toQuaternion(): Quaternion;
    /**
     * Adds the given vector to the current Vector3
     * @param otherVector - defines the second operand
     * @returns the current updated Vector3
     */
    addInPlace(otherVector: ReadOnlyVector3): Vector3;
    /**
     * Adds the given coordinates to the current Vector3
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    addInPlaceFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Gets a new Vector3, result of the addition the current Vector3 and the given vector
     * @param otherVector - defines the second operand
     * @returns the resulting Vector3
     */
    add(otherVector: ReadOnlyVector3): Vector3;
    /**
     * Adds the current Vector3 to the given one and stores the result in the vector "result"
     * @param otherVector - defines the second operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    addToRef(otherVector: ReadOnlyVector3, result: Vector3): Vector3;
    /**
     * Subtract the given vector from the current Vector3
     * @param otherVector - defines the second operand
     * @returns the current updated Vector3
     */
    subtractInPlace(otherVector: ReadOnlyVector3): Vector3;
    /**
     * Returns a new Vector3, result of the subtraction of the given vector from the current Vector3
     * @param otherVector - defines the second operand
     * @returns the resulting Vector3
     */
    subtract(otherVector: ReadOnlyVector3): Vector3;
    /**
     * Subtracts the given vector from the current Vector3 and stores the result in the vector "result".
     * @param otherVector - defines the second operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    subtractToRef(otherVector: ReadOnlyVector3, result: Vector3): Vector3;
    /**
     * Returns a new Vector3 set with the subtraction of the given floats from the current Vector3 coordinates
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the resulting Vector3
     */
    subtractFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Subtracts the given floats from the current Vector3 coordinates and set the given vector "result" with this result
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    subtractFromFloatsToRef(x: number, y: number, z: number, result: Vector3): Vector3;
    /**
     * Gets a new Vector3 set with the current Vector3 negated coordinates
     * @returns a new Vector3
     */
    negate(): Vector3;
    /**
     * Multiplies the Vector3 coordinates by the float "scale"
     * @param scale - defines the multiplier factor
     * @returns the current updated Vector3
     */
    scaleInPlace(scale: number): Vector3;
    /**
     * Returns a new Vector3 set with the current Vector3 coordinates multiplied by the float "scale"
     * @param scale - defines the multiplier factor
     * @returns a new Vector3
     */
    scale(scale: number): Vector3;
    /**
     * Multiplies the current Vector3 coordinates by the float "scale" and stores the result in the given vector "result" coordinates
     * @param scale - defines the multiplier factor
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    scaleToRef(scale: number, result: Vector3): Vector3;
    /**
     * Scale the current Vector3 values by a factor and add the result to a given Vector3
     * @param scale - defines the scale factor
     * @param result - defines the Vector3 object where to store the result
     * @returns the unmodified current Vector3
     */
    scaleAndAddToRef(scale: number, result: Vector3): Vector3;
    /**
     * Returns true if the current Vector3 and the given vector coordinates are strictly equal
     * @param otherVector - defines the second operand
     * @returns true if both vectors are equals
     */
    equals(otherVector: ReadOnlyVector3): boolean;
    /**
     * Returns true if the current Vector3 and the given vector coordinates are distant less than epsilon
     * @param otherVector - defines the second operand
     * @param epsilon - defines the minimal distance to define values as equals
     * @returns true if both vectors are distant less than epsilon
     */
    equalsWithEpsilon(otherVector: ReadOnlyVector3, epsilon?: number): boolean;
    /**
     * Returns true if the current Vector3 coordinates equals the given floats
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns true if both vectors are equals
     */
    equalsToFloats(x: number, y: number, z: number): boolean;
    /**
     * Multiplies the current Vector3 coordinates by the given ones
     * @param otherVector - defines the second operand
     * @returns the current updated Vector3
     */
    multiplyInPlace(otherVector: ReadOnlyVector3): Vector3;
    /**
     * Returns a new Vector3, result of the multiplication of the current Vector3 by the given vector
     * @param otherVector - defines the second operand
     * @returns the new Vector3
     */
    multiply(otherVector: ReadOnlyVector3): Vector3;
    /**
     * Multiplies the current Vector3 by the given one and stores the result in the given vector "result"
     * @param otherVector - defines the second operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    multiplyToRef(otherVector: ReadOnlyVector3, result: Vector3): Vector3;
    /**
     * Returns a new Vector3 set with the result of the mulliplication of the current Vector3 coordinates by the given floats
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the new Vector3
     */
    multiplyByFloats(x: number, y: number, z: number): Vector3;
    /**
     * Returns a new Vector3 set with the result of the division of the current Vector3 coordinates by the given ones
     * @param otherVector - defines the second operand
     * @returns the new Vector3
     */
    divide(otherVector: ReadOnlyVector3): Vector3;
    /**
     * Divides the current Vector3 coordinates by the given ones and stores the result in the given vector "result"
     * @param otherVector - defines the second operand
     * @param result - defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    divideToRef(otherVector: ReadOnlyVector3, result: Vector3): Vector3;
    /**
     * Divides the current Vector3 coordinates by the given ones.
     * @param otherVector - defines the second operand
     * @returns the current updated Vector3
     */
    divideInPlace(otherVector: ReadOnlyVector3): Vector3;
    /**
     * Updates the current Vector3 with the minimal coordinate values between its and the given vector ones
     * @param other - defines the second operand
     * @returns the current updated Vector3
     */
    minimizeInPlace(other: ReadOnlyVector3): Vector3;
    /**
     * Updates the current Vector3 with the maximal coordinate values between its and the given vector ones.
     * @param other - defines the second operand
     * @returns the current updated Vector3
     */
    maximizeInPlace(other: ReadOnlyVector3): Vector3;
    /**
     * Updates the current Vector3 with the minimal coordinate values between its and the given coordinates
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    minimizeInPlaceFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Updates the current Vector3 with the maximal coordinate values between its and the given coordinates.
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    maximizeInPlaceFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Gets a new Vector3 from current Vector3 floored values
     * @returns a new Vector3
     */
    floor(): Vector3;
    /**
     * Gets a new Vector3 from current Vector3 floored values
     * @returns a new Vector3
     */
    fract(): Vector3;
    /**
     * Gets the length of the Vector3
     * @returns the length of the Vecto3
     */
    length(): number;
    /**
     * Gets the squared length of the Vector3
     * @returns squared length of the Vector3
     */
    lengthSquared(): number;
    /**
     * Normalize the current Vector3.
     * Please note that this is an in place operation.
     * @returns the current updated Vector3
     */
    normalize(): Vector3;
    /**
     * Normalize the current Vector3 with the given input length.
     * Please note that this is an in place operation.
     * @param len - the length of the vector
     * @returns the current updated Vector3
     */
    normalizeFromLength(len: number): Vector3;
    /**
     * Normalize the current Vector3 to a new vector
     * @returns the new Vector3
     */
    normalizeToNew(): Vector3;
    /**
     * Normalize the current Vector3 to the reference
     * @param reference - define the Vector3 to update
     * @returns the updated Vector3
     */
    normalizeToRef(reference: Vector3): Vector3;
    /**
     * Creates a new Vector3 copied from the current Vector3
     * @returns the new Vector3
     */
    clone(): Vector3;
    /**
     * Copies the given vector coordinates to the current Vector3 ones
     * @param source - defines the source Vector3
     * @returns the current updated Vector3
     */
    copyFrom(source: ReadOnlyVector3): Vector3;
    /**
     * Copies the given floats to the current Vector3 coordinates
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    copyFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Copies the given floats to the current Vector3 coordinates
     * @param x - defines the x coordinate of the operand
     * @param y - defines the y coordinate of the operand
     * @param z - defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    set(x: number, y: number, z: number): Vector3;
    /**
     * Copies the given float to the current Vector3 coordinates
     * @param v - defines the x, y and z coordinates of the operand
     * @returns the current updated Vector3
     */
    setAll(v: number): Vector3;
}
