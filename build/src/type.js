"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const t = __importStar(require("io-ts"));
exports.AuthUser = t.intersection([
    t.type({
        email: t.string,
        password: t.string
    }),
    t.partial({
        type: t.number
    })
]);
exports.UpdateUser = t.type({
    userId: t.string,
    password: t.string,
    lastPassword: t.string
});
const User = t.intersection([
    t.type({
        email: t.string,
        password: t.string
    }),
    t.partial({
        id: t.string,
        isActive: t.boolean
    })
]);
exports.CreateDoctor = t.type({
    user: User,
    name: t.string,
    crx: t.string,
    ufCrx: t.string,
    cpf: t.string,
    address: t.string,
    city: t.string,
    province: t.string
});
exports.UpdateDoctor = t.partial({
    user: User,
    id: t.string,
    name: t.string,
    address: t.string,
    city: t.string,
    province: t.string
});
exports.CreatePatient = t.type({
    user: User,
    name: t.string,
    cpf: t.string,
    address: t.string,
    city: t.string,
    province: t.string
});
exports.UpdatePatient = t.partial({
    user: User,
    id: t.string,
    name: t.string,
    cpf: t.string,
    address: t.string,
    city: t.string,
    province: t.string
});
exports.CreatePharmacy = t.type({
    user: User,
    socialName: t.string,
    cnpj: t.string,
    address: t.string,
    city: t.string,
    province: t.string
});
exports.UpdatePharmacy = t.partial({
    user: User,
    id: t.string,
    socialName: t.string,
    cnpj: t.string,
    address: t.string,
    city: t.string,
    province: t.string
});
exports.CreatePrescription = t.type({
    composed: t.string,
    dosage: t.string,
    timesDay: t.number,
    note: t.string,
    validity: t.string,
    doctorId: t.string,
    patientId: t.string
});
exports.TakePrescription = t.type({
    id: t.string,
    pharmacyId: t.string
});
exports.UpdatePrescription = t.partial({
    id: t.string,
    composed: t.string,
    dosage: t.string,
    timesDay: t.number,
    note: t.string,
    validity: t.string,
    doctorId: t.string,
    patientId: t.string,
    externalId: t.string
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUEwQjtBQUViLFFBQUEsUUFBUSxHQUFJLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNILEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTTtRQUNmLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTTtLQUNyQixDQUFDO0lBQ0YsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNOLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTTtLQUNqQixDQUFDO0NBQ0wsQ0FBQyxDQUFBO0FBSVcsUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM3QixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDaEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ2xCLFlBQVksRUFBRSxDQUFDLENBQUMsTUFBTTtDQUN6QixDQUFDLENBQUE7QUFJRixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDSCxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU07UUFDZixRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU07S0FDckIsQ0FBQztJQUNGLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDTixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU87S0FDdEIsQ0FBQztDQUNMLENBQUMsQ0FBQTtBQUVXLFFBQUEsWUFBWSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDL0IsSUFBSSxFQUFFLElBQUk7SUFDVixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDZCxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDYixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDZixHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDYixPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDakIsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ2QsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNO0NBQ3JCLENBQUMsQ0FBQTtBQUlXLFFBQUEsWUFBWSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDZCxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDakIsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ2QsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNO0NBQ3JCLENBQUMsQ0FBQTtBQUlXLFFBQUEsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDaEMsSUFBSSxFQUFFLElBQUk7SUFDVixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDZCxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDYixPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDakIsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ2QsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNO0NBQ3JCLENBQUMsQ0FBQTtBQUlXLFFBQUEsYUFBYSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDbkMsSUFBSSxFQUFFLElBQUk7SUFDVixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDZCxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDYixPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDakIsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ2QsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNO0NBQ3JCLENBQUMsQ0FBQTtBQUlXLFFBQUEsY0FBYyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakMsSUFBSSxFQUFFLElBQUk7SUFDVixVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDcEIsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ2QsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ2pCLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNkLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTTtDQUNyQixDQUFDLENBQUE7QUFJVyxRQUFBLGNBQWMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3BDLElBQUksRUFBRSxJQUFJO0lBQ1YsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ1osVUFBVSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ3BCLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNkLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNqQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDZCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU07Q0FDckIsQ0FBQyxDQUFBO0FBSVcsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3JDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNsQixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDaEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ2xCLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNkLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNsQixRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDbEIsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNO0NBQ3RCLENBQUMsQ0FBQTtBQUlXLFFBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNuQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDWixVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU07Q0FDdkIsQ0FBQyxDQUFBO0FBSVcsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3hDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNaLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNsQixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDaEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ2xCLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNkLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTTtJQUNsQixRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDbEIsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQ25CLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTTtDQUN2QixDQUFDLENBQUEifQ==