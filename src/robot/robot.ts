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

    constructor(options: RobotOptions = DEFAULT_OPTIONS) {
        this.x = !isNaN(options.x) ? options.x : DEFAULT_OPTIONS.x;
        this.y = !isNaN(options.y) ? options.y : DEFAULT_OPTIONS.y;
        this.cardinalPoint = /^[NEWS]$/.test(options.cardinalPoint) ? options.cardinalPoint : DEFAULT_OPTIONS.cardinalPoint
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
        return `${this.x},${this.y},${this.cardinalPoint}`
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
        switch(this.currentAngle) {
            case 0:
                this.y += 1
                break;
            case 90:
                this.x += 1
                break;
            case 180:
                this.y -= 1
                break;
            case 270:
                this.x -= 1
                break;
        }
    }
}