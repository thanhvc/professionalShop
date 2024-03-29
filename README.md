#Market Observatory Shop Client
AngularJS client for Market Observatory Project

##Status
* Master
[![Build Status](http://katana.edosoftfactory.com:8080/job/MoShopClient%20-%20master/badge/icon)](http://katana.edosoftfactory.com:8080/job/MoShopClient%20-%20master/)
* Devel
[![Build Status](http://katana.edosoftfactory.com:8080/job/MoShopClient%20-%20devel%20branch/badge/icon)](http://katana.edosoftfactory.com:8080/job/MoShopClient%20-%20devel%20branch/)

##Quickstart

Install Node.js latest version and then:

```sh
$ git clone https://github.com/edosoft/mo-shopclient.git cd ng-boilerplate
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt watch --force
```
##Development server

I've provide a virtual with nginx webserver, with a host only network interface and a virtual host preconfigured.

Install VirtualBox
Install Vagrant

```sh
clone https://github.com/aitorcarrera/vagrant-nginx.git
```
Take into consideration that this is a public repository managed by Aitor Carrera, there is not any company information,
or specific software related stuff, just Open source code and some configuration magic, mostly provided by
https://puphpet.com

```sh
$sudo sh -c "mkdir /opt/mo-shopclient-deployment && chmod 777 /opt/mo-shopclient-deployment"
cd vagrant-nginx
vagrant up
vagrant provision
$sudo sh -c 'echo "192.168.56.101 mo-shopclient.development.com" >> /etc/hosts'
```
Then you can configure your ide to deploy to /opt/mo-shopclient-deployment and you can see your results at

[http://mo-shopclient.development.com/](http://mo-shopclient.development.com/)

## Translations

The translation libraries are [angular-gettext](https://github.com/rubenv/angular-gettext)
TODO: Add translations.js to the project.

## Learn

### Overall Directory Structure

At a high level, the structure looks roughly like this:

```
mo-shopclient/
|-- CHANGELOG.md
|-- Gruntfile.js
|-- LICENSE
|-- README.md
|-- bower.json
|-- build.config.js
|-- changelog.tpl
|-- karma
|   `-- karma-unit.tpl.js
|-- module.prefix
|-- module.suffix
|-- package.json
|-- src
|   |-- README.md
|   |-- app
|   |   |-- README.md
|   |   |-- app.js
|   |   |-- app.spec.js
|   |   |-- contact
|   |   |   |-- business
|   |   |   |-- job
|   |   |   |-- localization
|   |   |   `-- support
|   |   |-- home
|   |   |   |-- README.md
|   |   |   |-- catalog
|   |   |   |-- home.js
|   |   |   |-- home.less
|   |   |   |-- home.spec.js
|   |   |   `-- home.tpl.html
|   |   |-- investor_tools
|   |   |   |-- articles
|   |   |   |-- mo_template_collections
|   |   |   |-- resources
|   |   |   `-- symbols_and_exchanges
|   |   |-- market_observatory
|   |   |   |-- data_protection
|   |   |   |-- organization
|   |   |   |-- service_conditions
|   |   |   `-- what_is_and_what_is_not
|   |   |-- service_applications
|   |   |   |-- advanced
|   |   |   |-- diversification
|   |   |   |-- etf_cfd
|   |   |   |-- funds
|   |   |   |-- futures
|   |   |   |-- pairs
|   |   |   `-- stocks
|   |   |-- services
|   |   |   |-- detailed_description
|   |   |   |-- fundamentals
|   |   |   |-- products_and_exchanges
|   |   |   `-- summary
|   |   |-- sign_in
|   |   |-- sign_up
|   |   `-- subscriptions_and_prices
|   |       |-- free_subscription
|   |       |-- prices
|   |       |-- products
|   |       |-- purchase
|   |       |-- shopping_guide
|   |       `-- subscription_types
|   |-- assets
|   |   `-- README.md
|   |-- common
|   |   |-- README.md
|   |   `-- services
|   |-- index.html
|   `-- less
|       |-- README.md
|       |-- main.less
|       `-- variables.less
|-- tools.md
`-- vendor
```

What follows is a brief description of each entry, but most directories contain
their own `README.md` file with additional documentation, so browse around to
learn more.

- `karma/` - test configuration.
- `src/` - our application sources. [Read more &raquo;](src/README.md)
- `vendor/` - third-party libraries. [Bower](http://bower.io) will install
  packages here. Anything added to this directory will need to be manually added
  to `build.config.js` and `karma/karma-unit.js` to be picked up by the build
  system.
- `.bowerrc` - the Bower configuration file. This tells Bower to install
  components into the `vendor/` directory.
- `bower.json` - this is our project configuration for Bower and it contains the
  list of Bower dependencies we need.
- `build.config.js` - our customizable build settings; see "The Build System"
  below.
- `Gruntfile.js` - our build script; see "The Build System" below.
- `module.prefix` and `module.suffix` - our compiled application script is
  wrapped in these, which by default are used to place the application inside a
  self-executing anonymous function to ensure no clashes with other libraries.
- `package.json` - metadata about the app, used by NPM and our build script. Our
  NPM dependencies are listed here.

### Detailed Installation

This section provides a little more detailed understanding of what goes into
getting `mo-shopclient` up and running. Though `mo-shopclient` is really simple
to use, it might help to have an understanding of the tools involved here, like
Node.js and Grunt and Bower. If you're completely new to highly organized,
modern JavaScript development, take a few short minutes to read [this overview
of the tools](tools.md) before continuing with this section.

Okay, ready to go? Here it is:

`mo-shopclient` uses [Grunt](http://gruntjs.org) as its build system, so
[Node.js](http://nodejs.org) is required. Also, Grunt by default no longer comes
with a command-line utility and Karma and Bower must end up in your global path
for the build system to find it, so they must be installed independently. Once
you have Node.js installed, you can simply use `npm` to make it all happen:

```sh
$ npm -g install grunt-cli karma bower
```

If you're on Linux (like I am) then throw `sudo` in front of that command.  If
you're on Windows, then you're on your own.

Next, you can either clone this repository using Git, download it as a zip file
from GitHub, or merge the branch into your existing repository. Assuming you're
starting from scratch, simply clone this repository using git:

```sh
$ git clone git://github.com/joshdmiller/ng-boilerplate my-project-name
$ cd my-project-name
```

And then install the remaining build dependencies locally:

```sh
$ npm install
```

This will read the `dependencies` (empty by default) and the `devDependencies`
(which contains our build requirements) from `package.json` and install
everything needed into a folder called `node_modules/`.

There are many Bower packages used by `mo-shopclient`, like Twitter Bootstrap
and Angular UI, which are listed in `bower.js`. To install them into the
`vendor/` directory, simply run:

```sh
$ bower install
```

In the future, should you want to add a new Bower package to your app, run the
`install` command:

```sh
$ bower install packagename --save-dev
```

The `--save-dev` flag tells Bower to add the package at its current version to
our project's `bower.js` file so should another developer download our
application (or we download it from a different computer), we can simply run the
`bower install` command as above and all our dependencies will be installed for
us. Neat!

Technically, `mo-shopclient` is now ready to go.

However, prior to hacking on your application, you will want to modify the
`package.json` file to contain your project's information. Do not remove any
items from the `devDependencies` array as all are needed for the build process
to work.

To ensure your setup works, launch grunt:

```sh
$ grunt watch
```

The built files are placed in the `build/` directory by default. Open the
`build/index.html` file in your browser and check it out! Because everything is
compiled, no XHR requests are needed to retrieve templates, so until this needs
to communicate with your backend there is no need to run it from a web server.

`watch` is actually an alias of the `grunt-contrib-watch` that will first run a
partial build before watching for file changes. With this setup, any file that
changes will trigger only those build tasks necessary to bring the app up to
date. For example, when a template file changes, the templates are recompiled
and concatenated, but when a test/spec file changes, only the tests are run.
This allows the watch command to complete in a fraction of the time it would
ordinarily take.

In addition, if you're running a Live Reload plugin in your browser (see below),
you won't even have to refresh to see the changes! When the `watch` task detects
a file change, it will reload the page for you. Sweet.

When you're ready to push your app into production, just run the `compile`
command:

```sh
$ grunt compile
```

This will concatenate and minify your sources and place them by default into the
`bin/` directory. There will only be three files: `index.html`,
`your-app-name.js`, and `your-app-name.css`. All of the vendor dependencies like
Bootstrap styles and AngularJS itself have been added to them for super-easy
deploying. If you use any assets (`src/assets/`) then they will be copied to
`bin/` as is.

Lastly, a complete build is always available by simply running the default
task, which runs `build` and then `compile`:

```sh
$ grunt
```

### The Build System

The best way to learn about the build system is by familiarizing yourself with
Grunt and then reading through the heavily documented build script,
`Gruntfile.js`. But you don't need to do that to be very productive with
`mo-shopclient`. What follows in this section is a quick introduction to the
tasks provided and should be plenty to get you started.

The driver of the process is the `delta` multi-task, which watches for file
changes using `grunt-contrib-watch` and executes one of nine tasks when a file
changes:

* `delta:gruntfile` - When `Gruntfile.js` changes, this task runs the linter
  (`jshint`) on that one file and reloads the configuration.
* `delta:assets` - When any file within `src/assets/` changes, all asset files
  are copied to `build/assets/`.
* `delta:html` - When `src/index.html` changes, it is compiled as a Grunt
  template, so script names, etc., are dynamically replaced with the correct
  values configured dynamically by Grunt.
* `delta:less` - When any `*.less` file within `src/` changes, the
  `src/less/main.less` file is linted and copied into
  `build/assets/ng-boilerplate.css`.
* `delta:jssrc` - When any JavaScript file within `src/` that does not end in
  `.spec.js` changes, all JavaScript sources are linted, all unit tests are run,
  and the all source files are re-copied to `build/src`.
* `delta:coffeesrc` - When any `*.coffee` file in `src/` that doesn't match
  `*.spec.coffee` changes, the Coffee scripts are compiled independently into
  `build/src` in a structure mirroring where they were in `src/` so it's easy to
  locate problems. For example, the file
  `src/common/titleService/titleService.coffee` is compiled to
  `build/src/common/titleService/titleService.js`.
* `delta:tpls` - When any `*.tpl.html` file within `src/` changes, all templates
  are put into strings in a JavaScript file (technically two, one for
  `src/common/` and another for `src/app/`) that will add the template to
  AngularJS's
  [`$templateCache`](http://docs.angularjs.org/api/ng.$templateCache) so
  template files are part of the initial JavaScript payload and do not require
  any future XHR.  The template cache files are `build/template-app.js` and
  `build/template-common.js`.
* `delta:jsunit` - When any `*.spec.js` file in `src/` changes, the test files
  are linted and the unit tests are executed.
* `delta:coffeeunit` - When any `*.spec.coffee` file in `src/` changes, the test
  files are linted, compiled their tests executed.

As covered in the previous section, `grunt watch` will execute a full build
up-front and then run any of the aforementioned `delta:*` tasks as needed to
ensure the fastest possible build. So whenever you're working on your project,
start with:

```sh
$ grunt watch
```

And everything will be done automatically!

### Build vs. Compile

To make the build even faster, tasks are placed into two categories: build and
compile. The build tasks (like those we've been discussing) are the minimal
tasks required to run your app during development.

Compile tasks, however, get your app ready for production. The compile tasks
include concatenation, minification, compression, etc. These tasks take a little
bit longer to run and are not at all necessary for development so are not called
automatically during build or watch.

To initiate a full compile, you simply run the default task:

```sh
$ grunt
```

This will perform a build and then a compile. The compiled site - ready for
uploading to the server! - is located in `bin/`, taking a cue from
traditional software development. To test that your full site works as
expected, open the `bin/index.html` file in your browser. Voila!

### Live Reload!

`mo-shopclient` also includes [Live Reload](http://livereload.com/), so you no
longer have to refresh your page after making changes! You need a Live Reload
browser plugin for this:

- Chrome - [Chrome Webstore](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
- Firefox - [Download from Live Reload](http://download.livereload.com/2.0.8/LiveReload-2.0.8.xpi)
- Safari - [Download from Live Reload](http://download.livereload.com/2.0.9/LiveReload-2.0.9.safariextz)
- Internet Explorer - Surely you jest.

Note that if you're using the Chrome version with `file://` URLs (as is the
default with `mo-shopclient`) you need to tell Live Reload to allow it. Go to
`Menu -> Tools -> Extensions` and check the "Allow access to file URLs" box next
to the Live Reload plugin.

When you load your page, click the Live Reload icon in your toolbar and
everything should work magically. w00t!

If you'd prefer to not install a browser extension, then you must add the
following to the end of the `body` tag in `index.html`:

```html
<script src="http://localhost:35729/livereload.js"></script>
```

Boom!

## Roadmap

This is a project that is not broad in scope, so there's not really much of a
wish list here. But I would like to see a couple of things:

I'd like it to be a little simpler. I want this to be a universal starting
point. If someone is starting a new AngularJS project, she should be able to
clone, merge, or download its source and immediately start doing what she needs
without renaming a bunch of files and methods or deleting spare parts. What I
have works for a first release, but I just think there is a little too much here
right now.

I'd also like to see a simple generator. Nothing like Yeoman, as there already
is one of those, but just something that allows the user to say "I want
Bootstrap but not Font Awesome and my app is called 'coolApp'. Gimme." Perhaps a
custom download builder like UI Bootstrap has. Like that. Then again, perhaps
some Yeoman generators wouldn't be out of line. I don't know. What do you think?

Naturally, I am open to all manner of ideas and suggestions. See the
"Contributing" section below.

### To Do

See the [issues list](http://github.com/joshdmiller/ng-boilerplate/issues). And
feel free to submit your own!

### Contributing

This is an opinionated kickstarter, but the opinions are fluid and
evidence-based. Don't like the way I did something? Think you know of a better
way? Have an idea to make this more useful? Let me know! You can contact me
through all the usual channels or you can open an issue on the GitHub page. If
you're feeling ambitious, you can even submit a pull request - how thoughtful
of you!

So join the team! We're good people.

