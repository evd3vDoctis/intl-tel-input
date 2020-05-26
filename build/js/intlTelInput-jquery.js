/*
 * International Telephone Input v17.0.2
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// wrap in UMD
(function(factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else if (typeof define === "function" && define.amd) {
        define([ "jquery" ], function($) {
            factory($);
        });
    } else factory(jQuery);
})(function($, undefined) {
    "use strict";
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
    var allCountries = [ [ "Афганистан", "Afghanistan (‫افغانستان‬‎)", "af", "93" ], [ "Албания", "Albania (Shqipëri)", "al", "355" ], [ "Алжир", "Algeria (‫الجزائر‬‎)", "dz", "213" ], [ "Американское Самоа", "American Samoa", "as", "1", 5, [ "684" ] ], [ "Андорра", "Andorra", "ad", "376" ], [ "Ангола", "Angola", "ao", "244" ], [ "Ангилья", "Anguilla", "ai", "1", 6, [ "264" ] ], [ "Антигуа и Барбуда", "Antigua and Barbuda", "ag", "1", 7, [ "268" ] ], [ "Аргентина", "Argentina", "ar", "54" ], [ "Армения", "Armenia (Հայաստան)", "am", "374" ], [ "Аруба", "Aruba", "aw", "297" ], [ "Австралия", "Australia", "au", "61", 0 ], [ "Австрия", "Austria (Österreich)", "at", "43" ], [ "Азербайджан", "Azerbaijan (Azərbaycan)", "az", "994" ], [ "Багамы", "Bahamas", "bs", "1", 8, [ "242" ] ], [ "Бахрейн", "Bahrain (‫البحرين‬‎)", "bh", "973" ], [ "Бангладеш", "Bangladesh (বাংলাদেশ)", "bd", "880" ], [ "Барбадос", "Barbados", "bb", "1", 9, [ "246" ] ], [ "Беларусь", "Belarus (Беларусь)", "by", "375" ], [ "Бельгия", "Belgium (België)", "be", "32" ], [ "Белиз", "Belize", "bz", "501" ], [ "Бенин", "Benin (Bénin)", "bj", "229" ], [ "Бермуды", "Bermuda", "bm", "1", 10, [ "441" ] ], [ "Бутан", "Bhutan (འབྲུག)", "bt", "975" ], [ "Боливия", "Bolivia", "bo", "591" ], [ "Босния и Герцеговина", "Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387" ], [ "Ботсвана", "Botswana", "bw", "267" ], [ "Бразилия", "Brazil (Brasil)", "br", "55" ], [ "Британская территория (BIOT)", "British Indian Ocean Territory", "io", "246" ], [ "Виргинские острова", "British Virgin Islands", "vg", "1", 11, [ "284" ] ], [ "Бруней", "Brunei", "bn", "673" ], [ "Болгария", "Bulgaria (България)", "bg", "359" ], [ "Буркина-Фасо", "Burkina Faso", "bf", "226" ], [ "Бурунди", "Burundi (Uburundi)", "bi", "257" ], [ "Камбоджа", "Cambodia (កម្ពុជា)", "kh", "855" ], [ "Камерун", "Cameroon (Cameroun)", "cm", "237" ], [ "Канада", "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Кабо-Верде", "Cape Verde (Kabu Verdi)", "cv", "238" ], [ "Бонэйр", "Caribbean Netherlands", "bq", "599", 1, [ "3", "4", "7" ] ], [ "Острова Кайман", "Cayman Islands", "ky", "1", 12, [ "345" ] ], [ "ЦАР", "Central African Republic (République centrafricaine)", "cf", "236" ], [ "Чад", "Chad (Tchad)", "td", "235" ], [ "Чили", "Chile", "cl", "56" ], [ "Китай", "China (中国)", "cn", "86" ], [ "Остров Рождества", "Christmas Island", "cx", "61", 2, [ "89164" ] ], [ "Кокосовые острова", "Cocos (Keeling) Islands", "cc", "61", 1, [ "89162" ] ], [ "Колумбия", "Colombia", "co", "57" ], [ "Коморы", "Comoros (‫جزر القمر‬‎)", "km", "269" ], [ "ДР Конго", "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243" ], [ "Конго", "Congo (Republic) (Congo-Brazzaville)", "cg", "242" ], [ "Острова Кука", "Cook Islands", "ck", "682" ], [ "Коста-Рика", "Costa Rica", "cr", "506" ], [ "Кот-д'Ивуар", "Côte d’Ivoire", "ci", "225" ], [ "Хорватия", "Croatia (Hrvatska)", "hr", "385" ], [ "Куба", "Cuba", "cu", "53" ], [ "Кюрасао", "Curaçao", "cw", "599", 0 ], [ "Кипр", "Cyprus (Κύπρος)", "cy", "357" ], [ "Чехия", "Czech Republic (Česká republika)", "cz", "420" ], [ "Дания", "Denmark (Danmark)", "dk", "45" ], [ "Джибути", "Djibouti", "dj", "253" ], [ "Доминика", "Dominica", "dm", "1", 13, [ "767" ] ], [ "Доминикана", "Dominican Republic (República Dominicana)", "do", "1", 2, [ "809", "829", "849" ] ], [ "Эквадор", "Ecuador", "ec", "593" ], [ "Египет", "Egypt (‫مصر‬‎)", "eg", "20" ], [ "Сальвадор", "El Salvador", "sv", "503" ], [ "Экваториальная Гвинея", "Equatorial Guinea (Guinea Ecuatorial)", "gq", "240" ], [ "Эритрея", "Eritrea", "er", "291" ], [ "Эстония", "Estonia (Eesti)", "ee", "372" ], [ "Эфиопия", "Ethiopia", "et", "251" ], [ "Фолклендские острова", "Falkland Islands (Islas Malvinas)", "fk", "500" ], [ "Фарерские острова", "Faroe Islands (Føroyar)", "fo", "298" ], [ "Фиджи", "Fiji", "fj", "679" ], [ "Финляндия", "Finland (Suomi)", "fi", "358", 0 ], [ "Франция", "France", "fr", "33" ], [ "Французская Гвиана", "French Guiana (Guyane française)", "gf", "594" ], [ "Французская Полинезия", "French Polynesia (Polynésie française)", "pf", "689" ], [ "Габон", "Gabon", "ga", "241" ], [ "Гамбия", "Gambia", "gm", "220" ], [ "Грузия", "Georgia (საქართველო)", "ge", "995" ], [ "Германия", "Germany (Deutschland)", "de", "49" ], [ "Гана", "Ghana (Gaana)", "gh", "233" ], [ "Гибралтар", "Gibraltar", "gi", "350" ], [ "Греция", "Greece (Ελλάδα)", "gr", "30" ], [ "Гренландия", "Greenland (Kalaallit Nunaat)", "gl", "299" ], [ "Гренада", "Grenada", "gd", "1", 14, [ "473" ] ], [ "Гваделупа", "Guadeloupe", "gp", "590", 0 ], [ "Гуам", "Guam", "gu", "1", 15, [ "671" ] ], [ "Гватемала", "Guatemala", "gt", "502" ], [ "Гернси", "Guernsey", "gg", "44", 1, [ "1481", "7781", "7839", "7911" ] ], [ "Гвинея", "Guinea (Guinée)", "gn", "224" ], [ "Гвинея-Бисау", "Guinea-Bissau (Guiné Bissau)", "gw", "245" ], [ "Гайана", "Guyana", "gy", "592" ], [ "Гаити", "Haiti", "ht", "509" ], [ "Гондурас", "Honduras", "hn", "504" ], [ "Гонконг", "Hong Kong (香港)", "hk", "852" ], [ "Венгрия", "Hungary (Magyarország)", "hu", "36" ], [ "Исландия", "Iceland (Ísland)", "is", "354" ], [ "Индия", "India (भारत)", "in", "91" ], [ "Индонезия", "Indonesia", "id", "62" ], [ "Иран", "Iran (‫ایران‬‎)", "ir", "98" ], [ "Ирак", "Iraq (‫العراق‬‎)", "iq", "964" ], [ "Ирландия", "Ireland", "ie", "353" ], [ "Остров Мэн", "Isle of Man", "im", "44", 2, [ "1624", "74576", "7524", "7924", "7624" ] ], [ "Израиль", "Israel (‫ישראל‬‎)", "il", "972" ], [ "Италия", "Italy (Italia)", "it", "39", 0 ], [ "Ямайка", "Jamaica", "jm", "1", 4, [ "876", "658" ] ], [ "Япония", "Japan (日本)", "jp", "81" ], [ "Джерси", "Jersey", "je", "44", 3, [ "1534", "7509", "7700", "7797", "7829", "7937" ] ], [ "Иордания", "Jordan (‫الأردن‬‎)", "jo", "962" ], [ "Казахстан", "Kazakhstan (Казахстан)", "kz", "7", 1, [ "33", "7" ] ], [ "Кения", "Kenya", "ke", "254" ], [ "Кирибати", "Kiribati", "ki", "686" ], [ "Косово", "Kosovo", "xk", "383" ], [ "Кувейт", "Kuwait (‫الكويت‬‎)", "kw", "965" ], [ "Киргизия", "Kyrgyzstan (Кыргызстан)", "kg", "996" ], [ "Лаос", "Laos (ລາວ)", "la", "856" ], [ "Латвия", "Latvia (Latvija)", "lv", "371" ], [ "Ливан", "Lebanon (‫لبنان‬‎)", "lb", "961" ], [ "Лесото", "Lesotho", "ls", "266" ], [ "Либерия", "Liberia", "lr", "231" ], [ "Ливия", "Libya (‫ليبيا‬‎)", "ly", "218" ], [ "Лихтенштейн", "Liechtenstein", "li", "423" ], [ "Литва", "Lithuania (Lietuva)", "lt", "370" ], [ "Люксембург", "Luxembourg", "lu", "352" ], [ "Макао", "Macau (澳門)", "mo", "853" ], [ "Македония", "Macedonia (FYROM) (Македонија)", "mk", "389" ], [ "Мадагаскар", "Madagascar (Madagasikara)", "mg", "261" ], [ "Малави", "Malawi", "mw", "265" ], [ "Малайзия", "Malaysia", "my", "60" ], [ "Мальдивы", "Maldives", "mv", "960" ], [ "Мали", "Mali", "ml", "223" ], [ "Мальта", "Malta", "mt", "356" ], [ "Маршалловы острова", "Marshall Islands", "mh", "692" ], [ "Мартиника", "Martinique", "mq", "596" ], [ "Мавритания", "Mauritania (‫موريتانيا‬‎)", "mr", "222" ], [ "Маврикий", "Mauritius (Moris)", "mu", "230" ], [ "Майотта", "Mayotte", "yt", "262", 1, [ "269", "639" ] ], [ "Мексика", "Mexico (México)", "mx", "52" ], [ "Микронезия", "Micronesia", "fm", "691" ], [ "Молдавия", "Moldova (Republica Moldova)", "md", "373" ], [ "Монако", "Monaco", "mc", "377" ], [ "Монголия", "Mongolia (Монгол)", "mn", "976" ], [ "Черногория", "Montenegro (Crna Gora)", "me", "382" ], [ "Монтсеррат", "Montserrat", "ms", "1", 16, [ "664" ] ], [ "Марокко", "Morocco (‫المغرب‬‎)", "ma", "212", 0 ], [ "Мозамбик", "Mozambique (Moçambique)", "mz", "258" ], [ "Мьянма", "Myanmar (Burma) (မြန်မာ)", "mm", "95" ], [ "Намибия", "Namibia (Namibië)", "na", "264" ], [ "Науру", "Nauru", "nr", "674" ], [ "Непал", "Nepal (नेपाल)", "np", "977" ], [ "Нидерланды", "Netherlands (Nederland)", "nl", "31" ], [ "Новая Каледония", "New Caledonia (Nouvelle-Calédonie)", "nc", "687" ], [ "Новая Зеландия", "New Zealand", "nz", "64" ], [ "Никарагуа", "Nicaragua", "ni", "505" ], [ "Нигер", "Niger (Nijar)", "ne", "227" ], [ "Нигерия", "Nigeria", "ng", "234" ], [ "Ниуэ", "Niue", "nu", "683" ], [ "Остров Норфолк", "Norfolk Island", "nf", "672" ], [ "Северная корея (КНДР)", "North Korea (조선 민주주의 인민 공화국)", "kp", "850" ], [ "Марианские острова", "Northern Mariana Islands", "mp", "1", 17, [ "670" ] ], [ "Норвегия", "Norway (Norge)", "no", "47", 0 ], [ "Оман", "Oman (‫عُمان‬‎)", "om", "968" ], [ "Пакистан", "Pakistan (‫پاکستان‬‎)", "pk", "92" ], [ "Палау", "Palau", "pw", "680" ], [ "Палестина", "Palestine (‫فلسطين‬‎)", "ps", "970" ], [ "Панама", "Panama (Panamá)", "pa", "507" ], [ "Папуа-Новая Гвинея", "Papua New Guinea", "pg", "675" ], [ "Парагвай", "Paraguay", "py", "595" ], [ "Перу", "Peru (Perú)", "pe", "51" ], [ "Филиппины", "Philippines", "ph", "63" ], [ "Польша", "Poland (Polska)", "pl", "48" ], [ "Португалия", "Portugal", "pt", "351" ], [ "Пуэрто-Рико", "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Катар", "Qatar (‫قطر‬‎)", "qa", "974" ], [ "Реюньон", "Réunion (La Réunion)", "re", "262", 0 ], [ "Румыния", "Romania (România)", "ro", "40" ], [ "Россия", "Russia (Россия)", "ru", "7", 0 ], [ "Руанда", "Rwanda", "rw", "250" ], [ "Сен-Бартелеми", "Saint Barthélemy", "bl", "590", 1 ], [ "Остров Святой Елены", "Saint Helena", "sh", "290" ], [ "Сент-Китс и Невис", "Saint Kitts and Nevis", "kn", "1", 18, [ "869" ] ], [ "Сент-Люсия", "Saint Lucia", "lc", "1", 19, [ "758" ] ], [ "Сен-Мартен", "Saint Martin (Saint-Martin (partie française))", "mf", "590", 2 ], [ "Сен-Пьер и Микелон", "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508" ], [ "Сент-Винсент", "Saint Vincent and the Grenadines", "vc", "1", 20, [ "784" ] ], [ "Самоа", "Samoa", "ws", "685" ], [ "Сан-Марино", "San Marino", "sm", "378" ], [ "Сан-Томе и Принсипи", "São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239" ], [ "Саудовская Аравия", "Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966" ], [ "Сенегал", "Senegal (Sénégal)", "sn", "221" ], [ "Сербия", "Serbia (Србија)", "rs", "381" ], [ "Сейшелы", "Seychelles", "sc", "248" ], [ "Сьерра-Леоне", "Sierra Leone", "sl", "232" ], [ "Сингапур", "Singapore", "sg", "65" ], [ "Синт-Мартен", "Sint Maarten", "sx", "1", 21, [ "721" ] ], [ "Словакия", "Slovakia (Slovensko)", "sk", "421" ], [ "Словения", "Slovenia (Slovenija)", "si", "386" ], [ "Соломоновы острова", "Solomon Islands", "sb", "677" ], [ "Сомали", "Somalia (Soomaaliya)", "so", "252" ], [ "Южная Африка", "South Africa", "za", "27" ], [ "Южная корея", "South Korea (대한민국)", "kr", "82" ], [ "Южный Судан", "South Sudan (‫جنوب السودان‬‎)", "ss", "211" ], [ "Испания", "Spain (España)", "es", "34" ], [ "Шри-Ланка", "Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94" ], [ "Судан", "Sudan (‫السودان‬‎)", "sd", "249" ], [ "Суринам", "Suriname", "sr", "597" ], [ "Шпицберген", "Svalbard and Jan Mayen", "sj", "47", 1, [ "79" ] ], [ "Эсватини", "Swaziland", "sz", "268" ], [ "Швеция", "Sweden (Sverige)", "se", "46" ], [ "Швейцария", "Switzerland (Schweiz)", "ch", "41" ], [ "Сирия", "Syria (‫سوريا‬‎)", "sy", "963" ], [ "Тайвань", "Taiwan (台灣)", "tw", "886" ], [ "Таджикистан", "Tajikistan", "tj", "992" ], [ "Танзания", "Tanzania", "tz", "255" ], [ "Таиланд", "Thailand (ไทย)", "th", "66" ], [ "Восточный Тимор", "Timor-Leste", "tl", "670" ], [ "Того", "Togo", "tg", "228" ], [ "Токелау", "Tokelau", "tk", "690" ], [ "Тонга", "Tonga", "to", "676" ], [ "Тринидад и Тобаго", "Trinidad and Tobago", "tt", "1", 22, [ "868" ] ], [ "Тунис", "Tunisia (‫تونس‬‎)", "tn", "216" ], [ "Турция", "Turkey (Türkiye)", "tr", "90" ], [ "Туркменистан", "Turkmenistan", "tm", "993" ], [ "Острова Теркс и Кайкос", "Turks and Caicos Islands", "tc", "1", 23, [ "649" ] ], [ "Тувалу", "Tuvalu", "tv", "688" ], [ "Виргинские острова", "U.S. Virgin Islands", "vi", "1", 24, [ "340" ] ], [ "Уганда", "Uganda", "ug", "256" ], [ "Украина", "Ukraine (Україна)", "ua", "380" ], [ "ОАЭ", "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971" ], [ "Великобритания", "United Kingdom", "gb", "44", 0 ], [ "США", "United States", "us", "1", 0 ], [ "Уругвай", "Uruguay", "uy", "598" ], [ "Узбекистан", "Uzbekistan (Oʻzbekiston)", "uz", "998" ], [ "Вануату", "Vanuatu", "vu", "678" ], [ "Ватикан", "Vatican City (Città del Vaticano)", "va", "39", 1, [ "06698" ] ], [ "Венесуэла", "Venezuela", "ve", "58" ], [ "Вьетнам", "Vietnam (Việt Nam)", "vn", "84" ], [ "Уоллис и Футуна", "Wallis and Futuna (Wallis-et-Futuna)", "wf", "681" ], [ "Западная Сахара", "Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, [ "5288", "5289" ] ], [ "Йемен", "Yemen (‫اليمن‬‎)", "ye", "967" ], [ "Замбия", "Zambia", "zm", "260" ], [ "Зимбабве", "Zimbabwe", "zw", "263" ], [ "Аландские острова", "Åland Islands", "ax", "358", 1, [ "18" ] ] ];
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
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    var intlTelInputGlobals = {
        getInstance: function getInstance(input) {
            var id = input.getAttribute("data-intl-tel-input-id");
            return window.intlTelInputGlobals.instances[id];
        },
        instances: {}
    };
    if (typeof window === "object") window.intlTelInputGlobals = intlTelInputGlobals;
    // these vars persist through all instances of the plugin
    var id = 0;
    var defaults = {
        // whether or not to allow the dropdown
        allowDropdown: true,
        // if there is just a dial code in the input: remove it on blur
        autoHideDialCode: true,
        // add a placeholder in the input with an example number for the selected country
        autoPlaceholder: "polite",
        // modify the parentClass
        customContainer: "",
        // modify the auto placeholder
        customPlaceholder: null,
        // append menu to specified element
        dropdownContainer: null,
        // don't display these countries
        excludeCountries: [],
        // format the input value during initialisation and on setNumber
        formatOnDisplay: true,
        // geoIp lookup function
        geoIpLookup: null,
        // inject a hidden input with this name, and on submit, populate it with the result of getNumber
        hiddenInput: "",
        // initial country
        initialCountry: "",
        // localized country names e.g. { 'de': 'Deutschland' }
        localizedCountries: null,
        // don't insert international dial codes
        nationalMode: true,
        // display only these countries
        onlyCountries: [],
        // number type to use for placeholders
        placeholderNumberType: "MOBILE",
        // the countries at the top of the list. defaults to united states and united kingdom
        preferredCountries: [ "us", "gb" ],
        // display the country dial code next to the selected flag so it's not part of the typed number
        separateDialCode: false,
        // specify the path to the libphonenumber script to enable validation/formatting
        utilsScript: ""
    };
    // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
    var regionlessNanpNumbers = [ "800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889" ];
    if (typeof window === "object") {
        // keep track of if the window.load event has fired as impossible to check after the fact
        window.addEventListener("load", function() {
            // UPDATE: use a public static field so we can fudge it in the tests
            window.intlTelInputGlobals.windowLoaded = true;
        });
    }
    // utility function to iterate over an object. can't use Object.entries or native forEach because
    // of IE11
    var forEachProp = function forEachProp(obj, callback) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            callback(keys[i], obj[keys[i]]);
        }
    };
    // run a method on each instance of the plugin
    var forEachInstance = function forEachInstance(method) {
        forEachProp(window.intlTelInputGlobals.instances, function(key) {
            window.intlTelInputGlobals.instances[key][method]();
        });
    };
    // this is our plugin class that we will create an instance of
    // eslint-disable-next-line no-unused-vars
    var Iti = /*#__PURE__*/
    function() {
        function Iti(input, options) {
            var _this = this;
            _classCallCheck(this, Iti);
            this.id = id++;
            this.telInput = input;
            this.activeItem = null;
            this.highlightedItem = null;
            // process specified options / defaults
            // alternative to Object.assign, which isn't supported by IE11
            var customOptions = options || {};
            this.options = {};
            forEachProp(defaults, function(key, value) {
                _this.options[key] = customOptions.hasOwnProperty(key) ? customOptions[key] : value;
            });
            this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
        }
        _createClass(Iti, [ {
            key: "_init",
            value: function _init() {
                var _this2 = this;
                // if in nationalMode, disable options relating to dial codes
                if (this.options.nationalMode) this.options.autoHideDialCode = false;
                // if separateDialCode then doesn't make sense to A) insert dial code into input
                // (autoHideDialCode), and B) display national numbers (because we're displaying the country
                // dial code next to them)
                if (this.options.separateDialCode) {
                    this.options.autoHideDialCode = this.options.nationalMode = false;
                }
                // we cannot just test screen size as some smartphones/website meta tags will report desktop
                // resolutions
                // Note: for some reason jasmine breaks if you put this in the main Plugin function with the
                // rest of these declarations
                // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
                this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (this.isMobile) {
                    // trigger the mobile dropdown css
                    document.body.classList.add("iti-mobile");
                    // on mobile, we want a full screen dropdown, so we must append it to the body
                    if (!this.options.dropdownContainer) this.options.dropdownContainer = document.body;
                }
                // these promises get resolved when their individual requests complete
                // this way the dev can do something like iti.promise.then(...) to know when all requests are
                // complete
                if (typeof Promise !== "undefined") {
                    var autoCountryPromise = new Promise(function(resolve, reject) {
                        _this2.resolveAutoCountryPromise = resolve;
                        _this2.rejectAutoCountryPromise = reject;
                    });
                    var utilsScriptPromise = new Promise(function(resolve, reject) {
                        _this2.resolveUtilsScriptPromise = resolve;
                        _this2.rejectUtilsScriptPromise = reject;
                    });
                    this.promise = Promise.all([ autoCountryPromise, utilsScriptPromise ]);
                } else {
                    // prevent errors when Promise doesn't exist
                    this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function() {};
                    this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function() {};
                }
                // in various situations there could be no country selected initially, but we need to be able
                // to assume this variable exists
                this.selectedCountryData = {};
                // process all the data: onlyCountries, excludeCountries, preferredCountries etc
                this._processCountryData();
                // generate the markup
                this._generateMarkup();
                // set the initial state of the input value and the selected flag
                this._setInitialState();
                // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
                this._initListeners();
                // utils script, and auto country
                this._initRequests();
            }
        }, {
            key: "_processCountryData",
            value: function _processCountryData() {
                // process onlyCountries or excludeCountries array if present
                this._processAllCountries();
                // process the countryCodes map
                this._processCountryCodes();
                // process the preferredCountries
                this._processPreferredCountries();
                // translate countries according to localizedCountries option
                if (this.options.localizedCountries) this._translateCountriesByLocale();
                // sort countries by name
                if (this.options.onlyCountries.length || this.options.localizedCountries) {
                    this.countries.sort(this._countryNameSort);
                }
            }
        }, {
            key: "_addCountryCode",
            value: function _addCountryCode(iso2, dialCode, priority) {
                if (dialCode.length > this.dialCodeMaxLen) {
                    this.dialCodeMaxLen = dialCode.length;
                }
                if (!this.countryCodes.hasOwnProperty(dialCode)) {
                    this.countryCodes[dialCode] = [];
                }
                // bail if we already have this country for this dialCode
                for (var i = 0; i < this.countryCodes[dialCode].length; i++) {
                    if (this.countryCodes[dialCode][i] === iso2) return;
                }
                // check for undefined as 0 is falsy
                var index = priority !== undefined ? priority : this.countryCodes[dialCode].length;
                this.countryCodes[dialCode][index] = iso2;
            }
        }, {
            key: "_processAllCountries",
            value: function _processAllCountries() {
                if (this.options.onlyCountries.length) {
                    var lowerCaseOnlyCountries = this.options.onlyCountries.map(function(country) {
                        return country.toLowerCase();
                    });
                    this.countries = allCountries.filter(function(country) {
                        return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
                    });
                } else if (this.options.excludeCountries.length) {
                    var lowerCaseExcludeCountries = this.options.excludeCountries.map(function(country) {
                        return country.toLowerCase();
                    });
                    this.countries = allCountries.filter(function(country) {
                        return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
                    });
                } else {
                    this.countries = allCountries;
                }
            }
        }, {
            key: "_translateCountriesByLocale",
            value: function _translateCountriesByLocale() {
                for (var i = 0; i < this.countries.length; i++) {
                    var iso = this.countries[i].iso2.toLowerCase();
                    if (this.options.localizedCountries.hasOwnProperty(iso)) {
                        this.countries[i].russianName = this.options.localizedCountries[iso];
                    }
                }
            }
        }, {
            key: "_countryNameSort",
            value: function _countryNameSort(a, b) {
                return a.russianName.localeCompare(b.russianName);
            }
        }, {
            key: "_processCountryCodes",
            value: function _processCountryCodes() {
                this.dialCodeMaxLen = 0;
                this.countryCodes = {};
                // first: add dial codes
                for (var i = 0; i < this.countries.length; i++) {
                    var c = this.countries[i];
                    this._addCountryCode(c.iso2, c.dialCode, c.priority);
                }
                // next: add area codes
                // this is a second loop over countries, to make sure we have all of the "root" countries
                // already in the map, so that we can access them, as each time we add an area code substring
                // to the map, we also need to include the "root" country's code, as that also matches
                for (var _i = 0; _i < this.countries.length; _i++) {
                    var _c = this.countries[_i];
                    // area codes
                    if (_c.areaCodes) {
                        var rootCountryCode = this.countryCodes[_c.dialCode][0];
                        // for each area code
                        for (var j = 0; j < _c.areaCodes.length; j++) {
                            var areaCode = _c.areaCodes[j];
                            // for each digit in the area code to add all partial matches as well
                            for (var k = 1; k < areaCode.length; k++) {
                                var partialDialCode = _c.dialCode + areaCode.substr(0, k);
                                // start with the root country, as that also matches this dial code
                                this._addCountryCode(rootCountryCode, partialDialCode);
                                this._addCountryCode(_c.iso2, partialDialCode);
                            }
                            // add the full area code
                            this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
                        }
                    }
                }
            }
        }, {
            key: "_processPreferredCountries",
            value: function _processPreferredCountries() {
                this.preferredCountries = [];
                for (var i = 0; i < this.options.preferredCountries.length; i++) {
                    var countryCode = this.options.preferredCountries[i].toLowerCase();
                    var countryData = this._getCountryData(countryCode, false, true);
                    if (countryData) this.preferredCountries.push(countryData);
                }
            }
        }, {
            key: "_createEl",
            value: function _createEl(name, attrs, container) {
                var el = document.createElement(name);
                if (attrs) forEachProp(attrs, function(key, value) {
                    return el.setAttribute(key, value);
                });
                if (container) container.appendChild(el);
                return el;
            }
        }, {
            key: "_generateMarkup",
            value: function _generateMarkup() {
                var _this3 = this;
                // if autocomplete does not exist on the element and its form, then
                // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
                // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
                // autocompleted number, which on submit could mean wrong number is saved (esp in nationalMode)
                if (!this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))) {
                    this.telInput.setAttribute("autocomplete", "off");
                }
                // containers (mostly for positioning)
                var parentClass = "iti";
                if (this.options.allowDropdown) parentClass += " iti--allow-dropdown";
                if (this.options.separateDialCode) parentClass += " iti--separate-dial-code";
                if (this.options.customContainer) {
                    parentClass += " ";
                    parentClass += this.options.customContainer;
                }
                var wrapper = this._createEl("div", {
                    "class": parentClass
                });
                this.telInput.parentNode.insertBefore(wrapper, this.telInput);
                this.flagsContainer = this._createEl("div", {
                    "class": "iti__flag-container"
                }, wrapper);
                wrapper.appendChild(this.telInput);
                // selected flag (displayed to left of input)
                this.selectedFlag = this._createEl("div", {
                    "class": "iti__selected-flag",
                    role: "combobox",
                    "aria-owns": "iti-".concat(this.id, "__country-listbox"),
                    "aria-expanded": "false"
                }, this.flagsContainer);
                this.selectedFlagInner = this._createEl("div", {
                    "class": "iti__flag"
                }, this.selectedFlag);
                if (this.options.separateDialCode) {
                    this.selectedDialCode = this._createEl("div", {
                        "class": "iti__selected-dial-code"
                    }, this.selectedFlag);
                }
                if (this.options.allowDropdown) {
                    // make element focusable and tab navigable
                    this.selectedFlag.setAttribute("tabindex", "0");
                    this.dropdownArrow = this._createEl("div", {
                        "class": "iti__arrow"
                    }, this.selectedFlag);
                    var codeLabel = this._createEl("label", {
                        "class": "iti__code-label"
                    }, this.flagsContainer);
                    setTimeout(function() {
                        codeLabel.innerText = _this3.selectedCountryData.dialCode;
                    });
                    var country = this._createEl("div", {
                        "class": "iti__country"
                    }, this.selectedFlag);
                    setTimeout(function() {
                        country.innerText = _this3.selectedCountryData.russianName;
                    });
                    // country dropdown: preferred countries, then divider, then all countries
                    this.countryList = this._createEl("ul", {
                        "class": "iti__country-list iti__hide",
                        id: "iti-".concat(this.id, "__country-listbox"),
                        role: "listbox"
                    });
                    if (this.preferredCountries.length) {
                        this._appendListItems(this.preferredCountries, "iti__preferred", true);
                        this._createEl("li", {
                            "class": "iti__divider",
                            role: "separator",
                            "aria-disabled": "true"
                        }, this.countryList);
                    }
                    this._appendListItems(this.countries, "iti__standard");
                    // create dropdownContainer markup
                    if (this.options.dropdownContainer) {
                        this.dropdown = this._createEl("div", {
                            "class": "iti iti--container"
                        });
                        this.dropdown.appendChild(this.countryList);
                    } else {
                        this.flagsContainer.appendChild(this.countryList);
                    }
                }
                if (this.options.hiddenInput) {
                    var hiddenInputName = this.options.hiddenInput;
                    var name = this.telInput.getAttribute("name");
                    if (name) {
                        var i = name.lastIndexOf("[");
                        // if input name contains square brackets, then give the hidden input the same name,
                        // replacing the contents of the last set of brackets with the given hiddenInput name
                        if (i !== -1) hiddenInputName = "".concat(name.substr(0, i), "[").concat(hiddenInputName, "]");
                    }
                    this.hiddenInput = this._createEl("input", {
                        type: "hidden",
                        name: hiddenInputName
                    });
                    wrapper.appendChild(this.hiddenInput);
                }
            }
        }, {
            key: "_appendListItems",
            value: function _appendListItems(countries, className, preferred) {
                // we create so many DOM elements, it is faster to build a temp string
                // and then add everything to the DOM in one go at the end
                var tmp = "";
                // for each country
                for (var i = 0; i < countries.length; i++) {
                    var c = countries[i];
                    var idSuffix = preferred ? "-preferred" : "";
                    // open the list item
                    tmp += "<li class='iti__country ".concat(className, "' tabIndex='-1' id='iti-").concat(this.id, "__item-").concat(c.iso2).concat(idSuffix, "' role='option' data-dial-code='").concat(c.dialCode, "' data-country-code='").concat(c.iso2, "'>");
                    // add the flag
                    tmp += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(c.iso2, "'></div></div>");
                    // and the country name and dial code
                    tmp += "<span class='iti__country-name'>".concat(c.russianName, "</span>");
                    tmp += "<span class='iti__dial-code'>+".concat(c.dialCode, "</span>");
                    // close the list item
                    tmp += "</li>";
                }
                this.countryList.insertAdjacentHTML("beforeend", tmp);
            }
        }, {
            key: "_setInitialState",
            value: function _setInitialState() {
                var val = this.telInput.value;
                var dialCode = this._getDialCode(val);
                var isRegionlessNanp = this._isRegionlessNanp(val);
                var _this$options = this.options, initialCountry = _this$options.initialCountry, nationalMode = _this$options.nationalMode, autoHideDialCode = _this$options.autoHideDialCode, separateDialCode = _this$options.separateDialCode;
                // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
                // flag, else fall back to the default country
                if (dialCode && !isRegionlessNanp) {
                    this._updateFlagFromNumber(val);
                } else if (initialCountry !== "auto") {
                    // see if we should select a flag
                    if (initialCountry) {
                        this._setFlag(initialCountry.toLowerCase());
                    } else {
                        if (dialCode && isRegionlessNanp) {
                            // has intl dial code, is regionless nanp, and no initialCountry, so default to US
                            this._setFlag("us");
                        } else {
                            // no dial code and no initialCountry, so default to first in list
                            this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
                            if (!val) {
                                this._setFlag(this.defaultCountry);
                            }
                        }
                    }
                    // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
                    if (!val && !nationalMode && !autoHideDialCode && !separateDialCode) {
                        this.telInput.value = "+".concat(this.selectedCountryData.dialCode);
                    }
                }
                // NOTE: if initialCountry is set to auto, that will be handled separately
                // format - note this wont be run after _updateDialCode as that's only called if no val
                if (val) this._updateValFromNumber(val);
            }
        }, {
            key: "_initListeners",
            value: function _initListeners() {
                this._initKeyListeners();
                if (this.options.autoHideDialCode) this._initBlurListeners();
                if (this.options.allowDropdown) this._initDropdownListeners();
                if (this.hiddenInput) this._initHiddenInputListener();
            }
        }, {
            key: "_initHiddenInputListener",
            value: function _initHiddenInputListener() {
                var _this4 = this;
                this._handleHiddenInputSubmit = function() {
                    _this4.hiddenInput.value = _this4.getNumber();
                };
                if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
            }
        }, {
            key: "_getClosestLabel",
            value: function _getClosestLabel() {
                var el = this.telInput;
                while (el && el.tagName !== "LABEL") {
                    el = el.parentNode;
                }
                return el;
            }
        }, {
            key: "_initDropdownListeners",
            value: function _initDropdownListeners() {
                var _this5 = this;
                // hack for input nested inside label (which is valid markup): clicking the selected-flag to
                // open the dropdown would then automatically trigger a 2nd click on the input which would
                // close it again
                this._handleLabelClick = function(e) {
                    // if the dropdown is closed, then focus the input, else ignore the click
                    if (_this5.countryList.classList.contains("iti__hide")) _this5.telInput.focus(); else e.preventDefault();
                };
                var label = this._getClosestLabel();
                if (label) label.addEventListener("click", this._handleLabelClick);
                // toggle country dropdown on click
                this._handleClickSelectedFlag = function() {
                    // only intercept this event if we're opening the dropdown
                    // else let it bubble up to the top ("click-off-to-close" listener)
                    // we cannot just stopPropagation as it may be needed to close another instance
                    if (_this5.countryList.classList.contains("iti__hide") && !_this5.telInput.disabled && !_this5.telInput.readOnly) {
                        _this5._showDropdown();
                    }
                };
                this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
                // open dropdown list if currently focused
                this._handleFlagsContainerKeydown = function(e) {
                    var isDropdownHidden = _this5.countryList.classList.contains("iti__hide");
                    if (isDropdownHidden && [ "ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter" ].indexOf(e.key) !== -1) {
                        // prevent form from being submitted if "ENTER" was pressed
                        e.preventDefault();
                        // prevent event from being handled again by document
                        e.stopPropagation();
                        _this5._showDropdown();
                    }
                    // allow navigation from dropdown to input on TAB
                    if (e.key === "Tab") _this5._closeDropdown();
                };
                this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
            }
        }, {
            key: "_initRequests",
            value: function _initRequests() {
                var _this6 = this;
                // if the user has specified the path to the utils script, fetch it on window.load, else resolve
                if (this.options.utilsScript && !window.intlTelInputUtils) {
                    // if the plugin is being initialised after the window.load event has already been fired
                    if (window.intlTelInputGlobals.windowLoaded) {
                        window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
                    } else {
                        // wait until the load event so we don't block any other requests e.g. the flags image
                        window.addEventListener("load", function() {
                            window.intlTelInputGlobals.loadUtils(_this6.options.utilsScript);
                        });
                    }
                } else this.resolveUtilsScriptPromise();
                if (this.options.initialCountry === "auto") this._loadAutoCountry(); else this.resolveAutoCountryPromise();
            }
        }, {
            key: "_loadAutoCountry",
            value: function _loadAutoCountry() {
                // 3 options:
                // 1) already loaded (we're done)
                // 2) not already started loading (start)
                // 3) already started loading (do nothing - just wait for loading callback to fire)
                if (window.intlTelInputGlobals.autoCountry) {
                    this.handleAutoCountry();
                } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
                    // don't do this twice!
                    window.intlTelInputGlobals.startedLoadingAutoCountry = true;
                    if (typeof this.options.geoIpLookup === "function") {
                        this.options.geoIpLookup(function(countryCode) {
                            window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
                            // tell all instances the auto country is ready
                            // TODO: this should just be the current instances
                            // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
                            // away (e.g. if they have already done the geo ip lookup somewhere else). Using
                            // setTimeout means that the current thread of execution will finish before executing
                            // this, which allows the plugin to finish initialising.
                            setTimeout(function() {
                                return forEachInstance("handleAutoCountry");
                            });
                        }, function() {
                            return forEachInstance("rejectAutoCountryPromise");
                        });
                    }
                }
            }
        }, {
            key: "_initKeyListeners",
            value: function _initKeyListeners() {
                var _this7 = this;
                // update flag on keyup
                this._handleKeyupEvent = function() {
                    if (_this7._updateFlagFromNumber(_this7.telInput.value)) {
                        _this7._triggerCountryChange();
                    }
                };
                this.telInput.addEventListener("keyup", this._handleKeyupEvent);
                // update flag on cut/paste events (now supported in all major browsers)
                this._handleClipboardEvent = function() {
                    // hack because "paste" event is fired before input is updated
                    setTimeout(_this7._handleKeyupEvent);
                };
                this.telInput.addEventListener("cut", this._handleClipboardEvent);
                this.telInput.addEventListener("paste", this._handleClipboardEvent);
            }
        }, {
            key: "_cap",
            value: function _cap(number) {
                var max = this.telInput.getAttribute("maxlength");
                return max && number.length > max ? number.substr(0, max) : number;
            }
        }, {
            key: "_initBlurListeners",
            value: function _initBlurListeners() {
                var _this8 = this;
                // on blur or form submit: if just a dial code then remove it
                this._handleSubmitOrBlurEvent = function() {
                    _this8._removeEmptyDialCode();
                };
                if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent);
                this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent);
            }
        }, {
            key: "_removeEmptyDialCode",
            value: function _removeEmptyDialCode() {
                if (this.telInput.value.charAt(0) === "+") {
                    var numeric = this._getNumeric(this.telInput.value);
                    // if just a plus, or if just a dial code
                    if (!numeric || this.selectedCountryData.dialCode === numeric) {
                        this.telInput.value = "";
                    }
                }
            }
        }, {
            key: "_getNumeric",
            value: function _getNumeric(s) {
                return s.replace(/\D/g, "");
            }
        }, {
            key: "_trigger",
            value: function _trigger(name) {
                // have to use old school document.createEvent as IE11 doesn't support `new Event()` syntax
                var e = document.createEvent("Event");
                e.initEvent(name, true, true);
                // can bubble, and is cancellable
                this.telInput.dispatchEvent(e);
            }
        }, {
            key: "_showDropdown",
            value: function _showDropdown() {
                this.countryList.classList.remove("iti__hide");
                this.selectedFlag.setAttribute("aria-expanded", "true");
                this._setDropdownPosition();
                // update highlighting and scroll to active list item
                if (this.activeItem) {
                    this._highlightListItem(this.activeItem, false);
                    this._scrollTo(this.activeItem, true);
                }
                // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
                this._bindDropdownListeners();
                // update the arrow
                this.dropdownArrow.classList.add("iti__arrow--up");
                this._trigger("open:countrydropdown");
            }
        }, {
            key: "_toggleClass",
            value: function _toggleClass(el, className, shouldHaveClass) {
                if (shouldHaveClass && !el.classList.contains(className)) el.classList.add(className); else if (!shouldHaveClass && el.classList.contains(className)) el.classList.remove(className);
            }
        }, {
            key: "_setDropdownPosition",
            value: function _setDropdownPosition() {
                var _this9 = this;
                if (this.options.dropdownContainer) {
                    this.options.dropdownContainer.appendChild(this.dropdown);
                }
                if (!this.isMobile) {
                    var pos = this.telInput.getBoundingClientRect();
                    // windowTop from https://stackoverflow.com/a/14384091/217866
                    var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                    var inputTop = pos.top + windowTop;
                    var dropdownHeight = this.countryList.offsetHeight;
                    // dropdownFitsBelow = (dropdownBottom < windowBottom)
                    var dropdownFitsBelow = inputTop + this.telInput.offsetHeight + dropdownHeight < windowTop + window.innerHeight;
                    var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
                    // by default, the dropdown will be below the input. If we want to position it above the
                    // input, we add the dropup class.
                    this._toggleClass(this.countryList, "iti__country-list--dropup", !dropdownFitsBelow && dropdownFitsAbove);
                    // if dropdownContainer is enabled, calculate postion
                    if (this.options.dropdownContainer) {
                        // by default the dropdown will be directly over the input because it's not in the flow.
                        // If we want to position it below, we need to add some extra top value.
                        var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.offsetHeight;
                        // calculate placement
                        this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
                        this.dropdown.style.left = "".concat(pos.left + document.body.scrollLeft, "px");
                        // close menu on window scroll
                        this._handleWindowScroll = function() {
                            return _this9._closeDropdown();
                        };
                        window.addEventListener("scroll", this._handleWindowScroll);
                    }
                }
            }
        }, {
            key: "_getClosestListItem",
            value: function _getClosestListItem(target) {
                var el = target;
                while (el && el !== this.countryList && !el.classList.contains("iti__country")) {
                    el = el.parentNode;
                }
                // if we reached the countryList element, then return null
                return el === this.countryList ? null : el;
            }
        }, {
            key: "_bindDropdownListeners",
            value: function _bindDropdownListeners() {
                var _this10 = this;
                // when mouse over a list item, just highlight that one
                // we add the class "highlight", so if they hit "enter" we know which one to select
                this._handleMouseoverCountryList = function(e) {
                    // handle event delegation, as we're listening for this event on the countryList
                    var listItem = _this10._getClosestListItem(e.target);
                    if (listItem) _this10._highlightListItem(listItem, false);
                };
                this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
                // listen for country selection
                this._handleClickCountryList = function(e) {
                    var listItem = _this10._getClosestListItem(e.target);
                    if (listItem) _this10._selectListItem(listItem);
                };
                this.countryList.addEventListener("click", this._handleClickCountryList);
                // click off to close
                // (except when this initial opening click is bubbling up)
                // we cannot just stopPropagation as it may be needed to close another instance
                var isOpening = true;
                this._handleClickOffToClose = function() {
                    if (!isOpening) _this10._closeDropdown();
                    isOpening = false;
                };
                document.documentElement.addEventListener("click", this._handleClickOffToClose);
                // listen for up/down scrolling, enter to select, or letters to jump to country name.
                // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
                // just hit down and hold it to scroll down (no keyup event).
                // listen on the document because that's where key events are triggered if no input has focus
                var query = "";
                var queryTimer = null;
                this._handleKeydownOnDropdown = function(e) {
                    // prevent down key from scrolling the whole page,
                    // and enter key from submitting a form etc
                    e.preventDefault();
                    // up and down to navigate
                    if (e.key === "ArrowUp" || e.key === "Up" || e.key === "ArrowDown" || e.key === "Down") _this10._handleUpDownKey(e.key); else if (e.key === "Enter") _this10._handleEnterKey(); else if (e.key === "Escape") _this10._closeDropdown(); else if (/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
                        // jump to countries that start with the query string
                        if (queryTimer) clearTimeout(queryTimer);
                        query += e.key.toLowerCase();
                        _this10._searchForCountry(query);
                        // if the timer hits 1 second, reset the query
                        queryTimer = setTimeout(function() {
                            query = "";
                        }, 1e3);
                    }
                };
                document.addEventListener("keydown", this._handleKeydownOnDropdown);
            }
        }, {
            key: "_handleUpDownKey",
            value: function _handleUpDownKey(key) {
                var next = key === "ArrowUp" || key === "Up" ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
                if (next) {
                    // skip the divider
                    if (next.classList.contains("iti__divider")) {
                        next = key === "ArrowUp" || key === "Up" ? next.previousElementSibling : next.nextElementSibling;
                    }
                    this._highlightListItem(next, true);
                }
            }
        }, {
            key: "_handleEnterKey",
            value: function _handleEnterKey() {
                if (this.highlightedItem) this._selectListItem(this.highlightedItem);
            }
        }, {
            key: "_searchForCountry",
            value: function _searchForCountry(query) {
                for (var i = 0; i < this.countries.length; i++) {
                    if (this._startsWith(this.countries[i].russianName, query)) {
                        var listItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(this.countries[i].iso2));
                        // update highlighting and scroll
                        this._highlightListItem(listItem, false);
                        this._scrollTo(listItem, true);
                        break;
                    }
                }
            }
        }, {
            key: "_startsWith",
            value: function _startsWith(a, b) {
                return a.substr(0, b.length).toLowerCase() === b;
            }
        }, {
            key: "_updateValFromNumber",
            value: function _updateValFromNumber(originalNumber) {
                var number = originalNumber;
                if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
                    var useNational = !this.options.separateDialCode && (this.options.nationalMode || number.charAt(0) !== "+");
                    var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat, NATIONAL = _intlTelInputUtils$nu.NATIONAL, INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
                    var format = useNational ? NATIONAL : INTERNATIONAL;
                    number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
                }
                number = this._beforeSetNumber(number);
                this.telInput.value = number;
            }
        }, {
            key: "_updateFlagFromNumber",
            value: function _updateFlagFromNumber(originalNumber) {
                // if we're in nationalMode and we already have US/Canada selected, make sure the number starts
                // with a +1 so _getDialCode will be able to extract the area code
                // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
                // from the number), that means we're initialising the plugin with a number that already has a
                // dial code, so fine to ignore this bit
                var number = originalNumber;
                var selectedDialCode = this.selectedCountryData.dialCode;
                var isNanp = selectedDialCode === "1";
                if (number && this.options.nationalMode && isNanp && number.charAt(0) !== "+") {
                    if (number.charAt(0) !== "1") number = "1".concat(number);
                    number = "+".concat(number);
                }
                // update flag if user types area code for another country
                if (this.options.separateDialCode && selectedDialCode && number.charAt(0) !== "+") {
                    number = "+".concat(selectedDialCode).concat(number);
                }
                // try and extract valid dial code from input
                var dialCode = this._getDialCode(number);
                var numeric = this._getNumeric(number);
                var countryCode = null;
                if (dialCode) {
                    var countryCodes = this.countryCodes[this._getNumeric(dialCode)];
                    // check if the right country is already selected. this should be false if the number is
                    // longer than the matched dial code because in this case we need to make sure that if
                    // there are multiple country matches, that the first one is selected (note: we could
                    // just check that here, but it requires the same loop that we already have later)
                    var alreadySelected = countryCodes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
                    var isRegionlessNanpNumber = selectedDialCode === "1" && this._isRegionlessNanp(numeric);
                    // only update the flag if:
                    // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
                    // AND
                    // B) the right country is not already selected
                    if (!isRegionlessNanpNumber && !alreadySelected) {
                        // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first
                        // non-empty index
                        for (var j = 0; j < countryCodes.length; j++) {
                            if (countryCodes[j]) {
                                countryCode = countryCodes[j];
                                break;
                            }
                        }
                    }
                } else if (number.charAt(0) === "+" && numeric.length) {
                    // invalid dial code, so empty
                    // Note: use getNumeric here because the number has not been formatted yet, so could contain
                    // bad chars
                    countryCode = "";
                } else if (!number || number === "+") {
                    // empty, or just a plus, so default
                    countryCode = this.defaultCountry;
                }
                if (countryCode !== null) {
                    return this._setFlag(countryCode);
                }
                return false;
            }
        }, {
            key: "_isRegionlessNanp",
            value: function _isRegionlessNanp(number) {
                var numeric = this._getNumeric(number);
                if (numeric.charAt(0) === "1") {
                    var areaCode = numeric.substr(1, 3);
                    return regionlessNanpNumbers.indexOf(areaCode) !== -1;
                }
                return false;
            }
        }, {
            key: "_highlightListItem",
            value: function _highlightListItem(listItem, shouldFocus) {
                var prevItem = this.highlightedItem;
                if (prevItem) prevItem.classList.remove("iti__highlight");
                this.highlightedItem = listItem;
                this.highlightedItem.classList.add("iti__highlight");
                if (shouldFocus) this.highlightedItem.focus();
            }
        }, {
            key: "_getCountryData",
            value: function _getCountryData(countryCode, ignoreOnlyCountriesOption, allowFail) {
                var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
                for (var i = 0; i < countryList.length; i++) {
                    if (countryList[i].iso2 === countryCode) {
                        return countryList[i];
                    }
                }
                if (allowFail) {
                    return null;
                }
                throw new Error("No country data for '".concat(countryCode, "'"));
            }
        }, {
            key: "_setFlag",
            value: function _setFlag(countryCode) {
                var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                // do this first as it will throw an error and stop if countryCode is invalid
                this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
                // update the defaultCountry - we only need the iso2 from now on, so just store that
                if (this.selectedCountryData.iso2) {
                    this.defaultCountry = this.selectedCountryData.iso2;
                }
                this.selectedFlagInner.setAttribute("class", "iti__flag iti__".concat(countryCode));
                // update the selected country's title attribute
                var title = countryCode ? "".concat(this.selectedCountryData.russianName, ": +").concat(this.selectedCountryData.dialCode) : "Unknown";
                this.selectedFlag.setAttribute("title", title);
                var countryName = this.selectedFlag.querySelector(".iti__country");
                countryName.innerText = this.selectedCountryData.russianName;
                var codeLabel = document.querySelector(".iti label");
                codeLabel.innerText = this.selectedCountryData.dialCode;
                if (this.options.separateDialCode) {
                    var dialCode = this.selectedCountryData.dialCode ? "+".concat(this.selectedCountryData.dialCode) : "";
                    this.selectedDialCode.innerHTML = dialCode;
                    // offsetWidth is zero if input is in a hidden container during initialisation
                    var selectedFlagWidth = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
                    // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
                    this.telInput.style.paddingLeft = "".concat(selectedFlagWidth + 6, "px");
                }
                // and the input's placeholder
                this._updatePlaceholder();
                // update the active list item
                if (this.options.allowDropdown) {
                    var prevItem = this.activeItem;
                    if (prevItem) {
                        prevItem.classList.remove("iti__active");
                        prevItem.setAttribute("aria-selected", "false");
                    }
                    if (countryCode) {
                        // check if there is a preferred item first, else fall back to standard
                        var nextItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode, "-preferred")) || this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode));
                        nextItem.setAttribute("aria-selected", "true");
                        nextItem.classList.add("iti__active");
                        this.activeItem = nextItem;
                        this.selectedFlag.setAttribute("aria-activedescendant", nextItem.getAttribute("id"));
                    }
                }
                // return if the flag has changed or not
                return prevCountry.iso2 !== countryCode;
            }
        }, {
            key: "_getHiddenSelectedFlagWidth",
            value: function _getHiddenSelectedFlagWidth() {
                // to get the right styling to apply, all we need is a shallow clone of the container,
                // and then to inject a deep clone of the selectedFlag element
                var containerClone = this.telInput.parentNode.cloneNode();
                containerClone.style.visibility = "hidden";
                document.body.appendChild(containerClone);
                var selectedFlagClone = this.selectedFlag.cloneNode(true);
                containerClone.appendChild(selectedFlagClone);
                var width = selectedFlagClone.offsetWidth;
                containerClone.parentNode.removeChild(containerClone);
                return width;
            }
        }, {
            key: "_updatePlaceholder",
            value: function _updatePlaceholder() {
                var shouldSetPlaceholder = this.options.autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && this.options.autoPlaceholder === "polite";
                if (window.intlTelInputUtils && shouldSetPlaceholder) {
                    var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
                    var placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";
                    placeholder = this._beforeSetNumber(placeholder);
                    if (typeof this.options.customPlaceholder === "function") {
                        placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
                    }
                    this.telInput.setAttribute("placeholder", placeholder);
                }
            }
        }, {
            key: "_selectListItem",
            value: function _selectListItem(listItem) {
                // update selected flag and active list item
                var flagChanged = this._setFlag(listItem.getAttribute("data-country-code"));
                this._closeDropdown();
                this._updateDialCode(listItem.getAttribute("data-dial-code"), true);
                // focus the input
                this.telInput.focus();
                // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto
                // inserting dial code), who try to put the cursor at the beginning the first time
                var len = this.telInput.value.length;
                this.telInput.setSelectionRange(len, len);
                if (flagChanged) {
                    this._triggerCountryChange();
                }
            }
        }, {
            key: "_closeDropdown",
            value: function _closeDropdown() {
                this.countryList.classList.add("iti__hide");
                this.selectedFlag.setAttribute("aria-expanded", "false");
                // update the arrow
                this.dropdownArrow.classList.remove("iti__arrow--up");
                // unbind key events
                document.removeEventListener("keydown", this._handleKeydownOnDropdown);
                document.documentElement.removeEventListener("click", this._handleClickOffToClose);
                this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList);
                this.countryList.removeEventListener("click", this._handleClickCountryList);
                // remove menu from container
                if (this.options.dropdownContainer) {
                    if (!this.isMobile) window.removeEventListener("scroll", this._handleWindowScroll);
                    if (this.dropdown.parentNode) this.dropdown.parentNode.removeChild(this.dropdown);
                }
                this._trigger("close:countrydropdown");
            }
        }, {
            key: "_scrollTo",
            value: function _scrollTo(element, middle) {
                var container = this.countryList;
                // windowTop from https://stackoverflow.com/a/14384091/217866
                var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                var containerHeight = container.offsetHeight;
                var containerTop = container.getBoundingClientRect().top + windowTop;
                var containerBottom = containerTop + containerHeight;
                var elementHeight = element.offsetHeight;
                var elementTop = element.getBoundingClientRect().top + windowTop;
                var elementBottom = elementTop + elementHeight;
                var newScrollTop = elementTop - containerTop + container.scrollTop;
                var middleOffset = containerHeight / 2 - elementHeight / 2;
                if (elementTop < containerTop) {
                    // scroll up
                    if (middle) newScrollTop -= middleOffset;
                    container.scrollTop = newScrollTop;
                } else if (elementBottom > containerBottom) {
                    // scroll down
                    if (middle) newScrollTop += middleOffset;
                    var heightDifference = containerHeight - elementHeight;
                    container.scrollTop = newScrollTop - heightDifference;
                }
            }
        }, {
            key: "_updateDialCode",
            value: function _updateDialCode(newDialCodeBare, hasSelectedListItem) {
                var inputVal = this.telInput.value;
                // save having to pass this every time
                var newDialCode = "+".concat(newDialCodeBare);
                var newNumber;
                if (inputVal.charAt(0) === "+") {
                    // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
                    var prevDialCode = this._getDialCode(inputVal);
                    if (prevDialCode) {
                        // current number contains a valid dial code, so replace it
                        newNumber = inputVal.replace(prevDialCode, newDialCode);
                    } else {
                        // current number contains an invalid dial code, so ditch it
                        // (no way to determine where the invalid dial code ends and the rest of the number begins)
                        newNumber = newDialCode;
                    }
                } else if (this.options.nationalMode || this.options.separateDialCode) {
                    // don't do anything
                    return;
                } else {
                    // nationalMode is disabled
                    if (inputVal) {
                        // there is an existing value with no dial code: prefix the new dial code
                        newNumber = newDialCode + inputVal;
                    } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
                        // no existing value and either they've just selected a list item, or autoHideDialCode is
                        // disabled: insert new dial code
                        newNumber = newDialCode;
                    } else {
                        return;
                    }
                }
                this.telInput.value = newNumber;
            }
        }, {
            key: "_getDialCode",
            value: function _getDialCode(number) {
                var dialCode = "";
                // only interested in international numbers (starting with a plus)
                if (number.charAt(0) === "+") {
                    var numericChars = "";
                    // iterate over chars
                    for (var i = 0; i < number.length; i++) {
                        var c = number.charAt(i);
                        // if char is number (https://stackoverflow.com/a/8935649/217866)
                        if (!isNaN(parseInt(c, 10))) {
                            numericChars += c;
                            // if current numericChars make a valid dial code
                            if (this.countryCodes[numericChars]) {
                                // store the actual raw string (useful for matching later)
                                dialCode = number.substr(0, i + 1);
                            }
                            if (numericChars.length === this.dialCodeMaxLen) {
                                break;
                            }
                        }
                    }
                }
                return dialCode;
            }
        }, {
            key: "_getFullNumber",
            value: function _getFullNumber() {
                var val = this.telInput.value.trim();
                var dialCode = this.selectedCountryData.dialCode;
                var prefix;
                var numericVal = this._getNumeric(val);
                if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
                    // when using separateDialCode, it is visible so is effectively part of the typed number
                    prefix = "+".concat(dialCode);
                } else {
                    prefix = "";
                }
                return prefix + val;
            }
        }, {
            key: "_beforeSetNumber",
            value: function _beforeSetNumber(originalNumber) {
                var number = originalNumber;
                if (this.options.separateDialCode) {
                    var dialCode = this._getDialCode(number);
                    // if there is a valid dial code
                    if (dialCode) {
                        // in case _getDialCode returned an area code as well
                        dialCode = "+".concat(this.selectedCountryData.dialCode);
                        // a lot of numbers will have a space separating the dial code and the main number, and
                        // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
                        // rid of it
                        // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
                        var start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
                        number = number.substr(start);
                    }
                }
                return this._cap(number);
            }
        }, {
            key: "_triggerCountryChange",
            value: function _triggerCountryChange() {
                this._trigger("countrychange");
            }
        }, {
            key: "handleAutoCountry",
            value: function handleAutoCountry() {
                if (this.options.initialCountry === "auto") {
                    // we must set this even if there is an initial val in the input: in case the initial val is
                    // invalid and they delete it - they should see their auto country
                    this.defaultCountry = window.intlTelInputGlobals.autoCountry;
                    // if there's no initial value in the input, then update the flag
                    if (!this.telInput.value) {
                        this.setCountry(this.defaultCountry);
                    }
                    this.resolveAutoCountryPromise();
                }
            }
        }, {
            key: "handleUtils",
            value: function handleUtils() {
                // if the request was successful
                if (window.intlTelInputUtils) {
                    // if there's an initial value in the input, then format it
                    if (this.telInput.value) {
                        this._updateValFromNumber(this.telInput.value);
                    }
                    this._updatePlaceholder();
                }
                this.resolveUtilsScriptPromise();
            }
        }, {
            key: "destroy",
            value: function destroy() {
                var form = this.telInput.form;
                if (this.options.allowDropdown) {
                    // make sure the dropdown is closed (and unbind listeners)
                    this._closeDropdown();
                    this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
                    this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
                    // label click hack
                    var label = this._getClosestLabel();
                    if (label) label.removeEventListener("click", this._handleLabelClick);
                }
                // unbind hiddenInput listeners
                if (this.hiddenInput && form) form.removeEventListener("submit", this._handleHiddenInputSubmit);
                // unbind autoHideDialCode listeners
                if (this.options.autoHideDialCode) {
                    if (form) form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
                    this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent);
                }
                // unbind key events, and cut/paste events
                this.telInput.removeEventListener("keyup", this._handleKeyupEvent);
                this.telInput.removeEventListener("cut", this._handleClipboardEvent);
                this.telInput.removeEventListener("paste", this._handleClipboardEvent);
                // remove attribute of id instance: data-intl-tel-input-id
                this.telInput.removeAttribute("data-intl-tel-input-id");
                // remove markup (but leave the original input)
                var wrapper = this.telInput.parentNode;
                wrapper.parentNode.insertBefore(this.telInput, wrapper);
                wrapper.parentNode.removeChild(wrapper);
                delete window.intlTelInputGlobals.instances[this.id];
            }
        }, {
            key: "getExtension",
            value: function getExtension() {
                if (window.intlTelInputUtils) {
                    return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
                }
                return "";
            }
        }, {
            key: "getNumber",
            value: function getNumber(format) {
                if (window.intlTelInputUtils) {
                    var iso2 = this.selectedCountryData.iso2;
                    return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
                }
                return "";
            }
        }, {
            key: "getNumberType",
            value: function getNumberType() {
                if (window.intlTelInputUtils) {
                    return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
                }
                return -99;
            }
        }, {
            key: "getSelectedCountryData",
            value: function getSelectedCountryData() {
                return this.selectedCountryData;
            }
        }, {
            key: "getValidationError",
            value: function getValidationError() {
                if (window.intlTelInputUtils) {
                    var iso2 = this.selectedCountryData.iso2;
                    return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
                }
                return -99;
            }
        }, {
            key: "isValidNumber",
            value: function isValidNumber() {
                var val = this._getFullNumber().trim();
                var countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
                return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null;
            }
        }, {
            key: "setCountry",
            value: function setCountry(originalCountryCode) {
                var countryCode = originalCountryCode.toLowerCase();
                // check if already selected
                if (!this.selectedFlagInner.classList.contains("iti__".concat(countryCode))) {
                    this._setFlag(countryCode);
                    this._updateDialCode(this.selectedCountryData.dialCode, false);
                    this._triggerCountryChange();
                }
            }
        }, {
            key: "setNumber",
            value: function setNumber(number) {
                // we must update the flag first, which updates this.selectedCountryData, which is used for
                // formatting the number before displaying it
                var flagChanged = this._updateFlagFromNumber(number);
                this._updateValFromNumber(number);
                if (flagChanged) {
                    this._triggerCountryChange();
                }
            }
        }, {
            key: "setPlaceholderNumberType",
            value: function setPlaceholderNumberType(type) {
                this.options.placeholderNumberType = type;
                this._updatePlaceholder();
            }
        } ]);
        return Iti;
    }();
    /********************
 *  STATIC METHODS
 ********************/
    // get the country data object
    intlTelInputGlobals.getCountryData = function() {
        return allCountries;
    };
    // inject a <script> element to load utils.js
    var injectScript = function injectScript(path, handleSuccess, handleFailure) {
        // inject a new script element into the page
        var script = document.createElement("script");
        script.onload = function() {
            forEachInstance("handleUtils");
            if (handleSuccess) handleSuccess();
        };
        script.onerror = function() {
            forEachInstance("rejectUtilsScriptPromise");
            if (handleFailure) handleFailure();
        };
        script.className = "iti-load-utils";
        script.async = true;
        script.src = path;
        document.body.appendChild(script);
    };
    // load the utils script
    intlTelInputGlobals.loadUtils = function(path) {
        // 2 options:
        // 1) not already started loading (start)
        // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
        // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
        if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
            // only do this once
            window.intlTelInputGlobals.startedLoadingUtilsScript = true;
            // if we have promises, then return a promise
            if (typeof Promise !== "undefined") {
                return new Promise(function(resolve, reject) {
                    return injectScript(path, resolve, reject);
                });
            }
            injectScript(path);
        }
        return null;
    };
    // default options
    intlTelInputGlobals.defaults = defaults;
    // version
    intlTelInputGlobals.version = "17.0.2";
    var pluginName = "intlTelInput";
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        var args = arguments;
        // Is the first parameter an object (options), or was omitted, instantiate a new instance of the plugin.
        if (options === undefined || typeof options === "object") {
            return this.each(function() {
                if (!$.data(this, "plugin_" + pluginName)) {
                    var iti = new Iti(this, options);
                    iti._init();
                    window.intlTelInputGlobals.instances[iti.id] = iti;
                    $.data(this, "plugin_" + pluginName, iti);
                }
            });
        } else if (typeof options === "string" && options[0] !== "_") {
            // If the first parameter is a string and it doesn't start with an underscore treat this as a call to a public method.
            // Cache the method call to make it possible to return a value
            var returns;
            this.each(function() {
                var instance = $.data(this, "plugin_" + pluginName);
                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof Iti && typeof instance[options] === "function") {
                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                // Allow instances to be destroyed via the 'destroy' method
                if (options === "destroy") $.data(this, "plugin_" + pluginName, null);
            });
            // If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };
});