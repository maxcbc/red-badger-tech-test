interface Size {
    x: number,
    y: number
}
export interface GridOptions {
    size: Size
}

const DEFAULT_GRID_OPTIONS = {
    size: {
        x: 50,
        y: 50
    }
}
export class Grid {
    public size: Size
    public smells: Set<string> = new Set()

    constructor(options: GridOptions = DEFAULT_GRID_OPTIONS) {
        this.size = {
            x: Math.min(!isNaN(options.size?.x) ? options.size.x : DEFAULT_GRID_OPTIONS.size.x, 50),
            y: Math.min(!isNaN(options.size?.y) ? options.size.y : DEFAULT_GRID_OPTIONS.size.y, 50)
        }
    }
    isOutOfBounds(x: number, y: number) {
        return x >= this.size.x || x < 0 || y >= this.size.y || y < 0
    }
}