import { Request, Response } from 'express'
import { getConnection } from 'typeorm'

enum ResourceHealth {
    Healthy = 'HEALTHY',
    Unhealthy = 'UNHEALTHY'
}

type Statuses = {
    status: ResourceHealth
    message?: string
}

export const healthCheck = (_: Request, res: Response) => {
    const db = getConnection()
    const dbStatus = db.isConnected
    let statuses: Statuses = {
        status: ResourceHealth.Healthy
    }

    if (!dbStatus) {
        res.status(503)
        statuses = {
            status: ResourceHealth.Unhealthy,
            message: 'Database it\'s not working'
        }
    } else {
        res.status(200)
    }

    res.header('Content-Type','application/json')
    res.send(JSON.stringify(statuses))
}
