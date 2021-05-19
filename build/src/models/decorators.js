"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm = __importStar(require("typeorm"));
function CreateDateColumn() {
    return typeorm.CreateDateColumn({ type: 'timestamptz', name: 'created_at' });
}
exports.CreateDateColumn = CreateDateColumn;
function UpdateDateColumn() {
    return typeorm.UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' });
}
exports.UpdateDateColumn = UpdateDateColumn;
function DeleteDateColumn() {
    return typeorm.Column('timestamptz', { nullable: true });
}
exports.DeleteDateColumn = DeleteDateColumn;
function DeactivateDateColumn() {
    return DeleteDateColumn();
}
exports.DeactivateDateColumn = DeactivateDateColumn;
function PrimaryUuidColumn() {
    return typeorm.PrimaryColumn('uuid', { default: () => 'uuid_generate_v1mc()' });
}
exports.PrimaryUuidColumn = PrimaryUuidColumn;
function JoinOnTableId(name) {
    return typeorm.JoinColumn({ name, referencedColumnName: 'id' });
}
exports.JoinOnTableId = JoinOnTableId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFFbEMsU0FBZ0IsZ0JBQWdCO0lBQzVCLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQTtBQUNoRixDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixnQkFBZ0I7SUFDNUIsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFBO0FBQ2hGLENBQUM7QUFGRCw0Q0FFQztBQUVELFNBQWdCLGdCQUFnQjtJQUM1QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7QUFDNUQsQ0FBQztBQUZELDRDQUVDO0FBRUQsU0FBZ0Isb0JBQW9CO0lBQ2hDLE9BQU8sZ0JBQWdCLEVBQUUsQ0FBQTtBQUM3QixDQUFDO0FBRkQsb0RBRUM7QUFFRCxTQUFnQixpQkFBaUI7SUFDN0IsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUN4QixNQUFNLEVBQ04sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsQ0FDNUMsQ0FBQTtBQUNMLENBQUM7QUFMRCw4Q0FLQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUFZO0lBQ3RDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ25FLENBQUM7QUFGRCxzQ0FFQyJ9