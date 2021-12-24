# comparefiles-shugen

Asyn files compare and create a html file.Currently, a maximum of six files can be compared at the same time. If necessary, it can be modified by itself.Supports the output of template files, including HTML, CSS, JS files, to achieve offline multi-version comparison output reference to the same CSS, JS file

# global install

```
npm install -g comparefiles-shugen
```

# command

## --html [path]

Prints the template HTLM file to the specified directory

## --css [path]

Prints the template CSS file to the specified directory

## --js [path]

Prints the template JS file to the specified directory

## --template

Specifies the HTML template referenced by the output HTML file

## --linkcss

Specify the CSS style file referenced by the HTML template, **using an absolute path**

## --linkjs

Specify the JS file referenced by the HTML template, **using an absolute path**

## -o 

Output HTML file path, default generated in the current directory comparefiles.html, <font color="red">note: the same file name will be overwritten</font>

# command line usage

## simple

```shell
comparefiles a.json b.json c.json 
```

```shell
comparefiles a.json b.json c.json -o G:\test.html
```

generating template offline 

```shell
comparefiles --html index.html --css index.css --js index.js
```

generate HTML files using the generated offline template

```shell
comparfiles --template index.html --linkcss G:\index.css --linkjs a.json b.json c.json -o test1.html 
```

