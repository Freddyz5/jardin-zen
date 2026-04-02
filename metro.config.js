const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];
config.resolver.extraNodeModules = {
	...config.resolver.extraNodeModules,
	tamagui: path.resolve(projectRoot, 'node_modules/tamagui'),
	'@tamagui/core': path.resolve(projectRoot, 'node_modules/@tamagui/core'),
	'@tamagui/web': path.resolve(projectRoot, 'node_modules/@tamagui/web'),
};

module.exports = config;
