import * as msi from 'electron-wix-msi';
import * as path from 'path';

// Step 1: Instantiate the MSICreator
const msiCreator = new msi.MSICreator({
    appDirectory: path.resolve('./out/scriglov-win32-ia32'),
    description: 'App against dysgraphia',
    exe: 'scriglov',
    name: 'scriglov',
    manufacturer: 'scriglov',
    version: '1.1.2',
    outputDirectory: path.resolve('./msi')
  });

async function createMsi() {
	// Step 2: Create a .wxs template file
	await msiCreator.create();

	// Step 3: Compile the template to a .msi file
	await msiCreator.compile();
}
console.log('Invoke MSI Builder');
createMsi();