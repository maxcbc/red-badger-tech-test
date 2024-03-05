import fs from 'node:fs/promises'
import path from 'node:path'
import {Grid} from "./grid/grid";
import {Robot} from "./robot/robot";

export async function main() {
    const rawInput= await fs.readFile(path.join(process.cwd(), 'input.txt' ), "utf-8")
    const gridConfig = rawInput.slice(0, rawInput.indexOf('\n')).trim().split(' ').map(s => parseInt(s))
    const robotConfigs = rawInput.slice(rawInput.indexOf('\n') + 1).trim().split('\n')


    const grid = new Grid({
        size: {
            x: gridConfig[0],
            y: gridConfig[1]
        }
    })

    const robotPositions: string[] = []
    let i = 1
    while (i <= robotConfigs.length) {
        const config = robotConfigs[i - 1].trim().split(' ').map(s => s.trim())
        const instructions =  robotConfigs[i].split('')
        const robot = new Robot(grid,{
                x: parseInt(config[0]),
                y: parseInt(config[1]),
                cardinalPoint: config[2]
        })

        for (const instruction of instructions) {
            if (instruction === 'F') {
                robot.moveForward()
            } else if (instruction === 'R') {
                robot.turnRight()
            } else if (instruction === 'L') {
                robot.turnLeft()
            }
        }

        robotPositions.push(robot.position)
        i += 2
    }

    fs.writeFile(path.join(process.cwd(), 'output.txt' ), robotPositions.join('\n'), 'utf-8')


}

if (require.main === module) {
   main()
       .catch(console.error)
}