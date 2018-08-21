webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".btn-circle.btn-xl {\n    width: 70px;\n    height: 70px;\n    padding: 10px 16px;\n    font-size: 24px;\n    line-height: 1.33;\n    border-radius: 35px;\n  }\n\n\n  .btn-circle-usr.btn-xl {\n    width: 40px;\n    height: 40px;\n    padding: 5px 5px;\n    font-size: 13px;\n    line-height: 1.33;\n    border-radius: 35px;\n  }\n\n\n  .center{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;    \n    -webkit-box-align:center;    \n        -ms-flex-align:center;    \n            align-items:center;\n  }"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-dark bg-primary\">\n  <a class=\"navbar-brand\" href=\"#\">\n    <img src=\"./assets/target.png\" width=\"30\" height=\"30\" class=\"d-inline-block align-top\" alt=\"\"> Alvo Certo\n  </a>\n\n\n  <label *ngIf='mostrarParticipante'> Olá, {{ this.participante.nome}} !</label>\n\n  <button type=\"button\" class=\"btn btn-primary\" style=\"float:right\" *ngIf='mostrarParticipante'>\n    Vitorias:\n    <span class=\"badge badge-light\">{{ this.participante.pontos}}</span>\n  </button>\n\n\n</nav>\n\n<div class=\"jumbotron jumbotron-fluid\">\n\n  <div class=\"container\" *ngIf=\"!iniciarJogo\">\n    <div class=\"row\">\n      <div class=\"col-sm\">\n        <div class=\"form-group\">\n          <label>Escolha seu nome de jogador</label>\n          <input type=\"text\" class=\"form-control\" placeholder=\"Seu nome\" #nomeJogador>\n        </div>\n        <button type=\"button\" class=\"btn btn-success\" (click)=\"iniciarPartida(nomeJogador.value)\">Iniciar</button>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf='!resetarJogo'>\n    <div class=\"container\" *ngIf=\"iniciarJogo\">\n      <div class=\"row\">\n        <div class=\"col-xs mx-auto\">\n          <label for=\"\">O numero sorteado está entre:</label>\n         \n          <div class=\"alert alert-light\" role=\"alert\">\n            <button type=\"button\" class=\"btn btn-success btn-circle btn-xl\">{{ this.valorMinimo }}</button>\n            &nbsp; &nbsp; &nbsp;\n            <button type=\"button\" class=\"btn btn-danger btn-circle btn-xl\">{{ this.valorMaximo }}</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"container\" *ngIf=\"iniciarJogo\">\n      <div class=\"row\">\n        <div class=\"col-md mx-auto\">\n          <div class=\"input-group mb-3\">\n            <input type=\"number\" class=\"form-control\" min=\"0\" max=\"100\" #numero [(ngModel)]=\"this.valor\" placeholder=\"Valor\" aria-label=\"Recipient's username\"\n              aria-describedby=\"button-addon2\">\n            <div class=\"input-group-append\">\n              <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-addon2\" (click)=\"verificarNumero(numero.value)\">Verificar</button>\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n\n\n    <div class=\"container\" *ngIf=\"iniciarJogo\">\n      <div class=\"row\">\n        <div class=\"col-sm\">\n          <label for=\"\" *ngIf='mostrarParticipante'> Jogadores Online:</label>\n          <ul *ngFor=\"let participante of listaParticipantes\">\n            <li>\n              <button type=\"button\" class=\"btn btn-outline-primary btn-circle-usr btn-xl\">\n                <i class=\"fa fa-child\" style=\"font-size:30px\"></i>\n              </button>\n              {{ participante.nome}}: {{participante.pontos}}\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n  <div class=\"container\" *ngIf='resetarJogo'>\n    <div class=\"row\">\n      <div class=\"col-sm\">\n        <img src=\"./assets/target.png\" width=\"200\" height=\"200\" class=\"d-inline-block align-top\" alt=\"\">\n        <p class=\"h2\">Parabéns, o ganhador foi,</p>\n        <p class=\"h1\">{{this.ganhadorRodada.nome }}</p>\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"ocultarSplash()\">Nova Rodada</button>\n      </div>\n    </div>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        var _this = this;
        this.mostrarParticipante = false;
        this.iniciarJogo = false;
        this.valorMinimo = '0';
        this.valorMaximo = '100';
        this.mostrarUltimoGanhador = false;
        this.listaParticipantes = [];
        this.resetarJogo = false;
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__();
        this.socket.on('addPart', function (participantes) {
            _this.listaParticipantes.length = 0;
            _this.listaParticipantes = participantes;
            var sock = _this.socket.id;
            var part = _this.listaParticipantes.filter(function (el) {
                return (el.id == sock);
            });
            _this.participante = part[0];
            _this.mostrarParticipante = true;
            console.log(_this.participante);
        });
        this.socket.on('proximaTentativa', function (num) {
            _this.valorMinimo = num.minimo;
            _this.valorMaximo = num.maximo;
        });
        this.socket.on('finalRodada', function (listaParticipantes, ganhador, numAcerto, num) {
            _this.listaParticipantes = listaParticipantes;
            _this.ganhadorRodada = ganhador[0];
            _this.mostrarUltimoGanhador = true;
            _this.numAcerto = numAcerto;
            _this.valorMinimo = num.minimo;
            _this.valorMaximo = num.maximo;
            if (ganhador[0].id == _this.participante.id) {
                console.log("eu");
                _this.participante.pontos = ganhador[0].pontos;
            }
            console.log("Fim de jogo o Ganhador foi: " + _this.ganhadorRodada.nome);
            _this.resetarJogo = true;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.iniciarPartida = function (nome) {
        if (nome.trim().length == 0) {
            alert("Digite seu nome !");
        }
        else {
            this.iniciarJogo = true;
            this.socket.emit('addPart', { "participante": nome });
        }
    };
    AppComponent.prototype.verificarNumero = function (num) {
        // this.valor = '';
        if (num == "") {
            console.log("Digite um numero");
            this.valor = '';
        }
        else {
            this.socket.emit('tentativa', num);
            this.valor = '';
        }
    };
    AppComponent.prototype.ocultarSplash = function () {
        this.resetarJogo = false;
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map