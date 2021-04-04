import { createLogger, format, transports } from 'winston'

import config from './config'

const formats = [
    ...(config.logs.color
        ? [format.colorize()]
        : []),
    format.splat(),
    format.simple()
]

const log = createLogger({
    level: config.logs.level,
    transports: [new transports.Console()],
    format: format.combine(...formats)
})

export default log
