import { message } from '~mocks/appHooks'
import clipboard from '~su/utilities/clipboard'

describe('Cliboard utilities', () => {
  const originalClipboard = { ...global.navigator.clipboard }
  let fail = false

  beforeEach(() => {
    let clipboardData = ''
    const mockClipboard = {
      writeText: jest.fn((data) => {
        clipboardData = data
        return fail ? Promise.reject() : Promise.resolve()
      }),
      readText: jest.fn(() => {
        return Promise.resolve(clipboardData)
      })
    }
    global.navigator.clipboard = mockClipboard
    message.success = jest.fn()
    message.error = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
    global.navigator.clipboard = originalClipboard
  })

  describe('write', () => {
    it('writes to clipboard as JSON', async () => {
      await clipboard.write('string', message)

      expect(navigator.clipboard.writeText).toBeCalledTimes(1)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(JSON.stringify('string'))
    })

    describe('when success', () => {
      it('shows a success message', async () => {
        await clipboard.write('test', message)
        expect(message.success).toBeCalledWith('Copied!')
      })
    })

    describe('when fail', () => {
      it('shows a fail message', async () => {
        fail = true

        await clipboard.write('test', message)
        expect(message.error).toBeCalledWith('Copying has failed.')
      })
    })
  })

  describe('read', () => {
    it('reads the clipboard', async () => {
      clipboard.write({ test: 'true' }, message)
      clipboard.read().then((value) => {
        expect(JSON.parse(value)).toEqual({ test: 'true' })
      })
      expect(navigator.clipboard.readText).toBeCalledTimes(1)
    })
  })

  describe('readIf', () => {
    it('reads the clipboard but returns the value only if it matches the regexp', async () => {
      clipboard.write({ test: 'true' }, message)
      clipboard.readIf(/test/).then((value) => {
        expect(JSON.parse(value)).toEqual({ test: 'true' })
      })

      clipboard.readIf(/fake/).then((value) => {
        expect(JSON.parse(value)).toEqual(null)
      })

      expect(navigator.clipboard.readText).toBeCalledTimes(2)
    })
  })
})
