"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHousingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_housing_dto_1 = require("./create-housing.dto");
class UpdateHousingDto extends (0, mapped_types_1.PartialType)(create_housing_dto_1.CreateHousingDto) {
}
exports.UpdateHousingDto = UpdateHousingDto;
//# sourceMappingURL=update-housing.dto.js.map