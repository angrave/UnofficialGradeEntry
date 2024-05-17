An unofficial Chrome Extension by Angrave to make it easier to paste grades into the U of I Grade Entry system.

Think twice before you use this - there are probably better ways to do what you need to do (see the Official alternatives below). Please also see the official documentation- 
https://registrar.illinois.edu/faculty-staff/staff-grades/faculty-grade-entry/#mass-grade-entry


This extension attempts to set the grade entry drop-downs; it does not save or send anything to the server. It is still your responsibility to save and verify all grades.


# Install

1. Clone this repo (and inspect the code)
2. Open chrome://extensions/
1. Enable Developer Mode (top right)
1. Select "Load unpacked" and select the repo directory.
1. Pin the extension, so it is easy to open; it will appear as an "A+" icon in Chrome.

Note this extension only works on the Banner Grade Entry page.

# Use

1. Login to Banner, navigate to GradeEntry and select the section that needs grades entered.
1. Open the extension (click on the A+ extension icon) so you can paste UIN and grades.
1. Copy and Paste your 2 columns UIN,Grade  (comma or tab separated) and click the "Copy Grades" button!
1. If any verification checks fail you will get an alert and no grades will have been set.
1. If there are no errors then the visible Grade dropdowns for matching UINs will be set on the web page.
1. It is still your responsibility to verify and save the grades, including setting last attend date for F grades. You wil have to use it multiple times if you have more than one page of grades.

# Official Alternatives to this tool

1. You can export grades directly from Canvas LMS and maybe Moodle LMS, then upload them into Banner.
1. Create a XLSX (Excel) document using your favorite tool e.g.
Excel|Pandas|Google Sheet|... It needs 4 columns headings that you can cut and paste from here:
  `Term Code,CRN,Student ID,Final Grade`
where Term Code is 120241 (1+ yyyy + m), CRN is your course CRN (which likely flipflops per semester update: but may also depend on the student's section),  and Student ID ...  the student's UIN 6xxxxxxxxx. Add UIN and grade rows. And fill in term and CRN data.
Then under the top-right gear icon use  "Upload" option in Banner self service after selecting your course. For "F" grades you can fix up the Last attend date later.
https://banner.apps.uillinois.edu/FacultySelfService/ssb/GradeEntry?mepCode=1UIUC#/final
1. (Official) Use the WebUI or Use "Export Template" (again, topright gear icon) in Banner to get a starting Excel document and paste into that. In the webUI Mouseover names to get student email.

