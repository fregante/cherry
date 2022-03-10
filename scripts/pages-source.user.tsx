// ==UserScript==
// @name         Pages Source
// @version      8
// @description  Easily go to popular Git hosting services' source repository
// @author       kidonng
// @namespace    https://github.com/kidonng/cherry
// @match        http://*.github.io/*
// @match        https://*.github.io/*
// @match        http://*.gitlab.io/*
// @match        https://*.gitlab.io/*
// @match        http://*.gitee.io/*
// @match        https://*.gitee.io/*
// @match        http://*.sourceforge.net/*
// @match        https://*.sourceforge.io/*
// @example      https://edwardtufte.github.io/
// @example      https://edwardtufte.github.io/tufte-css/
// @example      https://htyao.gitlab.io/
// @example      https://ipvb.gitee.io/
// @example      https://x1y9.gitee.io/gesture/help/background.html
// @example      http://grandperspectiv.sourceforge.net/
// @example      https://archgeotux.sourceforge.io/
// ==/UserScript==

import { React } from './lib/dom-chef.ts'

const id = 'cherry-pages-source'
document.head.append(<style>{`#${id}:hover { opacity: 1 !important; }`}</style>)

const host = location.hostname.split('.')
const path = location.pathname.split('/')[1]
const size = 32

// Use negative index because GitLab allows usernames to contain a dot
const username = host[host.length - 3]
let href = ''
let title = ''
let icon = <></>

