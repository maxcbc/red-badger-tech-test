import fs from 'node:fs/promises'
import {main} from "./index";

jest.mock('node:fs/promises')

const mocks = {
    readFile: jest.mocked(fs.readFile),
    writeFile: jest.mocked(fs.writeFile),
}

describe('main()', () => {
    test('it produces the correct output for the test input', async() => {
        // Arrange
        mocks.readFile.mockResolvedValue("5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL".trim())

        // Act
        await main()

        // Assert
        expect(mocks.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/\/output.txt$/),
            "1,1,E\n3,3,N\n2,4,S",
            'utf-8',
        )
    })
})