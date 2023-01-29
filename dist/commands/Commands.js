"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollCommand = exports.UnTimeoutCommand = exports.TimeoutCommand = exports.NoaddCheckCommand = exports.AvatarCommand = exports.ValidationBlacklistCommand = exports.BlacklistCommand = exports.LofiCommand = exports.InfoCommand = exports.AltCheckCommand = exports.Tier2RoleCommand = exports.Tier1RoleCommand = void 0;
const Tier1Role_1 = require("./Tier1Role");
Object.defineProperty(exports, "Tier1RoleCommand", { enumerable: true, get: function () { return Tier1Role_1.Tier1RoleCommand; } });
const Tier2Role_1 = require("./Tier2Role");
Object.defineProperty(exports, "Tier2RoleCommand", { enumerable: true, get: function () { return Tier2Role_1.Tier2RoleCommand; } });
const AltCheck_1 = require("./AltCheck");
Object.defineProperty(exports, "AltCheckCommand", { enumerable: true, get: function () { return AltCheck_1.AltCheckCommand; } });
const InfoCommand_1 = require("./InfoCommand");
Object.defineProperty(exports, "InfoCommand", { enumerable: true, get: function () { return InfoCommand_1.InfoCommand; } });
const Lofi_1 = require("./Lofi");
Object.defineProperty(exports, "LofiCommand", { enumerable: true, get: function () { return Lofi_1.LofiCommand; } });
const Blacklist_1 = require("./Blacklist");
Object.defineProperty(exports, "BlacklistCommand", { enumerable: true, get: function () { return Blacklist_1.BlacklistCommand; } });
const ValidationBlacklist_1 = require("./ValidationBlacklist");
Object.defineProperty(exports, "ValidationBlacklistCommand", { enumerable: true, get: function () { return ValidationBlacklist_1.ValidationBlacklistCommand; } });
const Avatar_1 = require("./Avatar");
Object.defineProperty(exports, "AvatarCommand", { enumerable: true, get: function () { return Avatar_1.AvatarCommand; } });
const NoaddCheck_1 = require("./NoaddCheck");
Object.defineProperty(exports, "NoaddCheckCommand", { enumerable: true, get: function () { return NoaddCheck_1.NoaddCheckCommand; } });
const Timeout_1 = require("./Timeout");
Object.defineProperty(exports, "TimeoutCommand", { enumerable: true, get: function () { return Timeout_1.TimeoutCommand; } });
const UnTimeout_1 = require("./UnTimeout");
Object.defineProperty(exports, "UnTimeoutCommand", { enumerable: true, get: function () { return UnTimeout_1.UnTimeoutCommand; } });
const Poll_1 = require("./Poll");
Object.defineProperty(exports, "PollCommand", { enumerable: true, get: function () { return Poll_1.PollCommand; } });