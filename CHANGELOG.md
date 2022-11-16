# Changelog

# [8.4.4](https://github.com/nolimits4web/Swiper/compare/v8.4.3...v8.4.4) (2022-10-12)

### Features

- add direct JS/CSS core and bundle exports ([f519f80](https://github.com/nolimits4web/Swiper/commit/f519f80f1fb9e3dab9b8b57c2550c83d550f07ac))

# [8.4.3](https://github.com/nolimits4web/Swiper/compare/v8.4.2...v8.4.3) (2022-10-06)

### Bug Fixes

- **a11y:** don't focus slide on slide inner elements clicks ([c8e22f7](https://github.com/nolimits4web/Swiper/commit/c8e22f7a3e2aa2aa5f2f1a6b1e131473d63c1c46)), closes [#6116](https://github.com/nolimits4web/Swiper/issues/6116)

### Features

- **build-config:** allow to custom modules by process.env.SWIPER_BUILD_MODULES ([#6043](https://github.com/nolimits4web/Swiper/issues/6043)) ([b3c51c5](https://github.com/nolimits4web/Swiper/commit/b3c51c5ff7663bee10dc09dbda0d41f64ff0fdfa))
- **solid:** fix handling dynamic slides ([708133d](https://github.com/nolimits4web/Swiper/commit/708133d90c7be8163f3101530f61f0d855d80773)), closes [#6031](https://github.com/nolimits4web/Swiper/issues/6031)
- **solid:** keep solid components in `.jsx` ([d7f7f65](https://github.com/nolimits4web/Swiper/commit/d7f7f65052cde0d5d7b15239b5bc3762ac3b8911))

# [8.4.2](https://github.com/nolimits4web/Swiper/compare/v8.4.1...8.4.2) (2022-09-15)

### Bug Fixes

- **onTouchStart.js:** Fix target element assignment ([#6065](https://github.com/nolimits4web/Swiper/issues/6065)) ([cb46a9a](https://github.com/nolimits4web/Swiper/commit/cb46a9a56b05b415bc5dbe69e84ef263f6766437))

# [8.4.1](https://github.com/nolimits4web/Swiper/compare/v8.4.0...v8.4.1) (2022-09-15)

### Bug Fixes

- **core:** fix swiping over nested shadow doms ([7d09ab0](https://github.com/nolimits4web/Swiper/commit/7d09ab006666c5e102d5249d2c66fd2565e5acaf)), closes [#6063](https://github.com/nolimits4web/Swiper/issues/6063)
- **react:** fix issue with checking children ([37a94ea](https://github.com/nolimits4web/Swiper/commit/37a94eaa123b73ae09fa820f6bafda877f4df864)), closes [#6064](https://github.com/nolimits4web/Swiper/issues/6064)

# [8.4.0](https://github.com/nolimits4web/Swiper/compare/v8.3.2...v8.4.0) (2022-09-14)

### Bug Fixes

- **a11y:** don't handle focus on pointer events ([b251601](https://github.com/nolimits4web/Swiper/commit/b2516014b293bfc2cfc02ea07f5e888973787295)), closes [#5962](https://github.com/nolimits4web/Swiper/issues/5962) [#5814](https://github.com/nolimits4web/Swiper/issues/5814) [#5524](https://github.com/nolimits4web/Swiper/issues/5524) [#5490](https://github.com/nolimits4web/Swiper/issues/5490) [#5437](https://github.com/nolimits4web/Swiper/issues/5437)
- **angular:** slidesPerGroupAuto is missing in params list for angular ([#5933](https://github.com/nolimits4web/Swiper/issues/5933)) ([b80352a](https://github.com/nolimits4web/Swiper/commit/b80352a22746d52cd53beea3e31350ef0e4c4dbf))
- **core:** fix `beforeSlideChangeStart` event routing ([0e8a8b8](https://github.com/nolimits4web/Swiper/commit/0e8a8b85f757f4bea39f60418c52cadce7a44e57)), closes [#5913](https://github.com/nolimits4web/Swiper/issues/5913)
- event.path => event.composedPath ([8df7edf](https://github.com/nolimits4web/Swiper/commit/8df7edffb8a30250298f5b5978f5b833f08ee4f4)), closes [#5925](https://github.com/nolimits4web/Swiper/issues/5925)
- **types:** add isLocked definition ([f2bbae6](https://github.com/nolimits4web/Swiper/commit/f2bbae60ce129650713da25f568741679ebf2b66)), closes [#5941](https://github.com/nolimits4web/Swiper/issues/5941)
- **types:** add missing AutoplayMethods members ([#5956](https://github.com/nolimits4web/Swiper/issues/5956)) ([6220c22](https://github.com/nolimits4web/Swiper/commit/6220c2270afe927f8a914386c76a0788a45de052))
- **vue:** fix swiperRef for Vue swiperSlide ([#5994](https://github.com/nolimits4web/Swiper/issues/5994)) ([a2bcbb1](https://github.com/nolimits4web/Swiper/commit/a2bcbb1790145d8cd8c76af22dea9ece89d206dc))

### Features

- **build:** upgrade deps & cjs to esm ([#5927](https://github.com/nolimits4web/Swiper/issues/5927)) ([921809b](https://github.com/nolimits4web/Swiper/commit/921809b963d03a76999df0c93e7158646d2a48ef))
- **cards-effect:** add `perSlideRotate` and `perSlideOffset` parameters ([db08a70](https://github.com/nolimits4web/Swiper/commit/db08a70fcde1c8a33c3dba29e2b4193f10fcbb98)), closes [#5939](https://github.com/nolimits4web/Swiper/issues/5939)
- **core:** new `loopedSlidesLimit` parameter to re-duplicate slides ([1afa4b8](https://github.com/nolimits4web/Swiper/commit/1afa4b84b980f8f5de0218ca66064a1c12216839))
- **react:** Allow SwiperSlide children as long as displayName includes SwiperSlide ([#5954](https://github.com/nolimits4web/Swiper/issues/5954)) ([d1f7582](https://github.com/nolimits4web/Swiper/commit/d1f7582633827b53612746096d738b33697999de))
- **solid:** keep solid components incompiled ([18c6670](https://github.com/nolimits4web/Swiper/commit/18c66709a0e0119b7dd0dbb01a268e502bfc28c7)), closes [#5943](https://github.com/nolimits4web/Swiper/issues/5943)

### Reverts

- Revert "chore(deps): upgrade angular to v14 (#5926)" (#5929) ([ae429c4](https://github.com/nolimits4web/Swiper/commit/ae429c4d4d2e4401733d4bf576da94cb3c8a34e2)), closes [#5926](https://github.com/nolimits4web/Swiper/issues/5926) [#5929](https://github.com/nolimits4web/Swiper/issues/5929)

# [8.3.2](https://github.com/nolimits4web/Swiper/compare/v8.3.1...v8.3.2) (2022-07-26)

### Bug Fixes

- **a11y:** fix `focus` handling ([8a3dfee](https://github.com/nolimits4web/Swiper/commit/8a3dfee2a3b26c56d6cd173094a08db8846f2fe6)), closes [#5905](https://github.com/nolimits4web/Swiper/issues/5905)
- **autoplay:** don't run autoplay if swiper is hidden ([4f2e30f](https://github.com/nolimits4web/Swiper/commit/4f2e30f7a1607eb134d62153e9870bd6a9e26692)), closes [#5907](https://github.com/nolimits4web/Swiper/issues/5907)

### Features

- **core:** new loopedSlidesLimit paramter and new functionality to increase duplicated slides ([5156071](https://github.com/nolimits4web/Swiper/commit/5156071299fd7e1dc6041dcdfa7f127f7bbcf0c3))

# [8.3.1](https://github.com/nolimits4web/Swiper/compare/v8.3.0...v8.3.1) (2022-07-13)

### Bug Fixes

- **packages:** add index.js in /solid and /react ([#5863](https://github.com/nolimits4web/Swiper/issues/5863)) ([6e94701](https://github.com/nolimits4web/Swiper/commit/6e947010f065dbaedf3fd00b936a95926d414503))
- **solid:** fix reactivity ([502c152](https://github.com/nolimits4web/Swiper/commit/502c152270ef0f528bbb05ccc10f00668286fb67)), closes [#5862](https://github.com/nolimits4web/Swiper/issues/5862)
- **solid:** stop using cloneNode in sliders without loops in SolidJS ([#5860](https://github.com/nolimits4web/Swiper/issues/5860)) ([d14c432](https://github.com/nolimits4web/Swiper/commit/d14c432956b0d61711ea2c7ddf5620c6fbb10578))

# [8.3.0](https://github.com/nolimits4web/Swiper/compare/v8.2.6...v8.3.0) (2022-07-06)

### Features

- all new Swiper SolidJS components thanks to @TiagoCavalcante 🎉
- move common helpers for React/Vue/Svelte/Solid to single files ([90e8da1](https://github.com/nolimits4web/Swiper/commit/90e8da1da94549ee827d0fd2b3cc3c0b0d9dd3a3))
- **a11y:** allow disabling slideRole ([#5838](https://github.com/nolimits4web/Swiper/issues/5838)) ([b376aa1](https://github.com/nolimits4web/Swiper/commit/b376aa1f68b29560168cff5418715dfe3312ba39))

# [8.2.6](https://github.com/nolimits4web/Swiper/compare/v8.2.5...v8.2.6) (2022-06-29)

### Bug Fixes

- **thumbs:** active class gets removed ([#5826](https://github.com/nolimits4web/Swiper/issues/5826)) ([3267616](https://github.com/nolimits4web/Swiper/commit/3267616d53d8e943b690a20ac327024cd3b2fff8))
- **vue:** virtualUpdate event is not declared ([#5830](https://github.com/nolimits4web/Swiper/issues/5830)) ([8b00333](https://github.com/nolimits4web/Swiper/commit/8b003333d5684e00fc4919e6aef992ae4ae447f8))

### Features

- **core:** add `changeLanguageDirection` method to change it to RTL/LTR after init ([f5bb7af](https://github.com/nolimits4web/Swiper/commit/f5bb7af0e1039cc52068909159943d6302d819ba)), closes [#3279](https://github.com/nolimits4web/Swiper/issues/3279)
- **navigation:** add `navigationPrev` and `navigationNext` events ([d0c6365](https://github.com/nolimits4web/Swiper/commit/d0c636572387e0ec94538cb00877de646a36736a)), closes [#5832](https://github.com/nolimits4web/Swiper/issues/5832)

# [8.2.5](https://github.com/nolimits4web/Swiper/compare/v8.2.4...v8.2.5) (2022-06-27)

### Bug Fixes

- **pagination:** double check for $el ([baafb55](https://github.com/nolimits4web/Swiper/commit/baafb553213dc772821f6c06dfbaa6894a1917e5))

# [8.2.4](https://github.com/nolimits4web/Swiper/compare/v8.2.3...v8.2.4) (2022-06-13)

### Bug Fixes

- **angular:** rollback build to Angular 13 ([3f14d67](https://github.com/nolimits4web/Swiper/commit/3f14d675b30c39085a375ac8d161576034192bd0)), closes [#5792](https://github.com/nolimits4web/Swiper/issues/5792) [#5791](https://github.com/nolimits4web/Swiper/issues/5791)

# [8.2.3](https://github.com/nolimits4web/Swiper/compare/v8.2.2...v8.2.3) (2022-06-10)

### Features

- **a11y:** allow slideLabelMessage: null ([#5783](https://github.com/nolimits4web/Swiper/issues/5783)) ([78a8d90](https://github.com/nolimits4web/Swiper/commit/78a8d902008b31671bcc66f3a6706d3630a98b37))
- **angular:** update to angular v14 ([097390d](https://github.com/nolimits4web/Swiper/commit/097390db6456c1d26ad45ff19fda976bd93d02fc))
- **scrollbar:** add directional classes to scrollbar container ([083a83f](https://github.com/nolimits4web/Swiper/commit/083a83f0b80c53ce9fac5ae4f67730172f91e736))

# [8.2.2](https://github.com/nolimits4web/Swiper/compare/v8.2.1...v8.2.2) (2022-06-01)

### Bug Fixes

- **scrollbar:** fix draggable scrollbar ([28cd6c2](https://github.com/nolimits4web/Swiper/commit/28cd6c243555f7132d7db1df899f3182e935f834)), closes [#5759](https://github.com/nolimits4web/Swiper/issues/5759)

### Reverts

- Revert "fix(autoplay): immediate proceed autoplay when `autoplay.delay = 0`" ([d942e83](https://github.com/nolimits4web/Swiper/commit/d942e834c58b3291425038325ab5ff009fb5d87d))
- Revert "fix(autoplay): fix swiper getting stuck with `0` autoplay delay" ([56e050b](https://github.com/nolimits4web/Swiper/commit/56e050bcdbcc00db7af02ccb32e0725265dd242a))

# [8.2.1](https://github.com/nolimits4web/Swiper/compare/v8.2.0...v8.2.1) (2022-05-31)

### Bug Fixes

- **core:** fix issues with navigation/pagination `enabled` prop ([af9ed85](https://github.com/nolimits4web/Swiper/commit/af9ed85d451148fd2e6af6aadc4436f1b2c2a3b5))

# [8.2.0](https://github.com/nolimits4web/Swiper/compare/v8.1.6...v8.2.0) (2022-05-31)

### Bug Fixes

- **autoplay:** fix swiper getting stuck with `0` autoplay delay ([61db26f](https://github.com/nolimits4web/Swiper/commit/61db26fdde129afc77bb56c302790c8af6f35c44))
- **core:** fix type Number in slideToLoop ([#5732](https://github.com/nolimits4web/Swiper/issues/5732)) ([1e1336b](https://github.com/nolimits4web/Swiper/commit/1e1336b5eabe331b212790a238d5993ca49e4abf))

### Features

- **navigation:** allow navigation to be enabled/disabled in breakpoints ([052f863](https://github.com/nolimits4web/Swiper/commit/052f863444a4891fa7803a43914de808038e5a06))
- **pagination:** allow pagination to be enabled/disabled in breakpoints ([d748d49](https://github.com/nolimits4web/Swiper/commit/d748d49c86903acc39eac1c4512c2daff929c52b))
- **scrollbar:** allow scrollbar to be enabled/disabled in breakpoints ([3f09fc7](https://github.com/nolimits4web/Swiper/commit/3f09fc7ecc13a643fc88e0d2cc434a5b7915eab7))

# [8.1.6](https://github.com/nolimits4web/Swiper/compare/v8.1.5...v8.1.6) (2022-05-25)

### Bug Fixes

- **a11y:** update slides a11y on slides amount change ([31e2005](https://github.com/nolimits4web/Swiper/commit/31e200514392df6ebb7632a778d544edf8e43bda)), closes [#5692](https://github.com/nolimits4web/Swiper/issues/5692)
- **autoplay:** immediate proceed autoplay when `autoplay.delay = 0` ([81a4cc8](https://github.com/nolimits4web/Swiper/commit/81a4cc83064c5e49a831afedf67251e754986c75))
- **lazy:** `loadPrevNext` fix when `slidesPerView` is fractional ([94d4c9e](https://github.com/nolimits4web/Swiper/commit/94d4c9e66fe48f1bd88cdc4998947a7de5ad77b5)), closes [#5712](https://github.com/nolimits4web/Swiper/issues/5712)
- **lazy:** unset lazy-loading class on swiper destroy ([81d7fc4](https://github.com/nolimits4web/Swiper/commit/81d7fc406c1c33b8d2635ed475188e105b596495)), closes [#5737](https://github.com/nolimits4web/Swiper/issues/5737)
- **types:** add `snapIndex` and `snapGrid` props ([ee3d2dc](https://github.com/nolimits4web/Swiper/commit/ee3d2dcf717b09e7b0c622854480d82f5766c253)), closes [#5733](https://github.com/nolimits4web/Swiper/issues/5733)

### Features

- **navigation:** default `opacity: 0` styles for hidden navigation buttons ([85f72f4](https://github.com/nolimits4web/Swiper/commit/85f72f42711175a0f14ff49d6cf49e16715f1821))

# [8.1.5](https://github.com/nolimits4web/Swiper/compare/v8.1.4...v8.1.5) (2022-05-16)

### Bug Fixes

- **core:** add missing types comments ([340f716](https://github.com/nolimits4web/Swiper/commit/340f716e78875ee21276bacb3625979bed17a4d5)), closes [/github.com/nolimits4web/swiper/issues/5688#issuecomment-1118316055](https://github.com//github.com/nolimits4web/swiper/issues/5688/issues/issuecomment-1118316055)
- **core:** check for visibleSlides presence in updateAutoHeight ([3909c45](https://github.com/nolimits4web/Swiper/commit/3909c453616400803f3814ccc1deb94d94811887))
- **core:** fix getWrapper $el check ([7702178](https://github.com/nolimits4web/Swiper/commit/77021780f8c1adf84eb5f9f62f89b0bddc74643b)), closes [#5711](https://github.com/nolimits4web/Swiper/issues/5711)
- **navigation:** remove duplicated rules ([#5657](https://github.com/nolimits4web/Swiper/issues/5657)) ([333a3ae](https://github.com/nolimits4web/Swiper/commit/333a3ae0f827b33ce16c6c36a572e5e2b4c5d4ed))
- **react:** move navigation, pagination, scrollbar to the end of container ([2d3255f](https://github.com/nolimits4web/Swiper/commit/2d3255fe3fdc12344fbac6b6979473258f9c66a8))
- **svelte:** fix incorrect parameters in event dispatching ([#5716](https://github.com/nolimits4web/Swiper/issues/5716)) ([b7961a3](https://github.com/nolimits4web/Swiper/commit/b7961a34648834030d65ad04cf80eaab13685d23))
- **svelte:** move navigation, pagination, scrollbar to the end of container ([c8a4f67](https://github.com/nolimits4web/Swiper/commit/c8a4f671ccc9dff9fc2241ada3fe3f8096a5c0de))
- **vue:** move navigation, pagination, scrollbar to the end of container ([0d219f4](https://github.com/nolimits4web/Swiper/commit/0d219f4205807c2ddab3c37e449448366eed9b23))

### Features

- **history:** plugin fixes and new option adding ([#5665](https://github.com/nolimits4web/Swiper/issues/5665)) ([798c7c0](https://github.com/nolimits4web/Swiper/commit/798c7c068cbe785308e15a64dcfbb7ec4193b057))

# [8.1.4](https://github.com/nolimits4web/Swiper/compare/v8.1.3...v8.1.4) (2022-04-24)

### Bug Fixes

- **core:** animate preloader in visible slides if watchSlidesProgress is enabled ([8174b5a](https://github.com/nolimits4web/Swiper/commit/8174b5a5fcc5078b9164ee0577387ca352fd7af9))
- **core:** more checks for when swiper is destroyed ([de47f09](https://github.com/nolimits4web/Swiper/commit/de47f09f165653eccc682d5b4a51da705d6b6d0d)), closes [#5656](https://github.com/nolimits4web/Swiper/issues/5656) [#5635](https://github.com/nolimits4web/Swiper/issues/5635)
- **lazy:** animate preloader in not visible slides ([865529b](https://github.com/nolimits4web/Swiper/commit/865529b0cd7d41a18e3bccf5ec511a1158c3e56f))

# [8.1.3](https://github.com/nolimits4web/Swiper/compare/v8.1.2...v8.1.3) (2022-04-20)

### Bug Fixes

- **effects:** improve dynamic slide shadows re-creation for Cube and Flip effects ([98b8a3e](https://github.com/nolimits4web/Swiper/commit/98b8a3eddafe1b1d1456a61fcaac2cc477c6197f))

# [8.1.2](https://github.com/nolimits4web/Swiper/compare/v8.1.1...v8.1.2) (2022-04-20)

### Bug Fixes

- **effects:** fix slide shadows flickering in Safari for Cube and Flip effects ([52f5ef7](https://github.com/nolimits4web/Swiper/commit/52f5ef75eed2f9c11950bee94a6b4060c366c7a7))

### Features

- **cube-effect:** set `--swiper-cube-translate-z` CSS property on swiper-wrapper ([758ad28](https://github.com/nolimits4web/Swiper/commit/758ad28fce90def8ba681219f7625a18e7fbac54))

# [8.1.1](https://github.com/nolimits4web/Swiper/compare/v8.1.0...v8.1.1) (2022-04-15)

### Bug Fixes

- **lazy:** fix lazy preloader in iOS 15 ([794a625](https://github.com/nolimits4web/Swiper/commit/794a625804aac037a8c3d17bbdf1a59d9f074475))
- **virtual:** fix leaked effects translate when Virtual enabled ([a0e8dd4](https://github.com/nolimits4web/Swiper/commit/a0e8dd464b478746e0023d10f7ab3fe47148e977)), closes [#5588](https://github.com/nolimits4web/Swiper/issues/5588)

# [8.1.0](https://github.com/nolimits4web/Swiper/compare/v8.0.7...v8.1.0) (2022-04-08)

### Bug Fixes

- **pagination:** formatter functions now accept strings as return values ([#5610](https://github.com/nolimits4web/Swiper/issues/5610)) ([629c1c4](https://github.com/nolimits4web/Swiper/commit/629c1c4526f6c324a33118a22faaa8bf47c1a028))
- **vue:** add missing event ([bda673f](https://github.com/nolimits4web/Swiper/commit/bda673f6a78b4c5cbc8f72ab3a302ef237dfecf2)), closes [#5558](https://github.com/nolimits4web/Swiper/issues/5558)
- enabled not working (fix [#5611](https://github.com/nolimits4web/Swiper/issues/5611)) ([#5612](https://github.com/nolimits4web/Swiper/issues/5612)) ([6a0554b](https://github.com/nolimits4web/Swiper/commit/6a0554ba6f6c7ecf3715934b217797dd3a2a0f3a))

### Features

- **a11y:** add `id` parameter ([213c8fe](https://github.com/nolimits4web/Swiper/commit/213c8fe7cd7d5696909b19fdfa79dad600d24b3f)), closes [#5586](https://github.com/nolimits4web/Swiper/issues/5586)
- **angular:** support `[ngClass]` in swiperSlide ([#5562](https://github.com/nolimits4web/Swiper/issues/5562)) ([5d4ffdc](https://github.com/nolimits4web/Swiper/commit/5d4ffdc4fa7d7a40b3c7cf620a5a8411138c5951))
- **effect-cards:** add `rotate` parameter ([5f4ca8a](https://github.com/nolimits4web/Swiper/commit/5f4ca8a4e63b2487d49084e171012a8a6485bba5)), closes [#5575](https://github.com/nolimits4web/Swiper/issues/5575)

# [8.0.7](https://github.com/nolimits4web/Swiper/compare/v8.0.6...v8.0.7) (2022-03-04)

### Bug Fixes

- **pagination:** use direction classes ([95c882c](https://github.com/nolimits4web/Swiper/commit/95c882c50a798ebe7adc20fcb61765aace0edbfc)), closes [#5489](https://github.com/nolimits4web/Swiper/issues/5489)

### Features

- **effect-cards:** support for use with Virtual Slides ([69a8870](https://github.com/nolimits4web/Swiper/commit/69a887094514555800fe588cf5643a76cd5c7a0e))
- **virtual:** better support for other effects rather than `slide` ([2dae84f](https://github.com/nolimits4web/Swiper/commit/2dae84fa4d65c4a9d319a6fe086877ab7a2724c5))

# [8.0.6](https://github.com/nolimits4web/Swiper/compare/v8.0.5...v8.0.6) (2022-02-14)

### Bug Fixes

- **angular:** swiper angular event ([#5462](https://github.com/nolimits4web/Swiper/issues/5462)) ([adc99a5](https://github.com/nolimits4web/Swiper/commit/adc99a5c114abbe3a84fd1f235dd6230fddf8dc9))
- **vue:** HMR error ([#5460](https://github.com/nolimits4web/Swiper/issues/5460)) ([0374228](https://github.com/nolimits4web/Swiper/commit/0374228c2761201cf9895d30b34ea869cbc773ea))

# [8.0.5](https://github.com/nolimits4web/Swiper/compare/v8.0.4...v8.0.5) (2022-02-10)

### Bug Fixes

- **core:** fix short swipes ([8e1c12e](https://github.com/nolimits4web/Swiper/commit/8e1c12e036e39034e6c627cf54105f9259862de5))

# [8.0.4](https://github.com/nolimits4web/Swiper/compare/v8.0.3...v8.0.4) (2022-02-10)

### Bug Fixes

- **core:** wrap resize observer callback in requestAnimationFrame ([#5441](https://github.com/nolimits4web/Swiper/issues/5441)) ([0567641](https://github.com/nolimits4web/Swiper/commit/0567641fbe4bdbea54b5de0bcc2c937dfb52e088)), closes [#5440](https://github.com/nolimits4web/Swiper/issues/5440)

### Features

- **angular:** events types ([#5424](https://github.com/nolimits4web/Swiper/issues/5424)) ([d8631d8](https://github.com/nolimits4web/Swiper/commit/d8631d831333e3879bb42a3e91ccb23dde94b14d))
- **angular:** lock output ([#5442](https://github.com/nolimits4web/Swiper/issues/5442)) ([3bc27a4](https://github.com/nolimits4web/Swiper/commit/3bc27a4f191e54a579c39dfdf70c39e05ce56342))
- **core:** allow nesting of styles in SASS ([#5438](https://github.com/nolimits4web/Swiper/issues/5438)) ([c973bc8](https://github.com/nolimits4web/Swiper/commit/c973bc83f9a117e0ee5585d5495a7492d646ac6b))
- **core:** rewind on swipes ([#5422](https://github.com/nolimits4web/Swiper/issues/5422)) ([1a2f83b](https://github.com/nolimits4web/Swiper/commit/1a2f83b1e0ec1330d9a004c81451f7db71a9186f))

# [8.0.3](https://github.com/nolimits4web/Swiper/compare/v8.0.2...v8.0.3) (2022-02-03)

### Bug Fixes

- **react:** `useSwiper` context value ([#5421](https://github.com/nolimits4web/Swiper/issues/5421)) ([60cbe75](https://github.com/nolimits4web/Swiper/commit/60cbe754046a133d8e443a707460547bf05693cc))
- **react:** add autoplay to watched modules ([#5419](https://github.com/nolimits4web/Swiper/issues/5419)) ([16059ad](https://github.com/nolimits4web/Swiper/commit/16059adf98f46c7f62f24d78aa68b62a1d34815d))
- **svelte:** add autoplay to watched modules ([1463e05](https://github.com/nolimits4web/Swiper/commit/1463e0588b42f255c76dce04f5fff251e9260283))
- **vue:** add autoplay to watched modules ([da4d3cc](https://github.com/nolimits4web/Swiper/commit/da4d3ccdfd7d619da030fbc82af3329d94b264e8))

# [8.0.2](https://github.com/nolimits4web/Swiper/compare/v8.0.1...v8.0.2) (2022-02-02)

### Bug Fixes

- **core:** fix slider freeze with enabled observer ([8ff2691](https://github.com/nolimits4web/Swiper/commit/8ff2691ae8cfa63d97040c1ff0db3cc648f8e941)), closes [#5414](https://github.com/nolimits4web/Swiper/issues/5414)

# [8.0.1](https://github.com/nolimits4web/Swiper/compare/v8.0.0...v8.0.1) (2022-02-01)

### Bug Fixes

- **angular:** fix angular export ([8785e2b](https://github.com/nolimits4web/Swiper/commit/8785e2b5742a84cf169dc1936e58d48b5158ae0f)), closes [#5414](https://github.com/nolimits4web/Swiper/issues/5414)
- **react:** types for useSwiper and useSwiperSlide hooks ([2cbf82c](https://github.com/nolimits4web/Swiper/commit/2cbf82c51e9b2fd22ccf464eea502b7f19705df1)), closes [#5413](https://github.com/nolimits4web/Swiper/issues/5413)

### Features

- **angular:** remove deprecated `index` property ([#5412](https://github.com/nolimits4web/Swiper/issues/5412)) ([63642a1](https://github.com/nolimits4web/Swiper/commit/63642a18eb1ecffc28e7ecc6128b56e965aa9e46))

# [8.0.0](https://github.com/nolimits4web/Swiper/compare/v7.4.1...v8.0.0) (2022-02-01)

### Bug Fixes

- **a11y:** update `aria-disabled` on lock/unlock ([8183466](https://github.com/nolimits4web/Swiper/commit/81834664102cfead3b3882112d6b5f32c5e22b0c)), closes [#5383](https://github.com/nolimits4web/Swiper/issues/5383)
- **angular:** `[@output](https://github.com/output)` events emitting ([#5225](https://github.com/nolimits4web/Swiper/issues/5225)) ([a34eb7a](https://github.com/nolimits4web/Swiper/commit/a34eb7addb05c29673fc34dc95d745830d3c99e6))
- **angular:** get params types ([#5390](https://github.com/nolimits4web/Swiper/issues/5390)) ([8731204](https://github.com/nolimits4web/Swiper/commit/87312043303ed3b3656f2b4f70f22830a85a44fb))
- **angular:** toggle input ([#5229](https://github.com/nolimits4web/Swiper/issues/5229)) ([#5254](https://github.com/nolimits4web/Swiper/issues/5254)) ([03acbe2](https://github.com/nolimits4web/Swiper/commit/03acbe2569a5c2359f37031b3a6289bc9fe4ebb2))
- **core:** don't prevent focusable elements click when `allowTouchMove: false` ([f0eac04](https://github.com/nolimits4web/Swiper/commit/f0eac047081b887eca47f1e9a2fa7ff352adac5b)), closes [#5358](https://github.com/nolimits4web/Swiper/issues/5358)
- **core:** don't swipe over `<select>` element ([faeb14a](https://github.com/nolimits4web/Swiper/commit/faeb14abe72988a6b1bc86d1daa7df5f3a7a904f)), closes [#5268](https://github.com/nolimits4web/Swiper/issues/5268)
- **lazy:** only activate preloader-spin animation when slide is active ([#5203](https://github.com/nolimits4web/Swiper/issues/5203)) ([b7d89ea](https://github.com/nolimits4web/Swiper/commit/b7d89ea39aa14532346e615aae0080f4b7a70ce6)), closes [#5202](https://github.com/nolimits4web/Swiper/issues/5202)
- **react:** compatibility with React 18 strict mode ([68bcec8](https://github.com/nolimits4web/Swiper/commit/68bcec868c596d9a47fe029a2eff90dcaa921ae5)), closes [#5398](https://github.com/nolimits4web/Swiper/issues/5398)
- **react:** update `controller.control` on `control` prop array change ([7c53de8](https://github.com/nolimits4web/Swiper/commit/7c53de8ffae91a661370c7e618ba468e7fdc64e1)), closes [#5368](https://github.com/nolimits4web/Swiper/issues/5368)
- **svelte:** `swiperSlide` slot data with context ([89f14ab](https://github.com/nolimits4web/Swiper/commit/89f14ab5c07d0d8ab8fa7b0a40d4fb29dcdc99de))
- **types:** bullets type should be `Dom7Array` ([#5405](https://github.com/nolimits4web/Swiper/issues/5405)) ([d248a14](https://github.com/nolimits4web/Swiper/commit/d248a14bc867015164fa0d85a96405de211751e7))

### Features

- **a11y:** automatically switch slides on focus (`Tab`) in inactive slides ([1288271](https://github.com/nolimits4web/Swiper/commit/128827156b0f125a5f6ecf1409add4146fa3c989)), closes [#3149](https://github.com/nolimits4web/Swiper/issues/3149)
- **angular:** update to angular 13 and enable tsconfig `strict` ([#5231](https://github.com/nolimits4web/Swiper/issues/5231)) ([23ee4b3](https://github.com/nolimits4web/Swiper/commit/23ee4b34f21e5c52d032cdb8812229839fc72da0))
- **autoplay:** `autoplayPause` and `autoplayResume` events ([aea56ed](https://github.com/nolimits4web/Swiper/commit/aea56ed2712c18ff215fd53bf86b4150b4a00470))
- **free-mode:** stop scrolling when touch event happens in freeMode ([80958d5](https://github.com/nolimits4web/Swiper/commit/80958d5e946e40d697bd0eb6fcfeed5f45579ba3)), closes [#4616](https://github.com/nolimits4web/Swiper/issues/4616)
- **react:** `useSwiper` and `useSwiperSlide` context hooks ([#5364](https://github.com/nolimits4web/Swiper/issues/5364)) ([18bb89b](https://github.com/nolimits4web/Swiper/commit/18bb89b5d69252a4c8b65246fa17edf9e27e172f))
- **svelte:** `swiper` and `swiperSlide` context ([#5391](https://github.com/nolimits4web/Swiper/issues/5391)) ([b5c2d3b](https://github.com/nolimits4web/Swiper/commit/b5c2d3b2ae39dd19a111f819d568ef134fc71a6f))
- **svelte:** import index ([c91f222](https://github.com/nolimits4web/Swiper/commit/c91f2229412062a24cfff5485769a3262b596732)), closes [#4976](https://github.com/nolimits4web/Swiper/issues/4976) [#4975](https://github.com/nolimits4web/Swiper/issues/4975)
- **virtual:** support `rewind` functionality with Virtual slides ([e52de28](https://github.com/nolimits4web/Swiper/commit/e52de28fcd9e3b9cc29091b6fd89df842736b64e))
- **vue:** `useSwiper` and `useSwiperSlide` context hooks ([987a32e](https://github.com/nolimits4web/Swiper/commit/987a32e807b2e9aaa40fb19bfd3022b1e80246c0))
- new `maxBackfaceHiddenSlides` param to prevent flicker in Safari ([d679a98](https://github.com/nolimits4web/Swiper/commit/d679a98ec1b24be9f6ca057e02911e2e7ee91924))
- new `maxBackfaceHiddenSlides` param to prevent flicker in Safari ([8c05e6d](https://github.com/nolimits4web/Swiper/commit/8c05e6d6ebcf1a8bc5ca9c27e274f22d6c339b92))
- **svelte:** types for Swiper slot `virtualData` ([682f56f](https://github.com/nolimits4web/Swiper/commit/682f56f264584aae25273b500697238a4341b254))
- **svelte:** types for SwiperSlide slot data ([1fa70e1](https://github.com/nolimits4web/Swiper/commit/1fa70e129c460d5adacc2964bcfdd80f864e0078)), closes [#5349](https://github.com/nolimits4web/Swiper/issues/5349)
- **vue:** provide - inject `swiper` and `swiperSlide` context ([#5377](https://github.com/nolimits4web/Swiper/issues/5377)) ([f3145b1](https://github.com/nolimits4web/Swiper/commit/f3145b1232f6687c8f56b0131d8f1e2be6133e88))
- update dom7 to latest ([a6b1a47](https://github.com/nolimits4web/Swiper/commit/a6b1a47041b63d4e5425d4651696ef5866ed8d94))

# [7.4.1](https://github.com/nolimits4web/Swiper/compare/v7.4.0...v7.4.1) (2021-12-24)

### Bug Fixes

- **types:** fix `rewind` description ([83574e1](https://github.com/nolimits4web/Swiper/commit/83574e1b41ad6d61dd4c6bee8bcf699e099165f4))

# [7.4.0](https://github.com/nolimits4web/Swiper/compare/v7.3.4...v7.4.0) (2021-12-24)

### Bug Fixes

- **core:** autoHeight shouldn't ignore zero height slides ([b3697f1](https://github.com/nolimits4web/Swiper/commit/b3697f16aaa0408062540298698b4c706538e3de)), closes [#5281](https://github.com/nolimits4web/Swiper/issues/5281)
- **pagination:** fix dynamic bullets position with `loop` enabled ([3d377c2](https://github.com/nolimits4web/Swiper/commit/3d377c2a23e6267f6e106ca58ca7f3b09ed62fc9)), closes [#5304](https://github.com/nolimits4web/Swiper/issues/5304)

### Features

- **core:** add `rewind` functionality ([38fdd15](https://github.com/nolimits4web/Swiper/commit/38fdd151e9c75a016f0d7547b03fe0966e328779)), closes [#5003](https://github.com/nolimits4web/Swiper/issues/5003) [#5270](https://github.com/nolimits4web/Swiper/issues/5270)

# [7.3.4](https://github.com/nolimits4web/Swiper/compare/v7.3.3...v7.3.4) (2021-12-22)

### Bug Fixes

- **angular:** `setElement` checks ([#5305](https://github.com/nolimits4web/Swiper/issues/5305)) ([51c4a49](https://github.com/nolimits4web/Swiper/commit/51c4a4926c6303e3e0d03332354a90c221663c40))
- **angular:** fix `nativeElement` check ([d48fb1b](https://github.com/nolimits4web/Swiper/commit/d48fb1b848c61d79e05f075676b8567952f0d280))

# [7.3.3](https://github.com/nolimits4web/Swiper/compare/v7.3.2...v7.3.3) (2021-12-16)

### Bug Fixes

- **angular:** setElement call updateInitSwiper bug ([#5296](https://github.com/nolimits4web/Swiper/issues/5296)) ([99be5ea](https://github.com/nolimits4web/Swiper/commit/99be5ea9395ca4cb1026fba9945cfbe6c3eff8a9))

# [7.3.2](https://github.com/nolimits4web/Swiper/compare/v7.3.1...v7.3.2) (2021-12-13)

### Bug Fixes

- **angular:** toggle input ([#5229](https://github.com/nolimits4web/Swiper/issues/5229)) ([ab3a4ad](https://github.com/nolimits4web/Swiper/commit/ab3a4adbb4e69f04e1790918d801ee2837b8fe61))

### Features

- **a11y:** add `aria-current` to current bullet ([#5258](https://github.com/nolimits4web/Swiper/issues/5258)) ([b5df68e](https://github.com/nolimits4web/Swiper/commit/b5df68eb38c9435c3f47769232cfd4344ec938bf))
- update dom7 and ssr-window to latest ([627ca3a](https://github.com/nolimits4web/Swiper/commit/627ca3a2346539cdce5125d76213b077b227df27))

# [7.3.1](https://github.com/nolimits4web/Swiper/compare/v7.3.0...v7.3.1) (2021-11-24)

### Features

- **angular:** support `on` params ([#5224](https://github.com/nolimits4web/Swiper/issues/5224)) ([3553c41](https://github.com/nolimits4web/Swiper/commit/3553c41a8de97832819e93e4cbf6e9ce8fce26ce))

# [7.3.0](https://github.com/nolimits4web/Swiper/compare/v7.2.0...v7.3.0) (2021-11-18)

### Bug Fixes

- **docs:** property -> properly ([#5187](https://github.com/nolimits4web/Swiper/issues/5187)) ([2824b0c](https://github.com/nolimits4web/Swiper/commit/2824b0cf35398c97b7027b11bc6a28153bfa4b5c))
- **zoom:** use only one element to zoom ([60a9886](https://github.com/nolimits4web/Swiper/commit/60a9886ea2b74ed166f2a5b4a762f88c0508bfe5)), closes [#5170](https://github.com/nolimits4web/Swiper/issues/5170)
- **core:** fallback $selector to $wrapperEl if no children exist ([#5173](https://github.com/nolimits4web/Swiper/issues/5173)) ([d8b4ca1](https://github.com/nolimits4web/Swiper/commit/d8b4ca1d59b76404fdcff98c54da1025f868181d))
- **types:** fixed typo `progressMultipler` -> `progressMultiplier` ([#5158](https://github.com/nolimits4web/Swiper/issues/5158)) ([815e837](https://github.com/nolimits4web/Swiper/commit/815e837a564784b706ed51b869c5de02dcb4b46f))

### Features

- **react:** export `SwiperProps` and `SwiperSlideProps` types ([d543020](https://github.com/nolimits4web/Swiper/commit/d543020d12093269d87d800ce83d8ffffcd31792)), closes [#5141](https://github.com/nolimits4web/Swiper/issues/5141)

# [7.2.0](https://github.com/nolimits4web/Swiper/compare/v7.1.0...v7.2.0) (2021-10-27)

### Features

- add "main" and "module" package fields ([f228391](https://github.com/nolimits4web/Swiper/commit/f22839168622ceeb878a7345c2d5f9c4510e2e43))
- update dom7 and ssr-window to latest ([7d45076](https://github.com/nolimits4web/Swiper/commit/7d45076cade7e437fcbacfc4153d910dc481470c))

# [7.1.0](https://github.com/nolimits4web/Swiper/compare/v7.0.9...v7.1.0) (2021-10-25)

### Bug Fixes

- **core:** centeredSlides won't work when use creative-effect ([#5115](https://github.com/nolimits4web/Swiper/issues/5115)) ([264ca64](https://github.com/nolimits4web/Swiper/commit/264ca64297f7e6aeec2345fb04f752a0a9f49710))
- **coverflow effect:** interface CoverflowEffectOptions updated. ([#5123](https://github.com/nolimits4web/Swiper/issues/5123)) ([b1c317a](https://github.com/nolimits4web/Swiper/commit/b1c317a68b3cdd09d862f50b0dec1c5362cd73b4))

### Features

- **core:** add support to loop with slotted elements ([#5117](https://github.com/nolimits4web/Swiper/issues/5117)) ([33c411e](https://github.com/nolimits4web/Swiper/commit/33c411ed39a7163c3f239c02013e9b106bbe16f8))

# [7.0.9](https://github.com/nolimits4web/Swiper/compare/v7.0.8...v7.0.9) (2021-10-18)

### Bug Fixes

- **core:** Change opacityString and scaleString to originalProgress ([#5095](https://github.com/nolimits4web/Swiper/issues/5095)) ([244cc2e](https://github.com/nolimits4web/Swiper/commit/244cc2ee2dcddaa60b625b967b64ae646e4186b5))
- **vue:** fix SwiperSlide types ([114fee7](https://github.com/nolimits4web/Swiper/commit/114fee7c4a5499c9aab1b7b68560c7d1dd7f5320)), closes [#5069](https://github.com/nolimits4web/Swiper/issues/5069)

# [7.0.8](https://github.com/nolimits4web/Swiper/compare/v7.0.7...v7.0.8) (2021-10-04)

### Features

- **virtual:** improve behavior with cssMode ([b478058](https://github.com/nolimits4web/Swiper/commit/b4780585341e775bab5646c3132dcbc69b35ae37))

# [7.0.7](https://github.com/nolimits4web/Swiper/compare/v7.0.6...59e44ae7e91cee32827d4605cd2795a8c115948b) (2021-09-29)

### Bug Fixes

- **angular:** removed stray setIndex debug code (nolimits4web[#5006](https://github.com/nolimits4web/Swiper/issues/5006)) ([#5007](https://github.com/nolimits4web/Swiper/issues/5007)) ([59e44ae](https://github.com/nolimits4web/Swiper/commit/59e44ae7e91cee32827d4605cd2795a8c115948b))
- **vue:** make `swiperRef` not required in SwiperSlide vue component ([#4992](https://github.com/nolimits4web/Swiper/issues/4992)) ([1cd6af8](https://github.com/nolimits4web/Swiper/commit/1cd6af8d7c54ec2cc63e949402ba334f7d36f557))

# [7.0.6](https://github.com/nolimits4web/Swiper/compare/v7.0.5...v7.0.6) (2021-09-16)

### Bug Fixes

- **angular:** deprecate `[(index)]` and `setIndex()` ([#4951](https://github.com/nolimits4web/Swiper/issues/4951)) ([7ee3d58](https://github.com/nolimits4web/Swiper/commit/7ee3d5846c9dd0f30f0737b023b0de688664fbad))
- **effect-creative:** fix autoplay by watching all slides transition end ([86e6fb6](https://github.com/nolimits4web/Swiper/commit/86e6fb658c203b0714e6eac8c0360c583f656007)), closes [#4961](https://github.com/nolimits4web/Swiper/issues/4961)
- **types:** add missing `cards` effect ([#4950](https://github.com/nolimits4web/Swiper/issues/4950)) ([c18aa08](https://github.com/nolimits4web/Swiper/commit/c18aa084acb827a07ee414151be6d4235f06cc86))

### Features

- **angular:** `enabled` prop ([#4949](https://github.com/nolimits4web/Swiper/issues/4949)) ([6c0a3e5](https://github.com/nolimits4web/Swiper/commit/6c0a3e5408fa4a2fea18ebb5800bfa31d495ab05))
- **angular:** support `data-swiper-autoplay` ([#4946](https://github.com/nolimits4web/Swiper/issues/4946)) ([d665fb9](https://github.com/nolimits4web/Swiper/commit/d665fb98cdd7f4c00596ae07d95cd5788e62f333))

# [7.0.5](https://github.com/nolimits4web/Swiper/compare/v7.0.4...v7.0.5) (2021-09-09)

### Bug Fixes

- **core:** don't auto create elements on destroy/init ([b4cdea8](https://github.com/nolimits4web/Swiper/commit/b4cdea842207f12603d09cbfa2828c66062273c3))
- **core:** passes `modules` shouldn't extend prototype ([f07d43f](https://github.com/nolimits4web/Swiper/commit/f07d43fa595d068baa1140de1421b66ee555b224)), closes [#4928](https://github.com/nolimits4web/Swiper/issues/4928)

# [7.0.4](https://github.com/nolimits4web/Swiper/compare/v7.0.3...v7.0.4) (2021-09-08)

### Bug Fixes

- **core:** fix cssMode animation in Safari 14 ([7fd04fe](https://github.com/nolimits4web/Swiper/commit/7fd04fe06718a651bcfa34549c5ea2add6affc1f)), closes [#4925](https://github.com/nolimits4web/Swiper/issues/4925)
- **virtual:** fix Virtual slides in React, Vue & Angular ([e80925e](https://github.com/nolimits4web/Swiper/commit/e80925e443acedd2c65eb972567ba393aeef05ce)), closes [#4899](https://github.com/nolimits4web/Swiper/issues/4899)

### Features

- **pagination:** more pagination bullet CSS variables ([#4927](https://github.com/nolimits4web/Swiper/issues/4927)) ([25416de](https://github.com/nolimits4web/Swiper/commit/25416dee7a66676986bd50bcb2b95f7bce22e1a7))

# [7.0.3](https://github.com/nolimits4web/Swiper/compare/v7.0.2...v7.0.3) (2021-09-03)

### Bug Fixes

- **types:** effect-creative `translate` ([#4907](https://github.com/nolimits4web/Swiper/issues/4907)) ([ad8fae3](https://github.com/nolimits4web/Swiper/commit/ad8fae31a26d7e6a22527d69e760eb79cfa36f32))

# [7.0.2](https://github.com/nolimits4web/Swiper/compare/v7.0.1...v7.0.2) (2021-08-31)

### Bug Fixes

- **a11y:** fix argments for `initNavEl()` method ([#4884](https://github.com/nolimits4web/Swiper/issues/4884)) ([2987700](https://github.com/nolimits4web/Swiper/commit/298770059e9c892378b3b244b6171b89fb4e76ee))
- **core:** reset slides size when `slidesPerView` switches to auto ([2c8784b](https://github.com/nolimits4web/Swiper/commit/2c8784b6df0e365f3eaa9ad4ec9ca3b618113648)), closes [#4881](https://github.com/nolimits4web/Swiper/issues/4881)
- description typo ([#4887](https://github.com/nolimits4web/Swiper/issues/4887)) ([d3c4764](https://github.com/nolimits4web/Swiper/commit/d3c47648a84c2bcfde0c44e6a43dd6d910ec8ec6))

# [7.0.1](https://github.com/nolimits4web/Swiper/compare/v7.0.0...v7.0.1) (2021-08-26)

### Bug Fixes

- **autoplay:** add missing `.start()` method ([dda14bc](https://github.com/nolimits4web/Swiper/commit/dda14bc9477ee685dd8d4bad5a797e6f43834aed)), closes [#4865](https://github.com/nolimits4web/Swiper/issues/4865)
- **pagination:** check for bullets before destroy ([ea06b4c](https://github.com/nolimits4web/Swiper/commit/ea06b4ce7f62f4b8dc908c7acf35dda016183958)), closes [#4859](https://github.com/nolimits4web/Swiper/issues/4859)

# [7.0.0](https://github.com/nolimits4web/Swiper/compare/v6.8.4...v7.0.0) (2021-08-25)

### Bug Fixes

- **angular:** container classNames ([#4854](https://github.com/nolimits4web/Swiper/issues/4854)) ([fd092dc](https://github.com/nolimits4web/Swiper/commit/fd092dc812e0e048fde54ba0d151d607191d2773))
- **angular:** demo ([9fa84e6](https://github.com/nolimits4web/Swiper/commit/9fa84e63526c1a2af64886f7fa9f92993a57f6cb))
- **angular:** try paths for build/types ([04b4eae](https://github.com/nolimits4web/Swiper/commit/04b4eae0a49cd1d888d33862ff230b860aec7fa1))
- **angular:** tsignore ([9011756](https://github.com/nolimits4web/Swiper/commit/9011756867f524dcf7498ef61b632c7c203fbf63))
- **types:** make loopSlides & loopCreate & loopDestroy internal ([d6fdd1b](https://github.com/nolimits4web/Swiper/commit/d6fdd1bc51d2234381a5c71074e6f3831d4f9f78))
- **zoom:** zoom elements only in `swiper-zoom-container` ([a4e351f](https://github.com/nolimits4web/Swiper/commit/a4e351ffdbe2f03e57fa22dddfa635ffc2c039ba)), closes [#4847](https://github.com/nolimits4web/Swiper/issues/4847)
- **keyboard:** fix not working keyboard module ([31ee849](https://github.com/nolimits4web/Swiper/commit/31ee849caa7e08bfea72a2a5d2a0ab54eed23aa3))
- **pagination:** avoid adding direction classes to other swiper's pagination's ([f1c8c89](https://github.com/nolimits4web/Swiper/commit/f1c8c898fb1efbaf565c507e45d15fd775770453))
- **core:** prevent `watchOverflow` from unlocking slidePrev/Next ([f1b7397](https://github.com/nolimits4web/Swiper/commit/f1b7397aa1b1a8b3602a2317a12537aa9472f5b1))
- **scrollbar:** fix scrollbar size with `centeredSlides` ([91f2f2f](https://github.com/nolimits4web/Swiper/commit/91f2f2fae3e661f23d333239c619a02865b0b62d))
- **core:** fix slide progress in CSS Mode and centered slides ([1b0165a](https://github.com/nolimits4web/Swiper/commit/1b0165a5f25cef503f7b39b97b19e3ebadd3a355))
- **core:** better handle loop fix with cssMode enabled ([ff84073](https://github.com/nolimits4web/Swiper/commit/ff8407309ad7e6bffa763df50bbbf46ec1bd6f39))
- **core:** fix auto create elements feature with breakpoints ([3b50feb](https://github.com/nolimits4web/Swiper/commit/3b50febef6f1d1b5b49c1b06b56da96ee689ac8f))
- **components:** add `modules` prop ([596e2a1](https://github.com/nolimits4web/Swiper/commit/596e2a18f8ade549e0d73c8ec354d2e24fc5ad49))
- **types:** add `modules` parameter ([0d599e2](https://github.com/nolimits4web/Swiper/commit/0d599e259b1a00c4995ade3563142539db963ef9))
- **core:** grab cursor to be set based on touchEventsTarget ([cffc3aa](https://github.com/nolimits4web/Swiper/commit/cffc3aac5a338eb52ac354d6cb2e225a334a7a30))
- **core:** double check for documentElement in smoothScroll detection ([ac09e38](https://github.com/nolimits4web/Swiper/commit/ac09e3851851c27a80e7f283299553127c30a3a0))

### Features

- **creative-effect:** add `shadowPerProgress` parameter ([980c4c7](https://github.com/nolimits4web/Swiper/commit/980c4c790a7ec969e2ad0efe0ae02812e56b4e2e))
- **angular:** better typing ([e132ee8](https://github.com/nolimits4web/Swiper/commit/e132ee8bf420bc7fa38054aaf40e664c2f93dc28))
- **angular:** better typing ([6b562fa](https://github.com/nolimits4web/Swiper/commit/6b562fa8e403982d6adfae6130497c1cf841ea78))
- **angular:** support 'strictTemplates' flag ([613f12c](https://github.com/nolimits4web/Swiper/commit/613f12c5ba01e99991fe416bd37ad640bee22d72))
- **effect-creative:** add `progressMultiplier` option ([ed3bd7a](https://github.com/nolimits4web/Swiper/commit/ed3bd7a72b5f8eef23d46319a112b609cf021346))
- **angular:** partial ivy build ([#4834](https://github.com/nolimits4web/Swiper/issues/4834)) ([e86b2b3](https://github.com/nolimits4web/Swiper/commit/e86b2b3011cb15bd41c30db9bad8994128c7b7af))
- **core** `swiper-container` class to `swiper` ([ad8002c](https://github.com/nolimits4web/Swiper/commit/ad8002c87689936457110350e734766f2fc43dee))
- **core** `swiper-container` class to `swiper` ([c763c9c](https://github.com/nolimits4web/Swiper/commit/c763c9c92cc05c1426a7250790725e032925b78e))
- **core:** `watchOverflow` is now enabled by default ([b97286f](https://github.com/nolimits4web/Swiper/commit/b97286f57813bd9d5874a4ec563a511b61b1b2e9))
- **core:** improve `watchOverflow` detection ([627ae4c](https://github.com/nolimits4web/Swiper/commit/627ae4cfb4bcb8b558bb6a9d632d0279d575c3eb))
- **creative-effect:** add shadows ([cce4f23](https://github.com/nolimits4web/Swiper/commit/cce4f234d67670c4f04b03ed6e2b6ad9f1c7c898))
- **cards-effect:** add slide shadow ([09666c8](https://github.com/nolimits4web/Swiper/commit/09666c85857a788a2c5d9cac4d5a34d8ec4fd883))
- **cards-effect:** new Cards effect ([21af858](https://github.com/nolimits4web/Swiper/commit/21af858af6822a0ed469dbeda2bf50f9e4dcec8a))
- **creative-effect:** add `limitProgress` and `perspective` options ([1c7d49e](https://github.com/nolimits4web/Swiper/commit/1c7d49e4b17f7a773ed068e7c1339de79dbbc298))
- **core:** new "Creative" effect ([f72f5ba](https://github.com/nolimits4web/Swiper/commit/f72f5ba0b5e946c576917b85981aa247f389fcbe))
- **svelte:** add Svelte components typings ([5a64bdc](https://github.com/nolimits4web/Swiper/commit/5a64bdc1eb1574b20f85e2e9cdde84bad921c166))
- **core:** new `slidesPerGroupAuto` feature ([2b6f133](https://github.com/nolimits4web/Swiper/commit/2b6f1338b2de0821e77808aa1d7931d97d46e75a)), closes [#4168](https://github.com/nolimits4web/Swiper/issues/4168)
- **coverflow-effect:** support cssMode ([e13d268](https://github.com/nolimits4web/Swiper/commit/e13d2687149ed67c5a72a48f720749b5b8faa458))
- **fade-effect:** support cssMode ([18b49cc](https://github.com/nolimits4web/Swiper/commit/18b49ccc4576fcdc4c159c263f079d31a2a7cb19))
- **flip-effect:** support cssMode ([82859a1](https://github.com/nolimits4web/Swiper/commit/82859a1b9cc1d4b143e3c230ca199f259e2a5d79))
- **pagination:** keep pagination styles when it is outside of container ([1b11429](https://github.com/nolimits4web/Swiper/commit/1b11429afba80bc1ab1e2fb5ce234b43155d1266)), closes [#3736](https://github.com/nolimits4web/Swiper/issues/3736)
- **core:** better RTL support in CSS Mode ([3503ced](https://github.com/nolimits4web/Swiper/commit/3503ced677ec867c7a28437a8731a8d0a500356b))
- **core:** support for `centeredSlides` in CSS Mode ([c940953](https://github.com/nolimits4web/Swiper/commit/c9409538014da75207700b8206358c8423dd7847))
- **core:** support for coverflow effect in CSS Mode ([8300225](https://github.com/nolimits4web/Swiper/commit/8300225d5d47afc53a096d95597f94e7b3b8b276))
- **core:** support for Virtual Slides in CSS Mode ([0e26d52](https://github.com/nolimits4web/Swiper/commit/0e26d52efd584e928b29c29de720e97344f08db5))
- **core:** use easing for custom scroll animation ([f40a370](https://github.com/nolimits4web/Swiper/commit/f40a370f2612128191d3b8ed370c20a777838c86))
- **zoom:** support Zoom in CSS Mode ([4639702](https://github.com/nolimits4web/Swiper/commit/46397027825376e477abddf1f6959b2ddc499557))
- **core:** `watchSlidesProgress` and `watchSlidesVisibility` merged into single `watchSlidesProgress` ([33dbf62](https://github.com/nolimits4web/Swiper/commit/33dbf6218ca558fcb14cb68d8dc4ef141be3f7ac))
- **core:** custom animation for CSS Mode where smooth scrolling is not supported ([a61da6a](https://github.com/nolimits4web/Swiper/commit/a61da6a5100eaf5b6860dcad7c75bc93fe1a20eb))
- **core:** remove `isEdge` browser detection ([9c9970c](https://github.com/nolimits4web/Swiper/commit/9c9970ca479f69d9fdebd1bedf830035b6b030e5))
- **core:** move slides manipulation methods to Manipulation module ([74873f1](https://github.com/nolimits4web/Swiper/commit/74873f104716cad59f2114f754b7741c9b0a17f6))
- **core:** move `slidesPerColumn` functionality to new Grid module ([0f1df44](https://github.com/nolimits4web/Swiper/commit/0f1df44f58b4154cb0018d043b73759a9aa933c9))
- **core:** increase package build target ([65f96c1](https://github.com/nolimits4web/Swiper/commit/65f96c13707c0301b1f4b32cd108540d8126342b))
- **core:** tweak browserslist ([82a23a5](https://github.com/nolimits4web/Swiper/commit/82a23a581ae80e36c358d9dcdcd49ab9c547092b))
- **core:** convert A11y to functional module ([5906115](https://github.com/nolimits4web/Swiper/commit/590611559dc908c780de40b31539b5736a64832c))
- **core:** convert Autoplay to functional module ([ace1e54](https://github.com/nolimits4web/Swiper/commit/ace1e54772a662e2a7e12f4c1c4fa0f1647a13df))
- **core:** convert FreeMode to functional module ([4d307c0](https://github.com/nolimits4web/Swiper/commit/4d307c0903e21106f2352c112c15569b3eac0ea8))
- **core:** convert Keyboard to functional module ([ed63a3b](https://github.com/nolimits4web/Swiper/commit/ed63a3be28dbc1c80824a1b4f34eb59b1a6bf00e))
- **core:** convert Lazy to functional module ([8d4f99a](https://github.com/nolimits4web/Swiper/commit/8d4f99a4e2a20c0f5ce46bb5a1e4ebbeaddc19f1))
- **core:** convert Mousewheel to functional module ([1e4bf98](https://github.com/nolimits4web/Swiper/commit/1e4bf98f336386618b19cc4459733494e7176831))
- **core:** convert Navigation to functional module ([e4aa156](https://github.com/nolimits4web/Swiper/commit/e4aa1566e946e246905f00b00a5d8da02c653de7))
- **core:** convert Pagination to functional module ([1c718d0](https://github.com/nolimits4web/Swiper/commit/1c718d0dcec3d2e52fe30ff2ced0123215d009bb))
- **core:** convert Scrollbar to functional module ([96b8b17](https://github.com/nolimits4web/Swiper/commit/96b8b1737f3c64ac5f331a53ff44e95a0dc875d8))
- **core:** convert Thumbs to functional module ([bea5ac2](https://github.com/nolimits4web/Swiper/commit/bea5ac2db2905c8badf19a34f909e41b07b8a045))
- **core:** convert Virtual to functional module ([6899e83](https://github.com/nolimits4web/Swiper/commit/6899e833ab540faa660378d500342aed74d93853))
- **core:** convert Zoom to functional module ([eb1437e](https://github.com/nolimits4web/Swiper/commit/eb1437ee695df731077dcc21c110c738b8ccab13))
- **core:** remove object-syntax modules support ([287d14a](https://github.com/nolimits4web/Swiper/commit/287d14ae02f33e746c0f40d7d52cd9127c0e91de))
- **core:** `touchEventsTarget` is now default to `wrapper` ([71ffcb5](https://github.com/nolimits4web/Swiper/commit/71ffcb5aab72f5023760896d7a68d182e6a6c73b)), closes [#4751](https://github.com/nolimits4web/Swiper/issues/4751) [#3816](https://github.com/nolimits4web/Swiper/issues/3816)
- **core:** convert effects to functional modules ([b6f64a5](https://github.com/nolimits4web/Swiper/commit/b6f64a58d257a24eeabf0078c1bcf795252bb9c3))
- **core:** convert HashNavigation to functional module ([ac384c6](https://github.com/nolimits4web/Swiper/commit/ac384c67c22a741589761181d8478dc973769d48))
- **core:** convert History to functional module ([7e7c95a](https://github.com/nolimits4web/Swiper/commit/7e7c95a02e709e378d61ebb5548eb40237acd86d))
- **core:** convert Observer to functional module ([a31b80e](https://github.com/nolimits4web/Swiper/commit/a31b80ed55efc8b3a482f26c7875351592c08531))
- **core:** convert Parallax to functional module ([a7c26b5](https://github.com/nolimits4web/Swiper/commit/a7c26b55ccd9ecff6d10767eff330937bd040197))
- **core:** convert Resize to functional module ([133047c](https://github.com/nolimits4web/Swiper/commit/133047c210af7b2d51de7786ea296cec9fd799ab))
- **core:** new functional modules syntax ([e45285a](https://github.com/nolimits4web/Swiper/commit/e45285ab4e1e62c3cda1a78c5ba3e5d8899ba5e1))
- **core:** remove `mouse` events listeners in favor of pointer events ([b9254ab](https://github.com/nolimits4web/Swiper/commit/b9254abec1b55cba664937a738d522af4ada63ca))
- **core:** remove MutationObserver support detection (consider it is supported everywhere) ([6ed6786](https://github.com/nolimits4web/Swiper/commit/6ed6786ddc883e2a78674035e7bd8906534c8956))
- **core:** remove pointerEvents support detection ([b7d171b](https://github.com/nolimits4web/Swiper/commit/b7d171be55827b7a046559615d334ae510f684b8))
- **core:** `resizeObserver` is not enabled by default ([552a7ea](https://github.com/nolimits4web/Swiper/commit/552a7eac998b6def6deeb5c032ad02aa494135fe))
- **package:** use `type: module` ([e8d89f2](https://github.com/nolimits4web/Swiper/commit/e8d89f262aa5f742f786189fc35097d789b2e9c9))
- **core:** remove CJS formats ([3978367](https://github.com/nolimits4web/Swiper/commit/397836796f7be1ca4820d567cf20476def311b37))
- **core:** remove Less and SCSS variables in favor of CSS variables ([91e8ea1](https://github.com/nolimits4web/Swiper/commit/91e8ea1ef111bee99bb2b13e506007c336909ca8))
- **freeMode:** init ([#4240](https://github.com/nolimits4web/Swiper/issues/4240)) ([895da28](https://github.com/nolimits4web/Swiper/commit/895da2888e4e8613f2f3dbaa4c150429b0afd85d))
- **slidesPerColumn:** init ([#4508](https://github.com/nolimits4web/Swiper/issues/4508)) ([c469d29](https://github.com/nolimits4web/Swiper/commit/c469d29f80393896356d2ccd315ee91080e829c0))

# [6.8.4](https://github.com/nolimits4web/Swiper/compare/v6.8.3...v6.8.4) (2021-08-23)

### Bug Fixes

- improve typing ([b0fb310](https://github.com/nolimits4web/Swiper/commit/b0fb310de000dd9fff5e4c91e07be2cc93e754eb))

# [6.8.3](https://github.com/nolimits4web/Swiper/compare/v6.8.2...v.6.8.3) (2021-08-20)

### Bug Fixes

- fix missing package.json in `swiper/types`

# [6.8.2](https://github.com/nolimits4web/Swiper/compare/v6.8.1...v.6.8.2) (2021-08-16)

### Bug Fixes

- **core:** support tailwind's `!` in classes ([0cfbc53](https://github.com/nolimits4web/Swiper/commit/0cfbc538d1e23e01a1b93a327a2203ae70bd44ef)), closes [#4812](https://github.com/nolimits4web/Swiper/issues/4812)
- **vue:** add missing emitted events (enable & disable) into 'emits' option ([95665cc](https://github.com/nolimits4web/Swiper/commit/95665ccbf7b7f381aa62a4e0ef3cbdf67de5ac83))
- **vue:** fix `focusableElements` prop type ([7f1b1b9](https://github.com/nolimits4web/Swiper/commit/7f1b1b9805ec4b042570993fd5098344ca04d637)), closes [#4822](https://github.com/nolimits4web/Swiper/issues/4822)

# [6.8.1](https://github.com/nolimits4web/Swiper/compare/v6.8.0...v.6.8.1) (2021-08-03)

### Bug Fixes

- **core:** reset slides margin-top on `slidesPerColumn` breakpoint ([c94a115](https://github.com/nolimits4web/Swiper/commit/c94a115b4e5ca326730722cdeeb5c27a387cf1db)), closes [#4044](https://github.com/nolimits4web/Swiper/issues/4044)
- **core:** fix server side check for `HTMLElement` (close [#4787](https://github.com/nolimits4web/Swiper/issues/4787)) ([#4788](https://github.com/nolimits4web/Swiper/issues/4788)) ([ca4f6b8](https://github.com/nolimits4web/Swiper/commit/ca4f6b8dfcc96c0f59d7b78afba8633d06faced8))

### Features

- **pagination:** hide 1 dot pagination ([#4786](https://github.com/nolimits4web/Swiper/issues/4786)) ([cc5e417](https://github.com/nolimits4web/Swiper/commit/cc5e4174ae7bc1b3e465a9eea6a4ee8d7df16cdb))

# [6.8.0](https://github.com/nolimits4web/Swiper/compare/v6.7.5...v6.8.0) (2021-07-22)

### Bug Fixes

- **a11y:** count aria-label without duplicated item in loop option ([4bd7461](https://github.com/nolimits4web/Swiper/commit/4bd7461f4c7ba0ca097a8d5a77881a547b0545e7)), closes [#4782](https://github.com/nolimits4web/Swiper/issues/4782) [#4781](https://github.com/nolimits4web/Swiper/issues/4781)
- **angular:** nested swiper ([#4785](https://github.com/nolimits4web/Swiper/issues/4785)) ([2be958c](https://github.com/nolimits4web/Swiper/commit/2be958cd07be46d45000c3e971fc6a7f7f8b22f6))
- **core:** don't extend html elements in SSR ([#4784](https://github.com/nolimits4web/Swiper/issues/4784)) ([adac257](https://github.com/nolimits4web/Swiper/commit/adac2579a0d2f311b9a269e2e6c526f46ba2c2dc))
- **hash-navigation:** typos in comments and function name ([#4779](https://github.com/nolimits4web/Swiper/issues/4779)) ([07b8dc3](https://github.com/nolimits4web/Swiper/commit/07b8dc326796aa132360a3e5d1241f5b154a86b3))
- **svelte:** install modules via `module` component prop ([#4768](https://github.com/nolimits4web/Swiper/issues/4768)) ([ddaa069](https://github.com/nolimits4web/Swiper/commit/ddaa0699cfb9cc2e068186339902a2d7099dc20e)), closes [#4767](https://github.com/nolimits4web/Swiper/issues/4767)
- **zoom:** fix zoom panning in RTL ([08bcd05](https://github.com/nolimits4web/Swiper/commit/08bcd05ff008beb8e0b721048f1b36a8fd25094a)), closes [#4074](https://github.com/nolimits4web/Swiper/issues/4074)

# [6.7.5](https://github.com/nolimits4web/Swiper/compare/v6.7.1...v6.7.5) (2021-07-01)

### Bug Fixes

- **lazy:** lazy load when no sides resistance enabled ([1949a9e](https://github.com/nolimits4web/Swiper/commit/1949a9e65bfc029fd62532920b3e3c34f351d44d)), closes [#4729](https://github.com/nolimits4web/Swiper/issues/4729)
- **zoom:** compatibility with slidesPerView to zoom only clicked slide ([aa1a778](https://github.com/nolimits4web/Swiper/commit/aa1a7789482b7f244e44183e050e62009cdea00d)), closes [#4716](https://github.com/nolimits4web/Swiper/issues/4716)

### Features

- **vue:** added Vue components typings ([#4707](https://github.com/nolimits4web/Swiper/issues/4707)) ([c452c08](https://github.com/nolimits4web/Swiper/commit/c452c089995760c23e429fa06afa04bd7a1d7c81)), closes [#3916](https://github.com/nolimits4web/Swiper/issues/3916)

# [6.7.1](https://github.com/nolimits4web/Swiper/compare/v6.7.0...v6.7.1) (2021-06-23)

### Bug Fixes

- **angular:** don't set main `class` on wrapper element ([1285195](https://github.com/nolimits4web/Swiper/commit/12851953491155f5f96930355c91110c9a4cf753)), closes [#4679](https://github.com/nolimits4web/Swiper/issues/4679)
- **core:** don't extend html elements ([#4691](https://github.com/nolimits4web/Swiper/issues/4691)) ([32ae99b](https://github.com/nolimits4web/Swiper/commit/32ae99b5d7ffbd148cb3268c5048c76720190c54))
- **core:** unset top margin on slide when `slidesPerColum` changed ([1ced4f7](https://github.com/nolimits4web/Swiper/commit/1ced4f725f66572505aeda34fe2e4c3e0cef05bf)), closes [#4658](https://github.com/nolimits4web/Swiper/issues/4658)
- **react:** dynamically enable/disable navigation/pagination/scrollbar ([d87ac0c](https://github.com/nolimits4web/Swiper/commit/d87ac0c611cbe050c50ab70f4faf5a53decabf12)), closes [#4681](https://github.com/nolimits4web/Swiper/issues/4681)
- **react:** update parallax on Virtual slides rendered ([ce210f3](https://github.com/nolimits4web/Swiper/commit/ce210f3de6336e068ef78511f8ee7a309e8d5456)), closes [#4673](https://github.com/nolimits4web/Swiper/issues/4673)
- **react, svelte, vue:** allow to accept `enabled` prop ([76dd086](https://github.com/nolimits4web/Swiper/commit/76dd086ef6a6ba7794e5cc9fd7633d46bdec1c5c)), closes [#4633](https://github.com/nolimits4web/Swiper/issues/4633)
- **svelte:** dynamically enable/disable navigation/pagination/scrollbar ([8711bb9](https://github.com/nolimits4web/Swiper/commit/8711bb944f5d3aece3550125ed9f5842419c1ea2))
- **typings:** fixed methods definitions for navigation, pagination and scrollbar ([77d6909](https://github.com/nolimits4web/Swiper/commit/77d69092e229dc2dd8cf764766e70ba29408caec))
- **vue:** dynamically enable/disable navigation/pagination/scrollbar ([4821008](https://github.com/nolimits4web/Swiper/commit/482100847d1f6459191d2ccf0ef868a6f69b5691))
- **vue:** update parallax on Virtual slides rendered ([b78c6e0](https://github.com/nolimits4web/Swiper/commit/b78c6e0a758bdb52986ecc1c7b3134737807cbdc))

### Features

- **core:** add ParallaxOptions types ([7cc22fe](https://github.com/nolimits4web/Swiper/commit/7cc22fe72bf95a1fa74a6f4226bebb3bdd4527a2)), closes [#4684](https://github.com/nolimits4web/Swiper/issues/4684)
- **core:** allow `wrapperClass` to be multiple classes ([0d578b0](https://github.com/nolimits4web/Swiper/commit/0d578b0b98bb95141a481d74f1a8ec286bfaad54)), closes [#4680](https://github.com/nolimits4web/Swiper/issues/4680)
- **core:** make `focusableElements` configurable ([6ff0866](https://github.com/nolimits4web/Swiper/commit/6ff086644805be9992adcb6668198496e64e7707)), closes [#4677](https://github.com/nolimits4web/Swiper/issues/4677)
- **core:** use `window.matchMedia` to detect window width for breakpoints ([1a4afe0](https://github.com/nolimits4web/Swiper/commit/1a4afe0f86ef6f7978fde8a8caf6522ee87faab2)), closes [#4682](https://github.com/nolimits4web/Swiper/issues/4682)

# [6.7.0](https://github.com/nolimits4web/Swiper/compare/v6.6.2...v6.7.0) (2021-05-31)

### Bug Fixes

- **angular:** virtual mode run changeDetecton inside ngZone ([#4601](https://github.com/nolimits4web/Swiper/issues/4601)) ([4f37a61](https://github.com/nolimits4web/Swiper/commit/4f37a615a78c91149cd574437735037f5692da2a))
- **lazy:** use passive listener for scroll listeners ([cbe7a59](https://github.com/nolimits4web/Swiper/commit/cbe7a5958a31eab98cd64bcdb81a69b7a6e3c5ac))
- **thumbs:** improve thumbs with slidesPerGroup ([b2b31b3](https://github.com/nolimits4web/Swiper/commit/b2b31b325b9777269de4d23847fde11274beafe5)), closes [#3704](https://github.com/nolimits4web/Swiper/issues/3704) [#4007](https://github.com/nolimits4web/Swiper/issues/4007) [#4615](https://github.com/nolimits4web/Swiper/issues/4615) [#4208](https://github.com/nolimits4web/Swiper/issues/4208)
- **vue:** definition for "lock" and "unlock" events ([46d35f7](https://github.com/nolimits4web/Swiper/commit/46d35f761c899563dd1f8e39b912ad8d68c55bbb)), closes [#4596](https://github.com/nolimits4web/Swiper/issues/4596)

### Features

- **core:** starter html layout can be optional with new `createElements: true` parameter ([#4507](https://github.com/nolimits4web/Swiper/issues/4507)) ([aef2865](https://github.com/nolimits4web/Swiper/commit/aef2865d9bc6cb7c63809b114668aa8b728c875c))
- **autoplay:** if `disableOnInteraction` and `pauseOnMouseEnter`, it will stop autoplay on interaction ([e7e5031](https://github.com/nolimits4web/Swiper/commit/e7e5031a58b50e3f21f2c349db242408379beb05)), closes [#4598](https://github.com/nolimits4web/Swiper/issues/4598)
- **vue:** add support for use Swiper as async component ([ff53797](https://github.com/nolimits4web/Swiper/commit/ff53797a68882940b4d239d11332005222a26058)), closes [#4613](https://github.com/nolimits4web/Swiper/issues/4613)

# [6.6.2](https://github.com/nolimits4web/Swiper/compare/v6.6.1...v6.6.2) (2021-05-19)

### Bug Fixes

- **autoplay:** fix resume after pause on mouseenter ([3d480be](https://github.com/nolimits4web/Swiper/commit/3d480bef871add22543794fc279c95f4544c81ed)), closes [#4569](https://github.com/nolimits4web/Swiper/issues/4569)
- **navigation:** better SCSS interpolation ([a1337df](https://github.com/nolimits4web/Swiper/commit/a1337dfed176a01631d84714785524953d08ecd5))
- **svelte:** auto update Virtual slides on slides prop change ([ddf11b8](https://github.com/nolimits4web/Swiper/commit/ddf11b8fbf6494d076cddc55e306c720f975dd31)), closes [#4564](https://github.com/nolimits4web/Swiper/issues/4564)

# [6.6.1](https://github.com/nolimits4web/Swiper/compare/v6.6.0...v6.6.1) (2021-05-11)

### Bug Fixes

- **core:** fix breakpoints `enabled` detection ([0be8099](https://github.com/nolimits4web/Swiper/commit/0be80997f11951985797e767c150545e3180f761)), closes [#4543](https://github.com/nolimits4web/Swiper/issues/4543)

# [6.6.0](https://github.com/nolimits4web/Swiper/compare/v6.5.9...v6.6.0) (2021-05-11)

### Bug Fixes

- **core:** make autoHeight work with Virtual slides ([6925acf](https://github.com/nolimits4web/Swiper/commit/6925acf3b75fc2bdfdae0879cbb3f0f07a79beb4)), closes [#4525](https://github.com/nolimits4web/Swiper/issues/4525)
- **zoom:** don't toggle zoom on slides without zoom-container ([e1de61b](https://github.com/nolimits4web/Swiper/commit/e1de61b821e29f202f041e63afe55b3b2b4250de)), closes [#4535](https://github.com/nolimits4web/Swiper/issues/4535)

### Features

- **autoplay:** new `pauseOnMouseEnter` parameter to pause autoplay on mouse enter over container ([1a10247](https://github.com/nolimits4web/Swiper/commit/1a102473df5be7c507b54efb1902a0dcbb53195d)), closes [#4482](https://github.com/nolimits4web/Swiper/issues/4482)
- **core:** new parameters and methods to enable/disable Swiper dynamically ([575bc84](https://github.com/nolimits4web/Swiper/commit/575bc841539d8ceb79b88484534c7caf4e94a8fb)), closes [#4356](https://github.com/nolimits4web/Swiper/issues/4356) [#4311](https://github.com/nolimits4web/Swiper/issues/4311)
- **react:** add the missing render function type ([cfa1459](https://github.com/nolimits4web/Swiper/commit/cfa1459b7d338274c2d0f682f68b27d7fc683884))

# [6.5.9](https://github.com/nolimits4web/Swiper/compare/v6.5.8...v6.5.9) (2021-04-30)

### Bug Fixes

- **angular:** custom naviation & pagination ([c96bcf6](https://github.com/nolimits4web/Swiper/commit/c96bcf65a818d56a4ed949b43078bc5a5e4980ad))
- **angular:** don't remove Swiper styles on destroy ([96ad4f0](https://github.com/nolimits4web/Swiper/commit/96ad4f0edd647e24d962cedfacaeb9668fe7a47a)), closes [#4443](https://github.com/nolimits4web/Swiper/issues/4443)
- **angular:** extend current params ([71be609](https://github.com/nolimits4web/Swiper/commit/71be6095b647f7c8e92126fef71ef8cdea1b69ae))
- **angular:** pagination true should work ([434a19c](https://github.com/nolimits4web/Swiper/commit/434a19cde48aa239a8ddf7cfb77fb6526a17360b))
- **angular:** update value ([20e25b5](https://github.com/nolimits4web/Swiper/commit/20e25b5534d050ea11fa7a95dea130c1adaf8e33))
- **build:** size calc ([769e9df](https://github.com/nolimits4web/Swiper/commit/769e9df2e439a2082505bcaa1a3de02d1bdb231d))
- **docs:** postinstall bakers-> backers typo ([839aea4](https://github.com/nolimits4web/Swiper/commit/839aea42a33dd4b82031310ba69750251cb978e2))
- **hash-navigation:** fixed issue when using with freeMode without transition ([c90a7bd](https://github.com/nolimits4web/Swiper/commit/c90a7bd73dd84b4422a5699ffb996f24ec868d01)), closes [#4478](https://github.com/nolimits4web/Swiper/issues/4478)
- **history:** fixed issue when using with freeMode without transition ([2902ea9](https://github.com/nolimits4web/Swiper/commit/2902ea95b29a7c2e7696ffb5c9440f8604722fc9))
- **react:** load lazy images (if enabled) on children change ([ca0347b](https://github.com/nolimits4web/Swiper/commit/ca0347b505fec19a08a8c48034b01ad8faf68265)), closes [#4463](https://github.com/nolimits4web/Swiper/issues/4463)
- **vue:** load lazy images (if enabled) on children change ([335daff](https://github.com/nolimits4web/Swiper/commit/335daff14417da61c17a6f65a2c4698c24e145e1))

### Features

- **angular:** support id input ([ad51e32](https://github.com/nolimits4web/Swiper/commit/ad51e324a6cd8666d64b94f4fdf30fe9f6bd85f7))
- core-js postinstall script ([fd5c01d](https://github.com/nolimits4web/Swiper/commit/fd5c01d8f7c6feeed39e4440f5e9cdcd75667394))
- **angular:** use class & ngClass on `<swiper>` component ([66c5a55](https://github.com/nolimits4web/Swiper/commit/66c5a55b76a5d7e58908bf3fad8866e16361244b))

# [6.5.8](https://github.com/nolimits4web/Swiper/compare/v6.5.7...v6.5.8) (2021-04-23)

### Bug Fixes

- **components:** fixed issue with navigation, pagination, scrollbar custom elements added after initialization ([cfd4efd](https://github.com/nolimits4web/Swiper/commit/cfd4efd59fe422be7c36594234bcb54aaaf5cfc3)), closes [#4458](https://github.com/nolimits4web/Swiper/issues/4458)
- **react:** make events reactive ([301ffb0](https://github.com/nolimits4web/Swiper/commit/301ffb096295017578e9309886686b42dd4b7785)), closes [#3762](https://github.com/nolimits4web/Swiper/issues/3762)

### Features

- **a11y:** add `a11y.slideRole` parameter for custom slide role ([097109f](https://github.com/nolimits4web/Swiper/commit/097109fceae580fe211f60c0be7218d6344baabe)), closes [#4435](https://github.com/nolimits4web/Swiper/issues/4435)
- **history:** new `root` parameter to avoid issues with root path detection ([e6d1202](https://github.com/nolimits4web/Swiper/commit/e6d1202fc02ab1283da1fb71b5d3092874ba8aad)), closes [#3205](https://github.com/nolimits4web/Swiper/issues/3205)

# [6.5.7](https://github.com/nolimits4web/Swiper/compare/v6.5.6...v6.5.7) (2021-04-16)

### Bug Fixes

- **react:** fixed issue with Virtual, Controller and Thumbs when running `React.StrictMode`

### Features

- **core:** new `swiper.setProgress` method to set whole Swiper translate progress (from 0 to 1)

# [6.5.6](https://github.com/nolimits4web/Swiper/compare/v6.5.5...v6.5.6) (2021-04-09)

### Bug Fixes

- **angular:** custom html element support ([b7d0c1f](https://github.com/nolimits4web/Swiper/commit/b7d0c1f795fbf324ab03f805e47c211cb11ff5b9))
- **angular:** custom html element support ([dec54c2](https://github.com/nolimits4web/Swiper/commit/dec54c23cb33fa9f6eae1539a51251a641e98088))

# [6.5.5](https://github.com/nolimits4web/Swiper/compare/v6.5.4...v6.5.5) (2021-04-08)

### Bug Fixes

- **core:** removed Svelte from peerDependencies
- **utils:** dom not writeable ([8775c1a](https://github.com/nolimits4web/Swiper/commit/8775c1a748541f7597525cf2eb7559788f4e6422))

# [6.5.4](https://github.com/nolimits4web/Swiper/compare/v6.5.3...v6.5.4) (2021-04-05)

### Bug Fixes

- **core:** fix pagination and a11y classes escaping ([49e06f9](https://github.com/nolimits4web/Swiper/commit/49e06f9f35aecae1a002bdec679dae6d6aaebb01)), closes [#4403](https://github.com/nolimits4web/Swiper/issues/4403)
- **svelte:** don't destroy on server-side ([8a8fb62](https://github.com/nolimits4web/Swiper/commit/8a8fb625a9ce2fc543e0aa8d81c1aed1e0b19c8f)), closes [#3961](https://github.com/nolimits4web/Swiper/issues/3961)

# [6.5.3](https://github.com/nolimits4web/Swiper/compare/v6.5.2...v6.5.3) (2021-03-31)

### Bug Fixes

- **navigation:** fix wrong nav button position ([ef97693](https://github.com/nolimits4web/Swiper/commit/ef976937fb2a00cae4add0e3acabf66d1d1d35a3)), closes [#4393](https://github.com/nolimits4web/Swiper/issues/4393)

# [6.5.2](https://github.com/nolimits4web/Swiper/compare/v6.5.1...v6.5.2) (2021-03-30)

### Bug Fixes

- **core:** fix params extending loosing Swiper instance ([32092ae](https://github.com/nolimits4web/Swiper/commit/32092ae9544b0ba3ecc6c3b65346afa546d0547d)), closes [#4384](https://github.com/nolimits4web/Swiper/issues/4384)

# [6.5.1](https://github.com/nolimits4web/Swiper/compare/v6.5.0...v6.5.1) (2021-03-29)

### Bug Fixes

- **a11y:** correct `aria-roledescription` attribute name ([1b73c3b](https://github.com/nolimits4web/Swiper/commit/1b73c3b82dfd0b789650474bc5e13fd200115b28)), closes [#4371](https://github.com/nolimits4web/Swiper/issues/4371)
- **core:** fixed **proto** pollution ([ec358de](https://github.com/nolimits4web/Swiper/commit/ec358deab79a8cd2529465f07a0ead5dbcc264ad))
- **core:** fixed **proto** pollution ([9dad273](https://github.com/nolimits4web/Swiper/commit/9dad2739b7474f383474773d5ab898a0c29ac178))
- isObject cross window ([7c36077](https://github.com/nolimits4web/Swiper/commit/7c36077c5e3442576769adef73daa8aa28997732))
- isObject cross window ([95b5dfe](https://github.com/nolimits4web/Swiper/commit/95b5dfe16e7a3b565dd5b22504c6b430f2a660bb))
- update virtual slides ([e33242c](https://github.com/nolimits4web/Swiper/commit/e33242ce41149265f04224380981c34386ec72b4))
- **core:** replace unsupported Object.entries ([6dff71d](https://github.com/nolimits4web/Swiper/commit/6dff71dd3c3e49447d81e7cd543937e376bc9d0d)), closes [#4341](https://github.com/nolimits4web/Swiper/issues/4341)
- **core:** use `getComputedStyle` helper ([9698e58](https://github.com/nolimits4web/Swiper/commit/9698e58101d7350a4be80c542bdd3352a2173a43)), closes [#4337](https://github.com/nolimits4web/Swiper/issues/4337)

### Features

- a11y.slideLabelMessage ([9fd6e68](https://github.com/nolimits4web/Swiper/commit/9fd6e68382b304d3163911cde75d77b07370e62c))
- custom html element support ([f96db02](https://github.com/nolimits4web/Swiper/commit/f96db02f50a8067eff8241817681615b8b26b81d))
- **navigation:** set `disabled` prop on nav element if it is a `<button>` element ([7536fbd](https://github.com/nolimits4web/Swiper/commit/7536fbda91a0c2887c200b7208dc8de3feb35bf8)), closes [#4312](https://github.com/nolimits4web/Swiper/issues/4312)

# [6.5.0](https://github.com/nolimits4web/Swiper/compare/v6.4.15...v6.5.0) (2021-03-05)

### Bug Fixes

- **a11y:** space should trigger role button ([3d4039b](https://github.com/nolimits4web/Swiper/commit/3d4039bbfaddb60f969a35cc7bd3c2ac2121535d))
- **core:** correctly update slideIndex when other elements are present in slides wrapper ([21e7713](https://github.com/nolimits4web/Swiper/commit/21e7713861f4f08d7c1fc4142db0171e7e4abf19))
- **core:** don't toggle zoom during transition ([16f185e](https://github.com/nolimits4web/Swiper/commit/16f185e5447bc58ed78e924f283bc9ea2d6af131)), closes [#4259](https://github.com/nolimits4web/Swiper/issues/4259)
- **core:** don't try to move slider when it is locked ([51fd048](https://github.com/nolimits4web/Swiper/commit/51fd04826669c705c936c8141ea5b27a640715ce)), closes [#4284](https://github.com/nolimits4web/Swiper/issues/4284)
- **e2e:** initSwiper ([9915f8b](https://github.com/nolimits4web/Swiper/commit/9915f8b8698635e06815412c08b7d49cddba42d3))
- **lazy:** fixed issue with lazy loading when freeMode stops without momentum ([82bcc5c](https://github.com/nolimits4web/Swiper/commit/82bcc5cc2ed3dc5c7995df45cfee1d76ed170139)), closes [#4274](https://github.com/nolimits4web/Swiper/issues/4274) [#4275](https://github.com/nolimits4web/Swiper/issues/4275)
- **navigation:** don't hide navigation on pagination click ([7b7cccf](https://github.com/nolimits4web/Swiper/commit/7b7cccf610078a189731eecb542546353a5ad772)), closes [#4285](https://github.com/nolimits4web/Swiper/issues/4285)
- **pagination:** don't hide pagination on navigation click ([68b8a93](https://github.com/nolimits4web/Swiper/commit/68b8a935a9032cf90b996ceb9d795ee61d7c18fc)), closes [#4285](https://github.com/nolimits4web/Swiper/issues/4285)
- **svelte:** fix Svelte cjs exports ([478289c](https://github.com/nolimits4web/Swiper/commit/478289ce2ca8fc857434da65182b1bd14c3447c4)), closes [#4297](https://github.com/nolimits4web/Swiper/issues/4297)

### Features

- **components:** added "resizeObserver" boolean option/prop to enable ResizeObserver ([f03ffbb](https://github.com/nolimits4web/Swiper/commit/f03ffbb0ed2148da44540856251519b0845eeaa6)), closes [#4244](https://github.com/nolimits4web/Swiper/issues/4244)
- **core:** added support to use ResizeObserver with new "resizeObserver" parameter ([5f80052](https://github.com/nolimits4web/Swiper/commit/5f8005274ee0f379cfe31d4cde65951816595aad)), closes [#4244](https://github.com/nolimits4web/Swiper/issues/4244)
- **core:** possible to enable breakpoints based on container width (instead of window width) ([42db86d](https://github.com/nolimits4web/Swiper/commit/42db86d209ce0b199b8fd92160a1278c512d2b9e)), closes [#4244](https://github.com/nolimits4web/Swiper/issues/4244)
- init cypress ([6159524](https://github.com/nolimits4web/Swiper/commit/6159524bc33fa8605eccaeec8ef241ae33b6be7d))

# [6.4.15](https://github.com/nolimits4web/Swiper/compare/v6.4.14...v6.4.15) (2021-02-18)

### Bug Fixes

- **angular, vue, svelte:** add 'observer', etc. to params-list ([8f1cd29](https://github.com/nolimits4web/Swiper/commit/8f1cd290f5e2966d2bba6fca14709d040a250741))
- **core:** correctly store class names ([02265ec](https://github.com/nolimits4web/Swiper/commit/02265ec7a9ee94649004afc312d3c010f79debb4)), closes [#4247](https://github.com/nolimits4web/Swiper/issues/4247)

# [6.4.14](https://github.com/nolimits4web/Swiper/compare/v6.4.12...v6.4.14) (2021-02-17)

### Bug Fixes

- **svelte:** add "observer" params support to props ([703ea53](https://github.com/nolimits4web/Swiper/commit/703ea5301fb1739e904dd60ff2f35dbe0f0544ed))
- **vue:** add "observer" params support to props ([1d37ff7](https://github.com/nolimits4web/Swiper/commit/1d37ff73407fa742cbd1855b668044e63ffd61eb))
- fixed error bundling CJS module ([0cda5e4](https://github.com/nolimits4web/Swiper/commit/0cda5e4708ddb662dfddce3e058cbe57c28696b3)), closes [#4242](https://github.com/nolimits4web/Swiper/issues/4242)
- **react:** add 'observer', etc. to params-list ([205c14e](https://github.com/nolimits4web/Swiper/commit/205c14eb619676c050f7708542ed716570faae48))

### Features

- **angular:** thumbs & controller support ([76acd28](https://github.com/nolimits4web/Swiper/commit/76acd2887139bb722e791c1473183cc7059afd82))

# [6.4.12](https://github.com/nolimits4web/Swiper/compare/v6.4.11...v6.4.12) (2021-02-16)

### Bug Fixes

- **angular:** autoplay SSR ([4f1e9c4](https://github.com/nolimits4web/Swiper/commit/4f1e9c44bc00d2cc3c247ea7299e3530d7ee2405))
- **angular:** don't enable observer when virtual enabled ([8810b18](https://github.com/nolimits4web/Swiper/commit/8810b188b59ca117f961bdd77ad4748dac1f97df))
- **angular:** virtual SSR ([63fed99](https://github.com/nolimits4web/Swiper/commit/63fed999eed7b328b9ae01c0e229ad25601515ba))

### Performance Improvements

- **angular:** call swiperRef outside of angular ([4e544ef](https://github.com/nolimits4web/Swiper/commit/4e544ef337c167ba6d5171d59a70d7be59a99549))

# [6.4.11](https://github.com/nolimits4web/Swiper/compare/v6.4.10...v6.4.11) (2021-02-06)

### Bug Fixes

- **angular:** BrowserAnimationsModule slides deletion ([fef6ebd](https://github.com/nolimits4web/Swiper/commit/fef6ebd89663b6bea5dd4dc30150ab642b3d23b4))
- **react:** navigation, pagination and scrollbar is not disabled when [#4181](https://github.com/nolimits4web/Swiper/issues/4181) ([460787d](https://github.com/nolimits4web/Swiper/commit/460787d081915a927b217bd4b2588d0d979f949d))
- **react:** correctly check for virtual params ([92c0137](https://github.com/nolimits4web/Swiper/commit/92c0137e4045dc926a44f1bced0b927a3ad17fb4))
- **react:** support SwiperSlider components wrapped in higher order components and fix nested fragments bug [#4144](https://github.com/nolimits4web/Swiper/issues/4144)
- **vue:** update virtual slides on nextTick ([5208b1a](https://github.com/nolimits4web/Swiper/commit/5208b1a63b63d1337a65841c873bcd8c0c01e49f)), closes [#4172](https://github.com/nolimits4web/Swiper/issues/4172)
- **svelte/vue** navigation, pagination and scrollbar is not disabled when `false` [#4181](https://github.com/nolimits4web/Swiper/issues/4181) ([ffedb6b](https://github.com/nolimits4web/Swiper/commit/ffedb6baf44794098565b408d172c34119c33323))

### Features

- **angular:** use observer to update swiper on slides changes ([962a0c0](https://github.com/nolimits4web/Swiper/commit/962a0c037a2dfb3f37d2bbf10615ecd47dd8c123))
- **angular:** use swipers observer ([30dd7c9](https://github.com/nolimits4web/Swiper/commit/30dd7c95a3bbc6ed3687f1f7581eabe261d278d9))

## [6.4.10](https://github.com/nolimits4web/Swiper/compare/v6.4.9...v6.4.10) (2021-01-29)

### Bug Fixes

- **core:** don't throw error when trying to init on non existent element ([31aa87a](https://github.com/nolimits4web/Swiper/commit/31aa87a4d948912a855c06740180104a8feb56c7))
- **core:** fixed issue with "scroll container" ([c3d0b97](https://github.com/nolimits4web/Swiper/commit/c3d0b9761aa641d0029a5f045db5eb4298e81a04)), closes [#4161](https://github.com/nolimits4web/Swiper/issues/4161)
- **react:** fixed issut with Virtual Slides not working correctly ([c24f7ef](https://github.com/nolimits4web/Swiper/commit/c24f7ef8e3a1e5553dae7eed2710087d1e636571)), closes [#4162](https://github.com/nolimits4web/Swiper/issues/4162)
- **vue:** fixed updating virtual slides on virtual data change ([5979102](https://github.com/nolimits4web/Swiper/commit/59791021b7c800e1c0a96243b96fd0ca541f0d24))

## [6.4.9](https://github.com/nolimits4web/swiper/compare/v6.4.8...v6.4.9) - Released on January 28th, 2021

### Bug Fixes

- **angular:** Cannot set property 'classNames' of undefined ([13bcf39](https://github.com/nolimits4web/Swiper/commit/13bcf3988ac44718d75106c16cf1045e64c7d143))
- **angular:** content slider ngIf ([4ca13e4](https://github.com/nolimits4web/Swiper/commit/4ca13e449135c0b7735bfabb04a9d4f05e78a8e3))
- **angular:** tsconfig path ([f2dcf16](https://github.com/nolimits4web/Swiper/commit/f2dcf1664eea9601c760a9e2b0e68e0d564cac6b))
- **angular:** zoom container custom class ([5d4f11c](https://github.com/nolimits4web/Swiper/commit/5d4f11c9d6a954803945e5d84fa38e33e67416c7))
- **core:** disable extra grid item for free mode ([9159d89](https://github.com/nolimits4web/Swiper/commit/9159d899ec93df6f34824f72a48699676ef20b13)), closes [#4010](https://github.com/nolimits4web/Swiper/issues/4010)
- **docs:** change url api -> swiper-api ([3dc9203](https://github.com/nolimits4web/Swiper/commit/3dc92037e728c9b4ade664ef2f45805f6328ff23))
- **docs:** heading levels ([e8157e6](https://github.com/nolimits4web/Swiper/commit/e8157e6221e7bd44f9f91111c3eeb7f288dbe4fe))
- **scrollbar:** fixed issue when initialized with empty `scrollbar.el` will throw an error on destroy
- **svelte:** slots container start & end ([b23b4e1](https://github.com/nolimits4web/Swiper/commit/b23b4e1695f43563ba051aa1fcf7636009f1c4dd))
- **zoom:** consider window scroll for offsets ([60cd60a](https://github.com/nolimits4web/Swiper/commit/60cd60ad0cfc681b16d984aed52b08f769794926)), closes [#4039](https://github.com/nolimits4web/Swiper/issues/4039)

### Features

- add allcontributors ([95b49b1](https://github.com/nolimits4web/Swiper/commit/95b49b14c60458fd258707f12f0aaa874cb9d781))
- **angular:** custom classes ([acc678a](https://github.com/nolimits4web/Swiper/commit/acc678a1a6bdf76eebf8ab43cd1b66e12fab0309))

## [6.4.8](https://github.com/nolimits4web/swiper/compare/v6.4.7...v6.4.8) - Released on January 22th, 2021

- Core
  - Improved default behavior on Windows touch screen devices
- Types
  - Some docs comments fixes

## [6.4.7](https://github.com/nolimits4web/swiper/compare/v6.4.6...v6.4.7) - Released on January 21th, 2021

- Types
  - Added full docs comments for all Swiper parameters
- Angular
  - Proper support for zoom functionality with required extra "zoom" element. Can be enabled with `zoom` prop on slides, e.g. `<ng-template swiperSlide [zoom]="true">`
  - Fixed issue with SSR
  - Fixed issue with not working custom `pagination.el`

## [6.4.6](https://github.com/nolimits4web/swiper/compare/v6.4.5...v6.4.6) - Released on January 20th, 2021

- Core
  - `edgeSwipeDetection` parameter now can receive string `'prevent'` to prevent system swipe-back navigation
  - Fixed issue when with decimal `slidesPerView` last slide never received "active" class/state
  - Cube
    - Fixed shadow rendering issues in Chrome
- React/Svelte/Vue/Angular
  - Fixed rendering issue when virtual slides used with breakpoints
- Minor fixes

## [6.4.5](https://github.com/nolimits4web/swiper/compare/v6.4.4...v6.4.5) - Released on December 18th, 2020

- Fixed issue with `postinstall` script

## [6.4.4](https://github.com/nolimits4web/swiper/compare/v6.4.1...v6.4.4) - Released on December 18th, 2020

- Fixed issue with `postinstall` script
- Now `.css` files are also available for all components
- Svelte
  - Fixed issue with wrong location of `.svelte` files in package
- Angular
  - Types fixes
  - Added `[config]` support to pass all Swiper params as single object (https://github.com/nolimits4web/swiper/commit/f7d21c5f49860fdca62a31ccb62b01a790fd0df3)
  - Added `(index)` active slide binding (https://github.com/nolimits4web/swiper/commit/86670bd7c1b95268919147662383804e664011a7)
- Minor fixes

## [6.4.1](https://github.com/nolimits4web/swiper/compare/v6.4.0...v6.4.1) - Released on December 9th, 2020

- Fixed types errors introduced in `6.4.0`

## [6.4.0](https://github.com/nolimits4web/swiper/compare/v6.3.5...v6.4.0) - Released on December 8th, 2020

- All new Swiper Angular components (kudos to @vltansky) 🎉
- React
  - Now Swiper won't cleanup styles on destroy
- Svelte
  - Now svelte package contains source `.svelte` components
  - Now Swiper won't cleanup styles on destroy
- Vue
  - Now Swiper won't cleanup styles on destroy
- Lazy
  - Now it has options to check is Swiper also is in view before loading the images (thanks to @ygj6)
- Build
  - Fixed sourcemap missing original sources
- Lots of minor fixes

## [6.3.5](https://github.com/nolimits4web/swiper/compare/v6.3.4...v6.3.5) - Released on October 30th, 2020

- Build
  - Fixed builds on Windows
- Core
  - Fixed no swiping class in shadow component (#3868)
  - Typecheck for `slideTo`'s `index` parameter

## [6.3.4](https://github.com/nolimits4web/swiper/compare/v6.3.3...v6.3.4) - Released on October 20th, 2020

- Vue
  - Fixed issue with `Maximum recursive updates`

## [6.3.3](https://github.com/nolimits4web/swiper/compare/v6.3.2...v6.3.3) - Released on October 9th, 2020

- Core
  - Fixed issue with wrong slides calculation when slides have inner scrollbars
- Autoplay
  - Now it will continue autoplay if it reaches the end and new slides will be added later
- React
  - Fixed issue when slide render function data was set only after interaction
- Minor fixes

## [6.3.2](https://github.com/nolimits4web/swiper/compare/v6.3.1...v6.3.2) - Released on September 28th, 2020

- Svelte
  - Fixed issue with throwing error when using breakpoints

## [6.3.1](https://github.com/nolimits4web/swiper/compare/v6.3.0...v6.3.1) - Released on September 25th, 2020

- Core

  - A11y
    - Init module after all other modules initialized

## [6.3.0](https://github.com/nolimits4web/swiper/compare/v6.2.0...v6.3.0) - Released on September 25th, 2020

- Core

  - A11y
    - Added new parameters `containerMessage`, `containerRoleDescriptionMessage` and `itemRoleDescriptionMessage` (#3834 thanks to @jenemde)

- React

  - Now `SwiperSlide` component requires unique `virtualIndex` to be set so Swiper can know which slide is rendered exactly

- Vue

  - Fixed issue when `SwiperSlide` was not rendered if used with `v-for`
  - Now `SwiperSlide` component requires unique `virtualIndex` to be set so Swiper can know which slide is rendered exactly

- All new Swiper Svelte components:

  ```html
  <Swiper spaceBetween="{50}" slidesPerView="{3}">
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    ...
  </Swiper>
  <script>
    import { Swiper, SwiperSlide } from 'swiper/svelte';
  </script>
  ```

## [6.2.0](https://github.com/nolimits4web/swiper/compare/v6.1.3...v6.2.0) - Released on September 4rd, 2020

- All new Swiper Vue.js (v3) components:

  ```html
  <template>
    <swiper :space-between="50" :slides-per-view="3">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      ...
    </swiper>
  </template>
  <script>
    import { Swiper, SwiperSlide } from 'swiper/vue';

    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
    };
  </script>
  ```

## [6.1.3](https://github.com/nolimits4web/swiper/compare/v6.1.2...v6.1.3) - Released on September 3rd, 2020

- Core
  - Pagination
    - Now it won't set a11y attributes on customly rendered bullets
- React
  - Fixed issue with loop mode and breakpoints not being recalculate slides

## [6.1.2](https://github.com/nolimits4web/swiper/compare/v6.1.1...v6.1.2) - Released on August 17th, 2020

- React
  - Fixed issue generating `useLayoutEffect` warning in Next.js
  - Fixed issue with Virtual List in RTL mode

## [6.1.1](https://github.com/nolimits4web/swiper/compare/v6.1.0...v6.1.1) - Released on July 31th, 2020

- Fixed ESM/CJS import paths

## [6.1.0](https://github.com/nolimits4web/swiper/compare/v6.0.4...v6.1.0) - Released on July 31th, 2020

- Core
  - Mousewheel
    - New mousewheel parameters `thresholdDelta` and `thresholdTime` (#3720)
  - Fixed issue with Navigation and Pagination `.less` files (#3724)
  - Fixed issue with setting proper `sideEffects` causing some bundlers to not include imported styles (#3708)
- React
  - Now `SwiperSlide` accepts render function with `isActive`, `isVisible`, `isPrev`, `isNext`, `isDuplicate` props:
    ```jsx
    <Swiper>
      <SwiperSlide>
        {({ isActive }) => <div>Current slide is {isActive ? 'active' : 'not active'}</div>}
      </SwiperSlide>
      <SwiperSlide>...</SwiperSlide>
      ...
    </Swiper>
    ```
- Minor fixes

## [6.0.4](https://github.com/nolimits4web/swiper/compare/v6.0.3...v6.0.4) - Released on July 15th, 2020

- Fixed TS definitions for Swiper React component (#3692)

## [6.0.3](https://github.com/nolimits4web/swiper/compare/v6.0.2...v6.0.3) - Released on July 14th, 2020

- Dom7 updated to latest with correct `__proto__` setters/getters

## [6.0.2](https://github.com/nolimits4web/swiper/compare/v6.0.1...v6.0.2) - Released on July 9th, 2020

- React
  - Now Swiper will be auto updated if `pagination.el`, `scrollbar.el`, `navigation.nextEl` and `navigation.prevEl` are passed from later-available refs

## [6.0.1](https://github.com/nolimits4web/swiper/compare/v6.0.0...v6.0.1) - Released on July 7th, 2020

- Core

  - SCSS:Fixed issue with missing `$colors` var in Navigation and Pagination

- React

  - Fixed Swiper instance argument typings in event handler props
  - Added event handler props definitions for modules events

## [6.0.0](https://github.com/nolimits4web/swiper/compare/v5.4.5...v6.0.0) - Released on July 3rd, 2020

- New NPM package structure

  - All scripts transpiled to ES5
  - New and renamed files (**BREAKING CHANGE**):
    - `swiper.less` - core Swiper LESS
    - `swiper.scss` - core Swiper SCSS
    - `swiper-bundle.css` - Swiper bundle CSS
    - `swiper-bundle.js` - Swiper bundle JavaScript in UMD format
    - `swiper-bundle.cjs.js` - Swiper bundle JavaScript in CommonJS format
    - `swiper-bundle.esm.js` - Swiper bundle JavaScript in ESM format
    - `swiper.cjs.js` - Swiper core JavaScript in CommonJS format
    - `swiper.esm.js` - Swiper core JavaScript in ESM format
  - Following imports are now available
    - `import Swiper from 'swiper'` - imports core version
    - `import Swiper from 'swiper/bundle'` - imports bundle version
    - `import Swiper from 'swiper/core'` - imports core version
  - Components can be imported from core version using named imports, or using direct import:

    ```js
    import { Navigation } from 'swiper';
    // or
    import Navigation from 'swiper/components/navigation';

    // and styles (Less or SCSS only)
    import 'swiper/components/navigation/navigation.less';
    ```

- Full server-side rendering support (SSR) with new parameters:
  - `userAgent` - device user agent, required for some initial detection
  - `url` - required to correctly detect and set initial slide if Hash Navigation or History modules are used
- New `loopPreventsSlide` boolean parameter (by default enabled), that prevents slidePrev/Next transitions while transition is in progress
- Full support for Node.js DOM libraries like JSDOM and Domino
- Added new `onAny(callback)` listener to listen for any swiper event
- All events now emit `swiper` instance as a first argument (**BREAKING CHANGE**)
- Added official TypeScript definitions
- Updated to use next generation `dom7` and `ssr-window` libraries
- All new Swiper React components:

  ```jsx
  import { Swiper, SwiperSlide } from 'swiper/react';

  export default () => {
    return (
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        ...
      </Swiper>
    );
  };
  ```

## [5.4.5](https://github.com/nolimits4web/swiper/compare/v5.4.3...v5.4.5) - Released on June 16th, 2020

- Core
  - Fixed issue when checkOverflow method could throw error if Navigation module wasn't installed (#3621)
- Keyboard
  - New parameter `pageUpDown` to enable/disable pageUp and pageDown keys (enabled by default)

## [5.4.3](https://github.com/nolimits4web/swiper/compare/v5.4.2...v5.4.3) - Released on June 13th, 2020

- Core
  - Removed `UIWebView` text from code
  - Fixed resize handler calling `slideTo` to last slide when it shouldn't

## [5.4.2](https://github.com/nolimits4web/swiper/compare/v5.4.1...v5.4.2) - Released on June 3rd, 2020

- Mousewheel
  - Fixed issue when enabling `forceToAxis` also inverted scrolling
- Coverflow Effect
  - Added support for `scale` parameter (#3598)
- Pagination
  - Fixed detection of `uniqueNavElements` (#3590)

## [5.4.1](https://github.com/nolimits4web/swiper/compare/v5.4.0...v5.4.1) - Released on May 20th, 2020

- Fixed dependencies versions

## [5.4.0](https://github.com/nolimits4web/swiper/compare/v5.3.8...v5.4.0) - Released on May 15th, 2020

- Hash Navigation
  - Added `hashChange` and `hashSet` events (#3557)
- Lazy
  - Added support for `<picture>` lazy loading (#3560)
- Mousewheel
  - Potentially improved vertical scrolling issues on Windows/Linux OS
- Updated `ssr-window` and `dom7` dependencies to latest versions
- Minor fixes

## [5.3.8](https://github.com/nolimits4web/swiper/compare/v5.3.7...v5.3.8) - Released on April 24th, 2020

- Core
  - Fix iOS bug with double bounce on free mode momentum bounce
- A11y
  - Fixed focus ring on navigation buttons (#3544)
  - Fixed RegExp issue in `paginationBulletMessage` (#3540, #3541)
- Thumbs
  - Added `thumbs.autoScrollOffset` parameter that allows to set on what thumbs active slide from edge. It should automatically move scroll thumbs
- Minor fixes

## [5.3.7](https://github.com/nolimits4web/swiper/compare/v5.3.6...v5.3.7) - Released on April 10th, 2020

- Core
  - Fixed `cssMode` behavior in RTL layout
- Zoom
  - Fixed issue with not working double-tap to toggle with virtual slides
- Minor fixes

## [5.3.6](https://github.com/nolimits4web/swiper/compare/v5.3.1...v5.3.6) - Released on February 29th, 2020

- Core
  - Fixed wrong auto height calculation with `centeredSlides` enabled
- Lazy
  - Now it will update auto height (if enabled) on lazy image loaded (#3466)
- Zoom
  - Fixed issue when previously active slide could be zoomed with `zoom.in()` API (#3451)
  - Fixed issue when zoom didn't work on `<picture>` element (#3456)
  - Added support for custom zoom-target element by adding `swiper-zoom-target` class to such elements
- Coverflow Effect
  - `stretch` parameter now can be set in `%` (#3468)
- Minor fixes

## [5.3.1](https://github.com/nolimits4web/swiper/compare/v5.3.0...v5.3.1) - Released on February 8th, 2020

- Core
  - Fixed issue when slider could stuck after last slide (#3414)
  - Added `label` to list of form events to keep clicks on it (#3407)

## [5.3.0](https://github.com/nolimits4web/swiper/compare/v5.2.1...v5.3.0) - Released on January 11th, 2020

- Core
  - New `slidesPerGroupSkip` behavior (#3361)
  - New ratio-based breakpoints (#3389)
  - Added SCSS interpolation (#3373, #3374)
- Mousehweel
  - Fixed issue when it can fail on load (#3383)
- Minor fixes

## [5.2.1](https://github.com/nolimits4web/swiper/compare/v5.2.0...v5.2.1) - Released on November 16th, 2019

- Core
  - New loop events `beforeLoopFix` and `loopFix`
  - New parameter `updateOnWindowResize` (by default `true`) that will update/recalc swiper on window resize/orientationchange
  - Added SCSS interpolation for `--swiper-theme-color` variable when not building from source (#3334)
  - Quote SCSS color names (#3316)
  - Fixed issue when `.once` could be called more than once (#3322)
- Mousewheel
  - Fixed scroll wheel unwanted frozen effect (#3328)
- Thumbs
  - New `multipleActiveThumbs` (by default `true`) option to control whether multiple thumbnail slides may get activated or not.
- Minor fixes

## [5.2.0](https://github.com/nolimits4web/swiper/compare/v5.1.0...v5.2.0) - Released on October 26th, 2019

- Core
  - New `centeredSlidesBounds` parameter that when enabled will keep first and last slides at bounds
  - Fixed issue when `freeMode` could break position on resize (#2708, #3303)
  - Fixed transition duration issue with `freeModeSticky` (#3302)
  - Fixed issue with wrong row/column if not full groups (#3294)
  - Fixed issue when `watchOverflow` and `slidesOffsetBefore`/`slidesOffsetAfter` couldn't work together (#3291)
- Mousewheel
  - Faster & smoother mousewheel inertial scrolling (#3304)
- Package
  - Added source maps to package builds (#3306)
  - Added minified version of browser.esm.bundle
- Minor fixes

## [5.1.0](https://github.com/nolimits4web/swiper/compare/v5.0.4...v5.1.0) - Released on October 16th, 2019

- Core
  - Fixed issues with touch on iOS 13
  - New `translateTo` method #3268
- Pagination
  - Improved dynamic bullets behavior when `loop: true` #3255
- Zoom
  - Fixed issue with pinch to zoom on Android
- Minor fixes

## [5.0.4](https://github.com/nolimits4web/swiper/compare/v5.0.3...v5.0.4) - Released on September 30th, 2019

- Core
  - Now on short swipes over navigation buttons, it will treat it like nav button click (#3237 by @robpop)
  - Fixed issue when passing float `slidesPerView` could break loop mode (#3225 by @robpop)
- Scrollbar
  - Fixed issue with wrong "pointer" position calculation on scroll bar tap
- Autoplay
  - Fixed issue when it was `paused` after returning from hidden tab
- Minor fixes

## [5.0.3](https://github.com/nolimits4web/swiper/compare/v5.0.2...v5.0.3) - Released on September 19th, 2019

- Core
  - `touchEventsTarget` defaults back to `container`
  - Added handling of `touchcancel` event #3219
  - Fixed issue with wrong order calculation in `slidesPerColumnFill: 'row'` mode
  - Fixed issue with slides missplacing when prepending slides in virtual mode
  - Fixed issue when zoomed image still swiped to another slide on mobiles

## [5.0.1](https://github.com/nolimits4web/swiper/compare/v5.0.0...v5.0.1) - Released on September 17th, 2019

- Core
  - Fixed typo in code

## [5.0.0](https://github.com/nolimits4web/swiper/compare/v4.5.1...v5.0.0) - Released on September 17th, 2019

- Core
  - All new CSS Scroll Snap mode (can be enabled with `cssMode: true`). It doesn't support all of Swiper's features, but potentially should bring a much better performance in simple configurations
  - Fully removed Internet Explorer support
  - `breakpointsInverse` parameter has been removed and now `breakpoints` behave like with `breakpointsInverse: true` before.
  - `touchMoveStopPropagation` parameter now defaults to `false`
  - `click` event won't be fired with 300ms delay anymore. Now it will be fired at the same time as `tap` event
  - When `slidesPerColumnFill: 'column'` it now uses `flex-direction: column` layout which requires specified height on swiper-container
  - `touchEventsTarget` now defaults to `wrapper` (rather than `container` like before)
  - `slidesPerColumn` now can be used with breakpoints
  - Now Swiper styles use CSS Custom Properties (CSS Custom Variables) to specify swiper's color theme (color of navigation buttons/pagination). It is now `--swiper-theme-color: #007aff;`
  - Improved `es` module "tree-shake-ability"
  - New `swiper.esm.browser.bundle.js` package that can be used directly in browser (`import Swiper from 'swiper.esm.browser.bundle.js'`)
- Autoplay
  - Now it will be paused when document becomes hidden (in not active tab) and continued again when document becomes visible
- Lazy
  - Swiper preloader image replaced with a little bit simpler loader. Now its color can be changed with `--swiper-preloader-color` CSS custom property (which is defaults to `--swiper-theme-color`)
- Pagination
  - Active pagination bullets and pagination theme colors now use CSS Custom Properties. It can be defined with `--swiper-pagination-color` property (which is defaults to `--swiper-theme-color`)
- Navigation
  - Navigation icons reworked with built-in (base64) icon font. It allows to apply any color and size without replacing image
  - Navigation buttons colors now use CSS Custom Properties. It can be defined with `--swiper-navigation-color` property (which is defaults to `--swiper-theme-color`)
  - With `--swiper-navigation-size` (defaults to `44px`) it is now possible to change size of the navigation buttons (and icons)
- Minor fixes and improvements

## [4.5.1](https://github.com/nolimits4web/swiper/compare/v4.5.0...v4.5.1) - Released on September 13th, 2019

- Core
  - Fixed issue when callbacks fires on init even if it disabled (#2807)
  - Fixed issue when "swiper-slide-visible" class name in some situations shows up when it shouldn't
  - `slidesPerColumnFill: 'row'` now considers groups (#3077)
- Thumbs
  - Fixes bug 'Cannot read property `indexOf` of undefined' that sometimes occurs on use of thumbnails
- Keyboard
  - Added `PageUp`/`PageDown` keybindings.
- Autoplay
  - Fixed issue when window resize stopped autoplay
- Parallax
  - Fixed issue when parallax opacity didn't work (#3147)
- Minor fixes and improvements

## [4.5.0](https://github.com/nolimits4web/swiper/compare/v4.4.5...v4.5.0) - Released on February 22nd, 2019

- Core
  - New `swiper.changeDirection()` method to change direction from horizontal to vertical (and back) dynamically
  - `direction` parameter can be used in breakpoints
- Virtual Slides
  - `swiper.virtual.appendSlide` now accepts array of slides to add
  - `swiper.virtual.prependSlide` now accepts array of slides to prepend
  - New `swiper.virtual.removeSlide(indexes)` to remove virtual selected slides
  - New `swiper.virtual.removeAllSlides()` to remove all virtual slides
- Navigation
  - Now it emits `navigationHide` and `navigationShow` events when on nav hide/show
- Pagination
  - Now it emits `paginationHide` and `paginationShow` events when on pagination hide/show
- Dom7 updated to latest 2.1.3
  - Fixed issue when `.once` bound event could still be there after unbinding it with `.off`
- Source
  - Source styles are now available in SCSS in addition to LESS
- Minor fixes and improvements

## [4.4.6](https://github.com/nolimits4web/swiper/compare/v4.4.5...v4.4.6) - Released on December 19th, 2018

- Core
  - Fixed issue with wrong slide size calculation in some cases

## [4.4.5](https://github.com/nolimits4web/swiper/compare/v4.4.2...v4.4.5) - Released on December 14th, 2018

- Core
  - New `observeSlideChildren` parameter to enable auto update on slide children update
  - Fixed issue when slide padding was not considered when calculating sizes
  - Fixed issue with wrong touch support detection on Windows Chrome
  - Fixed some issues with wrong slides grid calculation in multi row mode
- Zoom
  - Now it emits `zoomChange` event with `scale`, `imageEl` and `slideEl` arguments
- Minor fixes

## [4.4.2](https://github.com/nolimits4web/swiper/compare/v4.4.1...v4.4.2) - Released on November 1st, 2018

- New `touchStartForcePreventDefault` parameter to force touch start event prevent default
- Breakpoints fix when breakpoint keys are strings
- Fixed issue when draggable scrollbar may not work on desktop Safari
- Fixed issue with wrong sort of Virtual Slides
- Minor fixes

## [4.4.1](https://github.com/nolimits4web/swiper/compare/v4.4.0...v4.4.1) - Released on September 14th, 2018

- Fixed issue with preventing touchstart event

## [4.4.0](https://github.com/nolimits4web/swiper/compare/v4.3.5...v4.4.0) - Released on September 14th, 2018

- Core
  - New `centerInsufficientSlides` parameter to center slides if the amount of slides less than `slidesPerView`
  - New `breakpointsInverse` parameter (boolean), if enabled then it will count breakpoints in reversed direction, e.g. will override parameters if window width is more than specified breakpoint
- Virtual Slides
  - New `addSlidesBefore` and `addSlidesAfter` parameters to increase amount of pre-rendered slides
- Thumbs
  - All new "Thumbs" module/component designed to control slider thumbnails, in more logical and correct way than with Controller module.
- Lots of minor fixes

## [4.3.5](https://github.com/nolimits4web/swiper/compare/v4.3.3...v4.3.5) - Released on July 31th, 2018

- Core
  - `iOSEdgeSwipeThreshold` parameter renamed to just `edgeSwipeThreshold`. Old `iOSEdgeSwipeThreshold` name is still supported
  - Improved observer performance if there are many mutations at a time. Thanks to @rayvincent-bsd
- Controller
  - Fixed issue with wrong auto height resizing
- Scrollbar
  - Fixed issue when it was using active event listeners instead of passive. Thanks to @nyon
- Minor fixes

## [4.3.3](https://github.com/nolimits4web/swiper/compare/v4.3.2...v4.3.3) - Released on June 5th, 2018

- Core
  - Fixed issue when slidePrev goes to wrong slide #2650
  - Fixed issue when roundLength was not considered for grids calculation #2656
  - Fixed typo in API #2659

## [4.3.2](https://github.com/nolimits4web/swiper/compare/v4.3.0...v4.3.2) - Released on June 1st, 2018

- Core
  - Added `addSlide(index, slide)` method to add slide at required position. Thanks to @kochizufan
  - Fixed issue with loop #2647. Thanks to @kochizufan
- Pagination
  - New `formatFractionCurrent(number)` parameter to format current number in Fraction pagination
  - New `formatFractionTotal(number)` parameter to format total number in Fraction pagination
- Minor fixes

## [4.3.0](https://github.com/nolimits4web/swiper/compare/v4.2.6...v4.3.0) - Released on May 27th, 2018

- Core
  - Fixed issue when `swipeBack` sometimes slides to wrong slide
  - Fixed issue when window resizing can break Coverflow effect layout
  - Fixed issue with wrong detection of `iOSEdgeSwipeDetection`. Thanks to @langjun
- Dom7 update to latest v2.0.6:
  - Fixed issue with remove event listeners when they was not added
- Minor fixes

## [4.2.6](https://github.com/nolimits4web/swiper/compare/v4.2.5...v4.2.6) - Released on May 1st, 2018

- `console.log` cleanup

## [4.2.5](https://github.com/nolimits4web/swiper/compare/v4.2.2...v4.2.5) - Released on April 29th, 2018

- Core
  - Prevent apply grab cursor when swiper is locked
  - Fixed breakpoint with loop getting wrong realIndex when on init
  - Fixed "transformed" slides sizes calculation that could cause issues in with Coverflow effect
- Autoplay
  - Fixed issue that can cause memory leak
- Dom7 update to latest
  - Improved internal events proxies logic for better memory management
- Minor fixes

## [4.2.2](https://github.com/nolimits4web/swiper/compare/v4.2.0...v4.2.2) - Released on April 1st, 2018

- Core
  - Respect and update breakpoints when calling Swiper's `.update()` method
- Pagination
  - New `progressbarOpposite` parameter to make pagination progressbar opposite to `direction` parameter, means vertical progressbar for horizontal swiper direction and horizontal progressbar for vertical swiper direction
- Mousewheel
  - Fixed issue in `loop` + `freeMode` for loop not being set correctly
- Minor fixes

## [4.2.0](https://github.com/nolimits4web/swiper/compare/v4.1.6...v4.2.0) - Released on March 16th, 2018

- Core
  - `swiper.updateAutoHeight(speed)` now supports `speed` parameter to resize swiper wrapper with duration
  - Fixed issues in free mode with `freeModeSticky` not being able to snap to closest snap point
  - New `swiper.slideToClosest()` method to slide to closest snap point when it is somewhere in between
- A11y (Accessibility)
  - It is now enabled by default (if installed)
- Controller
  - Fixed RTL issue when vertical swiper controls horizontal one
- Lazy
  - Fixed issue when lazy loading not always triggered on window resize
- Minor fixes

## [4.1.6](https://github.com/nolimits4web/swiper/compare/v4.1.5...v4.1.6) - Released on February 11th, 2018

- Fixed onTouchMoveOpposite event on touch devices

## [4.1.5](https://github.com/nolimits4web/swiper/compare/v4.1.0...v4.1.5) - Released on February 10th, 2018

- Improved touch events support on desktop Windows devices with touch screen
- Improved "loop fix" when slider is in the free mode
- New `noSwipingSelector` parameter that can be used instead of `noSwipingClass`
- New `preventIntercationOnTransition` parameter to prevent interaction during slice change transition
- New `.slideToLoop` method to be used in loop mode
- Fixed issue with `slideChange` events being fired when slide wasn't actually changed
- Scrollbar
  - Now doesn't require to enable `simulateTouch` for desktops when it is `draggable`
- Keyboard
  - Fixed detection statement whether a swiper is in the viewport
- Pagination
  - Added new multiple main bullets support for dynamic bullets pagination
- Zoom
  - Now supports Virtual Slides
- Minor fixes

## [4.1.0](https://github.com/nolimits4web/swiper/compare/v4.0.7...v4.1.0) - Released on January 13th, 2018

- Improved IE 10 support. But it is recommended to use [**proto** polyfill](https://www.npmjs.com/package/proto-polyfill)
- Improved touch support for Edge
- New `watchOverflow` (disabled by default). When enabled Swiper will be disabled and hide navigation buttons on case there are not enough slides for sliding
- Autoplay
  - New `reverseDirection` to enable autoplay in reverse direction
  - New `waitForTransition` parameter when autoplay will wait for wrapper transition to continue (enabled by default). Can be disabled in case of using Virtual Translate when your slider may not have transition
- Keyboard
  - New `onlyInViewport` parameter (enabled by default). When enabled it will control sliders that are currently in viewport

## [4.0.7](https://github.com/nolimits4web/swiper/compare/v4.0.6...v4.0.7) - Released on November 28th, 2017

- Fixed issue with not working correctly `touchReleaseOnEdges` on iOS
- Fixed issue with not working allowSlideNext/Prev change on Breakpoints
- Fixed wrong scrollbar dragging when using custom `dragSize`
- Minor fixes

## [4.0.6](https://github.com/nolimits4web/swiper/compare/v4.0.5...v4.0.6) - Released on November 13th, 2017

- Fixed Coverflow effect issue using with breakpoints
- `iOSEdgeSwipeDetection` will also be in consideration with right-edge swipe
- Fixed `freeModeSticky` behavior in RTL mode
- Swiper now emits `breakpoint` event on breakpoint change
- Minor fixes

## [4.0.5](https://github.com/nolimits4web/swiper/compare/v4.0.3...v4.0.5) - Released on November 7th, 2017

- Fixed issue with not working `noSwiping` parameter
- Parallax now considers `slidesPerGroup` parameter
- Zoom: improved gestures handling
- Pagination: fixed issues with wrong positioned dynamic-bullets when there are not enough slides
- Fixed issues with some effects being broken with enabled `breakpoints`
- Minor fixes

## [4.0.3](https://github.com/nolimits4web/swiper/compare/v4.0.2...v4.0.3) - Released on October 27th, 2017

- Fixed Parallax opacity and scale transitions
- Better compatability with SSR by using dummy `document` object
- Fixed styles for dynamic pagination buttons in RTL mode
- Fixed issue with last pagination button not being active with `slidesPerView: 'auto'`
- Renamed build tasks: `build-dev` -> `build:dev`, `build-prod` -> `build:prod`

## [4.0.2](https://github.com/nolimits4web/swiper/compare/v4.0.1...v4.0.2) - Released on October 18th, 2017

- Lazy loading support for Virtual slides
- Added `beforeResize` event
- Minor fixes

## [4.0.1](https://github.com/nolimits4web/swiper/compare/v4.0.0...v4.0.1) - Released on October 11th, 2017

- Fixed issue with pagination being broken with loop mode
- Reworked `realIndex` calculation ordering
- ES-module files renamed (**possible breaking change**):
  - `swiper.module.js` -> `swiper.esm.bundle.js` (exported by default)
  - `swiper.modular.js` -> `swiper.esm.js`
- Minor fixes

## [4.0.0](https://github.com/nolimits4web/swiper/compare/v3.4.2...v4.0.0) - Released on October 4th, 2017 🎉

- New API (check [Documentation](http://idangero.us/swiper/api/))
- Virtual Slides - new module that keeps in DOM just required amount of slides
- Source code has been fully rewritten in ES-next syntax
- Dist package contains additional ES-next modules:
  - `swiper.module.js` - swiper bundle for `import Swiper from 'swiper'`
  - `swiper.modular.js` - modular version for using Swiper with required components only
- New `scripts/build-config.js` for creating custom Swiper build with required components and custom color theme
- jQuery version of Swiper has been removed
- Improved compatibility with server-side rendering
- Hundreds of improvements and fixes

## 4.0.0-beta.4 - Released on September 20th, 2017

- Fixed issue with draggable Scrollbar in RTL layout
- Minor fixes

## 4.0.0-beta.3 - Released on September 13th, 2017

- Dom7 update to latest version
- Small core refactoring to get better results within tree-shaking bundles

## 4.0.0-beta.2 - Released on September 2nd, 2017

- Disable a11y by default
- Fixed issue with events sharing between multiple swipers
- Fixed issue with resize handling after destroy
- Few minor fixes

## 4.0.0-beta.1 - Released on August 30th, 2017

- Initial 4.0.0 release

## 3.4.2 - Released on March 10th, 2017

- Fixed an issue with lazy loading callbacks when swiper is destroyed
- New `onAfterResize` and `onBeforeResize` callbacks
- New `onKeyPress` callback when keyboard control is used
- Fixed Chrome+Windows issue with not clickable links that have "title" attribute
- Minor fixes

## 3.4.1 - Released on December 13th, 2016

- Fixed Zoom for RTL
- Improved slideToClickedSlide behavior when loop is enabled
- Minor fixes

## 3.4.0 - Released on October 16th, 2016

- **Custom build** available. Now you can create custom swiper build using the folowing modules: effects, lazy-load, scrollbar, controller, hashnav, history, keyboard, mousewheel, parallax, zoom, a11y. Using cli `gulp custom -zoom,effects,lazy-loading`
- New **zoom** functionality that enables double tap and pinch to zoom slide's inner image:
  - Required slide layout for zoom:
    ```
    <div class="swiper-slide">
      <div class="swiper-zoom-container">
        <img src="path/to/image">
      </div>
    </div>
    ```
  - New zoom parameters:
    - `zoom` - enable zoom functionality
    - `zoomMax` - maximum image zoom multiplier, by default is `3`
    - `zoomMin` - minimum image zoom multiplier, by default is `1`
    - `zoomToggle` - enable/disable zoom-in by slide's double tap
  - `zoomMax` can be also overridden for specific slide by using `data-swiper-zoom` attribute
- New `swiper.enableTouchControl()` and `swiper.disableTouchControl()` methods to enable disable touch control (it toggles `onlyExternal` parameter)
- New `swiper.realIndex` property in addition to `swiper.activeIndex` that returns index of active slide considering loop
- New **History API** with new `history` parameter. It uses history pushState to set active slide URL
- New `hashnavWatchState` parameter to navigate through slides (when hashnav is enabled) by browser history or by setting directly hash on document location
- New `replaceState` parameter that work in addition to hashnav or history to replace current url state with the new one instead of adding it to history
- New methods `s.unsetGrabCursor()` and `s.setGrabCursor()` to enable/disable grab cursor
- Draggable Scrollbar now works when `simulateTouch:false`
- New `normalizeSlideIndex` parameter to improve work of controller (see #1766)
- `lazyLoadingInPrevNextAmount` now works with `slidesPerView: 'auto'`
- New `passiveListeners` parameter to use passive event listeners to improve scrolling performance on mobile devices. Enabled by default
- New `freeModeMomentumVelocityRatio` parameter to control moment velocity
- Now it is possible to specify autoplay delay for every (or specific) slides by using `data-swiper-autoplay` attribute on them
- Lazy loading now also respects `sizes` responsive images attribute
- Improved mousewheel cross browser behavior (see #1797)
- New `mousewheelEventsTarged` parameter (by default 'container') where you can specify mousewheel events target
- New `onScroll` event/callback that triggers when swiping/scrolling happens with mousewheel
- New `touchReleaseOnEdges` parameter to release touch events on slider edge position (beginning, end) and allow for further page scrolling
- Multirow (slidesPerColumn) support for vertical direction, which is in this case becomes multicolumn
- `paginationBulletRender` now accepts `swiper` instance as a first argument, `paginationBulletRender(index, className)` -> `paginationBulletRender(swiper, index, className)`
- New "swiper-slide-duplicate-active", "swiper-slide-duplicate-next", "swiper-slide-duplicate-prev" classes that will be added in loop mode to the slides representing duplicated looped slides
- All css classes are now configurable via new parameters: lazyLoadingClass, notificationClass, containerModifierClass, paginationClickableClass, paginationModifierClass, lazyStatusLoadingClass, lazyStatusLoadedClass, lazyPreloaderClass, notificationClass, preloaderClass, zoomContainerClass, slideDuplicateActiveClass, slideDuplicateNextClass, slideDuplicatePrevClass

## 3.3.1 - Released on February 7th, 2016

- New `uniqueNavElements` parameter. If enabled (by default) and navigation elements' parameters passed as the string (like `.pagination`) then Swiper will look for such elements through child elements first. Applies for pagination, prev/next buttons and scrollbar
- New `onPaginationRendered` callback. Will be fired after pagination elements generated and added to DOM
- New `.reLoop()` method, which combines `.destroyLoop()` + `.createLoop()` methods with additional positioning fixes. Useful to call after you have changed `slidesPerView` parameter, it will dynamically recreate duplicated slides required for loop
- New `.nextButton` and `.prevButton` properties with Dom7/jQuery element with next/prev button HTML element
- Fixed not working mousewheel control in IE 11
- Fixed issue with lazy loading images not being recalculated after window resize
- Fixed issues when using loop with breakpoints changing `slidesPerView/Group` parameters
- Numerous minor fixes

## 3.3.0 - Released on January 10th, 2016

- New 3D Flip effect. Can be enabled with `effect: 'flip' parameter
- New types of pagination with new parameters:
  - `paginationType` - type of pagination. Can be `'bullets'` (default) or `'fraction'` or `'progress'` or `'custom'`
  - `paginationFractionRender(swiper, currentClass, totalClass)` - custom function to render "fraction" type pagination
  - `paginationProgressRender(swiper, progressbarClass)` - custom function to render "progress" type pagination
  - `paginationCustomRender(swiper, current, total)` - custom function to render "custom" type pagination
- New `lazyLoadingInPrevNextAmount` parameter allows to lazy load images in specified amount of next/prev slides
- New `autoplayStopOnLast` parameter (`true` by default) tells to autoplay should it stop on last slide or start from first slide
- New `onAutoplay(swiper)` callback
- Minor fixes

## 3.2.7 - Released on December 7th, 2015

- Fixed issue with using HTMLElements for next/prevButton parameters with breakpoints
- Fixed issue with not working Auto Height when using Controller

## 3.2.6 - Released on November 28th, 2015

- Fixed issue in RTL layout using `mousewheelControl`
- Fixed issue in RTL layout using Parallax

## 3.2.5 - Released on November 21st, 2015

- New "Auto Height" mode when container/wrapper adapts to the height of currently active slide. Can be enabled with `autoHeight: true` parameter
- Fixed issue with breakpoints in Firefox
- Fixed issue with wrong slides position when using effects
- Fixed issue with none-updated scroll bar after using `setWrapperTranslate`
- Minor fixes

## 3.2.0 - Released on November 7th, 2015

- Added responsive breakpoints support using new `breakpoints` parameter. Now you can specify different `slidesPerView` and other similar parameters for different sizes:

  ```js
  slidesPerView: 5,
  spaceBetween: 50,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 40
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    }
  }
  ```

- New callbacks: `onSlideNextStart`, `onSlideNextEnd`, `onSlidePrevStart`, `onSlidePrevEnd`
- Added Meteor package `meteor add nolimits4web:swiper`
- Fixed issue with mouse touchMove/End callbacks firing all the time
- Fixed issue with mousewheel in Chrome
- Minor fixes

## 3.1.7 - Released on October 10th, 2015

- Fixed issue with lazy loading trying to download `undefined`-src images
- Fixed lazy loading on slides using jQuery version
- Fixed issue with `slideToClickedSlide` with `loop` and `centeredSlides`
- Fixed issue with wrong slides fill when number of slides less than `slidesPerView * slidesPerColumn` with `slidesPerColumnFill: 'row'`
- Minor fixes

## 3.1.5 - Released on September 28th, 2015

- Added support for images `srcset` with lazy loading using `data-srcset` attribute
- Fixed new Chrome errors with `WebkitCSSMatrix`
- Fixed issue with `slideToClickedSlide` with `loop` and `centeredSlides`
- New `freeModeMinimumVelocity` parameter to set minimum required touch velocity to trigger free mode momentum
- Ability to make the Scrollbar draggable using new paramaters:
  - `scrollbarDraggable` - (boolean) by default is `false`. Allows to enable draggable scrollbar
  - `scrollbarSnapOnRelease` - (boolean) by default is `false`. Control slider snap on scrollbar release
- Minor fixes

## 3.1.2 - Released on August 22nd, 2015

- Fixed issues with loop and mousewheel when swiper stopped on last slide
- Improved mouse wheel behavior in latest Chrome
- Fixed issue with `slidesPerView: 'auto'` and enabled `loop:true` mode to set `loopedSlides` to the amount of slides by default (if not specified)
- New `mousewheelSensitivity: 1` parameter allows to tweak mouse wheel sensitivity
- Fixed issue with updating swiper when swiping is locked (with `allowSwipeToNext`/`allowSwipeToPrev`)
- Fixed issue with wrong calculating of "visible" slides with enabled `centeredSlides`
- CSS fixes for 3D effects
- New options to release Swiper events for swipe-to-go-back work in iOS UIWebView with two options:
  - `iOSEdgeSwipeDetection` (by default is `false`) - enable ios edge detection and release Swiper events
  - `iOSEdgeSwipeThreshold` (default value is `20`) - area in `px` from left edge of screen to release events
- Improved source maps
- Minor fixes

## 3.1.0 - Released on July 14th, 2015

- Accessibility (a11y)
  - Fixed issue with wrong buttons labels
  - Added support for pagination bullets
  - New accessibility parameter for pagination label `paginationBulletMessage: 'Go to slide {{index}}'`
- Controller
  - New parameter `controlBy` which can be 'slide' (by default) or 'container'. Defines a way how to control another slider: slide by slide or depending on all slides/container (like before)
  - Now controllers in `controlBy: 'slide'` (default) mode will respect grid of each other
- Pagination
  - New `paginationElement` parameter defines which HTML tag will be used to represent single pagination bullet. By default it is `span`
- New `roundLengths` parameter (by default is `false`) to round values of slides width and height to prevent blurry texts on usual resolution screens
- New `slidesOffsetBefore: 0` and `slidesOffsetAfter: 0` (in px) parameters to add additional slide offset within a container
- Correct calculation for slides size when use CSS padding on `.swiper-container`
- Fixed issue with not working onResize handler when swipes are locked
- Fixed issue with "jumping" effect when you disable `onlyExternal` during touchmove
- Fixed issue when slider goes to previous slide from last slide after window resize
- Added new `swiper.jquery.umd.js` version for the environment where both Swiper and jQuery included as modules
- Minor fixes

## 3.0.8 - Released on June 14th, 2015

- Fixed issue with wrong active index and callbacks in Fade effect
- New mousewheel parameters:
  - `mousewheelReleaseOnEdges` - will release mousewheel event and allow page scrolling when swiper is on edge positions (in the beginning or in the end)
  - `mousewheelInvert` - option to invert mousewheel slides
- Fixed issue with lazy loading in next slides when `slidesPerView` > 1
- Fixed issue with resistance bounds when swiping is locked
- Fixed issue with wrong slides order in multi-row mode (when `slidesPerColumn` > 1)
- Fixed issue with not working keyboard control in RTL mode
- Fixed issue with nested fade-effect swipers
- Minor fixes

## 3.0.7 - Released on April 25th, 2015

- New `width` and `height` parameters to force Swiper size, useful when it is hidden on intialization
- Better support for "Scroll Container". So now Swiper can be used as a scroll container with one single "scrollable"/"swipeable" slide
- Added lazy loading for background images with `data-background` attribute on required elements
- New "Sticky Free Mode" (with `freeModeSticky` parameter) which will snap to slides positions in free mode
- Fixed issues with lazy loading
- Fixed slide removing when loop mode is enabled
- Fixed issues with Autoplay and Fade effect
- Minor fixes

## 3.0.6 - Released on March 27th, 2015

- Fixed sometimes wrong slides position when using "Fade" effect
- `.destroy(deleteInstance, cleanupStyles)` method now has second `cleanupStyles` argument, when passed - all custom styles will be removed from slides, wrapper and container. Useful if you need to destroy Swiper and to init again with new options or in different direction
- Minor fixes

## 3.0.5 - Released on March 21st, 2015

- New Keyboard accessibility module to provide focusable navigation buttons and basic ARIA for screen readers with new parameters:
  - `a11y: false` - enable accessibility
  - `prevSlideMessage: 'Previous slide'` - message for screen readers for previous button
  - `nextSlideMessage: 'Next slide'` - message for screen readers for next button
  - `firstSlideMessage: 'This is the first slide'` - message for screen readers for previous button when swiper is on first slide
  - `lastSlideMessage: 'This is the last slide'` - message for screen readers for next button when swiper is on last slide
- New Emitter module. It allows to work with callbacks like with events, even adding them after initialization with new methods:
  - `.on(event, handler)` - add event/callback
  - `.off(event, handler)` - remove this event/callback
  - `.once(event, handler)` - add event/callback that will be executed only once
- Plugins API is back. It allows to write custom Swiper plugins
- Better support for browser that don't support flexbox layout
- New parameter `setWrapperSize` (be default it is `false`) to provide better compatibility with browser without flexbox support. Enabled this option and plugin will set width/height on swiper wrapper equal to total size of all slides
- New `virtualTranslate` parameter. When it is enabled swiper will be operated as usual except it will not move. Useful when you may need to create custom slide transition
- Added support for multiple Pagination containers
- Fixed `onLazyImage...` callbacks
- Fixed issue with not accessible links inside of Slides on Android < 4.4
- Fixed pagination bullets behavior in loop mode with specified `slidesPerGroup`
- Fixed issues with clicks on IE 10+ touch devices
- Fixed issues with Coverflow support on IE 10+
- Hashnav now will update document hash after transition to prevent browsers UI lags, not in the beginning like before
- Super basic support for IE 9 with swiper.jquery version. No animation and transitions, but basic stuff like switching slides/pagination/scrollbars works

## 3.0.4 - Released on March 6th, 2015

- New Images Lazy Load component
  - With new parameters `lazyLoading`, `lazyLoadingInPrevNext`, `lazyLoadingOnTransitionStart` (all disabled by default)
  - With new callbacks `onLazyImageLoad` and `onLazyImageReady`
- `updateOnImages` ready split into 2 parameters:
  - `preloadImages` (by default is true) - to preload all images on swiper init
  - `updateOnImages` (by default is true) - update swiper when all images loaded
- Fixed issues with touchmove on focused form elements
- New `onObserverUpdate` callback function to be called after updates by observer
- Fixed issue with not working inputs with keyboard control for jQuery version
- New `paginationBulletRender` parameter that accepts function which allow custom pagination elements layout
- Hash Navigation will run callback depending on `runCallbacksOnInit` parameter
- `watchVisibility` parameter renamed to `watchSlidesVisibility`

## 3.0.3 - Released on March 1st, 2015

- Fixed issue with not firing onSlideChangeEnd callback after calling .slideTo with
  runCallbacks=false
- Fixed values of isBeginning/isEnd when there is only one slide
- New `crossFade` option for fade effect
- Improved support for devices with both touch and mouse inputs, not yet on IE
- Fixed not correctly working mousewheel and keyobard control in swiper.jquery version
- New parallax module for transitions with parallax effects on internal elements
- Improved .update and .onResize methods
- Minor fixes

## 3.0.2 - Released on February 22nd, 2015

- Fixed issue with keyboard events not cleaned up with Swiper.destroy
- Encoded inline SVG images for IE support
- New callbacks
  - onInit (swiper)
  - onTouchMoveOpposite (swiper, e)
- Fixed free mode momentum in RTL layout
- `.update` method improved to fully cover what `onResize` do for full and correct update
- Exposed `swiper.touches` object with the following properties: `startX`, `startY`, `currentX`, `currentY`, `diff`
- New methods to remove slides
  - `.removeSlide(index)` or `.removeSlide([indexes])` - to remove selected slides
  - `.removeAllSlides()` - to remove all slides

## 3.0.1 - Released on February 13th, 2015

- Fixed issue with navigation buttons in Firefox in loop mode
- Fixed issue with image dragging in IE 10+

## 3.0.0 - Released on February 11th, 2015

- Initial release of all new Swiper 3
- Removed features
  - Dropped support for old browsers. Now it is compatible with:
    - iOS 7+
    - Android 4+ (multirow mode only for Android 4.4+)
    - Latest Chrome, Safari, Firefox and Opera desktop browsers
    - WP 8+, IE 10+ (3D effects may not work correctly on IE because of wrong nested 3D transform support)
  - Scroll Container. Removed in favor of pure CSS `overflow: auto` with `-webkit-overflow-scrolling: touch`
- New features
  - Swiper now uses modern flexbox layout, which by itself give more features and advantages
  - Such Swiper 2.x plugins as Hash Navigation, Smooth Progress, 3D Flow and Scrollbar are now incorporated into Swiper 3.x core
  - Full RTL support
  - Built-in navigation buttons/arrows
  - Controller. Now one Swiper could be controlled (or control itself) by another Swiper
  - Multi row slides layout with `slidesPerColumn` option
  - Better support for nested Swipers, now it is possible to use same-direction nested Swipers, like horizontal in horizontal
  - Space between slides
  - New transition effects: 3D Coverflow, 3D Cube and Fade transitions
  - Slides are `border-box` now, so it is possible to use borders and paddings directly on slides
  - Auto layout mode (`slidesPerView: 'auto'`) now gives more freedom, you can even specify slides sizes in % and use margins on them
  - Mutation Observers. If enabled, Swiper will watch for changes in Dom and update its layout automatically
  - Better clicks prevention during swiping
- Many of API methods, parameters and callbacks are changed
- Added a bit lightweight jQuery/Zepto version of Swiper that can be used if you use jQuery/Zepto in your project
