import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

@Radium
class Icon extends React.Component {
  render() {
    var g = _.find(icons, {name: this.props.name}).glyph || icons[0].glyph;;
    return (
      <i style={[this.props.style, styles.base,
        this.props.size === 'small' && styles.small,
        this.props.size === 'medium' && styles.medium,
        this.props.size === 'large' && styles.large]}>
      {g}</i>
    );
  }
}

var styles = {
  base: {
    font: 'normal normal normal 14px/1 FontAwesome',
    width: '1.28571429em',
    textAlign: 'center',
    paddingRight: '8px'
  },
  small: {
    font: 'normal normal normal 14px/1 FontAwesome',
  },
  medium: {
    font: 'normal normal normal 20px/1 FontAwesome',
  },
  large: {
    font: 'normal normal normal 36px/1 FontAwesome',
  },
  leftIcon: {
    paddingLeft: 20
  }
};

// https://fortawesome.github.io/Font-Awesome/cheatsheet/
var icons = [{name:"fa-500px",glyph:""},{name:"fa-adjust",glyph:""},{name:"fa-adn",glyph:""},{name:"fa-align-center",glyph:""},{name:"fa-align-justify",glyph:""},{name:"fa-align-left",glyph:""},{name:"fa-align-right",glyph:""},{name:"fa-amazon",glyph:""},{name:"fa-ambulance",glyph:""},{name:"fa-anchor",glyph:""},{name:"fa-android",glyph:""},{name:"fa-angellist",glyph:""},{name:"fa-angle-double-down",glyph:""},{name:"fa-angle-double-left",glyph:""},{name:"fa-angle-double-right",glyph:""},{name:"fa-angle-double-up",glyph:""},{name:"fa-angle-down",glyph:""},{name:"fa-angle-left",glyph:""},{name:"fa-angle-right",glyph:""},{name:"fa-angle-up",glyph:""},{name:"fa-apple",glyph:""},{name:"fa-archive",glyph:""},{name:"fa-area-chart",glyph:""},{name:"fa-arrow-circle-down",glyph:""},{name:"fa-arrow-circle-left",glyph:""},{name:"fa-arrow-circle-o-down",glyph:""},{name:"fa-arrow-circle-o-left",glyph:""},{name:"fa-arrow-circle-o-right",glyph:""},{name:"fa-arrow-circle-o-up",glyph:""},{name:"fa-arrow-circle-right",glyph:""},{name:"fa-arrow-circle-up",glyph:""},{name:"fa-arrow-down",glyph:""},{name:"fa-arrow-left",glyph:""},{name:"fa-arrow-right",glyph:""},{name:"fa-arrow-up",glyph:""},{name:"fa-arrows",glyph:""},{name:"fa-arrows-alt",glyph:""},{name:"fa-arrows-h",glyph:""},{name:"fa-arrows-v",glyph:""},{name:"fa-asterisk",glyph:""},{name:"fa-at",glyph:""},{name:"fa-automobile",glyph:""},{name:"fa-backward",glyph:""},{name:"fa-balance-scale",glyph:""},{name:"fa-ban",glyph:""},{name:"fa-bank",glyph:""},{name:"fa-bar-chart",glyph:""},{name:"fa-bar-chart-o",glyph:""},{name:"fa-barcode",glyph:""},{name:"fa-bars",glyph:""},{name:"fa-battery-0",glyph:""},{name:"fa-battery-1",glyph:""},{name:"fa-battery-2",glyph:""},{name:"fa-battery-3",glyph:""},{name:"fa-battery-4",glyph:""},{name:"fa-battery-empty",glyph:""},{name:"fa-battery-full",glyph:""},{name:"fa-battery-half",glyph:""},{name:"fa-battery-quarter",glyph:""},{name:"fa-battery-three-quarters",glyph:""},{name:"fa-bed",glyph:""},{name:"fa-beer",glyph:""},{name:"fa-behance",glyph:""},{name:"fa-behance-square",glyph:""},{name:"fa-bell",glyph:""},{name:"fa-bell-o",glyph:""},{name:"fa-bell-slash",glyph:""},{name:"fa-bell-slash-o",glyph:""},{name:"fa-bicycle",glyph:""},{name:"fa-binoculars",glyph:""},{name:"fa-birthday-cake",glyph:""},{name:"fa-bitbucket",glyph:""},{name:"fa-bitbucket-square",glyph:""},{name:"fa-bitcoin",glyph:""},{name:"fa-black-tie",glyph:""},{name:"fa-bold",glyph:""},{name:"fa-bolt",glyph:""},{name:"fa-bomb",glyph:""},{name:"fa-book",glyph:""},{name:"fa-bookmark",glyph:""},{name:"fa-bookmark-o",glyph:""},{name:"fa-briefcase",glyph:""},{name:"fa-btc",glyph:""},{name:"fa-bug",glyph:""},{name:"fa-building",glyph:""},{name:"fa-building-o",glyph:""},{name:"fa-bullhorn",glyph:""},{name:"fa-bullseye",glyph:""},{name:"fa-bus",glyph:""},{name:"fa-buysellads",glyph:""},{name:"fa-cab",glyph:""},{name:"fa-calculator",glyph:""},{name:"fa-calendar",glyph:""},{name:"fa-calendar-check-o",glyph:""},{name:"fa-calendar-minus-o",glyph:""},{name:"fa-calendar-o",glyph:""},{name:"fa-calendar-plus-o",glyph:""},{name:"fa-calendar-times-o",glyph:""},{name:"fa-camera",glyph:""},{name:"fa-camera-retro",glyph:""},{name:"fa-car",glyph:""},{name:"fa-caret-down",glyph:""},{name:"fa-caret-left",glyph:""},{name:"fa-caret-right",glyph:""},{name:"fa-caret-square-o-down",glyph:""},{name:"fa-caret-square-o-left",glyph:""},{name:"fa-caret-square-o-right",glyph:""},{name:"fa-caret-square-o-up",glyph:""},{name:"fa-caret-up",glyph:""},{name:"fa-cart-arrow-down",glyph:""},{name:"fa-cart-plus",glyph:""},{name:"fa-cc",glyph:""},{name:"fa-cc-amex",glyph:""},{name:"fa-cc-diners-club",glyph:""},{name:"fa-cc-discover",glyph:""},{name:"fa-cc-jcb",glyph:""},{name:"fa-cc-mastercard",glyph:""},{name:"fa-cc-paypal",glyph:""},{name:"fa-cc-stripe",glyph:""},{name:"fa-cc-visa",glyph:""},{name:"fa-certificate",glyph:""},{name:"fa-chain",glyph:""},{name:"fa-chain-broken",glyph:""},{name:"fa-check",glyph:""},{name:"fa-check-circle",glyph:""},{name:"fa-check-circle-o",glyph:""},{name:"fa-check-square",glyph:""},{name:"fa-check-square-o",glyph:""},{name:"fa-chevron-circle-down",glyph:""},{name:"fa-chevron-circle-left",glyph:""},{name:"fa-chevron-circle-right",glyph:""},{name:"fa-chevron-circle-up",glyph:""},{name:"fa-chevron-down",glyph:""},{name:"fa-chevron-left",glyph:""},{name:"fa-chevron-right",glyph:""},{name:"fa-chevron-up",glyph:""},{name:"fa-child",glyph:""},{name:"fa-chrome",glyph:""},{name:"fa-circle",glyph:""},{name:"fa-circle-o",glyph:""},{name:"fa-circle-o-notch",glyph:""},{name:"fa-circle-thin",glyph:""},{name:"fa-clipboard",glyph:""},{name:"fa-clock-o",glyph:""},{name:"fa-clone",glyph:""},{name:"fa-close",glyph:""},{name:"fa-cloud",glyph:""},{name:"fa-cloud-download",glyph:""},{name:"fa-cloud-upload",glyph:""},{name:"fa-cny",glyph:""},{name:"fa-code",glyph:""},{name:"fa-code-fork",glyph:""},{name:"fa-codepen",glyph:""},{name:"fa-coffee",glyph:""},{name:"fa-cog",glyph:""},{name:"fa-cogs",glyph:""},{name:"fa-columns",glyph:""},{name:"fa-comment",glyph:""},{name:"fa-comment-o",glyph:""},{name:"fa-commenting",glyph:""},{name:"fa-commenting-o",glyph:""},{name:"fa-comments",glyph:""},{name:"fa-comments-o",glyph:""},{name:"fa-compass",glyph:""},{name:"fa-compress",glyph:""},{name:"fa-connectdevelop",glyph:""},{name:"fa-contao",glyph:""},{name:"fa-copy",glyph:""},{name:"fa-copyright",glyph:""},{name:"fa-creative-commons",glyph:""},{name:"fa-credit-card",glyph:""},{name:"fa-crop",glyph:""},{name:"fa-crosshairs",glyph:""},{name:"fa-css3",glyph:""},{name:"fa-cube",glyph:""},{name:"fa-cubes",glyph:""},{name:"fa-cut",glyph:""},{name:"fa-cutlery",glyph:""},{name:"fa-dashboard",glyph:""},{name:"fa-dashcube",glyph:""},{name:"fa-database",glyph:""},{name:"fa-dedent",glyph:""},{name:"fa-delicious",glyph:""},{name:"fa-desktop",glyph:""},{name:"fa-deviantart",glyph:""},{name:"fa-diamond",glyph:""},{name:"fa-digg",glyph:""},{name:"fa-dollar",glyph:""},{name:"fa-dot-circle-o",glyph:""},{name:"fa-download",glyph:""},{name:"fa-dribbble",glyph:""},{name:"fa-dropbox",glyph:""},{name:"fa-drupal",glyph:""},{name:"fa-edit",glyph:""},{name:"fa-eject",glyph:""},{name:"fa-ellipsis-h",glyph:""},{name:"fa-ellipsis-v",glyph:""},{name:"fa-empire",glyph:""},{name:"fa-envelope",glyph:""},{name:"fa-envelope-o",glyph:""},{name:"fa-envelope-square",glyph:""},{name:"fa-eraser",glyph:""},{name:"fa-eur",glyph:""},{name:"fa-euro",glyph:""},{name:"fa-exchange",glyph:""},{name:"fa-exclamation",glyph:""},{name:"fa-exclamation-circle",glyph:""},{name:"fa-exclamation-triangle",glyph:""},{name:"fa-expand",glyph:""},{name:"fa-expeditedssl",glyph:""},{name:"fa-external-link",glyph:""},{name:"fa-external-link-square",glyph:""},{name:"fa-eye",glyph:""},{name:"fa-eye-slash",glyph:""},{name:"fa-eyedropper",glyph:""},{name:"fa-facebook",glyph:""},{name:"fa-facebook-f",glyph:""},{name:"fa-facebook-official",glyph:""},{name:"fa-facebook-square",glyph:""},{name:"fa-fast-backward",glyph:""},{name:"fa-fast-forward",glyph:""},{name:"fa-fax",glyph:""},{name:"fa-feed",glyph:""},{name:"fa-female",glyph:""},{name:"fa-fighter-jet",glyph:""},{name:"fa-file",glyph:""},{name:"fa-file-archive-o",glyph:""},{name:"fa-file-audio-o",glyph:""},{name:"fa-file-code-o",glyph:""},{name:"fa-file-excel-o",glyph:""},{name:"fa-file-image-o",glyph:""},{name:"fa-file-movie-o",glyph:""},{name:"fa-file-o",glyph:""},{name:"fa-file-pdf-o",glyph:""},{name:"fa-file-photo-o",glyph:""},{name:"fa-file-picture-o",glyph:""},{name:"fa-file-powerpoint-o",glyph:""},{name:"fa-file-sound-o",glyph:""},{name:"fa-file-text",glyph:""},{name:"fa-file-text-o",glyph:""},{name:"fa-file-video-o",glyph:""},{name:"fa-file-word-o",glyph:""},{name:"fa-file-zip-o",glyph:""},{name:"fa-files-o",glyph:""},{name:"fa-film",glyph:""},{name:"fa-filter",glyph:""},{name:"fa-fire",glyph:""},{name:"fa-fire-extinguisher",glyph:""},{name:"fa-firefox",glyph:""},{name:"fa-flag",glyph:""},{name:"fa-flag-checkered",glyph:""},{name:"fa-flag-o",glyph:""},{name:"fa-flash",glyph:""},{name:"fa-flask",glyph:""},{name:"fa-flickr",glyph:""},{name:"fa-floppy-o",glyph:""},{name:"fa-folder",glyph:""},{name:"fa-folder-o",glyph:""},{name:"fa-folder-open",glyph:""},{name:"fa-folder-open-o",glyph:""},{name:"fa-font",glyph:""},{name:"fa-fonticons",glyph:""},{name:"fa-forumbee",glyph:""},{name:"fa-forward",glyph:""},{name:"fa-foursquare",glyph:""},{name:"fa-frown-o",glyph:""},{name:"fa-futbol-o",glyph:""},{name:"fa-gamepad",glyph:""},{name:"fa-gavel",glyph:""},{name:"fa-gbp",glyph:""},{name:"fa-ge",glyph:""},{name:"fa-gear",glyph:""},{name:"fa-gears",glyph:""},{name:"fa-genderless",glyph:""},{name:"fa-get-pocket",glyph:""},{name:"fa-gg",glyph:""},{name:"fa-gg-circle",glyph:""},{name:"fa-gift",glyph:""},{name:"fa-git",glyph:""},{name:"fa-git-square",glyph:""},{name:"fa-github",glyph:""},{name:"fa-github-alt",glyph:""},{name:"fa-github-square",glyph:""},{name:"fa-gittip",glyph:""},{name:"fa-glass",glyph:""},{name:"fa-globe",glyph:""},{name:"fa-google",glyph:""},{name:"fa-google-plus",glyph:""},{name:"fa-google-plus-square",glyph:""},{name:"fa-google-wallet",glyph:""},{name:"fa-graduation-cap",glyph:""},{name:"fa-gratipay",glyph:""},{name:"fa-group",glyph:""},{name:"fa-h-square",glyph:""},{name:"fa-hacker-news",glyph:""},{name:"fa-hand-grab-o",glyph:""},{name:"fa-hand-lizard-o",glyph:""},{name:"fa-hand-o-down",glyph:""},{name:"fa-hand-o-left",glyph:""},{name:"fa-hand-o-right",glyph:""},{name:"fa-hand-o-up",glyph:""},{name:"fa-hand-paper-o",glyph:""},{name:"fa-hand-peace-o",glyph:""},{name:"fa-hand-pointer-o",glyph:""},{name:"fa-hand-rock-o",glyph:""},{name:"fa-hand-scissors-o",glyph:""},{name:"fa-hand-spock-o",glyph:""},{name:"fa-hand-stop-o",glyph:""},{name:"fa-hdd-o",glyph:""},{name:"fa-header",glyph:""},{name:"fa-headphones",glyph:""},{name:"fa-heart",glyph:""},{name:"fa-heart-o",glyph:""},{name:"fa-heartbeat",glyph:""},{name:"fa-history",glyph:""},{name:"fa-home",glyph:""},{name:"fa-hospital-o",glyph:""},{name:"fa-hotel",glyph:""},{name:"fa-hourglass",glyph:""},{name:"fa-hourglass-1",glyph:""},{name:"fa-hourglass-2",glyph:""},{name:"fa-hourglass-3",glyph:""},{name:"fa-hourglass-end",glyph:""},{name:"fa-hourglass-half",glyph:""},{name:"fa-hourglass-o",glyph:""},{name:"fa-hourglass-start",glyph:""},{name:"fa-houzz",glyph:""},{name:"fa-html5",glyph:""},{name:"fa-i-cursor",glyph:""},{name:"fa-ils",glyph:""},{name:"fa-image",glyph:""},{name:"fa-inbox",glyph:""},{name:"fa-indent",glyph:""},{name:"fa-industry",glyph:""},{name:"fa-info",glyph:""},{name:"fa-info-circle",glyph:""},{name:"fa-inr",glyph:""},{name:"fa-instagram",glyph:""},{name:"fa-institution",glyph:""},{name:"fa-internet-explorer",glyph:""},{name:"fa-intersex",glyph:""},{name:"fa-ioxhost",glyph:""},{name:"fa-italic",glyph:""},{name:"fa-joomla",glyph:""},{name:"fa-jpy",glyph:""},{name:"fa-jsfiddle",glyph:""},{name:"fa-key",glyph:""},{name:"fa-keyboard-o",glyph:""},{name:"fa-krw",glyph:""},{name:"fa-language",glyph:""},{name:"fa-laptop",glyph:""},{name:"fa-lastfm",glyph:""},{name:"fa-lastfm-square",glyph:""},{name:"fa-leaf",glyph:""},{name:"fa-leanpub",glyph:""},{name:"fa-legal",glyph:""},{name:"fa-lemon-o",glyph:""},{name:"fa-level-down",glyph:""},{name:"fa-level-up",glyph:""},{name:"fa-life-bouy",glyph:""},{name:"fa-life-buoy",glyph:""},{name:"fa-life-ring",glyph:""},{name:"fa-life-saver",glyph:""},{name:"fa-lightbulb-o",glyph:""},{name:"fa-line-chart",glyph:""},{name:"fa-link",glyph:""},{name:"fa-linkedin",glyph:""},{name:"fa-linkedin-square",glyph:""},{name:"fa-linux",glyph:""},{name:"fa-list",glyph:""},{name:"fa-list-alt",glyph:""},{name:"fa-list-ol",glyph:""},{name:"fa-list-ul",glyph:""},{name:"fa-location-arrow",glyph:""},{name:"fa-lock",glyph:""},{name:"fa-long-arrow-down",glyph:""},{name:"fa-long-arrow-left",glyph:""},{name:"fa-long-arrow-right",glyph:""},{name:"fa-long-arrow-up",glyph:""},{name:"fa-magic",glyph:""},{name:"fa-magnet",glyph:""},{name:"fa-mail-forward",glyph:""},{name:"fa-mail-reply",glyph:""},{name:"fa-mail-reply-all",glyph:""},{name:"fa-male",glyph:""},{name:"fa-map",glyph:""},{name:"fa-map-marker",glyph:""},{name:"fa-map-o",glyph:""},{name:"fa-map-pin",glyph:""},{name:"fa-map-signs",glyph:""},{name:"fa-mars",glyph:""},{name:"fa-mars-double",glyph:""},{name:"fa-mars-stroke",glyph:""},{name:"fa-mars-stroke-h",glyph:""},{name:"fa-mars-stroke-v",glyph:""},{name:"fa-maxcdn",glyph:""},{name:"fa-meanpath",glyph:""},{name:"fa-medium",glyph:""},{name:"fa-medkit",glyph:""},{name:"fa-meh-o",glyph:""},{name:"fa-mercury",glyph:""},{name:"fa-microphone",glyph:""},{name:"fa-microphone-slash",glyph:""},{name:"fa-minus",glyph:""},{name:"fa-minus-circle",glyph:""},{name:"fa-minus-square",glyph:""},{name:"fa-minus-square-o",glyph:""},{name:"fa-mobile",glyph:""},{name:"fa-mobile-phone",glyph:""},{name:"fa-money",glyph:""},{name:"fa-moon-o",glyph:""},{name:"fa-mortar-board",glyph:""},{name:"fa-motorcycle",glyph:""},{name:"fa-mouse-pointer",glyph:""},{name:"fa-music",glyph:""},{name:"fa-navicon",glyph:""},{name:"fa-neuter",glyph:""},{name:"fa-newspaper-o",glyph:""},{name:"fa-object-group",glyph:""},{name:"fa-object-ungroup",glyph:""},{name:"fa-odnoklassniki",glyph:""},{name:"fa-odnoklassniki-square",glyph:""},{name:"fa-opencart",glyph:""},{name:"fa-openid",glyph:""},{name:"fa-opera",glyph:""},{name:"fa-optin-monster",glyph:""},{name:"fa-outdent",glyph:""},{name:"fa-pagelines",glyph:""},{name:"fa-paint-brush",glyph:""},{name:"fa-paper-plane",glyph:""},{name:"fa-paper-plane-o",glyph:""},{name:"fa-paperclip",glyph:""},{name:"fa-paragraph",glyph:""},{name:"fa-paste",glyph:""},{name:"fa-pause",glyph:""},{name:"fa-paw",glyph:""},{name:"fa-paypal",glyph:""},{name:"fa-pencil",glyph:""},{name:"fa-pencil-square",glyph:""},{name:"fa-pencil-square-o",glyph:""},{name:"fa-phone",glyph:""},{name:"fa-phone-square",glyph:""},{name:"fa-photo",glyph:""},{name:"fa-picture-o",glyph:""},{name:"fa-pie-chart",glyph:""},{name:"fa-pied-piper",glyph:""},{name:"fa-pied-piper-alt",glyph:""},{name:"fa-pinterest",glyph:""},{name:"fa-pinterest-p",glyph:""},{name:"fa-pinterest-square",glyph:""},{name:"fa-plane",glyph:""},{name:"fa-play",glyph:""},{name:"fa-play-circle",glyph:""},{name:"fa-play-circle-o",glyph:""},{name:"fa-plug",glyph:""},{name:"fa-plus",glyph:""},{name:"fa-plus-circle",glyph:""},{name:"fa-plus-square",glyph:""},{name:"fa-plus-square-o",glyph:""},{name:"fa-power-off",glyph:""},{name:"fa-print",glyph:""},{name:"fa-puzzle-piece",glyph:""},{name:"fa-qq",glyph:""},{name:"fa-qrcode",glyph:""},{name:"fa-question",glyph:""},{name:"fa-question-circle",glyph:""},{name:"fa-quote-left",glyph:""},{name:"fa-quote-right",glyph:""},{name:"fa-ra",glyph:""},{name:"fa-random",glyph:""},{name:"fa-rebel",glyph:""},{name:"fa-recycle",glyph:""},{name:"fa-reddit",glyph:""},{name:"fa-reddit-square",glyph:""},{name:"fa-refresh",glyph:""},{name:"fa-registered",glyph:""},{name:"fa-remove",glyph:""},{name:"fa-renren",glyph:""},{name:"fa-reorder",glyph:""},{name:"fa-repeat",glyph:""},{name:"fa-reply",glyph:""},{name:"fa-reply-all",glyph:""},{name:"fa-retweet",glyph:""},{name:"fa-rmb",glyph:""},{name:"fa-road",glyph:""},{name:"fa-rocket",glyph:""},{name:"fa-rotate-left",glyph:""},{name:"fa-rotate-right",glyph:""},{name:"fa-rouble",glyph:""},{name:"fa-rss",glyph:""},{name:"fa-rss-square",glyph:""},{name:"fa-rub",glyph:""},{name:"fa-ruble",glyph:""},{name:"fa-rupee",glyph:""},{name:"fa-safari",glyph:""},{name:"fa-save",glyph:""},{name:"fa-scissors",glyph:""},{name:"fa-search",glyph:""},{name:"fa-search-minus",glyph:""},{name:"fa-search-plus",glyph:""},{name:"fa-sellsy",glyph:""},{name:"fa-send",glyph:""},{name:"fa-send-o",glyph:""},{name:"fa-server",glyph:""},{name:"fa-share",glyph:""},{name:"fa-share-alt",glyph:""},{name:"fa-share-alt-square",glyph:""},{name:"fa-share-square",glyph:""},{name:"fa-share-square-o",glyph:""},{name:"fa-shekel",glyph:""},{name:"fa-sheqel",glyph:""},{name:"fa-shield",glyph:""},{name:"fa-ship",glyph:""},{name:"fa-shirtsinbulk",glyph:""},{name:"fa-shopping-cart",glyph:""},{name:"fa-sign-in",glyph:""},{name:"fa-sign-out",glyph:""},{name:"fa-signal",glyph:""},{name:"fa-simplybuilt",glyph:""},{name:"fa-sitemap",glyph:""},{name:"fa-skyatlas",glyph:""},{name:"fa-skype",glyph:""},{name:"fa-slack",glyph:""},{name:"fa-sliders",glyph:""},{name:"fa-slideshare",glyph:""},{name:"fa-smile-o",glyph:""},{name:"fa-soccer-ball-o",glyph:""},{name:"fa-sort",glyph:""},{name:"fa-sort-alpha-asc",glyph:""},{name:"fa-sort-alpha-desc",glyph:""},{name:"fa-sort-amount-asc",glyph:""},{name:"fa-sort-amount-desc",glyph:""},{name:"fa-sort-asc",glyph:""},{name:"fa-sort-desc",glyph:""},{name:"fa-sort-down",glyph:""},{name:"fa-sort-numeric-asc",glyph:""},{name:"fa-sort-numeric-desc",glyph:""},{name:"fa-sort-up",glyph:""},{name:"fa-soundcloud",glyph:""},{name:"fa-space-shuttle",glyph:""},{name:"fa-spinner",glyph:""},{name:"fa-spoon",glyph:""},{name:"fa-spotify",glyph:""},{name:"fa-square",glyph:""},{name:"fa-square-o",glyph:""},{name:"fa-stack-exchange",glyph:""},{name:"fa-stack-overflow",glyph:""},{name:"fa-star",glyph:""},{name:"fa-star-half",glyph:""},{name:"fa-star-half-empty",glyph:""},{name:"fa-star-half-full",glyph:""},{name:"fa-star-half-o",glyph:""},{name:"fa-star-o",glyph:""},{name:"fa-steam",glyph:""},{name:"fa-steam-square",glyph:""},{name:"fa-step-backward",glyph:""},{name:"fa-step-forward",glyph:""},{name:"fa-stethoscope",glyph:""},{name:"fa-sticky-note",glyph:""},{name:"fa-sticky-note-o",glyph:""},{name:"fa-stop",glyph:""},{name:"fa-street-view",glyph:""},{name:"fa-strikethrough",glyph:""},{name:"fa-stumbleupon",glyph:""},{name:"fa-stumbleupon-circle",glyph:""},{name:"fa-subscript",glyph:""},{name:"fa-subway",glyph:""},{name:"fa-suitcase",glyph:""},{name:"fa-sun-o",glyph:""},{name:"fa-superscript",glyph:""},{name:"fa-support",glyph:""},{name:"fa-table",glyph:""},{name:"fa-tablet",glyph:""},{name:"fa-tachometer",glyph:""},{name:"fa-tag",glyph:""},{name:"fa-tags",glyph:""},{name:"fa-tasks",glyph:""},{name:"fa-taxi",glyph:""},{name:"fa-television",glyph:""},{name:"fa-tencent-weibo",glyph:""},{name:"fa-terminal",glyph:""},{name:"fa-text-height",glyph:""},{name:"fa-text-width",glyph:""},{name:"fa-th",glyph:""},{name:"fa-th-large",glyph:""},{name:"fa-th-list",glyph:""},{name:"fa-thumb-tack",glyph:""},{name:"fa-thumbs-down",glyph:""},{name:"fa-thumbs-o-down",glyph:""},{name:"fa-thumbs-o-up",glyph:""},{name:"fa-thumbs-up",glyph:""},{name:"fa-ticket",glyph:""},{name:"fa-times",glyph:""},{name:"fa-times-circle",glyph:""},{name:"fa-times-circle-o",glyph:""},{name:"fa-tint",glyph:""},{name:"fa-toggle-down",glyph:""},{name:"fa-toggle-left",glyph:""},{name:"fa-toggle-off",glyph:""},{name:"fa-toggle-on",glyph:""},{name:"fa-toggle-right",glyph:""},{name:"fa-toggle-up",glyph:""},{name:"fa-trademark",glyph:""},{name:"fa-train",glyph:""},{name:"fa-transgender",glyph:""},{name:"fa-transgender-alt",glyph:""},{name:"fa-trash",glyph:""},{name:"fa-trash-o",glyph:""},{name:"fa-tree",glyph:""},{name:"fa-trello",glyph:""},{name:"fa-tripadvisor",glyph:""},{name:"fa-trophy",glyph:""},{name:"fa-truck",glyph:""},{name:"fa-try",glyph:""},{name:"fa-tty",glyph:""},{name:"fa-tumblr",glyph:""},{name:"fa-tumblr-square",glyph:""},{name:"fa-turkish-lira",glyph:""},{name:"fa-tv",glyph:""},{name:"fa-twitch",glyph:""},{name:"fa-twitter",glyph:""},{name:"fa-twitter-square",glyph:""},{name:"fa-umbrella",glyph:""},{name:"fa-underline",glyph:""},{name:"fa-undo",glyph:""},{name:"fa-university",glyph:""},{name:"fa-unlink",glyph:""},{name:"fa-unlock",glyph:""},{name:"fa-unlock-alt",glyph:""},{name:"fa-unsorted",glyph:""},{name:"fa-upload",glyph:""},{name:"fa-usd",glyph:""},{name:"fa-user",glyph:""},{name:"fa-user-md",glyph:""},{name:"fa-user-plus",glyph:""},{name:"fa-user-secret",glyph:""},{name:"fa-user-times",glyph:""},{name:"fa-users",glyph:""},{name:"fa-venus",glyph:""},{name:"fa-venus-double",glyph:""},{name:"fa-venus-mars",glyph:""},{name:"fa-viacoin",glyph:""},{name:"fa-video-camera",glyph:""},{name:"fa-vimeo",glyph:""},{name:"fa-vimeo-square",glyph:""},{name:"fa-vine",glyph:""},{name:"fa-vk",glyph:""},{name:"fa-volume-down",glyph:""},{name:"fa-volume-off",glyph:""},{name:"fa-volume-up",glyph:""},{name:"fa-warning",glyph:""},{name:"fa-wechat",glyph:""},{name:"fa-weibo",glyph:""},{name:"fa-weixin",glyph:""},{name:"fa-whatsapp",glyph:""},{name:"fa-wheelchair",glyph:""},{name:"fa-wifi",glyph:""},{name:"fa-wikipedia-w",glyph:""},{name:"fa-windows",glyph:""},{name:"fa-won",glyph:""},{name:"fa-wordpress",glyph:""},{name:"fa-wrench",glyph:""},{name:"fa-xing",glyph:""},{name:"fa-xing-square",glyph:""},{name:"fa-y-combinator",glyph:""},{name:"fa-y-combinator-square",glyph:""},{name:"fa-yahoo",glyph:""},{name:"fa-yc",glyph:""},{name:"fa-yc-square",glyph:""},{name:"fa-yelp",glyph:""},{name:"fa-yen",glyph:""},{name:"fa-youtube",glyph:""},{name:"fa-youtube-play",glyph:""},{name:"fa-youtube-square",glyph:""}];

export default Icon;
