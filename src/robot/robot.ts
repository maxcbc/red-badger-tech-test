import {Grid} from "../grid/grid";

export interface RobotOptions {
    x: number,
    y: number,
    cardinalPoint: string
}

const DEFAULT_OPTIONS = {
    x: 0,
    y: 0,
    cardinalPoint: 'N'
}

export class Robot {
    public x: number = 0
    public y: number = 0
    public currentAngle: number = 0
    public grid: Grid

    constructor(grid: Grid, options: RobotOptions = DEFAULT_OPTIONS) {
        this.x = !isNaN(options.x) ? options.x : DEFAULT_OPTIONS.x;
        this.y = !isNaN(options.y) ? options.y : DEFAULT_OPTIONS.y;
        this.cardinalPoint = /^[NEWS]$/.test(options.cardinalPoint) ? options.cardinalPoint : DEFAULT_OPTIONS.cardinalPoint
        this.grid = grid
    }

    get isLost(): boolean {
        return this.grid.isOutOfBounds(this.x, this.y)
    }

    get cardinalPoint(): string{
        switch(this.currentAngle) {
            case 0:
                return 'N'
            case 90:
                return 'E'
            case 180:
                return 'S'
            default:
                return 'W'
        }
    }

    set cardinalPoint(cardinalPoint: string) {
        switch(cardinalPoint) {
            case 'N':
                this.currentAngle = 0
                break;
            case 'E':
                this.currentAngle = 90
                break;
            case 'S':
                this.currentAngle = 180
                break;
            default:
                this.currentAngle = 270
                break;
        }
    }

    get position(): string {
        return [
            this.x,
            this.y,
            this.cardinalPoint,
            this.isLost ? 'LOST' : ''
        ].join(' ').trim()
    }

    turnLeft() {
        this.currentAngle -= 90
        if (this.currentAngle < 0) {
            this.currentAngle = 360 + this.currentAngle
        }
    }

    turnRight() {
        this.currentAngle += 90
        if (this.currentAngle >= 360) {
            this.currentAngle = this.currentAngle - 360
        }
    }

    moveForward() {
        if (this.isLost) {
            return
        }
        const oldX = this.x
        const oldY = this.y
        let newX = this.x
        let newY = this.y
        switch(this.currentAngle) {
            case 0:
                newY += 1
                break;
            case 90:
                newX += 1
                break;
            case 180:
                newY -= 1
                break;
            case 270:
                newX -= 1
                break;
        }
        const willBeLost = this.grid.isOutOfBounds(newX, newY)
        if (this.grid.smells.has(`${this.x} ${this.y}`) && willBeLost) {
            return
        }
        this.x = newX
        this.y = newY


        if (this.isLost) {
            this.grid.smells.add(`${oldX} ${oldY}`)
        }
    }
}