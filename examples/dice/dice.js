"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chainbet = __importStar(require("chainbet"));
var BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
var BITBOX = new BITBOXCli();
var fs = __importStar(require("fs"));
//import * as context from 'commander';
var context = require('commander');
var inquirer = __importStar(require("inquirer"));
//let inquirer = require('inquirer');
var jsonfile = __importStar(require("jsonfile"));
//let jsonfile = require('jsonfile');
context.version('0.0.13')
    .option('-m, --mode [mode]', 'set program mode to bypass initial prompt')
    .option('-d, --debug [debug]', 'set debugger support (skips user prompts with default values)')
    .parse(process.argv);
context.debug = (context.debug == "1" ? true : false);
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var wallet, selection, wif, wif, chainfeed, wif, e_1, betAmount, answer, bet, wif, e_2, bet, answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 26];
                    return [4 /*yield*/, promptMainMenu()];
                case 1:
                    selection = _a.sent();
                    // check if wallet.json file exists
                    if (fs.existsSync('./wallet.json')) {
                        if (selection.mode == 'generate') {
                            console.log("\nGenerating a new address...");
                            wif = chainbet.Utils.getNewPrivKeyWIF();
                            wallet = jsonfile.readFileSync('./wallet.json');
                            wallet.push({ 'wif': wif });
                            jsonfile.writeFileSync("./wallet.json", wallet, 'utf8');
                        }
                    }
                    else if (!fs.existsSync('./wallet.json')) {
                        console.log("\nGenerating a new address and wallet.json file...");
                        wif = chainbet.Utils.getNewPrivKeyWIF();
                        fs.writeFileSync('./wallet.json', "", 'utf8');
                        jsonfile.writeFileSync("./wallet.json", [{ 'wif': wif }], 'utf8');
                    }
                    wallet = jsonfile.readFileSync('./wallet.json');
                    chainfeed = new chainbet.MessageFeed();
                    return [4 /*yield*/, chainfeed.checkConnection()];
                case 2:
                    _a.sent();
                    wif = "";
                    if (!(selection.mode == 'host')) return [3 /*break*/, 12];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, chainbet.Wallet.selectViableWIF(wallet)];
                case 4:
                    wif = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.log("\nNo viable addresses to use, please add funds or wait for 1 confirmation.");
                    return [3 /*break*/, 6];
                case 6:
                    if (!(wif != "")) return [3 /*break*/, 11];
                    betAmount = 1500;
                    if (!!context.debug) return [3 /*break*/, 8];
                    console.log('\n');
                    return [4 /*yield*/, inquirer.prompt([{
                                type: "input",
                                name: "amount",
                                message: "Enter bet amount (1500-10000): ",
                                validate: function (input) {
                                    if (parseInt(input))
                                        if (parseInt(input) >= 1500 && parseInt(input) <= 10000)
                                            return true;
                                    return false;
                                }
                            }])];
                case 7:
                    answer = _a.sent();
                    betAmount = parseInt(answer.amount);
                    _a.label = 8;
                case 8:
                    bet = new chainbet.CoinFlipHost(wif, betAmount, chainfeed);
                    bet.run();
                    _a.label = 9;
                case 9:
                    if (!!bet.complete) return [3 /*break*/, 11];
                    return [4 /*yield*/, chainbet.Utils.sleep(250)];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 11: return [3 /*break*/, 25];
                case 12:
                    if (!(selection.mode == 'client')) return [3 /*break*/, 20];
                    _a.label = 13;
                case 13:
                    _a.trys.push([13, 15, , 16]);
                    return [4 /*yield*/, chainbet.Wallet.selectViableWIF(wallet)];
                case 14:
                    wif = _a.sent();
                    return [3 /*break*/, 16];
                case 15:
                    e_2 = _a.sent();
                    console.log("\nNo viable addresses to use, please add funds or wait for 1 confirmation.");
                    return [3 /*break*/, 16];
                case 16:
                    if (!(wif != "")) return [3 /*break*/, 19];
                    bet = new chainbet.CoinFlipClient(wif, chainfeed, context.debug);
                    bet.run();
                    _a.label = 17;
                case 17:
                    if (!!bet.complete) return [3 /*break*/, 19];
                    return [4 /*yield*/, chainbet.Utils.sleep(250)];
                case 18:
                    _a.sent();
                    return [3 /*break*/, 17];
                case 19: return [3 /*break*/, 25];
                case 20:
                    if (!(selection.mode == 'withdraw')) return [3 /*break*/, 23];
                    console.log("withdrawing funds...");
                    return [4 /*yield*/, inquirer.prompt([{
                                type: "input",
                                name: "address",
                                message: "Enter a withdraw address: ",
                                validate: function (input) {
                                    if (BITBOX.Address.isCashAddress(input) || BITBOX.isLegacyAddress(input))
                                        return true;
                                    return false;
                                }
                            }])];
                case 21:
                    answer = _a.sent();
                    return [4 /*yield*/, chainbet.Wallet.sweepToAddress(wallet, answer.address)];
                case 22:
                    _a.sent();
                    return [3 /*break*/, 25];
                case 23:
                    if (!(selection.mode == 'list')) return [3 /*break*/, 25];
                    return [4 /*yield*/, chainbet.Wallet.listAddressDetails(wallet)];
                case 24:
                    _a.sent();
                    _a.label = 25;
                case 25: return [3 /*break*/, 0];
                case 26:
                    console.log("\nThanks for visiting Satoshi's Dice!");
                    process.exit();
                    return [2 /*return*/];
            }
        });
    });
}
function promptMainMenu() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n-------------------------------------------------------------------------------');
                    console.log("|                        Welcome to Satoshi's Dice!                           |");
                    console.log('-------------------------------------------------------------------------------');
                    console.log('    =====                   .-------.    ______                       =====');
                    console.log('     ///                   /   o   /|   /\\     \\                       ///');
                    console.log('     ///                  /_______/o|  /o \\  o  \\                      ///');
                    console.log('     ///                  | o     | | /   o\\_____\\                     ///');
                    console.log('     ///                  |   o   |o/ \\o   /o    /                     ///');
                    console.log('     ///                  |     o |/   \\ o/  o  /                      ///');
                    console.log("    =====                 '-------'     \\/____o/                      =====");
                    console.log('-------------------------------------------------------------------------------');
                    console.log("|                      P2P Gaming with Bitcoin Cash                           |");
                    console.log('-------------------------------------------------------------------------------\n');
                    if (!(context.mode == undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer.prompt([{
                                type: "list",
                                name: "mode",
                                message: "What do you want to do?",
                                choices: [
                                    new inquirer.Separator("Games"),
                                    { name: '  Roll Dice (ODD wins) - You are Host', value: 'host' },
                                    { name: '  Roll Dice (EVEN wins) - You wait for a Host', value: 'client' },
                                    new inquirer.Separator("Wallet Tools"),
                                    { name: '  List balances', value: 'list' },
                                    { name: '  Generate new BCH address', value: 'generate' },
                                    { name: '  Withdraw all funds', value: 'withdraw' }
                                ],
                            }])];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/, { 'mode': context.mode }];
            }
        });
    });
}
///////////////////////////////////////////////////////////////////////////////////////////
//
// FOR DEBUGGING WITH VSCODE
//
// NOTE: The inquirer package used for user input is not compatible with the tty debugger 
//       used by visual studio code.  Therfore, the following if statement must be used
//       to allow use of the debugger.
//
///////////////////////////////////////////////////////////////////////////////////////////
// async function debug(context: any){
//     var wallet = jsonfile.readFileSync('./examples/wallet.json');
//     var wif; 
//     // Host mode debug (i.e., with context "-d 1 -r 1")
//     if(selection.mode == "host")
//         wif = wallet[0].wif;
//     // Host mode debug (i.e., with context "-d 1 -r 1")
//     else if(selection.mode == "client")
//         wif = wallet[1].wif;
//     context.wif = wif
//     let ecpair = BITBOX.ECPair.fromWIF(wif);
//     context.pubkey = BITBOX.ECPair.toPublicKey(ecpair);
//     context.address = BITBOX.ECPair.toCashAddress(ecpair);
//     console.log("\nYour address is: " + context.address);
//     main(context);
// }
main();
// if(!context.debug)
// else if(context.debug)
//     throw new Error("not implemented.");
