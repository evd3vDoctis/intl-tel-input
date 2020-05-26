// Array of country objects for the flag dropdown.

// Here is the criteria for the plugin to support a given country/territory
// - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
// - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
// - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml

// Each country array has the following information:
// [
//    Country name,
//    iso2 code,
//    International dial code,
//    Order (if >1 country with same dial code),
//    Area codes
// ]
var allCountries = [
  [
    "Афганистан",
    "Afghanistan (‫افغانستان‬‎)",
    "af",
    "93"
  ],
  [
    "Албания",
    "Albania (Shqipëri)",
    "al",
    "355"
  ],
  [
    "Алжир",
    "Algeria (‫الجزائر‬‎)",
    "dz",
    "213"
  ],
  [
    "Американское Самоа",
    "American Samoa",
    "as",
    "1",
    5,
    ["684"]
  ],
  [
    "Андорра",
    "Andorra",
    "ad",
    "376"
  ],
  [
    "Ангола",
    "Angola",
    "ao",
    "244"
  ],
  [
    "Ангилья",
    "Anguilla",
    "ai",
    "1",
    6,
    ["264"]
  ],
  [
    "Антигуа и Барбуда",
    "Antigua and Barbuda",
    "ag",
    "1",
    7,
    ["268"]
  ],
  [
    "Аргентина",
    "Argentina",
    "ar",
    "54"
  ],
  [
    "Армения",
    "Armenia (Հայաստան)",
    "am",
    "374"
  ],
  [
    "Аруба",
    "Aruba",
    "aw",
    "297"
  ],
  [
    "Австралия",
    "Australia",
    "au",
    "61",
    0
  ],
  [
    "Австрия",
    "Austria (Österreich)",
    "at",
    "43"
  ],
  [
    "Азербайджан",
    "Azerbaijan (Azərbaycan)",
    "az",
    "994"
  ],
  [
    "Багамы",
    "Bahamas",
    "bs",
    "1",
    8,
    ["242"]
  ],
  [
    "Бахрейн",
    "Bahrain (‫البحرين‬‎)",
    "bh",
    "973"
  ],
  [
    "Бангладеш",
    "Bangladesh (বাংলাদেশ)",
    "bd",
    "880"
  ],
  [
    "Барбадос",
    "Barbados",
    "bb",
    "1",
    9,
    ["246"]
  ],
  [
    "Беларусь",
    "Belarus (Беларусь)",
    "by",
    "375"
  ],
  [
    "Бельгия",
    "Belgium (België)",
    "be",
    "32"
  ],
  [
    "Белиз",
    "Belize",
    "bz",
    "501"
  ],
  [
    "Бенин",
    "Benin (Bénin)",
    "bj",
    "229"
  ],
  [
    "Бермуды",
    "Bermuda",
    "bm",
    "1",
    10,
    ["441"]
  ],
  [
    "Бутан",
    "Bhutan (འབྲུག)",
    "bt",
    "975"
  ],
  [
    "Боливия",
    "Bolivia",
    "bo",
    "591"
  ],
  [
    "Босния и Герцеговина",
    "Bosnia and Herzegovina (Босна и Херцеговина)",
    "ba",
    "387"
  ],
  [
    "Ботсвана",
    "Botswana",
    "bw",
    "267"
  ],
  [
    "Бразилия",
    "Brazil (Brasil)",
    "br",
    "55"
  ],
  [
    "Британская территория в Индийском океане",
    "British Indian Ocean Territory",
    "io",
    "246"
  ],
  [
    "Британская территория в Индийском океане",
    "British Virgin Islands",
    "vg",
    "1",
    11,
    ["284"]
  ],
  [
    "Бруней",
    "Brunei",
    "bn",
    "673"
  ],
  [
    "Болгария",
    "Bulgaria (България)",
    "bg",
    "359"
  ],
  [
    "Буркина-Фасо",
    "Burkina Faso",
    "bf",
    "226"
  ],
  [
    "Бурунди",
    "Burundi (Uburundi)",
    "bi",
    "257"
  ],
  [
    "Камбоджа",
    "Cambodia (កម្ពុជា)",
    "kh",
    "855"
  ],
  [
    "Камерун",
    "Cameroon (Cameroun)",
    "cm",
    "237"
  ],
  [
    "Канада",
    "Canada",
    "ca",
    "1",
    1,
    ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]
  ],
  [
    "Кабо-Верде",
    "Cape Verde (Kabu Verdi)",
    "cv",
    "238"
  ],
  [
    "Бонэйр",
    "Caribbean Netherlands",
    "bq",
    "599",
    1,
    ["3", "4", "7"]
  ],
  [
    "Острова Кайман",
    "Cayman Islands",
    "ky",
    "1",
    12,
    ["345"]
  ],
  [
    "Центральноафриканская Республика",
    "Central African Republic (République centrafricaine)",
    "cf",
    "236"
  ],
  [
    "Чад",
    "Chad (Tchad)",
    "td",
    "235"
  ],
  [
    "Чили",
    "Chile",
    "cl",
    "56"
  ],
  [
    "Китай",
    "China (中国)",
    "cn",
    "86"
  ],
  [
    "Остров Рождества",
    "Christmas Island",
    "cx",
    "61",
    2,
    ["89164"]
  ],
  [
    "Кокосовые острова",
    "Cocos (Keeling) Islands",
    "cc",
    "61",
    1,
    ["89162"]
  ],
  [
    "Колумбия",
    "Colombia",
    "co",
    "57"
  ],
  [
    "Коморы",
    "Comoros (‫جزر القمر‬‎)",
    "km",
    "269"
  ],
  [
    "ДР Конго",
    "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
    "cd",
    "243"
  ],
  [
    "Конго",
    "Congo (Republic) (Congo-Brazzaville)",
    "cg",
    "242"
  ],
  [
    "Острова Кука",
    "Cook Islands",
    "ck",
    "682"
  ],
  [
    "Коста-Рика",
    "Costa Rica",
    "cr",
    "506"
  ],
  [
    "Кот-д'Ивуар",
    "Côte d’Ivoire",
    "ci",
    "225"
  ],
  [
    "Хорватия",
    "Croatia (Hrvatska)",
    "hr",
    "385"
  ],
  [
    "Куба",
    "Cuba",
    "cu",
    "53"
  ],
  [
    "Кюрасао",
    "Curaçao",
    "cw",
    "599",
    0
  ],
  [
    "Кипр",
    "Cyprus (Κύπρος)",
    "cy",
    "357"
  ],
  [
    "Чехия",
    "Czech Republic (Česká republika)",
    "cz",
    "420"
  ],
  [
    "Дания",
    "Denmark (Danmark)",
    "dk",
    "45"
  ],
  [
    "Джибути",
    "Djibouti",
    "dj",
    "253"
  ],
  [
    "Доминика",
    "Dominica",
    "dm",
    "1",
    13,
    ["767"]
  ],
  [
    "Доминиканская Республика",
    "Dominican Republic (República Dominicana)",
    "do",
    "1",
    2,
    ["809", "829", "849"]
  ],
  [
    "Эквадор",
    "Ecuador",
    "ec",
    "593"
  ],
  [
    "Египет",
    "Egypt (‫مصر‬‎)",
    "eg",
    "20"
  ],
  [
    "Сальвадор",
    "El Salvador",
    "sv",
    "503"
  ],
  [
    "Экваториальная Гвинея",
    "Equatorial Guinea (Guinea Ecuatorial)",
    "gq",
    "240"
  ],
  [
    "Эритрея",
    "Eritrea",
    "er",
    "291"
  ],
  [
    "Эстония",
    "Estonia (Eesti)",
    "ee",
    "372"
  ],
  [
    "Эфиопия",
    "Ethiopia",
    "et",
    "251"
  ],
  [
    "Фолклендские острова",
    "Falkland Islands (Islas Malvinas)",
    "fk",
    "500"
  ],
  [
    "Фарерские острова",
    "Faroe Islands (Føroyar)",
    "fo",
    "298"
  ],
  [
    "Фиджи",
    "Fiji",
    "fj",
    "679"
  ],
  [
    "Финляндия",
    "Finland (Suomi)",
    "fi",
    "358",
    0
  ],
  [
    "Франция",
    "France",
    "fr",
    "33"
  ],
  [
    "Французская Гвиана",
    "French Guiana (Guyane française)",
    "gf",
    "594"
  ],
  [
    "Французская Полинезия",
    "French Polynesia (Polynésie française)",
    "pf",
    "689"
  ],
  [
    "Габон",
    "Gabon",
    "ga",
    "241"
  ],
  [
    "Гамбия",
    "Gambia",
    "gm",
    "220"
  ],
  [
    "Грузия",
    "Georgia (საქართველო)",
    "ge",
    "995"
  ],
  [
    "Германия",
    "Germany (Deutschland)",
    "de",
    "49"
  ],
  [
    "Гана",
    "Ghana (Gaana)",
    "gh",
    "233"
  ],
  [
    "Гибралтар",
    "Gibraltar",
    "gi",
    "350"
  ],
  [
    "Греция",
    "Greece (Ελλάδα)",
    "gr",
    "30"
  ],
  [
    "Гренландия",
    "Greenland (Kalaallit Nunaat)",
    "gl",
    "299"
  ],
  [
    "Гренада",
    "Grenada",
    "gd",
    "1",
    14,
    ["473"]
  ],
  [
    "Гваделупа",
    "Guadeloupe",
    "gp",
    "590",
    0
  ],
  [
    "Гуам",
    "Guam",
    "gu",
    "1",
    15,
    ["671"]
  ],
  [
    "Гватемала",
    "Guatemala",
    "gt",
    "502"
  ],
  [
    "Гернси",
    "Guernsey",
    "gg",
    "44",
    1,
    ["1481", "7781", "7839", "7911"]
  ],
  [
    "Гвинея",
    "Guinea (Guinée)",
    "gn",
    "224"
  ],
  [
    "Гвинея-Бисау",
    "Guinea-Bissau (Guiné Bissau)",
    "gw",
    "245"
  ],
  [
    "Гайана",
    "Guyana",
    "gy",
    "592"
  ],
  [
    "Гаити",
    "Haiti",
    "ht",
    "509"
  ],
  [
    "Гондурас",
    "Honduras",
    "hn",
    "504"
  ],
  [
    "Гонконг",
    "Hong Kong (香港)",
    "hk",
    "852"
  ],
  [
    "Венгрия",
    "Hungary (Magyarország)",
    "hu",
    "36"
  ],
  [
    "Исландия",
    "Iceland (Ísland)",
    "is",
    "354"
  ],
  [
    "Индия",
    "India (भारत)",
    "in",
    "91"
  ],
  [
    "Индонезия",
    "Indonesia",
    "id",
    "62"
  ],
  [
    "Иран",
    "Iran (‫ایران‬‎)",
    "ir",
    "98"
  ],
  [
    "Ирак",
    "Iraq (‫العراق‬‎)",
    "iq",
    "964"
  ],
  [
    "Ирландия",
    "Ireland",
    "ie",
    "353"
  ],
  [
    "Остров Мэн",
    "Isle of Man",
    "im",
    "44",
    2,
    ["1624", "74576", "7524", "7924", "7624"]
  ],
  [
    "Израиль",
    "Israel (‫ישראל‬‎)",
    "il",
    "972"
  ],
  [
    "Италия",
    "Italy (Italia)",
    "it",
    "39",
    0
  ],
  [
    "Ямайка",
    "Jamaica",
    "jm",
    "1",
    4,
    ["876", "658"]
  ],
  [
    "Япония",
    "Japan (日本)",
    "jp",
    "81"
  ],
  [
    "Джерси",
    "Jersey",
    "je",
    "44",
    3,
    ["1534", "7509", "7700", "7797", "7829", "7937"]
  ],
  [
    "Иордания",
    "Jordan (‫الأردن‬‎)",
    "jo",
    "962"
  ],
  [
    "Казахстан",
    "Kazakhstan (Казахстан)",
    "kz",
    "7",
    1,
    ["33", "7"]
  ],
  [
    "Кения",
    "Kenya",
    "ke",
    "254"
  ],
  [
    "Кирибати",
    "Kiribati",
    "ki",
    "686"
  ],
  [
    "Косово",
    "Kosovo",
    "xk",
    "383"
  ],
  [
    "Кувейт",
    "Kuwait (‫الكويت‬‎)",
    "kw",
    "965"
  ],
  [
    "Киргизия",
    "Kyrgyzstan (Кыргызстан)",
    "kg",
    "996"
  ],
  [
    "Лаос",
    "Laos (ລາວ)",
    "la",
    "856"
  ],
  [
    "Латвия",
    "Latvia (Latvija)",
    "lv",
    "371"
  ],
  [
    "Ливан",
    "Lebanon (‫لبنان‬‎)",
    "lb",
    "961"
  ],
  [
    "Лесото",
    "Lesotho",
    "ls",
    "266"
  ],
  [
    "Либерия",
    "Liberia",
    "lr",
    "231"
  ],
  [
    "Ливия",
    "Libya (‫ليبيا‬‎)",
    "ly",
    "218"
  ],
  [
    "Лихтенштейн",
    "Liechtenstein",
    "li",
    "423"
  ],
  [
    "Литва",
    "Lithuania (Lietuva)",
    "lt",
    "370"
  ],
  [
    "Люксембург",
    "Luxembourg",
    "lu",
    "352"
  ],
  [
    "Макао",
    "Macau (澳門)",
    "mo",
    "853"
  ],
  [
    "Македония",
    "Macedonia (FYROM) (Македонија)",
    "mk",
    "389"
  ],
  [
    "Мадагаскар",
    "Madagascar (Madagasikara)",
    "mg",
    "261"
  ],
  [
    "Малави",
    "Malawi",
    "mw",
    "265"
  ],
  [
    "Малайзия",
    "Malaysia",
    "my",
    "60"
  ],
  [
    "Мальдивы",
    "Maldives",
    "mv",
    "960"
  ],
  [
    "Мали",
    "Mali",
    "ml",
    "223"
  ],
  [
    "Мальта",
    "Malta",
    "mt",
    "356"
  ],
  [
    "Маршалловы острова",
    "Marshall Islands",
    "mh",
    "692"
  ],
  [
    "Мартиника",
    "Martinique",
    "mq",
    "596"
  ],
  [
    "Мавритания",
    "Mauritania (‫موريتانيا‬‎)",
    "mr",
    "222"
  ],
  [
    "Маврикий",
    "Mauritius (Moris)",
    "mu",
    "230"
  ],
  [
    "Майотта",
    "Mayotte",
    "yt",
    "262",
    1,
    ["269", "639"]
  ],
  [
    "Мексика",
    "Mexico (México)",
    "mx",
    "52"
  ],
  [
    "Микронезия",
    "Micronesia",
    "fm",
    "691"
  ],
  [
    "Молдавия",
    "Moldova (Republica Moldova)",
    "md",
    "373"
  ],
  [
    "Монако",
    "Monaco",
    "mc",
    "377"
  ],
  [
    "Монголия",
    "Mongolia (Монгол)",
    "mn",
    "976"
  ],
  [
    "Черногория",
    "Montenegro (Crna Gora)",
    "me",
    "382"
  ],
  [
    "Монтсеррат",
    "Montserrat",
    "ms",
    "1",
    16,
    ["664"]
  ],
  [
    "Марокко",
    "Morocco (‫المغرب‬‎)",
    "ma",
    "212",
    0
  ],
  [
    "Мозамбик",
    "Mozambique (Moçambique)",
    "mz",
    "258"
  ],
  [
    "Мьянма",
    "Myanmar (Burma) (မြန်မာ)",
    "mm",
    "95"
  ],
  [
    "Намибия",
    "Namibia (Namibië)",
    "na",
    "264"
  ],
  [
    "Науру",
    "Nauru",
    "nr",
    "674"
  ],
  [
    "Непал",
    "Nepal (नेपाल)",
    "np",
    "977"
  ],
  [
    "Нидерланды",
    "Netherlands (Nederland)",
    "nl",
    "31"
  ],
  [
    "Новая Каледония",
    "New Caledonia (Nouvelle-Calédonie)",
    "nc",
    "687"
  ],
  [
    "Новая Зеландия",
    "New Zealand",
    "nz",
    "64"
  ],
  [
    "Никарагуа",
    "Nicaragua",
    "ni",
    "505"
  ],
  [
    "Нигер",
    "Niger (Nijar)",
    "ne",
    "227"
  ],
  [
    "Нигерия",
    "Nigeria",
    "ng",
    "234"
  ],
  [
    "Ниуэ",
    "Niue",
    "nu",
    "683"
  ],
  [
    "Остров Норфолк",
    "Norfolk Island",
    "nf",
    "672"
  ],
  [
    "Северная корея (КНДР)",
    "North Korea (조선 민주주의 인민 공화국)",
    "kp",
    "850"
  ],
  [
    "Северные Марианские острова",
    "Northern Mariana Islands",
    "mp",
    "1",
    17,
    ["670"]
  ],
  [
    "Норвегия",
    "Norway (Norge)",
    "no",
    "47",
    0
  ],
  [
    "Оман",
    "Oman (‫عُمان‬‎)",
    "om",
    "968"
  ],
  [
    "Пакистан",
    "Pakistan (‫پاکستان‬‎)",
    "pk",
    "92"
  ],
  [
    "Палау",
    "Palau",
    "pw",
    "680"
  ],
  [
    "Палестина",
    "Palestine (‫فلسطين‬‎)",
    "ps",
    "970"
  ],
  [
    "Панама",
    "Panama (Panamá)",
    "pa",
    "507"
  ],
  [
    "Папуа-Новая Гвинея",
    "Papua New Guinea",
    "pg",
    "675"
  ],
  [
    "Парагвай",
    "Paraguay",
    "py",
    "595"
  ],
  [
    "Перу",
    "Peru (Perú)",
    "pe",
    "51"
  ],
  [
    "Филиппины",
    "Philippines",
    "ph",
    "63"
  ],
  [
    "Польша",
    "Poland (Polska)",
    "pl",
    "48"
  ],
  [
    "Португалия",
    "Portugal",
    "pt",
    "351"
  ],
  [
    "Пуэрто-Рико",
    "Puerto Rico",
    "pr",
    "1",
    3,
    ["787", "939"]
  ],
  [
    "Катар",
    "Qatar (‫قطر‬‎)",
    "qa",
    "974"
  ],
  [
    "Реюньон",
    "Réunion (La Réunion)",
    "re",
    "262",
    0
  ],
  [
    "Румыния",
    "Romania (România)",
    "ro",
    "40"
  ],
  [
    "Россия",
    "Russia (Россия)",
    "ru",
    "7",
    0
  ],
  [
    "Руанда",
    "Rwanda",
    "rw",
    "250"
  ],
  [
    "Сен-Бартелеми",
    "Saint Barthélemy",
    "bl",
    "590",
    1
  ],
  [
    "Остров Святой Елены",
    "Saint Helena",
    "sh",
    "290"
  ],
  [
    "Сент-Китс и Невис",
    "Saint Kitts and Nevis",
    "kn",
    "1",
    18,
    ["869"]
  ],
  [
    "Сент-Люсия",
    "Saint Lucia",
    "lc",
    "1",
    19,
    ["758"]
  ],
  [
    "Сен-Мартен",
    "Saint Martin (Saint-Martin (partie française))",
    "mf",
    "590",
    2
  ],
  [
    "Сен-Пьер и Микелон",
    "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
    "pm",
    "508"
  ],
  [
    "Сент-Винсент и Гренадины",
    "Saint Vincent and the Grenadines",
    "vc",
    "1",
    20,
    ["784"]
  ],
  [
    "Самоа",
    "Samoa",
    "ws",
    "685"
  ],
  [
    "Сан-Марино",
    "San Marino",
    "sm",
    "378"
  ],
  [
    "Сан-Томе и Принсипи",
    "São Tomé and Príncipe (São Tomé e Príncipe)",
    "st",
    "239"
  ],
  [
    "Саудовская Аравия",
    "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
    "sa",
    "966"
  ],
  [
    "Сенегал",
    "Senegal (Sénégal)",
    "sn",
    "221"
  ],
  [
    "Сербия",
    "Serbia (Србија)",
    "rs",
    "381"
  ],
  [
    "Сейшелы",
    "Seychelles",
    "sc",
    "248"
  ],
  [
    "Сьерра-Леоне",
    "Sierra Leone",
    "sl",
    "232"
  ],
  [
    "Сингапур",
    "Singapore",
    "sg",
    "65"
  ],
  [
    "Синт-Мартен",
    "Sint Maarten",
    "sx",
    "1",
    21,
    ["721"]
  ],
  [
    "Словакия",
    "Slovakia (Slovensko)",
    "sk",
    "421"
  ],
  [
    "Словения",
    "Slovenia (Slovenija)",
    "si",
    "386"
  ],
  [
    "Соломоновы острова",
    "Solomon Islands",
    "sb",
    "677"
  ],
  [
    "Сомали",
    "Somalia (Soomaaliya)",
    "so",
    "252"
  ],
  [
    "Южная Африка",
    "South Africa",
    "za",
    "27"
  ],
  [
    "Южная корея",
    "South Korea (대한민국)",
    "kr",
    "82"
  ],
  [
    "Южный Судан",
    "South Sudan (‫جنوب السودان‬‎)",
    "ss",
    "211"
  ],
  [
    "Испания",
    "Spain (España)",
    "es",
    "34"
  ],
  [
    "Шри-Ланка",
    "Sri Lanka (ශ්‍රී ලංකාව)",
    "lk",
    "94"
  ],
  [
    "Судан",
    "Sudan (‫السودان‬‎)",
    "sd",
    "249"
  ],
  [
    "Суринам",
    "Suriname",
    "sr",
    "597"
  ],
  [
    "Шпицберген",
    "Svalbard and Jan Mayen",
    "sj",
    "47",
    1,
    ["79"]
  ],
  [
    "Эсватини",
    "Swaziland",
    "sz",
    "268"
  ],
  [
    "Швеция",
    "Sweden (Sverige)",
    "se",
    "46"
  ],
  [
    "Швейцария",
    "Switzerland (Schweiz)",
    "ch",
    "41"
  ],
  [
    "Сирия",
    "Syria (‫سوريا‬‎)",
    "sy",
    "963"
  ],
  [
    "Тайвань",
    "Taiwan (台灣)",
    "tw",
    "886"
  ],
  [
    "Таджикистан",
    "Tajikistan",
    "tj",
    "992"
  ],
  [
    "Танзания",
    "Tanzania",
    "tz",
    "255"
  ],
  [
    "Таиланд",
    "Thailand (ไทย)",
    "th",
    "66"
  ],
  [
    "Восточный Тимор",
    "Timor-Leste",
    "tl",
    "670"
  ],
  [
    "Того",
    "Togo",
    "tg",
    "228"
  ],
  [
    "Токелау",
    "Tokelau",
    "tk",
    "690"
  ],
  [
    "Тонга",
    "Tonga",
    "to",
    "676"
  ],
  [
    "Тринидад и Тобаго",
    "Trinidad and Tobago",
    "tt",
    "1",
    22,
    ["868"]
  ],
  [
    "Тунис",
    "Tunisia (‫تونس‬‎)",
    "tn",
    "216"
  ],
  [
    "Турция",
    "Turkey (Türkiye)",
    "tr",
    "90"
  ],
  [
    "Туркменистан",
    "Turkmenistan",
    "tm",
    "993"
  ],
  [
    "Острова Теркс и Кайкос",
    "Turks and Caicos Islands",
    "tc",
    "1",
    23,
    ["649"]
  ],
  [
    "Тувалу",
    "Tuvalu",
    "tv",
    "688"
  ],
  [
    "Американские Виргинские острова",
    "U.S. Virgin Islands",
    "vi",
    "1",
    24,
    ["340"]
  ],
  [
    "Уганда",
    "Uganda",
    "ug",
    "256"
  ],
  [
    "Украина",
    "Ukraine (Україна)",
    "ua",
    "380"
  ],
  [
    "Объединенные Арабские Эмираты",
    "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
    "ae",
    "971"
  ],
  [
    "Великобритания",
    "United Kingdom",
    "gb",
    "44",
    0
  ],
  [
    "Соединенные Штаты Америки",
    "United States",
    "us",
    "1",
    0
  ],
  [
    "Уругвай",
    "Uruguay",
    "uy",
    "598"
  ],
  [
    "Узбекистан",
    "Uzbekistan (Oʻzbekiston)",
    "uz",
    "998"
  ],
  [
    "Вануату",
    "Vanuatu",
    "vu",
    "678"
  ],
  [
    "Ватикан",
    "Vatican City (Città del Vaticano)",
    "va",
    "39",
    1,
    ["06698"]
  ],
  [
    "Венесуэла",
    "Venezuela",
    "ve",
    "58"
  ],
  [
    "Вьетнам",
    "Vietnam (Việt Nam)",
    "vn",
    "84"
  ],
  [
    "Уоллис и Футуна",
    "Wallis and Futuna (Wallis-et-Futuna)",
    "wf",
    "681"
  ],
  [
    "Западная Сахара",
    "Western Sahara (‫الصحراء الغربية‬‎)",
    "eh",
    "212",
    1,
    ["5288", "5289"]
  ],
  [
    "Йемен",
    "Yemen (‫اليمن‬‎)",
    "ye",
    "967"
  ],
  [
    "Замбия",
    "Zambia",
    "zm",
    "260"
  ],
  [
    "Зимбабве",
    "Zimbabwe",
    "zw",
    "263"
  ],
  [
    "Аландские острова",
    "Åland Islands",
    "ax",
    "358",
    1,
    ["18"]
  ]
];

// loop over all of the countries above, restructuring the data to be objects with named keys
for (var i = 0; i < allCountries.length; i++) {
  var c = allCountries[i];
  allCountries[i] = {
    russianName: c[0],
    name: c[1],
    iso2: c[2],
    dialCode: c[3],
    priority: c[4] || 0,
    areaCodes: c[5] || null
  };
}