switch (host[host.length - 2]) {
    case 'github':
        if (document.title === 'Site not found · GitHub Pages') break

        href = `https://github.com/${username}`
        title = 'Go to user profile'
        // From GitHub header
        icon = (
            <svg
                height={size}
                width={size}
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                ></path>
            </svg>
        )

        if (document.title === 'Page not found · GitHub Pages') break

        // Exclude paths beginning with 4 digits which are most likely to be YYYY
        // and prefer `username.github.io` as source repository
        if (path && !path.match(/^\d{4}/)) href += `/${path}`
        else href += `/${username}.github.io`

        title = 'Go to source repository'
        break
    case 'gitlab':
        href = `https://gitlab.com/${username}/${
            path || `${username}.gitlab.io`
        }`
        title = 'Go to source repository'
        // From GitLab header
        icon = (
            <svg width={size} height={size} viewBox="0 0 36 36">
                <path
                    fill="#e24329"
                    d="M2 14l9.38 9v-9l-4-12.28c-.205-.632-1.176-.632-1.38 0z"
                ></path>
                <path
                    fill="#e24329"
                    d="M34 14l-9.38 9v-9l4-12.28c.205-.632 1.176-.632 1.38 0z"
                ></path>
                <path fill="#e24329" d="M18,34.38 3,14 33,14 Z"></path>
                <path fill="#fc6d26" d="M18,34.38 11.38,14 2,14 6,25Z"></path>
                <path fill="#fc6d26" d="M18,34.38 24.62,14 34,14 30,25Z"></path>
                <path
                    fill="#fca326"
                    d="M2 14L.1 20.16c-.18.565 0 1.2.5 1.56l17.42 12.66z"
                ></path>
                <path
                    fill="#fca326"
                    d="M34 14l1.9 6.16c.18.565 0 1.2-.5 1.56L18 34.38z"
                ></path>
            </svg>
        )
        break
    case 'gitee':
        if (document.title === '404 Not Found') break

        href = `https://gitee.com/${username}/${path || username}`
        title = 'Go to source repository'
        // From Gitee header
        icon = (
            <svg width={size} height={size} viewBox="0 0 90 90" version="1.1">
                <g
                    id="LOGO"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                >
                    <g
                        id="Artboard"
                        transform="translate(-532.000000, -431.000000)"
                    >
                        <g
                            id="logo"
                            transform="translate(532.000000, 431.000000)"
                        >
                            <g id="Group">
                                <circle
                                    id="Combined-Shape"
                                    fill="#C71D23"
                                    cx="44.8544363"
                                    cy="44.8544363"
                                    r="44.8544363"
                                />
                                <path
                                    d="M67.558546,39.8714292 L42.0857966,39.8714292 C40.8627004,39.8720094 39.8710953,40.8633548 39.8701949,42.0864508 L39.8687448,47.623783 C39.867826,48.8471055 40.8592652,49.8390642 42.0825879,49.8393845 C42.0827874,49.8393846 42.0829869,49.8393846 42.0831864,49.8387862 L57.5909484,49.838657 C58.8142711,49.8386283 59.8059783,50.830319 59.8059885,52.0536417 C59.8059885,52.0536479 59.8059885,52.053654 59.8059701,52.0536602 L59.8059701,52.6073539 L59.8059701,52.6073539 L59.8059701,53.161115 C59.8059701,56.8310831 56.8308731,59.80618 53.160905,59.80618 L32.1165505,59.80618 C30.8934034,59.806119 29.9018373,58.8145802 29.9017425,57.5914331 L29.9011625,36.5491188 C29.9008781,32.8791508 32.8758931,29.9039718 36.5458611,29.9038706 C36.5459222,29.9038706 36.5459833,29.9038706 36.5460443,29.9040538 L67.5523638,29.9040538 C68.77515,29.9026795 69.7666266,28.9118177 69.7687593,27.6890325 L69.7721938,22.1516997 C69.774326,20.928378 68.7832423,19.9360642 67.5599198,19.9353054 C67.5594619,19.9353051 67.5590039,19.935305 67.558546,19.9366784 L36.5479677,19.9366784 C27.3730474,19.9366784 19.935305,27.3744208 19.935305,36.549341 L19.935305,67.558546 C19.935305,68.7818687 20.927004,69.7735676 22.1503267,69.7735676 L54.8224984,69.7735676 C63.079746,69.7735676 69.7735676,63.079746 69.7735676,54.8224984 L69.7735676,42.0864509 C69.7735676,40.8631282 68.7818687,39.8714292 67.558546,39.8714292 Z"
                                    id="G"
                                    fill="#FFFFFF"
                                />
                            </g>
                            <path
                                d="M129.679951,79.4117647 C136.422068,79.4117647 141.804525,78.0966654 145.827321,75.4664668 C149.850118,72.8362683 151.861516,69.4304983 151.861516,65.249157 C151.861516,58.5050581 146.827402,55.1330086 136.759174,55.1330086 L136.759174,55.1330086 L130.556426,55.1330086 C128.488844,55.1330086 127.005578,54.9306857 126.106629,54.5260397 C125.20768,54.1213938 124.758206,53.4469839 124.758206,52.50281 C124.758206,51.5586362 125.050364,50.7718247 125.634681,50.1423754 C125.859418,49.8726115 126.151577,49.7826901 126.511156,49.8726115 C127.949474,50.2772574 129.320372,50.4795804 130.623848,50.4795804 C135.253434,50.4795804 139.017783,49.366804 141.916893,47.1412514 C144.816004,44.9156988 146.265559,41.6223305 146.265559,37.2611465 C146.265559,35.6425628 145.9734,34.2038217 145.389084,32.9449232 C145.344136,32.8550019 145.355373,32.7538404 145.422794,32.6414387 C145.490215,32.5290371 145.591347,32.4728363 145.726189,32.4728363 L145.726189,32.4728363 L147.276876,32.4728363 C148.400562,32.4728363 149.344459,32.0906707 150.108565,31.3263395 C150.872672,30.5620082 151.254725,29.6178344 151.254725,28.4938179 L151.254725,28.4938179 L151.254725,27.5496441 C151.254725,26.4705882 150.872672,25.5376546 150.108565,24.750843 C149.344459,23.9640315 148.400562,23.5706257 147.276876,23.5706257 L147.276876,23.5706257 L137.365964,23.5706257 C137.051332,23.5706257 136.714226,23.525665 136.354647,23.4357437 C134.601696,22.8962158 132.69143,22.6264519 130.623848,22.6264519 C127.702264,22.6264519 125.02789,23.1322593 122.600728,24.1438741 C120.173566,25.1554889 118.162168,26.7740727 116.566534,28.9996253 C114.970899,31.225178 114.173082,33.8666167 114.173082,36.9239416 C114.173082,39.0370925 114.667504,40.9704009 115.656348,42.7238666 C116.645192,44.4773323 117.881247,45.8935931 119.364512,46.9726489 C119.454407,47.0176096 119.499355,47.0850506 119.499355,47.1749719 C119.499355,47.2648932 119.454407,47.3548145 119.364512,47.4447359 C118.105984,48.343949 117.094666,49.434245 116.33056,50.7156238 C115.566453,51.9970026 115.1844,53.3121019 115.1844,54.6609217 C115.1844,57.5384039 116.33056,59.7639565 118.622879,61.3375796 C118.712774,61.3825403 118.757722,61.4612214 118.757722,61.5736231 C118.757722,61.6860247 118.712774,61.7871862 118.622879,61.8771075 C116.824982,62.7763207 115.465321,63.8778569 114.543899,65.181716 C113.622476,66.4855751 113.161765,67.9243162 113.161765,69.4979393 C113.161765,71.7459723 113.925871,73.63432 115.454084,75.1629824 C116.982298,76.6916448 118.948748,77.7819408 121.353437,78.4338704 C123.758125,79.0857999 126.53363,79.4117647 129.679951,79.4117647 Z M130.623848,43.0610716 C129.140582,43.0610716 127.938238,42.5327838 127.016815,41.4762083 C126.095392,40.4196328 125.634681,38.9022106 125.634681,36.9239416 C125.634681,34.9906332 126.095392,33.4956913 127.016815,32.4391158 C127.938238,31.3825403 129.140582,30.8542525 130.623848,30.8542525 C132.107113,30.8542525 133.309457,31.3713001 134.23088,32.4053953 C135.152303,33.4394904 135.613014,34.9456725 135.613014,36.9239416 C135.613014,38.9022106 135.152303,40.4196328 134.23088,41.4762083 C133.309457,42.5327838 132.107113,43.0610716 130.623848,43.0610716 Z M131.567744,71.7234919 C129.005739,71.7234919 126.971868,71.3750468 125.466128,70.6781566 C123.960389,69.9812664 123.207519,68.9359311 123.207519,67.5421506 C123.207519,66.4181341 123.724415,65.3615586 124.758206,64.3724241 C124.893048,64.2375422 125.095312,64.1701012 125.364996,64.1701012 L125.364996,64.1701012 L125.56726,64.1701012 C126.690946,64.3949045 128.398949,64.5073061 130.691269,64.5073061 L130.691269,64.5073061 L134.399433,64.5073061 C136.377121,64.5073061 137.826676,64.7096291 138.748098,65.114275 C139.669521,65.5189209 140.130232,66.2607718 140.130232,67.3398277 C140.130232,68.5987261 139.332415,69.6440614 137.736781,70.4758336 C136.141147,71.3076058 134.084801,71.7234919 131.567744,71.7234919 Z M164.19959,17.9055826 C166.222225,17.9055826 167.88528,17.321094 169.188756,16.1521169 C170.492232,14.9831398 171.14397,13.4769577 171.14397,11.6335706 C171.14397,9.79018359 170.492232,8.27276133 169.188756,7.08130386 C167.88528,5.88984638 166.222225,5.29411765 164.19959,5.29411765 C162.132007,5.29411765 160.435241,5.88984638 159.109291,7.08130386 C157.783342,8.27276133 157.120367,9.79018359 157.120367,11.6335706 C157.120367,13.4769577 157.783342,14.9831398 159.109291,16.1521169 C160.435241,17.321094 162.132007,17.9055826 164.19959,17.9055826 Z M166.289646,62.6863994 C167.368385,62.6863994 168.301044,62.2929936 169.087624,61.5061821 C169.874205,60.7193706 170.267495,59.7864369 170.267495,58.707381 L170.267495,58.707381 L170.267495,27.3473211 C170.267495,26.2682653 169.874205,25.3353316 169.087624,24.54852 C168.301044,23.7617085 167.368385,23.3683027 166.289646,23.3683027 L166.289646,23.3683027 L162.042112,23.3683027 C160.918426,23.3683027 159.97453,23.7617085 159.210423,24.54852 C158.446317,25.3353316 158.064263,26.2682653 158.064263,27.3473211 L158.064263,27.3473211 L158.064263,58.707381 C158.064263,59.7864369 158.446317,60.7193706 159.210423,61.5061821 C159.97453,62.2929936 160.918426,62.6863994 162.042112,62.6863994 L162.042112,62.6863994 L166.289646,62.6863994 Z M195.617855,63.6305732 C197.325857,63.6305732 199.011387,63.4732109 200.674442,63.1584863 C201.753181,62.9786437 202.584709,62.3941551 203.169025,61.4050206 C203.573552,60.7306107 203.775816,60.0337205 203.775816,59.3143499 C203.775816,58.9996253 203.753342,58.6624204 203.708395,58.3027351 L203.708395,58.3027351 L203.43871,57.2236793 C203.213973,56.2795054 202.65213,55.5264144 201.753181,54.9644061 C200.854232,54.4023979 199.842914,54.0989135 198.719228,54.0539528 C195.617855,53.9190708 194.067168,51.8958411 194.067168,47.9842638 L194.067168,47.9842638 L194.067168,33.4844511 C194.067168,33.1697265 194.224484,33.0123642 194.539116,33.0123642 L194.539116,33.0123642 L199.326019,33.0123642 C200.404758,33.0123642 201.337417,32.6189584 202.123997,31.8321469 C202.910578,31.0453353 203.303868,30.1124016 203.303868,29.0333458 L203.303868,29.0333458 L203.303868,27.3473211 C203.303868,26.2682653 202.910578,25.3353316 202.123997,24.54852 C201.337417,23.7617085 200.404758,23.3683027 199.326019,23.3683027 L199.326019,23.3683027 L194.539116,23.3683027 C194.224484,23.3683027 194.067168,23.2109404 194.067168,22.8962158 L194.067168,22.8962158 L194.067168,17.0288498 C194.067168,15.9048333 193.673877,14.9606594 192.887297,14.1963282 C192.100717,13.431997 191.168057,13.0498314 190.089319,13.0498314 L190.089319,13.0498314 L187.796999,13.0498314 C186.673313,13.0498314 185.684469,13.4207568 184.830467,14.1626077 C183.976466,14.9044586 183.45957,15.8373923 183.279781,16.9614088 L183.279781,16.9614088 L182.538148,22.8962158 C182.4932,23.2109404 182.290937,23.3907831 181.931357,23.4357437 L181.931357,23.4357437 L180.38067,23.5706257 C179.256984,23.660547 178.313088,24.1213938 177.548981,24.953166 C176.784875,25.7849382 176.402821,26.7628325 176.402821,27.886849 L176.402821,27.886849 L176.402821,29.0333458 C176.402821,30.1124016 176.796111,31.0453353 177.582692,31.8321469 C178.369272,32.6189584 179.301932,33.0123642 180.38067,33.0123642 L180.38067,33.0123642 L181.257145,33.0123642 C181.571778,33.0123642 181.729094,33.1697265 181.729094,33.4844511 L181.729094,33.4844511 L181.729094,48.1191457 C181.729094,53.0198576 182.85278,56.8302735 185.100152,59.5503934 C187.347524,62.2705133 190.853425,63.6305732 195.617855,63.6305732 Z M228.586806,63.6305732 C232.182602,63.6305732 235.73345,62.798801 239.239351,61.1352567 C240.228195,60.6856501 240.857459,59.8988385 241.127144,58.774822 C241.261986,58.4151368 241.329407,58.0554515 241.329407,57.6957662 C241.329407,57.0213563 241.127144,56.3469464 240.722617,55.6725365 L240.722617,55.6725365 L240.520353,55.2678906 C239.980984,54.3237167 239.194403,53.6942675 238.160612,53.3795429 C237.66619,53.2446609 237.171768,53.1772199 236.677346,53.1772199 C236.09303,53.1772199 235.531187,53.2671413 234.991817,53.4469839 C233.463604,53.9865118 231.890443,54.2562758 230.272335,54.2562758 C224.968537,54.2562758 221.754794,51.8958411 220.631108,47.1749719 C220.586161,47.0400899 220.608635,46.9164481 220.698529,46.8040465 C220.788424,46.6916448 220.900793,46.635444 221.035635,46.635444 L221.035635,46.635444 L239.576457,46.635444 C240.74509,46.635444 241.778882,46.2645185 242.677831,45.5226677 C243.576779,44.7808168 244.048728,43.8478831 244.093675,42.7238666 L244.093675,42.7238666 L244.093675,41.4424878 C244.093675,35.7774447 242.655357,31.1914575 239.77872,27.684526 C236.902084,24.1775946 232.721971,22.4241289 227.238383,22.4241289 C224.856168,22.4241289 222.552612,22.907456 220.327713,23.8741102 C218.102814,24.8407643 216.125127,26.1895841 214.39465,27.9205695 C212.664173,29.6515549 211.270803,31.8321469 210.214538,34.4623454 C209.158273,37.092544 208.63014,39.9587861 208.63014,43.0610716 C208.63014,49.4005245 210.506696,54.4136381 214.259808,58.1004121 C218.01292,61.7871862 222.788586,63.6305732 228.586806,63.6305732 Z M233.171446,38.6774073 L220.833372,38.6774073 C220.51874,38.6774073 220.361424,38.5650056 220.361424,38.3402023 C220.361424,36.4968153 221.237899,34.8557512 222.990849,33.4170101 C224.249378,32.3379543 225.755117,31.7984264 227.508067,31.7984264 C229.530703,31.7984264 231.047679,32.3716748 232.058996,33.5181716 C233.070314,34.6646684 233.62092,36.204571 233.710815,38.1378794 L233.710815,38.1378794 L233.710815,38.2053203 C233.710815,38.520045 233.531025,38.6774073 233.171446,38.6774073 L233.171446,38.6774073 Z M269.713719,63.6305732 C273.309515,63.6305732 276.860363,62.798801 280.366264,61.1352567 C281.355108,60.6856501 281.984372,59.8988385 282.254057,58.774822 C282.388899,58.4151368 282.45632,58.0554515 282.45632,57.6957662 C282.45632,57.0213563 282.254057,56.3469464 281.84953,55.6725365 L281.84953,55.6725365 L281.647266,55.2678906 C281.107897,54.3237167 280.321317,53.6942675 279.287525,53.3795429 C278.793103,53.2446609 278.298682,53.1772199 277.80426,53.1772199 C277.219943,53.1772199 276.6581,53.2671413 276.11873,53.4469839 C274.590517,53.9865118 273.017357,54.2562758 271.399249,54.2562758 C266.09545,54.2562758 262.881708,51.8958411 261.758021,47.1749719 C261.713074,47.0400899 261.735548,46.9164481 261.825443,46.8040465 C261.915337,46.6916448 262.027706,46.635444 262.162548,46.635444 L262.162548,46.635444 L280.70337,46.635444 C281.872004,46.635444 282.905795,46.2645185 283.804744,45.5226677 C284.703693,44.7808168 285.175641,43.8478831 285.220588,42.7238666 L285.220588,42.7238666 L285.220588,41.4424878 C285.220588,35.7774447 283.78227,31.1914575 280.905633,27.684526 C278.028997,24.1775946 273.848884,22.4241289 268.365296,22.4241289 C265.983081,22.4241289 263.679525,22.907456 261.454626,23.8741102 C259.229728,24.8407643 257.25204,26.1895841 255.521563,27.9205695 C253.791087,29.6515549 252.397716,31.8321469 251.341451,34.4623454 C250.285186,37.092544 249.757053,39.9587861 249.757053,43.0610716 C249.757053,49.4005245 251.633609,54.4136381 255.386721,58.1004121 C259.139833,61.7871862 263.915499,63.6305732 269.713719,63.6305732 Z M274.298359,38.6774073 L261.960285,38.6774073 C261.645653,38.6774073 261.488337,38.5650056 261.488337,38.3402023 C261.488337,36.4968153 262.364812,34.8557512 264.117762,33.4170101 C265.376291,32.3379543 266.88203,31.7984264 268.634981,31.7984264 C270.657616,31.7984264 272.174592,32.3716748 273.18591,33.5181716 C274.197227,34.6646684 274.747833,36.204571 274.837728,38.1378794 L274.837728,38.1378794 L274.837728,38.2053203 C274.837728,38.520045 274.657938,38.6774073 274.298359,38.6774073 L274.298359,38.6774073 Z"
                                id="gitee"
                                fill="#FFFFFF"
                                fill-rule="nonzero"
                            />
                        </g>
                    </g>
                </g>
            </svg>
        )
        break
    case 'sourceforge':
        href = `https://sourceforge.net/projects/${username}/`
        title = 'Go to source project'
        // From SourceForge header
        icon = (
            <svg
                height={(size * 102) / 117}
                width={size}
                viewBox="0 0 117 102"
                version="1.1"
                aria-hidden="true"
            >
                <g clip-path="url(#clip0)">
                    <path
                        d="M66.9 53.5C66.9 34.4 60.1 25.7 56.5 22.4C55.8 21.8 54.7 22.3 54.8 23.3C55.5 34.1 41.9 36.8 41.9 53.7V53.8C41.9 64.1 49.7 72.5 59.3 72.5C68.9 72.5 76.7 64.1 76.7 53.8V53.7C76.7 48.9 74.9 44.3 73.1 40.9C72.7 40.2 71.7 40.5 71.8 41.1C75.1 55.7 66.9 64.7 66.9 53.5Z"
                        fill="#f60"
                    />
                    <path
                        d="M46.2 93.8C45.8 93.8 45.3 93.6 45 93.3L0.499988 48.8C-0.100012 48.2 -0.100012 47.1 0.499988 46.4L47.5 -0.6C47.8 -0.8 48.2 -1 48.6 -1H62.1C62.9 -1 63.4 -0.5 63.6 0C63.8 0.5 63.8 1.2 63.2 1.8L19.1 46C18.2 46.9 18.2 48.3 19.1 49.2L54 84.2C54.6 84.8 54.6 85.9 54 86.6L47.3 93.4C47 93.6 46.6 93.8 46.2 93.8Z"
                        fill="#f60"
                    />
                    <path
                        d="M55.1 101.6C54.3 101.6 53.8 101.1 53.6 100.6C53.4 100.1 53.4 99.4 54 98.8L98.2 54.6C98.6 54.2 98.9 53.6 98.9 53C98.9 52.4 98.7 51.8 98.2 51.4L63.2 16.4C62.6 15.8 62.6 14.7 63.2 14L70 7.2C70.3 6.9 70.7 6.7 71.2 6.7C71.7 6.7 72 7 72.3 7.3L116.7 51.8C117 52.1 117.2 52.5 117.2 53C117.2 53.5 117 53.9 116.7 54.2L69.7 101.2C69.4 101.5 69 101.7 68.5 101.7H55.1V101.6Z"
                        fill="#f60"
                    />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect
                            width="653"
                            height="102.6"
                            fill="white"
                            transform="translate(0 -1)"
                        />
                    </clipPath>
                </defs>
            </svg>
        )
        break
}

if (href)
    document.body.append(
        <a
            {...{ href, id, title }}
            style={{
                position: 'fixed',
                right: 0,
                bottom: 0,
                margin: '.5rem',
                opacity: 0.5,
                transition: 'opacity .25s',
            }}
        >
            {icon}
        </a>
    )
