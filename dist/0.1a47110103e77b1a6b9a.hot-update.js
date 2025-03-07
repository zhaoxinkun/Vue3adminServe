"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 10:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
var common_1 = __webpack_require__(6);
var user_service_1 = __webpack_require__(11);
var config_1 = __webpack_require__(17);
var env_config_1 = __webpack_require__(18);
var UserController = /** @class */ (function () {
    function UserController(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    // 查询所有用户
    UserController.prototype.find = function () {
        console.log(this.configService.get(env_config_1.envConfigEnum.DB_TYPE));
        console.log(this.configService.get(env_config_1.envConfigEnum.DB_HOST));
        console.log(this.configService.get(env_config_1.envConfigEnum.DB_PORT));
        console.log(this.configService.get(env_config_1.envConfigEnum.DB_USERNAME));
        console.log(this.configService.get(env_config_1.envConfigEnum.DB_PASSWORD));
        console.log(this.configService.get(env_config_1.envConfigEnum.DB_DATABASE));
        return this.userService.findAll();
    };
    // 查询username
    UserController.prototype.findOne = function (username) {
        return this.userService.findOne(username);
    };
    // 创建用户
    // @Body 装饰器用来接收请求体中的数据（即用户传递的 username 和 password）
    UserController.prototype.createUser = function (users) {
        return this.userService.createUser(users);
    };
    // 更新用户信息
    UserController.prototype.updateUser = function (id, updateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    };
    var _a, _b, _c, _d;
    __decorate([
        (0, common_1.Get)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "find", null);
    __decorate([
        (0, common_1.Get)(':username'),
        __param(0, (0, common_1.Param)('username')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "findOne", null);
    __decorate([
        (0, common_1.Post)()
        // @Body 装饰器用来接收请求体中的数据（即用户传递的 username 和 password）
        ,
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "createUser", null);
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, typeof (_d = typeof updateUserDto !== "undefined" && updateUserDto) === "function" ? _d : Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "updateUser", null);
    UserController = __decorate([
        (0, common_1.Controller)('user'),
        __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("24ea301b056675e2ca64")
/******/ })();
/******/ 
/******/ }
;