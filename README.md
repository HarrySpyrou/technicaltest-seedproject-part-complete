#Notes: 
I would only do bugfixes on a release branch but since this is a test, I'll pretend these are not updates but bugfixes.

1. I went for the simplest solution I could think of. Hiding/showing divs based on the filter logic. I wouldn't go for this solution if I had to deal with more than a full page of anything. I would create another client call to the backend that will pass in the filters that I need and get the backend to serve only the deals that I need to show.
2. I was surprised thinking it doesn't work when I included 'Fibre' in the broadband deals. It turns out all of them are either broadband or Fibre broadband.
3. I had almost no clue how jest works so that took an hour or so to figure out.
4. Didn't write tests for the whole project, only the functions I created/modified.
5. Used Git flow to work with branches. This release candidate would be the one that in a real world scenario gets built and released by the pipeline.
6. There's one of the 'features' that was pushed as a fast forward by mistake, but with the correct procedure.

Reading docs about Jest, reading code to understand what each file/line is doing: around 2-3 hours
Coding solution: 1.5 hour overall with the tests included.

The time on the repo spans out throughout a day because I unfortunately had a lot of work so I was doing it in between.

To whoever wrote the test: Two things I found very clever. The fact it's Vanilla JS as most people know Angular, Vue but not vanilla. 
Second is that everything has pretty much a js class as it usually any library (like Vue) involves reacting on the templates.


# Decision Technologies Front-End Technical Test

## Getting started

Please fork this repository to get started.

### Prerequisites

- NodeJS (at least latest LTS)
- Modern browser that supports ES6+ (classes, arrow functions etc)

## Scenario

The aim of this exercise is to implement the filter logic for a 'broadband deals' grid.

![screenshot](screenshot.PNG)

This codebase is written in vanilla JavaScript. We would like you to avoid using any frameworks or libraries for this task (e.g. lodash, underscore etc). You are free to use any modern JavaScript language features that are supported in modern evergreen browsers (the compile step does not transpile ES6 to ES5, so experimental language features may not work). We will be assessing your submission in Chrome.

You shouldn't need to do any work with styling or markup as the focus is on implementing the filter logic. However, if you get time and you'd like to flesh out the UI/site in anyway to show off your skills, feel free!

### Mininum expectations

We are expecting a submission that shows an understanding of TDD principles. Please provide a public link to a git repository for us to download and analyse your code (GitHub or similar). Please commit to this repository as you complete the exercise. We are not looking for elapsed time, but we are looking for good source control habits.

The tests are written in [Jest](https://jestjs.io/) and an initial test suite can be found in `src/scripts/__tests__`.

> ℹ️ NOTE: You will find the JSON data for the deals in `public/db.json`

### Filter criteria

- **WHEN** no filters applied **THEN** show all **11** deals
- **WHEN** filtering by _broadband_ **THEN** show the **4** broadband only deals
- **WHEN** filtering by _broadband_ **AND** _tv_ **THEN** show the **4** deals for broadband and tv only
- **WHEN** filtering by _broadband_ **AND** _mobile_ **THEN** show the **1** deal for broadband and mobile only
- **WHEN** filtering by _Sky_ **THEN** show the **1** deal for Sky only
- **WHEN** filtering by _BT_, _broadband_ **AND** _tv_ **THEN** show the **2** deals for BT with broadband and tv only

> ℹ️ NOTE: 'Broadband' and 'Fibre Broadband' should be considered the same product. 'Phone' should be ignored.

## Getting set up

To get the site up and running, follow these simple steps:

```bash
# Install dependencies
npm install

# The following steps will need to be run in different processes

# Serve JSON data
npm run db

# Serve site in 'watch' mode, automatically open default browser
npm run serve
```

By default, the JSON server runs at `http://localhost:3000`, and the site is served from `http://localhost:5000`.

To run the test suites, you can use the following commands:

```bash
# Single run of test suites
npm run test

# Run test suites in 'watch' mode
npm run test:watch
```

## Commands

Run commands via NPM e.g. `npm run test:watch` from the project root.

| Command      | Description                                    |
| ------------ | ---------------------------------------------- |
| `test`       | Single run of test suites                      |
| `test:watch` | Run test suites in 'watch' mode                |
| `clean`      | Delete compiled assets                         |
| `db`         | Serve JSON data                                |
| `serve`      | Serve site, automatically open default browser |
