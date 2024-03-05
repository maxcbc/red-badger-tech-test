import {Robot, RobotOptions} from "./robot";
import {Grid} from "../grid/grid";


describe('class: Robot', () => {
    describe('constructor()', () => {
        test('a Robot is constructed with a default position at the origin', () => {
            // Arrange
            const grid = new Grid()

            // Act
            const robot = new Robot(grid)

            // Assert
            expect(robot.x).toBe(0)
            expect(robot.y).toBe(0)
        })
        test('a Robot is constructed facing North by default', () => {
            // Arrange
            const grid = new Grid()

            // Act
            const robot = new Robot(grid)

            // Assert
            expect(robot.currentAngle).toBe(0)
        })
        test('a Robot can be constructed with a supplied initial position and direction', () => {
            // Arrange
            const grid = new Grid()
            const options: RobotOptions = {
                x: 4,
                y: 2,
                cardinalPoint: 'S'
            }

            // Act
            const robot = new Robot(grid, options)

            // Assert
            expect(robot.currentAngle).toBe(180)
            expect(robot.x).toBe(4)
            expect(robot.y).toBe(2)
        })
        test('a robot can report is position in the proper format', () => {
            // Arrange
            const grid = new Grid()
            const options: RobotOptions = {
                x: 22,
                y: 19,
                cardinalPoint: 'E'
            }

            // Act
            const robot = new Robot(grid, options)

            // Assert
            expect(robot.position).toBe('22 19 E')
        })
    })

    describe('method: turnLeft()', () => {

        test.each([
            [1, 270],
            [2, 180],
            [3, 90],
            [4, 0],
            [5, 270],
        ])('%i left turns results in an angle of %i degrees', (n, expected) => {
            // Arrange
            const grid = new Grid()
            const robot = new Robot(grid)

            // Act
            for (let i = 1; i <= n; i++) {
                robot.turnLeft()
            }

            // Assert
            expect(robot.currentAngle).toBe(expected)
        })

    })

    describe('method: turnRight()', () => {

        test.each([
            [1, 90],
            [2, 180],
            [3, 270],
            [4, 0],
            [5, 90],
        ])('%i right turns results in an angle of %i degrees', (n, expected) => {
            // Arrange
            const grid = new Grid()
            const robot = new Robot(grid)

            // Act
            for (let i = 1; i <= n; i++) {
                robot.turnRight()
            }

            // Assert
            expect(robot.currentAngle).toBe(expected)
        })

    })

    describe('method: moveForward()', () => {
        test('an East facing robot moves 1 rightward on the x axis', () => {
            // Arrange
            const options: RobotOptions = {
                x: 0,
                y: 0,
                cardinalPoint: 'E'
            }
            const grid = new Grid()
            const robot = new Robot(grid, options)

            // Act
            robot.moveForward()

            // Assert
            expect(robot.x).toBe(1)
            expect(robot.y).toBe(0)
        })

        test('an West facing robot moves 1 leftward on the x axis', () => {
            // Arrange
            const options: RobotOptions = {
                x: 0,
                y: 0,
                cardinalPoint: 'W'
            }
            const grid = new Grid()
            const robot = new Robot(grid, options)

            // Act
            robot.moveForward()

            // Assert
            expect(robot.x).toBe(-1)
            expect(robot.y).toBe(0)
        })


        test('an North facing robot moves 1 upward on the y axis', () => {
            // Arrange
            const options: RobotOptions = {
                x: 0,
                y: 0,
                cardinalPoint: 'N'
            }
            const grid = new Grid()
            const robot = new Robot(grid, options)

            // Act
            robot.moveForward()

            // Assert
            expect(robot.x).toBe(0)
            expect(robot.y).toBe(1)
        })

        test('an South facing robot moves 1 downward on the y axis', () => {
            // Arrange
            const options: RobotOptions = {
                x: 0,
                y: 0,
                cardinalPoint: 'S'
            }
            const grid = new Grid()
            const robot = new Robot(grid, options)

            // Act
            robot.moveForward()

            // Assert
            expect(robot.x).toBe(0)
            expect(robot.y).toBe(-1)
        })

        test('a robot that moves off the map is LOST', () => {
            // Arrange
            const options: RobotOptions = {
                x: 2,
                y: 2,
                cardinalPoint: 'N'
            }
            const grid = new Grid({
                size: {
                    x: 3,
                    y: 3
                }
            })
            const robot = new Robot(grid, options)

            // Act
            robot.moveForward()

            // Assert
            expect(robot.position).toBe('2 3 N LOST')
            expect(robot.isLost).toBe(true)
            expect(grid.smells.has('2 2')).toBe(true)
        })

        test('a robot will not get LOST off a smelly grid square', () => {
            // Arrange
            const options: RobotOptions = {
                x: 2,
                y: 2,
                cardinalPoint: 'N'
            }
            const grid = new Grid({
                size: {
                    x: 3,
                    y: 3
                }
            })
            grid.smells.add('2 2')
            const robot = new Robot(grid, options)

            // Act
            robot.moveForward()

            // Assert
            expect(robot.position).toBe('2 2 N')
            expect(robot.isLost).toBe(false)
        })


    })

})