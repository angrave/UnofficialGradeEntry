# Unofficial Grade Entry

An unofficial Chrome Extension by Angrave to paste grades into the U of I Banner Grade Entry system.

This extension attempts to set the grade entry drop-downs (think of it as fast copy-paste from a textarea to visible list of dropdowns); it does not save or upload grades to the server. It is still your responsibility to save and verify all grades.

![Screenshot of grade text area with UINs and grade letters](https://github.com/angrave/UnofficialGradeEntry/blob/main/doc/popup-demo.png?raw=true)

Think twice before you use this - there are probably better ways to do what you need to do (see the official suggested methods below). 


# Install / Uninstall

1. Create a local copy of this repo (and inspect the code)
2. Open [chrome://extensions/](chrome://extensions/)
1. Enable Developer Mode (top right)
1. Select "Load unpacked" and select the repo directory.
1. Pin the extension, so it is easy to open; it will appear as an "A+" icon in Chrome.
1. Use chrome://extensions/ to update or uninstall the extension.

This extension only works on the specific URL of Banner's Final Grade Entry page for UIUC. Midterm grades could be supported upon request.

# Use

1. Login to Banner, navigate to GradeEntry and select the section that needs grades entered.
1. Open the extension (click on the A+ extension icon) so you can paste UIN and grades.
1. Copy and Paste your 2 columns UIN,Grade  (comma or tab separated) and click the "Copy Grades" button!
1. If any verification checks fail you will get an alert and no grades will have been set.
1. If there are no errors then the visible Grade dropdowns for matching UINs will be set on the web page.
1. It is still your responsibility to verify and save the grades, including setting last attend date for F grades. You wil have to use it multiple times if you have more than one page of grades.

# Official and supported methods to import grades

Here's the excellent and detail official documentation by the registrar - 
https://registrar.illinois.edu/faculty-staff/staff-grades/faculty-grade-entry/#mass-grade-entry

So please let me know why you even need this tool when there are multiple official methods to upload grades -

1. Export grades from Canvas LMS and maybe Moodle LMS, then upload them into Banner.
1. Upload a spreadsheet: Create a XLSX (Excel) document using your favorite tool e.g.
Excel|Pandas|Google Sheet|... It needs 4 columns headings that you can cut and paste from here:
  `Term Code,CRN,Student ID,Final Grade`
where Term Code is 120241 (1+ yyyy + m), CRN is your course CRN (which likely flipflops per semester update: but may also depend on the student's section),  and Student ID ...  the student's UIN 6xxxxxxxxx. Add UIN and grade rows. And fill in term and CRN data.
Then under the top-right gear icon use  "Upload" option in Banner self service after selecting your course. For "F" grades you can fix up the Last attend date later.
1. Use the Banner WebUI grade dropdown entry.
1. Select the course then select "Export Template" (again, topright gear icon) to get a starting Excel document and paste into that.

# Security comments

This extension has not published on the Chrome Extension store; it is only available as a github repository (https://github.com/angrave/UnofficialGradeEntry/).

This repo does not rely on any external or third-party libraries - so you are at least trusting that Angrave (CS faculty at UIUC) is not attempting to be malicious and that my github has not been hacked. I personally would review the source code of any extension before running it.

The validation checks built into the project, will likely discover if the Banner page entry structure changes and refuse to set grades. You are also trusting that the tool works as intended however no warranty is provided and you are responsible for verifying that the grades sent to the server are correct. One way to do this is to relead the page and export the grades 

# License

See [LICENSE](LICENSE)
