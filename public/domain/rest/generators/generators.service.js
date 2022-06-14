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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const fs_1 = __importDefault(require("fs"));
const change_case_1 = require("change-case");
const responseSender_1 = require("../../../core/builders/responseSender");
const constants_1 = require("../../../core/configs/constants");
const StringTemplate = require('es6-template-string');
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { module } = req.body;
        if (!module)
            return responseSender_1.ResponseSender.badRequest(res, 'Module not specified!');
        const root = 'modules/';
        const moduleName = module;
        const moduleCamelCase = (0, change_case_1.camelCase)(moduleName);
        const moduleSnakeCase = getSnakeCase(moduleName);
        const fullParentPath = `${root}${moduleName}/${moduleSnakeCase}/`;
        const templateData = {
            module: moduleName,
            moduleCamel: moduleCamelCase,
            moduleSnake: moduleSnakeCase,
        };
        const blocFolderPath = `${fullParentPath}application/${moduleSnakeCase}/`;
        const savedBlocFile = saveFile(blocFolderPath, `${moduleSnakeCase}_bloc.dart`, constants_1.blocStringTemplate, templateData);
        const savedBlocEventFile = saveFile(blocFolderPath, `${moduleSnakeCase}_event.dart`, constants_1.blocEventStringTemplate, templateData);
        const savedBlocStateFile = saveFile(blocFolderPath, `${moduleSnakeCase}_state.dart`, constants_1.blocStateStringTemplate, templateData);
        const domainFolderPath = `${fullParentPath}domain/${moduleSnakeCase}/`;
        const savedModelFile = saveFile(domainFolderPath, `${moduleSnakeCase}.dart`, constants_1.domainModelStringTemplate, templateData);
        const savedFailureFile = saveFile(domainFolderPath, `${moduleSnakeCase}_failure.dart`, constants_1.domainFailureStringTemplate, templateData);
        const savedFacadeFile = saveFile(domainFolderPath, `i_${moduleSnakeCase}_facade.dart`, constants_1.domainFacadeStringTemplate, templateData);
        const infraFolderPath = `${fullParentPath}infrastructure/`;
        const localDataSourcePath = `${infraFolderPath}datasources/local/`;
        const savedLocalDataSourceFile = saveFile(localDataSourcePath, `${moduleSnakeCase}_local_datasource.dart`, constants_1.localSourceStringTemplate, templateData);
        const remoteDataSourcePath = `${infraFolderPath}datasources/remote/${moduleSnakeCase}/`;
        const savedRemoteDataSourceFile = saveFile(remoteDataSourcePath, `${moduleSnakeCase}_remote_datasource.dart`, constants_1.remoteSourceStringTemplate, templateData);
        const facadePath = `${infraFolderPath}implementation/${moduleSnakeCase}/`;
        const savedFacadeImplFile = saveFile(facadePath, `impl_${moduleSnakeCase}_facade.dart`, constants_1.implementationStringTemplate, templateData);
        const presentationPath = `${fullParentPath}presentation/page/${moduleSnakeCase}/`;
        const savedPageFile = saveFile(presentationPath, `page_${moduleSnakeCase}.dart`, constants_1.pageStringTemplate, templateData);
        const savedPageWidgetFile = saveFile(`${presentationPath}widgets/`, `widget_${moduleSnakeCase}_main.dart`, constants_1.pageWidgetStringTemplate, templateData);
        responseSender_1.ResponseSender.data(res, {
            moduleDirName: moduleSnakeCase,
        });
    }
    catch (err) {
        console.log(err);
        return responseSender_1.ResponseSender.unexpected(res);
    }
});
exports.get = get;
const saveFile = (fullParentPath, name, template, data) => {
    try {
        const fullPathExist = fs_1.default.existsSync(fullParentPath);
        if (!fullPathExist)
            fs_1.default.mkdirSync(fullParentPath, { recursive: true });
        const fileData = StringTemplate(template, data);
        fs_1.default.writeFileSync(`${fullParentPath}${name}`, Buffer.from(fileData), "binary");
        return fs_1.default.existsSync(`${fullParentPath}${name}`);
    }
    catch (e) {
        console.log(e);
        return false;
    }
};
const getSnakeCase = (text, ext) => {
    return `${text.split(/(?=[A-Z])/).join('_').toLowerCase()}${ext ? '.' + ext.toLowerCase() : ''}`;
};
