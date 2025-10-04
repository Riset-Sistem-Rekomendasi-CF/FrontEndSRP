import { transposeMatrix, intersection, intersectionIndex } from "../../helper";

export class MatrixMapped {

    private __matrix: Array<Array<number>>;
    private __matrixReverse: Array<Array<number>>;

    constructor(matrix: Array<Array<number>>) {
        this.__matrix = matrix
        this.__matrixReverse = transposeMatrix(matrix)
    }

    /**
     * Retrieves the indices of intersection between a user and an item from the original matrix.
     *
     * @param userIndex - The index representing the user in the original matrix.
     * @param itemIndex - The index representing the item in the original matrix.
     * @returns An array of indices where the values intersect between the user and the item.
     *
     * @example
     * // Assuming __matrix = [[1, 2, 3], [2, 3, 4]]
     * getUserIndex(0, 1); // Returns [1, 2] (indices where values 2 and 3 intersect)
     */
    getUserIndex(userIndex: number, itemIndex: number): Array<number> {
        const user: Array<number> = this.__matrix[userIndex];
        const item: Array<number> = this.__matrix[itemIndex];

        return intersectionIndex(user, item)
    }

    /**
     * Retrieves the intersection of indices between a user and an item from the original matrix.
     *
     * @param userIndex - The index representing the user in the original matrix.
     * @param itemIndex - The index representing the item in the original matrix.
     * @returns An array of numbers representing the common indices between the user and the item.
     *
     * @example
     * // Assuming __matrix = [[1, 2, 3], [2, 3, 4]]
     * getUser(0, 1); // Returns [2, 3]
     *
     * @remarks
     * This method assumes that `__matrix` is a two-dimensional array where each entry contains a list of indices.
     */
    getUser(userIndex: number, itemIndex: number): Array<number> {
        let user: Array<number> = this.__matrix[userIndex];
        let item: Array<number> = this.__matrix[itemIndex];

        return intersection(user, item);
    }


    /**
     * Retrieves the intersection of indices between a user and an item from the reversed matrix.
     *
     * @param userIndex - The index representing the user in the reversed matrix.
     * @param itemIndex - The index representing the item in the reversed matrix.
     * @returns An array of numbers representing the common indices between the user and the item.
     *
     * @example
     * // Assuming __matrixReverse = [[1, 2, 3], [2, 3, 4]]
     * getItem(0, 1); // Returns [2, 3]
     *
     * @remarks
     * This method assumes that `__matrixReverse` is a two-dimensional array where each entry contains a list of indices.
     */
    getItem(userIndex: number, itemIndex: number): Array<number> {
        let user: Array<number> = this.__matrixReverse[userIndex]
        let item: Array<number> = this.__matrixReverse[itemIndex]

        return intersection(user, item)
    }

    /**
     * Retrieves the indices of intersection between a user and an item from the reversed matrix.
     *
     * @param userIndex - The index representing the user in the reversed matrix.
     * @param itemIndex - The index representing the item in the reversed matrix.
     * @returns An array of indices where the values intersect between the user and the item.
     *
     * @example
     * // Assuming __matrixReverse = [[1, 2, 3], [2, 3, 4]]
     * getItemIndex(0, 1); // Returns [1, 2] (indices where values 2 and 3 intersect)
     */
    getItemIndex(userIndex: number, itemIndex: number): Array<number> {
        const user: Array<number> = this.__matrixReverse[userIndex];
        const item: Array<number> = this.__matrixReverse[itemIndex];

        return intersectionIndex(user, item)
    }
}