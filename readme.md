# MES

- Node.js and npm must be installed on your system. If you haven't installed them yet, download them from https://nodejs.org/en/download/current.


## Draw Chart from MES Files

### Getting Started

First, you need to install all the necessary packages. Open a terminal or command prompt in your project's root directory and run:

```bash
  npm install
```

To generate charts, create a folder within the project folder and place your MES files there. Then, execute the following command, replacing < folder-path > with the path to your folder:

```bash
  npm run index.js '< folder-path >'
```

This will generate all the charts within the specified < folder-path >.

For convenience, if your MES files are in a folder named mes within your project, you can simply run:

```bash
  npm run index.js
```


## Generate MES Average

## Getting Started

Install all required packages by running:

```bash
  npm install
```

To calculate the average from your MES files, create a folder within the project directory for your MES files. You can specify how many files to skip when calculating the average by setting a value for N in the following command:

```bash
  npm run avg.js '< folder-path >' 'N'
```

This will generate all the avg files in <folder-name>.
