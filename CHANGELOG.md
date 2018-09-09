# Change Log

<!-- markdownlint-disable MD024 -->

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [0.3.0] - 2018-09-09

### Added

- Add a clickable backdrop while showing the nav menu
- Add a progress bar component to display percentage data
- Create mixins and components for shared logic at creation poll components
- Add a Yes/No poll-type as a quick selection poll type
- Add a Selection poll type

### Fixed

- Parse the multiline polls descriptions correctly when sharing through WhatsApp

## [0.2.0] - 2018-06-07

### Added

- Vote button on anonymous mode at registration type polls
- `.outline` variation of CSS button component
- A recount of participants on registration polls title at fill view
- Add the poll description while sharing it through WhatsApp
- Modal dialog component for asking the user to confirm actions
- Delete buttons for polls and user votes (only proprietary)

### Changed

- Use an opacity and background feedback on disabled and active buttons
- More clear name and password labels and placeholders
- Order the activity polls and user votes by the last modified date
- Show a reduced list of activity polls and user votes while sharing through WhatsApp
- Add animations for user votes list changes at registration polls

### Fixed

- Use the firebase server timestamp value instead of trust user device clock
- Fix a Spanish translation at the footer
- Use environment var for set production tip and global error handler

## [0.1.0] - 2018-05-28

### Added

- Basic `HomePage` that shows basic PollMe info
- **Polls module** for view the user polls and user activity across any poll
- **Poll module** for the stuff related to a specific poll (create, fill, etc)
- **User module** that manages all the user related features like login,
  register or profile update
- **Registration** poll type
- **Share poll** utilities for share the poll results on **Whats App**
- Support pages like **NotFoundPage** or **ErrorPage**
- Rapid **UI development** using **Tailwind**, the utility-first CSS framework
- **Auth** support using **Firebase authentication**
- **Firebase real-time database** support for **store the app data**
- **Files upload** support using the **Firebase storage** service
- **Vuex** state management for **share the store data** across the app
- Form **validations** using **Vuelidate** library
- **Internationalization** support using the **vue-i18n** library
- **Continuous integration** (CI) using **Ttravis CI** service
- **Continuous deployment** (CD) using the **Netlify** service
- **PWA** app configuration for allow the users install the app on their devices

[Unreleased]: https://github.com/Poll-me/poll-me-vue/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/Poll-me/poll-me-vue/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Poll-me/poll-me-vue/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Poll-me/poll-me-vue/compare/v0.0.0...v0.1.0
