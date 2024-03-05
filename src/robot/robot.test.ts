import {Robot, RobotOptions} from "./robot";


describe('class: Robot', () => {
    describe('constructor()', () => {
        test('a Robot is constructed with a default position at the origin', () => {
            // Act
            const robot = new Robot()

            // Assert
            expect(robot.x).toBe(0)
            expect(robot.y).toBe(0)
        })
        test('a Robot is constructed facing North by default', () => {
            // Act
            const robot = new Robot()

            // Assert
            expect(robot.currentAngle).toBe(0)
        })
        test('a Robot can be constructed with a supplied initial position and direction', () => {
            // Arrange
            const options: RobotOptions = {
                x: 4,
                y: 2,
                cardinalPoint: 'S'
            }

            // Act
            const robot = new Robot(options)

            // Assert
            expect(robot.currentAngle).toBe(180)
            expect(robot.x).toBe(4)
            expect(robot.y).toBe(2)
        })
        test('a robot can report is position in the proper format', () => {
            // Arrange
            const options: RobotOptions = {
                x: 22,
                y: 19,
                cardinalPoint: 'E'
            }

            // Act
            const robot = new Robot(options)

            // Assert
            expect(robot.position).toBe('22,19,E')
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
            const robot = new Robot()

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
            const robot = new Robot()

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
            const robot = new Robot(options)

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
            const robot = new Robot(options)

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
            const robot = new Robot(options)

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
            const robot = new Robot(options)

            // Act
            robot.moveForward()

            // Assert
            expect(robot.x).toBe(0)
            expect(robot.y).toBe(-1)
        })
    })

})