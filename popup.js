(function () {

    function onGradeButtonClick() {
        var gradesString = document.getElementById("gradedatainput").value;
        (async () => {
            await chrome.runtime.sendMessage({ action: 'gradehelper', data: gradesString });
        })();
    }

    document.getElementById("btn_gradehelper").onclick = onGradeButtonClick;
})();

