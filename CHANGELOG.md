# Changelog

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
