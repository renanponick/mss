"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
var ResourceHealth;
(function (ResourceHealth) {
    ResourceHealth["Healthy"] = "HEALTHY";
    ResourceHealth["Unhealthy"] = "UNHEALTHY";
})(ResourceHealth || (ResourceHealth = {}));
exports.healthCheck = (_, res) => {
    const db = typeorm_1.getConnection();
    const dbStatus = db.isConnected;
    let statuses = {
        status: ResourceHealth.Healthy
    };
    if (!dbStatus) {
        res.status(503);
        statuses = {
            status: ResourceHealth.Unhealthy,
            message: 'Database it\'s not working'
        };
    }
    else {
        res.status(200);
    }
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(statuses));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhbHRoLWNoZWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlYWx0aC1jaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHFDQUF1QztBQUV2QyxJQUFLLGNBR0o7QUFIRCxXQUFLLGNBQWM7SUFDZixxQ0FBbUIsQ0FBQTtJQUNuQix5Q0FBdUIsQ0FBQTtBQUMzQixDQUFDLEVBSEksY0FBYyxLQUFkLGNBQWMsUUFHbEI7QUFPWSxRQUFBLFdBQVcsR0FBRyxDQUFDLENBQVUsRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNyRCxNQUFNLEVBQUUsR0FBRyx1QkFBYSxFQUFFLENBQUE7SUFDMUIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQTtJQUMvQixJQUFJLFFBQVEsR0FBYTtRQUNyQixNQUFNLEVBQUUsY0FBYyxDQUFDLE9BQU87S0FDakMsQ0FBQTtJQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDWCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsUUFBUSxHQUFHO1lBQ1AsTUFBTSxFQUFFLGNBQWMsQ0FBQyxTQUFTO1lBQ2hDLE9BQU8sRUFBRSw0QkFBNEI7U0FDeEMsQ0FBQTtLQUNKO1NBQU07UUFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ2xCO0lBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUM3QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUEifQ==