(function () {

    const verbose = false;

    function validate(mesg, expect, actual) {
        if (expect == actual)
            return;

        if (verbose && expect !== true) mesg += `. Expected "${expect}" but got "${actual}"`;
        alert(mesg);
        throw mesg;
    };

    function getGradeDropDownElements() {
        var gradeDropDowns = []
        for (const tag of document.querySelectorAll("select")) {
            if (tag.ariaLabel === 'Final Grade Click on space to select the grade') {
                gradeDropDowns.unshift(tag)
            }
        }
        validate("No grade drop-down elements found", true, gradeDropDowns.length > 0);
        return gradeDropDowns;
    };

    function isUIN(uin) {
        return uin.search(/^6([0-9]){8,10}$/) != -1;
    };

    function setSelectorOption(selector, value) {
        selector.value = value;
        var found = false;
        for (var i = 0; i < selector.options.length && !found; i++) {
            found = selector.options[i].value == value;
            if (!found) continue;
            selector.selectedIndex = i;
            const event = new Event('change');
            selector.dispatchEvent(event);
        }
        validate(`Dropdown value not set:${value}`, true, found);
    };

    function validateOptionExists(selector, value) {
        for (var i = 0; i < selector.options.length; i++) {
            if (selector.options[i].value == value) {
                return;
            }
        }
        validate(`Drop down selection does not include '${value}'`, 1, 0);
    };
    function trim(s) {
        return s.replace(/^\s*/, "").replace(/\s*$/, "");
    };

    function textAreaToTable(longstring) {
        var hasCommas = longstring.indexOf(',') != -1;
        var hasTabs = longstring.indexOf('\t') != -1;
        validate("Grade Data must have either commas or tabs (but not both)", true, hasCommas != hasTabs);
        var colSep = '\t';
        if (hasCommas) colSep = ',';
        var rawRows = longstring.split('\n');
        validate("Grade Data must have more than one line", true, rawRows.length > 1);

        var headerLine = rawRows[0].split(colSep);
        validate("Header line should have two columns: uin,grade (comma or tab)", 2, headerLine.length);
        var col1 = trim(headerLine[0].toLowerCase());
        var col2 = trim(headerLine[1].toLowerCase());
        validate("First column is incorrect: Must be 'UIN'", "uin", col1);
        validate("Second column is incorrect: Must be 'Grade'", "grade", col2);

        var result = new Array();
        for (var i = 1; i < rawRows.length; i++) {
            var entry = rawRows[i].split(colSep);
            validate("Two columns expected on line " + (i + 1), 2, entry.length);
            var uin = trim(entry[0]);
            var grade = trim(entry[1]);
            validate("Invalid UIN format:'" + uin + "' at line " + (i + 1), true, isUIN(uin));
            validate("Duplicate entry for uin " + uin + " at line " + (i + 1), false, uin in result);
            result[uin] = grade;
        }
        return result;
    };

    function handleGradeHelperMessage(message, sender, sendResponse) {
        if (verbose) alert(`handleMessage: ${message} from ${sender.id}`);
        const gradeString = message.gradedata;

        if (!gradeString || gradeString.length == 0) {
            alert("Need some data first. First line should be uin,grade.\nSubsequent line should uin,grade pairs. Tabs or commas are ok.");
            return;
        }
        try {
            var gradeTable = textAreaToTable(gradeString);

            var dropDowns = getGradeDropDownElements();
            for (var pass = 0; pass < 3; pass++) {
                /* First time, just validate. Second time set to None, Third time set grades */

                for (var ii = 0; ii < dropDowns.length; ii++) {
                    var gradeSelector = dropDowns[ii];
                    var tableRow = gradeSelector.parentNode;
                    while (tableRow.tagName.toLowerCase() != 'tr') { tableRow = tableRow.parentNode };

                    validate("Expected TableRow", "tr", tableRow.tagName.toLowerCase());
                    var tds = tableRow.getElementsByTagName('td');
                    validate(`Table format has changed (expected 6):${tds.length}`, true, tds.length === 6);
                    var uin = tds[1].querySelector("span").textContent;

                    /*var name =tds[0].querySelector("a").textContent;*/
                    validate("Expected second column to be UIN:" + uin, true, isUIN(uin));
                    if (gradeSelector.type == 'hidden') {
                        validate(`UIN ${uin} has no settable grade`, false, uin in gradeTable);
                        continue;
                    }
                    validate(`No grade found for UIN ${uin}`, true, uin in gradeTable);

                    var grade = gradeTable[uin];
                    validateOptionExists(gradeSelector, "");
                    validateOptionExists(gradeSelector, grade);
                    switch (pass) {
                        case 0: break;
                        case 1: setSelectorOption(gradeSelector, ""); break;
                        case 2: setSelectorOption(gradeSelector, grade); break;
                    }
                }
            }
        } catch (e) { if (verbose) alert(`(verbose) Caught Exception: ${e}`); }
    };
    // Register this globally on the window, so we have a singleton which is the most recent version
    if (!window.currentGradeHelper) {
        if (verbose) alert("Adding Listener currentGradeHelper");
        chrome.runtime.onMessage.addListener((mesg) => { window.currentGradeHelper(mesg) });
    }
    window.currentGradeHelper = handleGradeHelperMessage;

})();
