import {Request, Response} from "express";
import fs from 'fs';
//import camelCase from 'camelcase';
import {camelCase} from "change-case";
import {ResponseSender} from "../../../core/builders/responseSender";
import {
    blocEventStringTemplate,
    blocStateStringTemplate,
    blocStringTemplate,
    domainFacadeStringTemplate,
    domainFailureStringTemplate,
    domainModelStringTemplate,
    implementationStringTemplate,
    localSourceStringTemplate,
    pageStringTemplate, pageWidgetStringTemplate,
    remoteSourceStringTemplate
} from "../../../core/configs/constants";

const StringTemplate = require('es6-template-string');

const get = async (req: Request, res: Response) => {
    try {
        // + Validating
        const {module} = req.body;
        if (!module) return ResponseSender.badRequest(res, 'Module not specified!');

        // + Processing
        const root = 'modules/';
        const moduleName: string = module;
        const moduleCamelCase = camelCase(moduleName);
        const moduleSnakeCase = getSnakeCase(moduleName);
        const fullParentPath = `${root}${moduleName}/${moduleSnakeCase}/`;
        const templateData = {
            module: moduleName, //ModuleName
            moduleCamel: moduleCamelCase, //moduleName
            moduleSnake: moduleSnakeCase, //module_name
        };

        // => Saving Bloc Files
        const blocFolderPath = `${fullParentPath}application/${moduleSnakeCase}/`;
        const savedBlocFile = saveFile(blocFolderPath, `${moduleSnakeCase}_bloc.dart`,
            blocStringTemplate,
            templateData);
        const savedBlocEventFile = saveFile(blocFolderPath, `${moduleSnakeCase}_event.dart`,
            blocEventStringTemplate,
            templateData);
        const savedBlocStateFile = saveFile(blocFolderPath, `${moduleSnakeCase}_state.dart`,
            blocStateStringTemplate,
            templateData);

        // => Saving Domain Files
        const domainFolderPath = `${fullParentPath}domain/${moduleSnakeCase}/`;
        const savedModelFile = saveFile(domainFolderPath, `${moduleSnakeCase}.dart`,
            domainModelStringTemplate,
            templateData);
        const savedFailureFile = saveFile(domainFolderPath, `${moduleSnakeCase}_failure.dart`,
            domainFailureStringTemplate,
            templateData);
        const savedFacadeFile = saveFile(domainFolderPath, `i_${moduleSnakeCase}_facade.dart`,
            domainFacadeStringTemplate,
            templateData);

        // => Saving Infrastructure Files
        const infraFolderPath = `${fullParentPath}infrastructure/`;
        // Saving DataSources
        const localDataSourcePath = `${infraFolderPath}datasources/local/`;
        const savedLocalDataSourceFile = saveFile(localDataSourcePath, `${moduleSnakeCase}_local_datasource.dart`,
            localSourceStringTemplate,
            templateData);

        const remoteDataSourcePath = `${infraFolderPath}datasources/remote/${moduleSnakeCase}/`;
        const savedRemoteDataSourceFile = saveFile(remoteDataSourcePath, `${moduleSnakeCase}_remote_datasource.dart`,
            remoteSourceStringTemplate,
            templateData);

        // Saving Facade
        const facadePath = `${infraFolderPath}implementation/${moduleSnakeCase}/`;
        const savedFacadeImplFile = saveFile(facadePath, `impl_${moduleSnakeCase}_facade.dart`,
            implementationStringTemplate,
            templateData);

        // => Saving Presentation
        const presentationPath = `${fullParentPath}presentation/page/${moduleSnakeCase}/`;
        const savedPageFile = saveFile(presentationPath, `page_${moduleSnakeCase}.dart`,
            pageStringTemplate,
            templateData);
        const savedPageWidgetFile = saveFile(`${presentationPath}widgets/`, `widget_${moduleSnakeCase}_main.dart`,
            pageWidgetStringTemplate,
            templateData);

        // + Returning
        ResponseSender.data(res, {
            moduleDirName: moduleSnakeCase,
        });
    } catch (err) {
        console.log(err);
        return ResponseSender.unexpected(res);
    }
};

const saveFile = (fullParentPath: string, name: string, template: string, data: Object) => {
    try {
        const fullPathExist = fs.existsSync(fullParentPath);
        if(!fullPathExist) fs.mkdirSync(fullParentPath, {recursive: true});
        const fileData = StringTemplate(template, data);
        fs.writeFileSync(`${fullParentPath}${name}`, Buffer.from(fileData), "binary");
        return fs.existsSync(`${fullParentPath}${name}`);
    } catch (e) {
        console.log(e);
        return false;
    }
};

const getSnakeCase = (text: string, ext?: string): string => {
    return `${text.split(/(?=[A-Z])/).join('_').toLowerCase()}${ext ? '.' + ext!.toLowerCase() : ''}`;
};

export {
    get
};
