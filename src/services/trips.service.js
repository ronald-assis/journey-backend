"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsService = void 0;
var dayjs_1 = require("dayjs");
var nodemailer_1 = require("nodemailer");
var trips_model_1 = require("../models/trips.model");
var mail_1 = require("../lib/mail");
var TripsService = /** @class */ (function () {
    function TripsService() {
    }
    TripsService.prototype.createTrip = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var destination, ends_at, emails_to_invite, owner_name, starts_at, owner_email, trip, formattedStartDate, formattedEndDate, confirmationLink, mail, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        destination = data.destination, ends_at = data.ends_at, emails_to_invite = data.emails_to_invite, owner_name = data.owner_name, starts_at = data.starts_at, owner_email = data.owner_email;
                        if ((0, dayjs_1.default)(starts_at).isBefore(new Date())) {
                            throw new Error('Invalid trip start date!');
                        }
                        if ((0, dayjs_1.default)(ends_at).isBefore(starts_at)) {
                            throw new Error('Invalid trip end date!');
                        }
                        return [4 /*yield*/, trips_model_1.TripsModel.createTrip({
                                destination: destination,
                                starts_at: starts_at,
                                ends_at: ends_at,
                                participants: {
                                    createMany: {
                                        data: __spreadArray([
                                            {
                                                name: owner_name,
                                                email: owner_email,
                                                is_owner: true,
                                                is_confirmed: true,
                                            }
                                        ], emails_to_invite.map(function (email) { return ({ email: email }); }), true),
                                    },
                                },
                            })];
                    case 1:
                        trip = _a.sent();
                        formattedStartDate = (0, dayjs_1.default)(starts_at).format('LL');
                        formattedEndDate = (0, dayjs_1.default)(ends_at).format('LL');
                        confirmationLink = "http://localhost:3333/api/trips/".concat(trip.id, "/confirm");
                        return [4 /*yield*/, (0, mail_1.getMailClient)()];
                    case 2:
                        mail = _a.sent();
                        return [4 /*yield*/, mail.sendMail({
                                from: {
                                    name: 'Equipe plann.er',
                                    address: 'oi@plann.er',
                                },
                                to: {
                                    name: owner_name,
                                    address: owner_email,
                                },
                                subject: "Confirme sua viagem para ".concat(destination, " em ").concat(formattedStartDate),
                                html: "\n         <div style=\"font-family: sans-serif; font-size: 16px; line-height: 1.6;\">\n            <p>Voc\u00EA solicitou a cria\u00E7\u00E3o de uma viagem para <strong>".concat(destination, "</strong>, Brasil nas datas de <strong>").concat(formattedStartDate, "</strong> at\u00E9 <strong>").concat(formattedEndDate, "</strong>.</p>\n            <p></p>\n            <p>Para confirmar sua viagem, Clique no link abaixo:</p>\n            <p></p>\n            <p>\n                <a href=\"").concat(confirmationLink, "\">Confirmar Viagem</a>\n            </p>\n            <p></p>\n            <p>Caso voc\u00EA n\u00E3o saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>\n         </div>\n      ").trim(),
                            })];
                    case 3:
                        message = _a.sent();
                        console.log(nodemailer_1.default.getTestMessageUrl(message));
                        return [2 /*return*/, { tripId: trip.id }];
                }
            });
        });
    };
    return TripsService;
}());
exports.TripsService = TripsService;
