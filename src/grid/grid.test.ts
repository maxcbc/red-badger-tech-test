import {Grid, GridOptions} from "./grid";

describe('class: Grid', () => {
    describe('constructor()', () => {
        test('a Grid is constructed by default as a 50 x 50 grid', () => {
            // Act
            const grid = new Grid()

            // Assert
            expect(grid.size.x).toBe(50)
            expect(grid.size.y).toBe(50)
        })
        test('a Grid can be constructed with a supplied x and y size', () => {
            // Arrange
            const options: GridOptions = {
                size: {
                    x: 42,
                    y: 22
                }
            }

            // Act
            const grid = new Grid(options)

            // Assert
            expect(grid.size.x).toBe(42)
            expect(grid.size.y).toBe(22)
        })

        test('a Grid has a maximum x or y size of 50', () => {
            // Arrange
            const options: GridOptions = {
                size: {
                    x: 402,
                    y: 202
                }
            }

            // Act
            const grid = new Grid(options)

            // Assert
            expect(grid.size.x).toBe(50)
            expect(grid.size.y).toBe(50)
        })
    })

    describe('method: isOutOfBounds', () => {
        test('it returns true if beyond x upper bound', () => {
            // Arrange
            const grid = new Grid({
                size: {
                    x: 5,
                    y: 5
                }
            })

            // Act
            const actual = grid.isOutOfBounds(5, 4)

            // Assert
            expect(actual).toBeTruthy()
        })
        test('it returns true if beyond y upper bound', () => {
            // Arrange
            const grid = new Grid({
                size: {
                    x: 5,
                    y: 5
                }
            })

            // Act
            const actual = grid.isOutOfBounds(4, 5)

            // Assert
            expect(actual).toBeTruthy()
        })

        test('it returns true if beyond x lower bound', () => {
            // Arrange
            const grid = new Grid({
                size: {
                    x: 5,
                    y: 5
                }
            })

            // Act
            const actual = grid.isOutOfBounds(-1, 0)

            // Assert
            expect(actual).toBeTruthy()
        })
        test('it returns true if beyond y lower bound', () => {
            // Arrange
            const grid = new Grid({
                size: {
                    x: 5,
                    y: 5
                }
            })

            // Act
            const actual = grid.isOutOfBounds(0, -1)

            // Assert
            expect(actual).toBeTruthy()
        })
        test('it returns false if within bounds', () => {
            // Arrange
            const grid = new Grid({
                size: {
                    x: 5,
                    y: 5
                }
            })

            // Act
            const actual = grid.isOutOfBounds(4, 4)

            // Assert
            expect(actual).toBeFalsy()
        })
    })
})