import { createHash } from 'node:crypto'

const hash = {
    sha512(data) {
        return createHash('sha512').update(data, 'utf-8').digest('hex')
    }
}

export default hash